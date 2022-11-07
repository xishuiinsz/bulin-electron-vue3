const { dialog } = require("electron");
async function dialogShow() {
  let choosedResult;
  try {
    const result = await dialog.showOpenDialog({
      title: "请选择待处理Excel所在的文件夹",
      buttonLabel: "确认",
      properties: ["openFile", "openDirectory"],
    });
    choosedResult = result;
  } catch (error) {
    console.log(error);
  }
  return choosedResult;
}

module.exports = dialogShow;
