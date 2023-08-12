const { Notification, dialog } = require("electron");
const NOTIFICATION_TITLE = "导出图片为JSON格式";
const NOTIFICATION_BODY = "导出JSON已完成！";
const fs = require("fs"); //引用文件系统模块
const path = require("path");
const image = require("imageinfo"); //引用imageinfo模块
const { imgExt } = require("@/utils/const.js");

function getJsonStr(fileList, dir) {
  const list = [];
  fileList.length &&
    fileList.forEach((file) => {
      if (imgExt.some((ext) => file.endsWith(ext))) {
        const _file = path.join(dir, file);
        const ms = image(fs.readFileSync(_file));
        const fileInfo = { ...ms, name: file };
        list.push(fileInfo);
      }
    });
  const total = list.length;
  const option = {
    list,
    total,
  };
  const json = JSON.stringify(option);
  return json;
}

function exportPicturesInJson(event, option) {
  const dir = option.dirPath;
  const fileList = fs.readdirSync(dir);
  const jsonStr = getJsonStr(fileList, dir);

  //调用dialog的showSaveDialog
  dialog
    .showSaveDialog({
      title: "保存文件",
      defaultPath: ".",
      nameFieldLabel: "请输入要保存的文件名",
      //这里选择saveFile
      properties: ["saveFile"],
      filters: [
        //根据需要设置文件类型
        { name: ".json", extensions: ["json"] },
      ],
    })
    .then((result) => {
      //打开选择的保存文件路径
      const fd = fs.openSync(result.filePath, "w");
      //将数据写入文件
      fs.writeFile(fd, jsonStr, function (err) {
        if (err) {
          console.error(err);
        }
        new Notification({
          title: NOTIFICATION_TITLE,
          body: NOTIFICATION_BODY,
        }).show();
      });
      //关闭文件
      fs.closeSync(fd);
      event.sender.send("测试");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = exportPicturesInJson;
