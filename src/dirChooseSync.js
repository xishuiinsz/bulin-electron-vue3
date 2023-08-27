const { dialog } = require("electron");
async function dirChooseSync(event, option) {
  const defaultConfig = {
    title: "请选择文件夹",
    defaultPath: ".",
    //这里选择saveFile
    properties: ["openDirectory"],
  };
  const _option = {};
  !!option &&
    Object.keys(option).length &&
    Object.assign(_option, defaultConfig, option);
  const paths = await dialog.showOpenDialogSync(_option);
  if (!paths) {
    return "";
  }
  const [filePath] = paths;
  return filePath;
}

module.exports = dirChooseSync;
