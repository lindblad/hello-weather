process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('all', function() {
	before(function(done) {
		done();
	});

	it('should get 200 on /api/data GET', function(done) {
		done();
	});
});
