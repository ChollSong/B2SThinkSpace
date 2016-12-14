/**
 * Created by Choll on 12/12/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var path = require('path');
var app = express();
var http = require('http').Server(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = 3000;

var mongoUrl = 'mongodb://localhost:27017/test1';

var MongoClient = mongodb.MongoClient;


 app.use(express.static(__dirname));



app.get('/', function (req, res) {
    console.log("has something coming from get");
    res.sendFile(__dirname + '/index.html');
});




app.get('/v/areas', function(req,res){
    //for testing
    // console.log("has something coming");
    // console.log(req.query.subArea);
    // res.send(JSON.stringify({ a: 1 }));
    MongoClient.connect(mongoUrl, function (err, db) {
        if(err){
            console.log(err);
            res.send({
                'status':1,
                'error':err
            })
        }else{
            var collection = db.collection('subAreas');
            collection.findOne({
                'subArea' : parseInt(req.query.subArea)
            }, function (err, doc) {
                if (err) {
                    return res.send({
                        'status' : 1,
                        'error' : err
                    });
                } else if (doc != null) {
                    console.log('Found ' + req.query.subArea + '.');
                    return res.send({
                        'status' : 0,
                        'area_name' : doc.name,
                       'information': doc.information,
                         'seat_available': doc.seat_available,
                        'items': doc.items

                    });
                } else {
                    console.log('Can not find ' + req.query.subArea + '.');
                    return res.send({
                        'status' : 1,
                        'error' : "not found"
                    });
                }
                db.close();
            });
        }
    });
});

//for testing ignore

app.post('/v/user', function(req, res){
    MongoClient.connect(mongoUrl, function (err, db) {
        if(err){
            console.log(err);
            res.send({
                error:0,
                msg:"db error"
            })
        }else{
            var collection = db.collection('Users');
            collection.findOne({
                'username' : req.body.username,
                'password': req.body.password
            }, function (err, doc) {
                if (err) {
                    return res.send({
                        'status' : 1,
                        'message' : err
                    });
                } else if (doc != null) {
                    console.log('Found ' + req.body.username + '.');
                    return res.send({
                        'status' : 0,
                        'message' : 'user found'

                    });
                } else {
                    console.log('Can not find ' + req.body.username+ '.');
                    return res.send({
                        'status' : 1,
                        'message' : 'user not found'
                    });
                }
            });

        }

        db.close();
    });

});



http.listen(port, function () {
    console.log("Listening on port: "+port);
});
