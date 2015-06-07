var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var citySchema = {
  name:String,
  description:String
};

var City = mongoose.model('City', citySchema, 'cities');



app.get('/cities', function(request, response){
  // response.json(Object.keys(cities));
  City.find(function(err, doc){
    var cityNames = [];
    doc.forEach(function(city){
      cityNames.push(city.name);
    });
    response.json(cityNames);
  });

});

app.post('/cities', urlencode, function(request, response){
  var newCity = request.body;
  var city = {
    name: newCity.name,
    description: newCity.description
  };

  if (! city.name || ! city.description) {
    response.sendStatus(400);
    return false;
  }
  mongoose.connection.collection('cities').insert(city);
  response.status(201).json(newCity.name);

});

app.delete('/cities/:name', function(request, response){
  City.remove({name: request.params.name}, function(err){
    if (err) {
      throw err;
    }
  });
  response.sendStatus(204);
});

app.get('/cities/:name', function(request, response){
  City.findOne({ name: request.params.name }, 'name description', function(err, doc){
    if (err) {
      throw err;
    }
    response.render('show.ejs',
      { city: { name: request.params.name, description: doc.description }});
  });
});

module.exports = app;
