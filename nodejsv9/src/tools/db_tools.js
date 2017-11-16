/*jshint esversion: 6 */
const mongoose = require('mongoose');//elegant mongodb object modeling for node.js
let db; //singleton

var DBConnectMoongoose = function(db_config){
    return new Promise(function(resolve, reject){
        mongoose.Promise = global.Promise;
        if(db){
            return db;
        }
        const url = 'mongodb://' + db_config.host +
                    ':' + db_config.port + 
                    '/' + db_config.name;
        mongoose.connect(url)
            .then( () => {
                db = mongoose.connection;
                console.log('Mongodb Connected');
                resolve(db);
            })
            .catch( err  => {
                console.log('Error creating db connection: ' + err);
                reject(err);
            });
    });
};


exports.DBConnectMoongoose = DBConnectMoongoose;