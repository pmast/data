var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.db.query("list series", function(err, result){
    res.render('series', { series: result[0].points });
  });
});

module.exports = router;
