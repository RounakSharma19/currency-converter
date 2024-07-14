const config = require("./tailwind.config");
module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: { config },
    autoprefixer: {},
  },
};
