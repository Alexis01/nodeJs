
var db_tools = require('../tools/db_tools'),
    mongoose = require('mongoose');

//db connect
var db = db_tools.DBConnectMongoose()
    .catch(err => {
        console.log(err);
    });

//Creamos el mongoose esquema
var UserSchema = new mongoose.Schema({
    surname: String,
    lastname: String,
    completename: String,
    dni: String
});


// Registramos el esquema en la bbdd
var User = mongoose.model('user', UserSchema);


//exportamos las funciones y el propio esquema
exports.User = User;

exports.saveUser = function(userData){
    var user = new User(userData);
    return new Promise(function( resolve, reject ){
        user.save()
            .then(user => {
                console.log("User saved!");
                resolve(user);
            })
            .catch( err => {
                console.log("Error saving user: " + err);
                reject(err);
            });
    });
};

exports.getUsersByIds = function(userIds) {
    return new Promise(function(resolve, reject) {
        User.find({_id : {$in: userIds}})
            .then(users => {
                resolve(users);
            })
            .catch(err => {
                reject(err);
            })
    })
}