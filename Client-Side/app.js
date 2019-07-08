//dependencies
var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bus_db'
});

app.set ('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.render(__dirname + '/index');
});

app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/viewTrips', function(req, res) {
    let trips = [];
    
    con.query("SELECT * FROM bus_sched", (err, result, fields) => {
        if (err) throw err;
        trips = JSON.stringify(result);
        let arr = JSON.parse(trips);
        res.render('viewTrips', {trips:arr});
    });
    
    
});

app.listen(8080);
console.log('8080 is da port');