var users = require('./users');
var groups = require('./groups');
var graphQL = require('./graphQL');
var jwt = require('jsonwebtoken');


exports.assingRoutes = function(app){
    app.post('/users', users.createUser);
    app.post('/login', users.logInUser);
    
    //temporal oauth
    app.post('/auth', function(req,res){
        jwt.verify(req.body.token, 'superSecret', function (err, decoded) {
            if (err) {
                res.status(403).send('Nooooooooo');
            } 
            res.status(200).send('yeahhh');
        });
        
    })
    
    app.post('/groups', groups.createGroup);
    app.post('/groups/:groupId', groups.getGroup);

    app.post('/graphQL', graphQL.getQuery);
};