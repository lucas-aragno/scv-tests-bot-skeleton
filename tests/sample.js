
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe('A sample test', function() {
  
  it('adding two numbers', function(done) {
      expect(2 + 2).to.be.equal(4);
      done();
  });

});