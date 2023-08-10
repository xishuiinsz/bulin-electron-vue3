const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
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
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
};
