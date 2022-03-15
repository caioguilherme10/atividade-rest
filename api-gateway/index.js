'use strict';

const fs = require('fs');
const path = require('path');
const url = require('url');
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
    keys.client_secret,
    keys.redirect_uris[0]
);

google.options({auth: oauth2Client});
 
app.use(logger('dev'));

const userServiceProxy = httpProxy('http://localhost:3000/');

async function authenticate(req) {
    console.log(req.url);
    const qs = new url.URL(req.url, 'http://localhost:10000').searchParams;
    const {tokens} = await oauth2Client.getToken({ code });
    oauth2Client.credentials = tokens;
}

app.use((req, res, next) => {
    // TODO: my authentication logic
    //authenticate(req);

    next()
});

app.post('/oauth2callback', async (req,res) => {
    //try {
        const qs = new url.URL(req.url, 'http://localhost:10000').searchParams;
        const {tokens} = await oauth2Client.getToken(qs.get('code'));
        oauth2Client.credentials = tokens;
        return res.status(200).json({ msg: tokens });
    //} catch (err) {
    //    return res.status(500).json({ msg: err });
    //}
});

// Proxy request
app.post('/register', (req, res, next) => {
    userServiceProxy(req, res, next)
});

// Proxy request
app.post('/login', (req, res, next) => {
    userServiceProxy(req, res, next)
});

// Proxy request
app.post('/registercom', (req, res, next) => {
    userServiceProxy(req, res, next)
});

// Proxy request
app.get('/comments/:id', (req, res, next) => {
    userServiceProxy(req, res, next)
});

// Proxy request
app.delete('comment/:id', (req, res, next) => {
    userServiceProxy(req, res, next)
});

//api google books
app.get('/books', (req,res) => {
    const params = req.url.toString().slice(9);
    console.log(params);

    const books = google.books({
        version: 'v1',
    });

    books.volumes.list({q:params}, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: err });
        }
        return res.status(200).json({ msg: response.data });
    })
});

//api google books
app.get('/book', (req,res) => {
    const params = req.url.toString().slice(9);
    console.log(params);

    const books = google.books({
        version: 'v1',
    });

    books.volumes.get({volumeId:params}, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ msg: err });
        }
        return res.status(200).json({ msg: response.data });
    })
});

/*
function selectProxyHost(req,res) {
    //back-end
    if (req.path.startsWith('/apicom/register'))
        return 'http://localhost:3000/register';
    else if (req.path.startsWith('/apicom/login'))
        return 'http://localhost:3000/login';
    else if (req.path.startsWith('/apicom/registercom'))
        return 'http://localhost:3000/registercom';
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
*/
 
app.listen(10000, () => {
    console.log('API Gateway running!');
});