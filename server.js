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

app.get('/app', function(req, res) {
    res.sendfile('public/index1.html' , { root : __dirname});
});

// app.get('/', function(req,res) {
//     db.collection('list').find({}).toArray(function(err,doc) {
//         assert.equal(err,null)
//         res.send(JSON.stringify(doc))
//     })
// })

app.listen(process.env.PORT || 8090, function() {
    console.log('Listening on port 8090')
})
