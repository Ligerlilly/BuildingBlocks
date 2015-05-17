var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });


var cities = {
  'Detroit': '',
  'Grand Rapids': '',
  'Portland': ''
};


app.get('/cities', function(request, response){
  response.json(Object.keys(cities));
});

app.post('/cities', urlencode, function(request, response){
  var newCity = request.body;
  cities[newCity.name] = newCity.description;
  response.status(201).json(newCity.name);

});

module.exports = app;
