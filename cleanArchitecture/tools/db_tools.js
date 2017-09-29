'use strict';

var mongoose = require('mongoose'),
    config = require('../configDb.json');

var db;

exports.DBConnectMongoose = function(){
    return new Promise(function(resolve,reject){
        mongoose.Promise = global.Promise;
        if(db){
            return resolve(db);
        }

        mongoose.connect('mongodb://'+ config.db_config.host + ':' + config.db_config.port + '/' + config.db_config.name)
            .then(() => {
                db = mongoose.connection;
                console.log('Mongo Connection Created');
                resolve(db);
            })
            .catch( err => {
                console.log('Error creating db connection: ' + err);
                reject(err);
            });
    });
};

