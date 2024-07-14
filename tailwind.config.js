const config = require("tailwind-config/tailwind.config.js");

module.exports = {
  presets: [config],
  theme: {
    extend: {
      fontFamily: {
        inter: ["sans-serif"],
      },
      colors: {},
    },
  },
};
