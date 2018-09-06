var express = require("express");
var session = require('express-session');
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(request, response) {
    response.render('index');
})
app.post('/process', function(request, response) {
    console.log(request.body);
    response.redirect('/result');
})

app.get('/result', function(request,response) {
    response.render('result');
})

app.listen(8000, function() {
    console.log("listening on port 8000");
  })