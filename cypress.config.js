const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qa-test.avenuecode.io/tasks",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
