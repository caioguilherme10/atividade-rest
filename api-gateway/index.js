'use strict';

//const fs = require('fs');
//const path = require('path');
//const url = require('url');
const httpProxy = require('express-http-proxy');
const express = require('express');
const cors = require('cors');
const app = express();
//var router = express.Router();
//var bodyParser = require('body-parser');
var logger = require('morgan');

//const {google} = require('googleapis');
/*
const keyPath = path.join(__dirname, 'oauth2.keys.json');
let keys = {redirect_uris: ['']};
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;
}
*/
/*
const oauth2Client = new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris[0]
);
*/
//google.options({auth: oauth2Client});
 
app.use(logger('dev'));
app.use(cors({
    "origin": "*",
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}));

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }));

//const apiAdapter = require('./apiAdapter')

//const BASE_URL = 'http://localhost:4000'
//const api = apiAdapter(BASE_URL)

const userServiceProxy1 = httpProxy('http://localhost:4000/register');
const userServiceProxy2 = httpProxy('http://localhost:4000/login');
const userServiceProxy3 = httpProxy('http://localhost:4000/registercom');
const userServiceProxy4 = httpProxy('http://localhost:4000/comments/:id');

/*
async function authenticate(req) {
    console.log(req.url);
    const qs = new url.URL(req.url, 'http://localhost:10000').searchParams;
    const {tokens} = await oauth2Client.getToken({ code });
    oauth2Client.credentials = tokens;
}
*/
/* funciona 1
function selectProxyHost(req) {
    if (req.path.startsWith('/api/register'))
        return 'http://localhost:4000/register';
    else if (req.path.startsWith('/api/login'))
        return 'http://localhost:4000/login';
    else if (req.path.startsWith('/registercom'))
        return 'http://localhost:4000/registercom';
    else if (req.path.startsWith('/comments/:id'))
        return 'http://localhost:4000/comments/:id';
    
}
*/

app.use((req, res, next) => {
    // TODO: my authentication logic
    //authenticate(req);
    //funciona 1
    //httpProxy(selectProxyHost(req))(req, res, next);
    next()
});

/*
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

/* Proxy request
router.post('/register', (req, res) => {
    //userServiceProxy1(req, res, next)
    api.post('/register').then(resp => {
        res.send(resp.data)
    })
});
*/
// Proxy request
app.post('/register', (req, res, next) => {
    userServiceProxy1(req, res, next)
});

// Proxy request
app.post('/login', (req, res, next) => {
    userServiceProxy2(req, res, next)
});

// Proxy request
app.post('/registercom', (req, res, next) => {
    userServiceProxy3(req, res, next)
});

// Proxy request
app.get('/comments/:id', (req, res, next) => {
    userServiceProxy4(req, res, next)
});

// Proxy request
app.delete('comment/:id', (req, res, next) => {
    userServiceProxy4(req, res, next)
});

/*
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
*/

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