var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var express = require('express')
var app = express()

var db = null
MongoClient.connect('mongodb://master:master123@ds231501.mlab.com:31501/learingdb', function(err,database) {
    console.log('ERROR', err);
    db = database
    console.log('DB', db);
})

app.use(express.static('public'));

app.get('/app', function(req, res) {
    res.sendfile('./index.html' , { root : __dirname});
});

app.get('/list', function(req,res) {
    db.collection('studentsList').find({}).toArray(function(err, data) {
        assert.equal(err,null)
        res.send(JSON.stringify(data))
    })
})

app.listen(process.env.PORT || 8090, function() {
    console.log('Listening on port 8090')
})
