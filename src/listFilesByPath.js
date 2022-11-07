// node fs模块
const fs = require('fs')

function listFilesByPath(event, filePath) {
  return new Promise((resovle, reject) => {
    fs.readdir(filePath, function (err, files) {
      if (err) reject(err)
      resovle(files)
    })
  })
}
module.exports = listFilesByPath
