
var db_tools = require('../tools/db_tools'),
    mongoose = require('mongoose');

//DB connect
var db = db_tools.DBConnectMongoose()
    .catch( err => {
        console.log(err);
    });

//Create a mongoose schema
var GroupSchema = new mongoose.Schema({
    name: String,
    description: String,
    users: [mongoose.Schema.Types.ObjectId]
});

//Register ther schema
var Group = mongoose.model('group', GroupSchema);

exports.Group = Group;
exports.saveGroup = function(groupData){
    var group = new Group(groupData);
    return new Promise(function(resolve, reject){
        group.save()
            .then( group => {
                console.log('Group saved!');
                resolve(group);
            })
            .catch( err => {
                console.log('Error saving group: ' + err);
                reject(err);
            });
    });
};

exports.getGroup = function(groupId){
   return new Promise(function(resolve,reject){
       Group.findOne({_id: groupId})
        .then( group => {
            resolve(group);
        })
        .catch(err => {
            console.log("Error retrieving groups: " + err);
            reject(err);
        });
   }); 
}