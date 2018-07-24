process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let board = require('../src/Boards');
let note= require('../src/Notes')
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Boards', () => {
    beforeEach((done) => {
        board.remove({}, (err) => { 
           done();         
        });     
    });
  describe('/GET Board', () => {
      it('it should GET all the boards', (done) => {
            chai.request(server)
            .get('/board')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST board', () => {
      it('it should not POST a board without mode', (done) => {
        let board = {
            boardTitle: "Test Board",
            notes:[]
            created_date: Date.now
        }
            chai.request(server)
            .post('/board')//loginRequired not sure
            .send(board)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('mode');
                res.body.errors.mode.should.have.property('kind').eql('required');
          
              done();
            });
      });
      it('it should POST a board ', (done) => {
        let board = {
            boardTitle: "Test Board1",
            mode:night
            notes:[]
            created_date: Date.now
        }
            chai.request(server)
            .post('/board')//loginRequired  needed
            .send(board)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
           
                res.body.book.should.have.property('boardTitle');
                res.body.book.should.have.property('mode');
                res.body.book.should.have.property('notes');
                res.body.book.should.have.property('created_date');
              done();
            });
      });
  });
  