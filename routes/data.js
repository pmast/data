var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('get');
});


router.post('/:user/', function(req, res, next) {
  var point = {};

  var type = req.body.type;
  delete req.body.type;

  if (req.body.time){
    point.time = req.body.time;
    delete req.body.time;
  } else {
    point.time = new Date();
  }

  point.value = req.body.value;
  delete req.body.value;

  //adding additional fields to point
  Object.keys(req.body).forEach(function(key) {
    point[key] = req.body[key];
  });

  var series = req.params.user + '.' + type;

  req.db.writePoint(series, point, function(err){
    if (err) throw err;
  });
  res.send();
});

/* GET users listing. */

module.exports = router;
	