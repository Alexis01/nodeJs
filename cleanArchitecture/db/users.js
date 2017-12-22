var db_tools = require('../tools/db_tools'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken');

require('mongoose-type-email');

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
    email: {type: mongoose.SchemaTypes.Email, unique: true},
    password: String
});
//password
// hash the password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
  
  // checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Registramos el esquema en la bbdd
var User = mongoose.model('user', UserSchema);


//exportamos las funciones y el propio esquema
exports.User = User;

exports.saveUser = function(userData){
    var user = new User(userData);
    user.password = user.generateHash(userData.password);
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
};

exports.logInUser = function(userData){
    
    return new Promise(function(resolve,reject){
        User.findOne({email:userData.email})
            .then(user => {
                if(user.validPassword(userData.password)){
                    var token = jwt.sign({asdf:"asdf"}, 'superSecret', {
                        expiresIn: "1m" // expires in 24 hours
                    });
                    resolve({id: user._id,token:token});
                }else{
                    reject("Invalid Passwod")
                }
            })
            .catch(err => {
                reject(err);
            })
    });
};