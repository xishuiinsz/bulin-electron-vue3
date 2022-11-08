const { Notification } = require("electron");
const NOTIFICATION_TITLE = "来自 Excel批量修改小工具";
const NOTIFICATION_BODY = "批量单元格填充已完成！";
function listFilesByPath(event, option) {
  const {
    dirPath,
    fileList,
    sheetName,
    columnName,
    fillText,
    startLineNo,
    endLineNo,
  } = option;
  const ExcelJS = require("exceljs");
  const path = require("path");
  const fileCollect = fileList.split("\n");
  fileCollect.forEach(async (fileName) => {
    const excelFile = path.join(dirPath, fileName);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFile);
    const worksheet = workbook.getWorksheet(sheetName);
    let index = startLineNo;
    do {
      const cell = worksheet.getCell(`${columnName}${index}`);
      cell.value = fillText;
      index++;
    } while (index <= endLineNo);
    workbook.xlsx.writeFile(excelFile).then(function () {
      new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY,
      }).show();
    });
  });
}
module.exports = listFilesByPath;
