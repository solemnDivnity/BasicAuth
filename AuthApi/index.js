var http = require("http");
var mongojs = require("mongojs");
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var db = mongojs('Authorization', ['users']);

app.get('/', function (req, res) {
    var html = "hello world";
    db.users.find(function (err, records) {
        if (err) {
            console.log("There was an error executing the database query." + err);
            response.end();
            return;
        }
        console.log(records.length);
        html = '<h2>userCount</h2>',
            i = records.length;
        while (i--) {
            html += '<p><b>id:</b> '
                + records[i].userId
                + ' <br /><b>userName:</b> '
                + records[i].userName
                + '<br /><b>password: </b>'
                + records[i].password
                + '<br /><b>email: </b>'
                + records[i].email;

        }
        res.send(html);
    });
});

app.post('/', function (request, response) {
    console.log(request.body)
    response.end("yes");
});

app.post('/auth/tokenRequest', function (request, response) {
    var userName = request.body.userName;
    var userPassword = request.body.password;



});

app.post('/auth/registerUser', function (request, response) {
    console.log(request.body);
    var password = request.body.password;



    bcrypt.hash(password, saltRounds, function (err, hash) {
        console.log(hash);
        var user = {
            userName: request.body.username,
            password: hash,
            email: request.body.email
        };
        db.users.insert({ userName: user.userName, password: user.password, email: user.email });

    });


    response.end("yes");
});


app.listen(8888);

