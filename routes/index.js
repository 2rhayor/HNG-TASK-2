var express = require('express');
const request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

  // given a particular service URL, we want to be able to tell if the service is healthy or otherwise
  // healthy means it returns a valid response i.e. status code 200
  // unhealthy means it returns an invalid response i.e. status code not equals 200

  var serviceName = "GitHub";
  var serviceURL = "http://github.com/";

  var status;

  request(
        {
          method: 'GET',
          uri: serviceURL
        }, async function (err, response, body) {
          


    }).on('response', (response) => {
      if (response.statusCode == 200) {
        console.log(response.statusCode);
        status = "healthy";
      }
      else {
        status = "unhealthy";
      }

      var jsonOutput = JSON.stringify({
        "service": serviceName,
        "URL": serviceURL,
        "status": status,
        "last_check": getCurrentDateTime()
      });
      res.render('index', { title: 'Hey', message: jsonOutput });
    })
})


function getCurrentDateTime() {

  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;

  return dateTime.toString();

}

module.exports = router;
