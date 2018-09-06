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
    var lang_list = ["Python","C#", "JavaScript"];
    var dojo_list = ["Seattle", "San Jose", "DC"];
    response.render('index', {lang : lang_list, dojo : dojo_list});
})
app.post('/process', function(request, response) {
    console.log(request.body);
    request.session.name = request.body.name;
    request.session.dojo = request.body.dojo;
    request.session.lang = request.body.lang;
    request.session.comment = request.body.comment;
    request.session.save();
    response.redirect('/result');
})

app.get('/result', function(request,response) {
    var context = {
        name : request.session.name, 
        dojo : request.session.dojo,
        lang : request.session.lang,
        comment : request.session.comment,
    }
    response.render('result', context);
})

app.listen(8000, function() {
    console.log("listening on port 8000");
  })