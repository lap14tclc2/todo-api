const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable connect to MongoDB');
    }
    console.log('Connected to MongoDB');

    const db = client.db('TodoApp');
    // db.collection('Todos').find({_id: new ObjectID("5b3c48718d8166e9ba6f0fc0")}).toArray().then( docs => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // }, err => {
    //     console.log('Cannot fetch Todos: ', err);
    // })
    
    // count
    db.collection('Users').find({}).count().then( count => {
        console.log(`Count users: ${count}`);
    }, err => {
        console.log('Unable to count');
    })
    client.close();
})