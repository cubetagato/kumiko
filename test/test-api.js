'use strict';

const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaihttp);

describe('Treasures', function()  {
  it("Should list all owner's treasures on a treasurebox at /<id>/tbox/ GET", function (done)  {
    chai.request(app)
      .get('/api/0.0.1/cubetagato/tbox')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  })
  it('Should do something else');
});
