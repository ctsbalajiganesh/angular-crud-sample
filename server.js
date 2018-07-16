var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var express = require('express')
var app = express()

var db = null
MongoClient.connect('mongodb://master:master123@ds231501.mlab.com:31501/learingdb', function(err,database) {
    db = database
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

app.post('/list/update', function(req,res) {
    console.log('REQ', req, 'RES', res);
    // const myquery = '';
    // const newvalues = '';

    // db.collection("studentsList").updateOne(myquery, newvalues, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document updated", res);
    //     db.close();
    //   });
})

app.listen(process.env.PORT || 8090, function() {
    console.log('Listening on port 8090')
})
