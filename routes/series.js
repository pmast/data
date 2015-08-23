var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.db.query("select * from /.*/ limit 1", function(err, result){
    var series = result.map(function(item){
      console.log(item.name);
      return item.name;
    });
    console.log(result);
    res.render('series', { series: series });
  });
});

router.get('/:user', function(req, res, next) {
  req.db.query("select * from /" + req.params.user + "\..*/ limit 1", function(err, result){
    var series = result.map(function(item){
      console.log(item.name);
      return item.name;
    });
    console.log(result);
    res.render('series', { series: series });
  });
});

router.get('/:user/:id', function(req, res, next) {
  var query = 'select * from ' + req.params.user + '.' + req.params.id + ';';
  console.log(query);

  var ignore = ['sequence_number'];
  var date_columns = ['time'];

  req.db.query(query, function(err, result){
    var columns = result[0].columns;
    var data = []
    result[0].points.forEach(function(item, i){
      var tmp = {};
      for (var i = 0; i<columns.length; i++){
        if (ignore.indexOf(columns[i])<0){
          if (date_columns.indexOf(columns[i])>-1){
            tmp[columns[i]] = new Date(item[i]);
          } else {
            tmp[columns[i]] = item[i];
          }
        }
      }
      data.push(tmp);
    });
    console.log(JSON.stringify(data));
    res.json(data);
  });
});

module.exports = router;
