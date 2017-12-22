var usersDB = require('../db/users');

exports.createUser = function( userData ){
    return new Promise(function( resolve, reject ){
        if(!userData.surname || !userData.lastname || 
            !userData.password || !userData.email  ){
                
                reject('Missing Fields');
                return;
        }
        userData.completename = userData.surname + userData.lastname;
        usersDB.saveUser(userData)
            .then( user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            })
    });
};

exports.logIn = function( userData ){
    return new Promise(function( resolve, reject ){
        if( !userData.password || !userData.email  ){
                reject('Missing Fields');
                return;
        }
        usersDB.logInUser(userData)
            .then( user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            })
    });
}; 