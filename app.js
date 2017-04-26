var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var port = process.env.PORT || 9000;

var env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

require('./config/passport').setup(passport, config);

app.set('port', config.app.port);
app.use(session(
  {
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'aquila non captat muscas'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

var authenticate = passport.authenticate('saml', {
  session: false,
  failureRedirect: '/login'
});

require('./config/routes')(app, config, passport);

app.use(authenticate, express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});