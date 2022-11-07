module.exports = {
  pluginOptions: {
    electronBuilder: {
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
