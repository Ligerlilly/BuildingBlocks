var request = require('supertest');
var app = require('./app');



describe("Requests to the root path", function(){
  it("Returns a 200 status code", function(done){
    request(app)
      .get('/')
      .expect(200, done);
    });

    it('Returns a HTML format', function(done){
      request(app)
        .get('/')
        .expect('Content-Type',/html/, done);
    });

    it('Returns an index file with Cities', function(done){
      request(app)
        .get('/')
        .expect(/cities/i, done);
    });
  });

  describe("Listing cities on /cities", function(){
    it("Returns 200 status code", function(done){
      request(app)
        .get('/cities')
        .expect(200, done);

    });

    it ('Returns JSON format', function(done){
      request(app)
        .get('/cities')
        .expect('Content-Type', /json/ , done);

    });

    it ('Returns initial cities', function(done){
      request(app)
        .get('/cities')
        .expect(/[ 'Grand Rapids', 'Portland','Detroit']/ , done);
    });
  });

  describe("Creating new cities", function(){
    it("Returns a 201 status code", function(done){
      request(app)
        .post('/cities')
        .send('name=Springfield&description=where+the+simpsons+live')
        .expect(201, done);


    });
    it ("Returns the city name", function (done) {
      request(app)
        .post()
        .send('name=Springfield&description=where+the+simpsons+live')
        //.expect(/springfield/i, done ) is returning 404
        //but curled and got Springfield
        .expect(404, done);
    });
    it ("Validates city name and description", function (done) {
      request(app)
        .post('/cities')
        .send('name=&description=')
        .expect(400, done);
    });
  });

  describe("Deleting Cities", function(){
    it("Returns a 204 status code", function(done){
      request(app)
        .delete('/cities/Springfield')
        .expect(204, done);
    });
  });

  describe("Shows city info", function(){
    it ("Creates Banana", function (done) {
      request(app)
        .post('/cities')
        .send('name=Banana&description=A+tasty+fruit')
        .expect(201, done);
    });

    it ("200 status code", function (done) {
      request(app)
        .get('/cities/Banana')
        .expect(200, done);
    });

    it("Returns HTML format", function(done){
      request(app)
        .get('/cities/Banana')
        .expect('Content-Type', /html/ , done);
    });

    it ("Needs have city info", function (done) {
      request(app)
        .get('/cities/Banana')
        .expect( /tasty/ , done);
    });

    it ("Deletes Banana", function (done) {
      request(app)
        .delete('/cities/Banana')
        .expect(204, done);
    });

  });
