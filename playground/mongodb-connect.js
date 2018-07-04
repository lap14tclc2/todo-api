//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect mongodb server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, ( err, result) => {
    //     if(err){
    //         return console.log('Unable insert to do',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });
    // db.collection('Todos').insertOne({
    //     text: 'Learn Node',
    //     completed: true
    // }, ( err, result) => {
    //     if(err){
    //         return console.log('Unable insert to do',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    //insert new doc into User(name,age,location)
    // db.collection('Users').insertOne(
    //     {
    //         name: 'Andrew',
    //         age: 20,
    //         location: 'California'
    //     }, ( err, result) => {
    //         if(err){
    //             return console.log('Unable insert new user ',err);
    //         }
    //        // console.log(JSON.stringify(result.ops,undefined,2));
    //        //get time stamp from ops property
    //        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    //     })

    db.collection('Todos').insertOne(
        {
            text: 'Go to school',
            completed: false
        }, 
        (err, result) => {
            if(err){
                return console.log('Unable to insert new Todo');
            }
            console.log(JSON.stringify(result.ops,undefined,2));
        }
    )
    
    client.close();
});
