const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env: {
    apiUrl: 'https://ua-acceptance.mgthost.com/request/',
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://acceptance.mgthost.com/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    testIsolation: false,
  },
});
