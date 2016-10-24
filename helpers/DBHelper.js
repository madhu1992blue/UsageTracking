var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoUrl = 'mongodb://localhost:27017/test';
var ObjectId = require('mongodb').ObjectID;

var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var builder = new xml2js.Builder();
var i = 0;

var DBHelper = {
    insertDocument: function (collectionName, record) {
        var sync = true;
        var data = null;
        MongoClient.connect(mongoUrl, function (err, db) {
            db.collection(collectionName).insertOne(record, function (err, result) {
                assert.equal(err, null);
                console.log("Inserted a document into the " + collectionName + " collection.");
                db.close();

                data = result.insertedId;
                console.log(data);
                sync = false;
            });
        });
        while (sync) { require('deasync').sleep(100); }
        return data;
    },
    updateDocument: function (collectionName,condition, action) {
        var sync = true;
        var data = null;
        MongoClient.connect(mongoUrl, function (err, db) {
            db.collection(collectionName).update(condition, action, function(err,cntRecords,status){
                sync = false;
                db.close();
            });
            
        });
        while (sync) { require('deasync').sleep(100); }
        return data;
    },
    findOne: function(collectionName, query){
        var sync = true;
        var data = null;
        MongoClient.connect(mongoUrl, function (err, db) {
            db.collection(collectionName).findOne(query, function(err, doc){
                data=doc;
                sync = false;
                db.close();
            });
            
        });
        while (sync) { require('deasync').sleep(100); }
        return data;
    },
    find: function(collectionName, query, fields){
        var sync = true;
        var data = null;
        MongoClient.connect(mongoUrl, function (err, db) {
            db.collection(collectionName).find(query, fields).toArray(function(err, results){
                data=results;
                sync = false;
                db.close();
            });
            
        });
        while (sync) { require('deasync').sleep(100); }
        return data;
    }
}


module.exports = DBHelper;