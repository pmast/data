var influx = require('influx');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('temps.db');

var client = influx({
  host : 'localhost',
  port : 8086, // optional, default 8086
  protocol : 'http', // optional, default 'http'
  username : 'root',
  password : 'root',
  database : 'sensors'
});

db.serialize(function() {
  var points = [];
  var i = 0;
  db.each("SELECT * from temperatures where type = 'outdoor';", function(err, row) {
    if (err) {
      console.log(err);
    } else {
      points.push({
        value : row.value,
        time : new Date(row.ts)
      });
      if (points.length >= 10000){
        client.writePoints("patrick.outdoor", points, {}, function(err){
          if (err) console.log(err);
        });
        points = [];
        console.log(i++);
      }
    }
  }, function(err, count){
    client.writePoints("patrick.outdoor", points, {}, function(err){
      if (err) console.log(err);
    });
  });
});



