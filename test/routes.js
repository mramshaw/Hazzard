'use strict';

process.env.NODE_ENV = 'test';

const app = require('../app.js');

// Require dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

//Our parent block
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
    });
});
