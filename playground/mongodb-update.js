const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        console.log('Unable connect MongoDB');
    }
    console.log('Connected to Mongodb');

    const db = client.db('TodoApp');
    // db.collection('Todos').findOneAndUpdate(
    //     { _id: new ObjectID("5b3c6ec16867623bfceceec5")},
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     },
    //     {
    //         returnOriginal: false
    //     }
    // ).then(result => console.log(result))
    db.collection('Users').findOneAndUpdate(
        { _id: new ObjectID('5b3c469411827a0d14fe36fa') },
        {
            $set: {
                name: 'Potato'
            },
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false       
        }
    ).then(result => console.log(result))
    client.close();
});
