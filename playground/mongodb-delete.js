const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        console.log('Unable connect MongoDB');
    }
    console.log('Connected to Mongodb');

    const db = client.db('TodoApp');
    // db.collection('Todos').deleteOne({text:'Go to school'}).then(result => {
    //     console.log(result);
    // })

    // db.collection('Todos').deleteMany({text:'Go to school'}).then(result => {
    //         console.log(result);
    //     })

    // db.collection('Todos').findOneAndDelete({completed: false}).then( result => {
    //     console.log(result)
    // })

    db.collection('Users').deleteMany({name: 'Andrew'});
    db.collection('Users')
    .findOneAndDelete({_id: new ObjectID("5b3c45a66444e40208dd0368")})
    .then(
        result => console.log(JSON.stringify(result,undefined,2))
    )
    client.close();
})