var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://imdb-api.com/en/API/SearchMovie/k_z9yeskhc/the protege 2021',
  'headers': {
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});