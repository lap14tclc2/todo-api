const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/Todo');

// make sure databse in mongo is empty using beforeEach

beforeEach( done => {
    Todo.remove({}).then( () => done());
})

// testing
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
            Todo.find().then(todos => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch( e => done(e));
        })
    });

    //create a brand-new test case
    it('should not create todo with invalid body data', done => {
        const text = "do something";

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end( (err, res) => {
            if(err){
                return done(err);
            };
            Todo.find({}).then( todos => {
                expect(todos.length).toBe(0);
                done();
            }).catch(err => done(err));
        })
    })
});