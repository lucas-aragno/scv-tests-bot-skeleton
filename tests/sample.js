
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe('A sample test', function() {
  
  it('adding two numbers', function(done) {
      expect(2 + 2).to.be.equal(4);
      done();
  });

  it('comparing two objects', function(done) {
      var msgAsString = '{ "moneda" : "euro", "cantidad" : 23 }';

      expect(JSON.parse(msgAsString)).to.deep.equal({cantidad: 23, moneda : "euro"});
      done();
  });

});