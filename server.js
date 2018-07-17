var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert')
var express = require('express')
var app = express()
const bodyParser = require("body-parser");

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

app.use(bodyParser.json());

app.post('/list/update', function(req,res) {
    const itemId = {
        _id: ObjectId(req.body._id),
    }
    const newValue = {
        displayId: req.body.displayId,
        name: req.body.name,
        dob: req.body.dob,
    };

    db.collection("studentsList").updateOne(itemId, newValue, function(err, res) {
        if (err) return err;
        console.log("1 document updated");
    });
    res.status(204).end();
})

app.delete('/list/:_id', function(req,res) {
    const itemId = {
        _id: ObjectId(req.params._id),
    }

    db.collection("studentsList").deleteOne(itemId, function(err) {
        if (err) {
            return err;
        }
        console.log("1 item removed");
    });
    res.status(204).end();
})

app.listen(process.env.PORT || 8090, function() {
    console.log('Listening on port 8090')
})
