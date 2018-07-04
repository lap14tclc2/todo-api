const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');

var app = express();

app.listen(3000, () => {
    console.log('Start on port 3000');
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