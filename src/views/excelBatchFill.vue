<template>
  <div class="container">
    <h3>Excel批量修改小工具!</h3>
    <form class="row g-3" name="excelFillForm">
      <div class="col-12 mb-3" required>
        <label for="formFile" class="form-label">选择目录</label>
        <input placeholder="点击打开弹框" class="form-control" readonly name="dirPath" type="text" id="chooseDir" />
      </div>
      <div class="mb-3">
        <label for="file-list" class="form-label">文件清单</label>
        <textarea class="form-control" id="file-list" name="fileList" rows="3"></textarea>
      </div>

      <div class="row mb-3">
        <div class="col-3" required>
          <label for="worksheetName" class="form-label">待处理工作表名</label>
          <input class="form-control" type="text" id="worksheetName" name="worksheetName" value="Sheet1" />
        </div>
        <div class="col-9 row">
          <div class="col-3">
            <label for="columnName1" class="form-label">列名</label>
            <input type="text" class="form-control" id="columnName1" name="columnName" value="A" />
          </div>
          <div class="col-9 mb-2">
            <label for="fillText1" class="form-label">填充内容</label>
            <input type="text" class="form-control" id="fillText1" name="fillText" value="测试内容" />
          </div>
          <div class="col-6">
            <label for="startLineNo" class="form-label">起始行号</label>
            <input type="number" class="form-control" id="startLineNo" name="startLineNo" value="2" />
          </div>
          <div class="col-6">
            <label for="endLineNo" class="form-label">结束行号</label>
            <input type="number" class="form-control" id="endLineNo" name="endLineNo" value="100" />
          </div>
        </div>
      </div>
    </form>
    <div class="col-12">
      <button class="btn btn-primary fill-text">开始填充</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const chooseDir = document.querySelector('#chooseDir')
  chooseDir.addEventListener('click', async function (e) {
    const response = await window.electron.showDirDlg()
    if (response.canceled === false) {
      this.value = response.filePaths
      let fileList = await window.electron.listFiles(this.value)
      fileList = fileList.join('\n')
      const domFileList = document.querySelector('#file-list')
      domFileList.value = fileList
    }
  })

  // 开始填充 按钮点击事件
  const btnFillText = document.querySelector('.btn.fill-text')
  btnFillText.addEventListener('click', async (e) => {
    const form = document.forms['excelFillForm']
    if (!form.dirPath.value) {
      const result = confirm('请选择Excel所在的目录！')
      if (result === true) {
        chooseDir.click()
      }
      return
    }
    if (!form.fileList.value) {
      const result = confirm('当前目录中没有Excel文件，请重新选择！')
      if (result === true) {
        chooseDir.click()
      }
      return
    }
    if (!form.worksheetName.value) {
      const result = confirm('必须指定工作表名，缺省为sheet1')
      if (result === true) {
        form.worksheetName.value = 'Sheet1'
      } else {
        form.worksheetName.focus()
      }
      return
    }
    if (!form.columnName.value) {
      const result = confirm('必须指定工列标识，缺省为A')
      if (result === true) {
        form.columnName.value = 'A'
      } else {
        form.columnName.focus()
      }
      return
    }
    if (!form.fillText.value) {
      const result = confirm('必须指定待填充的文本，缺省为[测试文本]')
      if (result === true) {
        form.fillText.value = '测试文本'
      } else {
        form.fillText.focus()
      }
      return
    }
    if (!form.startLineNo.value) {
      const result = confirm('必须指定起始行号，缺省为[2]')
      if (result === true) {
        form.startLineNo.value = 2
      } else {
        form.startLineNo.focus()
      }
      return
    }
    if (!form.endLineNo.value) {
      const result = confirm('必须指定结束行号，缺省为[100]')
      if (result === true) {
        form.endineNo.value = 100
      } else {
        form.endineNo.focus()
      }
      return
    }
    const dirPath = form.dirPath.value
    const fileList = form.fileList.value
    const worksheetName = form.worksheetName.value
    const columnName = form.columnName.value
    const fillText = form.fillText.value
    const startLineNo = parseInt(form.startLineNo.value, 10)
    const endLineNo = parseInt(form.endLineNo.value, 10)
    const excelOption = {
      dirPath,
      fileList,
      worksheetName,
      columnName,
      fillText,
      startLineNo,
      endLineNo
    }
    let result = await window.electron.fillTextHandle(excelOption)
    console.log(result)
  })
})
</script>
<script>
export default {
  name: 'AboutComp'
}
</script>