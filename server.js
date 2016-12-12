/**
 * Created by Choll on 12/12/2016.
 */
var express = require('express');
var mongodb = require('mongodb');
var app = express();
var port = 3000;
var mongoUrl = 'mongodb://localhost:27017/infosys';

app.get('/', function (req, res) {
    res.send('Hello World');
});


console.log("Listening on port: "+port);
app.listen(port);
