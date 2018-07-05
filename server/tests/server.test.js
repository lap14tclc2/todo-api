const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb')
const { app } = require('../server');
const { Todo } = require('../models/Todo');

const todos = [{
    _id: new ObjectID,
    text: 'First test todo'
}, {
    _id: new ObjectID,
    text: 'Second test todo'
}]



// make sure databse in mongo is empty using beforeEach
// beforeEach() run before each test
beforeEach(done => {
    // add some seed data for GET test case
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
})

/*     HOW TO MAKE A TEST: 
           + request to an app express
           + send properly URL
           + make assertion :
                - expect HTTP status
                - custom expect response body equa something we sent before
           + wrap things up by 'end' ( maybe we make a custom end for some reason)
       */

// testing GET method
describe('GET /todos', () => {
    it('should get all todos', done => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
})

// testing POST Method
describe('POST /todos', () => {
    it('should create a new todo', done => {
        const text = 'Test todo text';

        // using request from supertest
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                //fetch all todo to test
                Todo.find({ text }).then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(e => done(e));
            })
    });

    //create a brand-new test case
    it('should not create todo with invalid body data', done => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                };
                Todo.find().then(todos => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(err => done(err));
            })
    })
});

//testing GET Todo by id
describe('GET /todos/:id', () => {
    it('should return todo doc', done => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect( res => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', done => {
        const hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done)
    });
    it('should return 404 for non valid ids', done => {
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done)
    })
});

// testing DELETE method
describe('DELETE /todos/:id', () => {
    const hexId = todos[1]._id.toHexString();

    it('should remove a todo', done => {
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect( res => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end( (err, res) =>{
            if(err){
                return done(err);
            }
            Todo.findById(hexId).then( todo => {
                // export todo = null by using toNotExist() in library
                expect(todo).toBeFalsy(); 
                done();
            }).catch(err => done(err));
        })
    });

     it('should return 404 if todo not found', done => {
        const hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done)
     });

     it('should return 404 if id invalid',done => {
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done)
     })


})