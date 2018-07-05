const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/Todo');

const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test todo'
}]

// make sure databse in mongo is empty using beforeEach
// beforeEach() run before each test
beforeEach( done => {
    // add some seed data for GET test case
    Todo.remove({}).then( () => {
        return Todo.insertMany(todos);
    }).then( () => done());
})

// testing GET method
describe('GET /todos', () => {
    it('should get all todos', done => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect( res => {
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
        .send({text})
        .expect(200)
        .expect( res => {
            expect(res.body.text).toBe(text);
        })
        .end( (err, res) => {
            if(err){
                return done(err);
            }
            //fetch all todo to test
            Todo.find({text}).then(todos => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch( e => done(e));
        })
    });

    //create a brand-new test case
    it('should not create todo with invalid body data', done => {

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end( (err, res) => {
            if(err){
                return done(err);
            };
            Todo.find().then( todos => {
                expect(todos.length).toBe(2);
                done();
            }).catch(err => done(err));
        })
    })
});