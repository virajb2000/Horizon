var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://127.0.0.1:5000/entity?msg=computer',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"msg":"computer science is one of the most fascinating areas of study in the twenty first century"})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});