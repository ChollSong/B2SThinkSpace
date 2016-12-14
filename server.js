/**
 * Created by Choll on 12/12/2016.
 */
var express = require('express');
var mongodb = require('mongodb');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var port = 3000;
var mongoUrl = 'mongodb://localhost:27017/infosys';
var MongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));
 app.use(express.static(__dirname));



app.get('/', function (req, res) {
    console.log("has something coming from get");
    res.sendFile(__dirname + '/index.html');
});




app.get('/v/areas', function(req,res){
    //for testing
    console.log("has something coming");
    console.log(req.query.subArea);
    res.send(JSON.stringify({ a: 1 }));
});



http.listen(port, function () {
    console.log("Listening on port: "+port);
});
