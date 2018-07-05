const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')
const mongoose = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');

var app = express();

app.listen(3000, () => {
    console.log('Start on port 3000');
})

// get method

app.get('/todos', (req, res) => {
    Todo.find().then( todos => {
        res.send({todos});
    }, err => {
        res.status(400).send(err);
    })
})
//GET todos/123
app.get('/todos/:id', (req,res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then( todo => {
        if(!todo){
            return res.status(404).send();
        }
        // send back an object
        res.send({todo: todo});
    }).catch(err =>  res.status(400).send(err));
   // res.send(req.params);
})

//use parse-body to get body data from client
app.use(bodyParser.json());
//post method to create new todo
app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then( success => {
        res.send(success);
    }, err => {
        // send http status 400 ( bad)
        res.status(400).send(err);
    })

})

module.exports = {app}; 