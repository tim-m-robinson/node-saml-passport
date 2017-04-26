const SamlStrategy = require('passport-saml').Strategy;

var createSamlConfig = function(config) {
    return new SamlStrategy(
    {
      path: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      issuer: config.passport.saml.issuer,
      cert: config.passport.saml.cert
    },
    function (profile, done) {
      console.log("SAML profile: "+JSON.stringify(profile,null,2));
      return done(null,
        {
          id: profile.nameID,//profile.uid,
          email: profile.email,
          displayName: profile.cn,
          firstName: profile.givenName,
          lastName: profile.sn
        });
    });
}

module.exports.serviceProviderMetaData = function(config) {
  return createSamlConfig(config).generateServiceProviderMetadata();
}

module.exports.setup = function (passport, config) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(createSamlConfig(config));

};