module.exports = {
  development: {
    app: {
      name: 'Passport SAML strategy example',
      port: process.env.PORT || 8000
    },
    passport: {
      strategy: 'saml',
      saml: {
        path: process.env.SAML_PATH || '/login/callback',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://login.windows.net/32ce7507-c7e6-4e20-93a2-a5945730ca10/saml2',//|| 'http://localhost:8080/openam/SSORedirect/metaAlias/adept/idp',
        issuer: 'https://timrobinsonatos.onmicrosoft.com/28c3d032-5ff2-460c-985c-1a47601b77cb',
        cert: process.env.SAML_CERT || null
      }
    }
  }
};
