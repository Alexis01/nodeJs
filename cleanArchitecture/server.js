'use strict';
var express = require('express');
var bodyparser = require('body-parser');

var db_tools = require('./tools/db_tools');

var app = express();

db_tools.DBConnectMongoose()
    .then( () => {
        console.log('yeah bitch');
        
    })
    .catch( err => {
        console.log('Error: '+ err);
    } )