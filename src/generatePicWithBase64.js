const { Notification, dialog } = require("electron");
const NOTIFICATION_TITLE = "导出图片为JSON格式";
const NOTIFICATION_BODY = "导出JSON已完成！";
const fs = require("fs"); //引用文件系统模块
const path = require("path");
// 根据宽高文本生成文件名
const getFileName = (width, height) => {
  let str = String(width);
  str += "X";
  str += String(height);
  str += "_";
  str += Date.now();
  return str;
};
async function generatePicWithBase64(
  event,
  { imgData, width, height, text, path }
) {
  const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  const dataBuffer = Buffer.from(base64Data, "base64");
  const name = getFileName(width, height, text);
  const result = fs.writeFileSync(`${path}/${name}.png`, dataBuffer);
  return `文件已成功写入${path}`;
}
module.exports = generatePicWithBase64;
