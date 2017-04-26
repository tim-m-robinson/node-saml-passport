
module.exports = function (app, config, passport) {

  app.get('/', function (req, res) {
    console.log("GET / "+JSON.stringify(req.user, null, 2));
    if (req.isAuthenticated()) {
      console.log("Authenticated.");
      res.end(JSON.stringify(
        {
          user: req.user
        },null,2));
    } else {
      res.end("Not Authorised!");
    }
  });

  app.get('/login',
    passport.authenticate(config.passport.strategy,
      {
        successRedirect: '/',
        failureRedirect: '/login'
      })
  );

  app.post(config.passport.saml.path,
    passport.authenticate(config.passport.strategy, { failureRedirect: '/', failureFlash: true }),
    function (req, res) {
      console.log("POST " + config.passport.saml.path + " auth: "+req.isAuthenticated());
      res.redirect('/');
    }
  );

  app.get('/signup', function (req, res) {
    res.end = JSON.stringify({ todo: 'signup' },null,2);
  });

  app.get('/profile', function (req, res) {
    if (req.isAuthenticated()) {
      res.end = JSON.stringify(
        {
          user: req.user
        },
        null,2);
    } else {
      res.redirect('/login');
    }
  });

  app.get('/logout', function (req, res) {
    req.logout();
    // TODO: invalidate session on IP
    res.redirect('/');
  });
 
  // utility function for SAML config
  app.get('/getSamlConfig', function (req, res) {
    samlConfig = require('../config/passport').serviceProviderMetaData(config);
    res.type('application/xml');
    res.send(200, samlConfig);
  });

};