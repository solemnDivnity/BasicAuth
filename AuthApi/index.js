var http = require("http");
var mongojs = require("mongojs");
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var db = mongojs('Authorization', ['users']);

app.get('/', function (req, res) {
    var html = "hello world";
    db.users.find(function(err, records) {
        if(err) {
            console.log("There was an error executing the database query." + err);
            response.end();
            return;
        }
        console.log(records.length);
        html = '<h2>userCount</h2>',
            i = records.length;
        while(i--) {
            html += '<p><b>id:</b> ' 
                + records[i].userId 
                + ' <br /><b>userName:</b> ' 
                + records[i].userName 
                + '<br /><b>password: </b>' 
                + records[i].password;
        }
        res.send(html);
    });
});

app.post('/',function(request,response){
    console.log(request.body)
    response.end("yes");
});


app.listen(8888);

