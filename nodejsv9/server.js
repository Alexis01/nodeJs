/*jshint esversion: 6 */

//libraries
const http = require('http');
const path = require('path');
const grunt = require('grunt');
const express = require('express');
const bodyparser = require('body-parser');
const childprocess = require('child_process');
    
//config
const config_arg = process.argv.slice();
const file_path = path.join(__dirname, '.', 'config_'+config_arg[2]+'.json');      
const app_config = grunt.file.readJSON(file_path);

//tools
const db_tools = require('./src/tools/db_tools');

//aplication
const app = express();

//Starting app
db_tools.DBConnectMoongoose(app_config.db_config)
    .then( () => {
        //gettin routes 

        // configure app to use bodyParser()
        // this will let us get the data from a POST
        app.use(bodyparser.urlencoded({extended:true}));
        app.use(bodyparser.json({limit: '10mb'}));

        app.listen(app_config.port);
        console.log('Server listening on: http://localhost:'+ app_config.port);
        console.log('Opening browse');
        childprocess.exec('firefox');
    })
    .catch( err => {
        console.log('Error: ' + err);
    });
