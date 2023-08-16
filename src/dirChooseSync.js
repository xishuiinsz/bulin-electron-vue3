const { dialog } = require("electron");
async function dirChooseSync(event, option) {
  const defaultConfig = {
    title: "请选择文件夹",
    defaultPath: ".",
    //这里选择saveFile
    properties: ["openDirectory"],
  };
  !!option &&
    Object.keys(option).length &&
    Object.assign(defaultConfig, option);
  const paths = await dialog.showOpenDialogSync(defaultConfig);
  if (!paths) {
    return "";
  }
  const [filePath] = paths;
  return filePath;
}

module.exports = dirChooseSync;
