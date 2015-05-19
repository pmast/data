var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('get');
});


router.post('/:user/', function(req, res, next) {
  var point = {};
  if (req.body.time){
    point.time = req.body.time;
  } else {
    point.time = new Date();
  }
  point.value = req.body.value;
  var series = req.params.user + '.' + req.body.type;

  req.db.writePoint(series, point, function(err){
    if (err) throw err;
  });
  res.send();
});

/* GET users listing. */

module.exports = router;
	