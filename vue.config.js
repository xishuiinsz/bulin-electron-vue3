const path = require("path");
module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: path.join(__dirname, "./src/preload.js"),
      chainWebpackMainProcess: (config) => {
        config.output.filename((file) => {
          if (file.chunk.name === "index") {
            return "background.js";
          } else {
            return "[name].js";
          }
        });
      },
    },
  },
};
