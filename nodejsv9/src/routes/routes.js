/*jshint esversion: 6 */
const users = require('./users');
const pages = require('./pages');
const setRoutes = function(app){
    //app.post('/users', users.createUser);
    app.get('/', pages.homepage);
};

exports.setRoutes = setRoutes;