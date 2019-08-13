'use strict';

process.env.NODE_ENV = 'test';

const app = require('../app.js');

// Require dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('GET jukeboxes', () => {
    describe('Sanity-check request parameters', () => {
        it('it should reject an invalid offset', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/1?offset=p')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.status.should.eql('error');
                  res.body.message.should.eql('offset not numeric');
                  done();
              });
        });
        it('it should reject an invalid limit', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/1?limit=p')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.status.should.eql('error');
                  res.body.message.should.eql('limit not numeric');
                  done();
              });
        });
        it('it should reject a limit < 1', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/1?limit=0')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.status.should.eql('error');
                  res.body.message.should.eql('limit must be 1 or greater');
                  done();
              });
        });
    });
    describe('Verify GET with invalid setting', () => {
        it("it should return a 404", (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/invalid_ID')
              .end((err, res) => {
                  res.should.have.status(404);
                  res.body.status.should.eql('error');
                  res.body.message.should.eql('setting not found');
                  done();
              });
        });
    });
    describe('Verify GET (all items)', () => {
        it("it should return 30 jukeboxes (because that's how many there are)", (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/86506865-f971-496e-9b90-75994f251459?limit=40')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(30);
                  done();
              });
        });
    });
    describe('Verify GET with default values', () => {
        it('it should return 20 jukeboxes', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/86506865-f971-496e-9b90-75994f251459')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(20);
                  done();
              });
        });
    });
    describe('Verify GET with "model" functions correctly', () => {
        it('it should return 10 "fusion" jukeboxes', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/86506865-f971-496e-9b90-75994f251459?model=fusion')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(10);
                  done();
              });
        });
        it('it should return 7 "fusion" jukeboxes', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/86506865-f971-496e-9b90-75994f251459?model=fusion&offset=3')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(7);
                  done();
              });
        });
        it('it should return 3 "fusion" jukeboxes', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/86506865-f971-496e-9b90-75994f251459?model=fusion&limit=3')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(3);
                  done();
              });
        });
        it('it should return 2 "fusion" jukeboxes', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/86506865-f971-496e-9b90-75994f251459?model=fusion&offset=8&limit=3')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(2);
                  done();
              });
        });
    });
    describe('Verify GET component matching', () => {
        it('it should return 1 jukebox', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/b43f247a-8478-4f24-8e28-792fcfe539f5')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
                  done();
              });
        });
        it('it should return 1 jukebox (model specified)', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/b43f247a-8478-4f24-8e28-792fcfe539f5?model=fusion')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
                  done();
              });
        });
        it('it should not return any jukeboxes (model and offset of 1 specified)', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/b43f247a-8478-4f24-8e28-792fcfe539f5?model=fusion&offset=1')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                  done();
              });
        });
        it('it should not return any jukeboxes (model and offset of 2 specified)', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/b43f247a-8478-4f24-8e28-792fcfe539f5?model=fusion&offset=2')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                  done();
              });
        });
        it('it should not return any jukeboxes (model specified)', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/b43f247a-8478-4f24-8e28-792fcfe539f5?model=angelina')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                  done();
              });
        });
    });
    describe('Verify GET component matching (duplicated components)', () => {
        it('it should not return any jukeboxes (none of them have 2 x pcb)', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/8976a660-f990-46e3-a698-ff8fbb887d46')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                  done();
              });
        });
        it('it should return 0 jukeboxes (only 2 have 2 x money_receiver - but do not match the other requirements)', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/daab00f8-b10e-48f2-bca6-494c5a2869aa')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                  done();
              });
        });
        it('it should not return any jukeboxes (none of them have 2 x money_pcb)', (done) => {
          chai.request(app)
              .get('/v1/jukeboxes/a794498e-ce14-499e-8bf6-7d09bda6d3c5')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                  done();
              });
        });
    });
});
