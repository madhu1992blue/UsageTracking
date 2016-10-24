var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoUrl = 'mongodb://localhost:27017/test';
var ObjectId = require('mongodb').ObjectID;

var DBHelper = require('../../helpers/DBHelper');
var LogHandler= {
    createNew : function(productName, productVersion, productPlatform){
        record = { project: { name: productName, version: productVersion, platform: productPlatform } };
       insertedId =  DBHelper.insertDocument("sessions", record);
       return insertedId;
    },
    addStep: function(tokenId,stepJson){
        var condition = {_id: ObjectId(tokenId) }
        var action = {
                    $push: {
                        steps:  stepJson
                    }
 
                };
        DBHelper.updateDocument('sessions',condition, action);
    },
    defineFeatureArea: function(tokenId, featureName, subArea, version){
        var condition = {_id: ObjectId(tokenId), "features": {$elemMatch: {name: featureName, subArea: subArea, version: version}, }};
        if(DBHelper.findOne('sessions',condition)==null){
            docCondition = {_id: ObjectId(tokenId)};
            action = {
                $push: {
                    features: {name: featureName, subArea: subArea, version: version}
                }
            };
            DBHelper.updateDocument('sessions', docCondition, action );
        }
         
    },
    addStepToFeatureArea: function(tokenId, featureName, subArea, version, step){
        LogHandler.defineFeatureArea(tokenId, featureName, subArea, version);
        var condition = {_id: ObjectId(tokenId), "features": {$elemMatch: {name: featureName, subArea: subArea, version: version} }};
        var action = {
                $push: {
                    "features.$.steps": step
                }
        };
        DBHelper.updateDocument('sessions', condition, action );
    },
    findSteps: function(featureName, subArea,version){
        return DBHelper.find('sessions',{
            features: {
                $elemMatch: {
                    name: featureName,
                    subArea: subArea,
                    version: version
                }
            }
        }, {_id: 1, "features.$": 1});
    }
}


module.exports = LogHandler;