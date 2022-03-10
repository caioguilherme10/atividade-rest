'use strict';

const fs = require('fs');
const path = require('path');
const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');

const {google} = require('googleapis');

const keyPath = path.join(__dirname, 'oauth2.keys.json');
let keys = {redirect_uris: ['']};
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;
}

const oauth2Client = new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret
);

google.options({auth: oauth2Client});
 
app.use(logger('dev'));
 
function selectProxyHost(req,res) {
    //back-end
    if (req.path.startsWith('/apicom'))
        return 'http://localhost:3000/';
    //api google books
    else if (req.path.startsWith('/books')) {
        const params = req.query.busca;

        const books = google.books({
            version: 'v1',
        });

        books.volumes.list(params, (err, response) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: err });
            }
            return res.status(200).json({ msg: response.data });
        })
    }
}
 
app.use((req, res, next) => {
    httpProxy(selectProxyHost(req,res))(req, res, next);
});
 
app.listen(10000, () => {
    console.log('API Gateway running!');
});