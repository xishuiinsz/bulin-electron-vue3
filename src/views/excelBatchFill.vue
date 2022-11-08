<template>
  <div class="container">
    <h3>Excel批量修改小工具!</h3>
    <a-row>
      <a-col :span="2"></a-col>
      <a-col :span="20">
        <a-form name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off">
          <a-form-item label="主目录" name="dirPath">
            <a-input @click="inputDirChoose" placeholder="点击选择目录" readonly v-model:value="formState.dirPath" />
          </a-form-item>
          <a-form-item label="文件清单">
            <a-textarea v-model:value="formState.fileList" />
          </a-form-item>
          <a-form-item label="工作表" name="worksheet-namespace">
            <a-row>
              <a-col :span="4">
                <a-form layout="vertical">
                  <a-form-item label="工作表名">
                    <a-input name="sheetName" placeholder="请输入表名" v-model:value="formState.sheetName" />
                  </a-form-item>
                </a-form>

              </a-col>
              <a-col :span="1"></a-col>
              <a-col :span="19">
                <a-row :gutter="[16, 16]">
                  <a-col :span="12">
                    <a-form-item :labelCol="{ span: 5, offset: 2 }" label="列名">
                      <a-input name="columnName" placeholder="请输入列名" v-model:value="formState.columnName" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item :labelCol="{ span: 5, offset: 2 }" label="填充内容">
                      <a-input name="fillText" placeholder="请输入列名" v-model:value="formState.fillText" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="[16, 16]">
                  <a-col :span="12">
                    <a-form-item :labelCol="{ span: 5, offset: 2 }" label="起始行号">
                      <a-input name="startLineNo" placeholder="请输入列名" v-model:value="formState.startLineNo" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item :labelCol="{ span: 5, offset: 2 }" label="结束行号">
                      <a-input name="endLineNo" placeholder="请输入列名" v-model:value="formState.endLineNo" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="2"></a-col>
    </a-row>
    <a-row>
      <a-col :span="4">
      </a-col>
      <a-col :span="20">
        <a-button @click="fillTextHandler" type="primary">开始填充</a-button>
      </a-col>
    </a-row>

  </div>
</template>
<script setup>
import { reactive, getCurrentInstance } from 'vue';
const formState = reactive({
  dirPath: '',
  fileList: '',
  sheetName: 'Sheet1',
  columnName: 'A',
  fillText: '测试填充文本',
  startLineNo: 2,
  endLineNo: 100
})
// 当前组件实例
const vm = getCurrentInstance()

// 目录选择点击事件
const inputDirChoose = async (e) => {
  const response = await window.electron.showDirDlg()
  if (response.canceled === false) {
    const [dirPath] = response.filePaths;
    formState.dirPath = dirPath
    let fileList = await window.electron.listFiles(dirPath)
    fileList = fileList.join('\n')
    formState.fileList = fileList
  }
}

// 开始填充 按钮点击事件
const fillTextHandler = async () => {
  const excelOption = {
    dirPath: formState.dirPath,
    fileList: formState.fileList,
    sheetName: formState.sheetName,
    columnName: formState.columnName,
    fillText: formState.fillText,
    startLineNo: formState.startLineNo,
    endLineNo: formState.endLineNo
  }
  // 基本校验
  if (!excelOption.dirPath) {
    const result = confirm('请选择Excel所在的目录！')
    if (result === true) {
      inputDirChoose()
    }
    return
  }
  if (!excelOption.fileList) {
    const result = confirm('当前目录中没有Excel文件，请重新选择！')
    if (result === true) {
      inputDirChoose.click()
    }
    return
  }
  if (!excelOption.sheetName) {
    const result = confirm('必须指定工作表名，缺省为Sheet1')
    if (result === true) {
      formState.sheetName = 'Sheet1'
    } else {
      const input = vm.proxy.$el.querySelector('input[name=sheetName]')
      input.focus()
    }
    return
  }
  if (!excelOption.columnName) {
    const result = confirm('必须指定工列标识，缺省为A')
    if (result === true) {
      formState.columnName = 'A'
    } else {
      const input = vm.proxy.$el.querySelector('input[name=columnName]')
      input.focus()
    }
    return
  }
  if (!excelOption.fillText) {
    const result = confirm('必须指定待填充的文本，缺省为[测试填充文本]')
    if (result === true) {
      formState.fillText = '测试填充文本'
    } else {
      const input = vm.proxy.$el.querySelector('input[name=fillText]')
      input.focus()
    }
    return
  }
  if (!excelOption.startLineNo) {
    const result = confirm('必须指定起始行号，缺省为[2]')
    if (result === true) {
      formState.startLineNo = 2
    } else {
      const input = vm.proxy.$el.querySelector('input[name=startLineNo]')
      input.focus()
    }
    return
  }
  if (!excelOption.endLineNo) {
    const result = confirm('必须指定结束行号，缺省为[100]')
    if (result === true) {
      formState.endLineNo = 100
    } else {
      const input = vm.proxy.$el.querySelector('input[name=endLineNo]')
      input.focus()
    }
    return
  }
  let result = await window.electron.fillTextHandle(excelOption)
  console.log(result)
}

</script>
<script>
export default {
  name: 'AboutComp'
}
</script>