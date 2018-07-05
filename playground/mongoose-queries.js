const {mongoose} = require('../server/db/mongoose');
const {ObjectID} = require('mongodb')
const {Todo} = require('../server/models/Todo');
const {User} = require('../server/models/User');

const id = "1s";
const userId = "5b3d8b35336aa13fd892f9a0";

// Queries Todo
// Todo.find({_id:id}).then(todos => {
//     console.log("To do list:  ", todos);
// });

// Todo.findOne({ _id: id}).then(todo => {
//     console.log("To do, ", todo);
// });
// if(!ObjectID.isValid(id)){
//      console.log('ID not valid');
// }
// Todo.findById(id).then(todo => {
//     if(!todo){
//        return console.log('ID can\'t not found');
//     }
//     console.log("To do, ", todo);
// }).catch(err => console.log(err));

// Queries User

User.findById(userId).then( user => {
    if(!user){
        return console.log('Cannot found user');
    }
    console.log('User: ' + user);
}, err => {
    console.log("Error: ", err);
})