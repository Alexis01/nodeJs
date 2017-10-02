var users = require('./users');
var groups = require('./groups');

var graphQL = require('./graphQL');

exports.assingRoutes = function(app){
    app.post('/users', users.createUser);
    
    app.post('/groups', groups.createGroup);
    app.post('/groups/:groupId', groups.getGroup);

    app.post('/graphQL', graphQL.getQuery);
};