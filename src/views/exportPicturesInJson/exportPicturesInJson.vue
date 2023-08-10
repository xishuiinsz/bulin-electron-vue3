<template>
    <div class="export-pictures-in-json">
        <h3>导出目录下全部图片为JSON文件</h3>
        <a-row>
            <a-col :span="2"></a-col>
            <a-col :span="20">
                <a-form name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off">
                    <a-form-item label="主目录">
                        <a-input @click="inputDirChoose" placeholder="点击选择目录" readonly v-model:value="formState.dirPath" />
                    </a-form-item>
                    <a-form-item label="文件清单">
                        <a-textarea v-model:value="formState.fileList" />
                    </a-form-item>
                    <a-form-item label="导出文件">
                        <a-input placeholder="请输入文件名" v-model:value="formState.jsonFileName" />
                    </a-form-item>
                </a-form>
            </a-col>
            <a-col :span="2"></a-col>
        </a-row>
        <a-row>
            <a-col :span="4">
            </a-col>
            <a-col :span="20">
                <a-button @click="exportPicturesInJson" type="primary">导出</a-button>
            </a-col>
        </a-row>

    </div>
</template>
<script setup>
import { reactive, getCurrentInstance } from 'vue';
import { imgExt } from '@/utils/const.js'
const jsonNameDefault = 'myJson.json'
const formState = reactive({
    dirPath: '',
    fileList: '',
    jsonFileName: jsonNameDefault,
})
// 当前组件实例
const vm = getCurrentInstance()
let flagDirClick = false
// 目录选择点击事件
const inputDirChoose = async (e) => {
    if (flagDirClick) {
        return
    }
    flagDirClick = true
    const response = await window.electron.showDirDlg()
    if (response.canceled === false) {
        formState.fileList = ''
        const [dirPath] = response.filePaths;
        formState.dirPath = dirPath
        let fileList = await window.electron.listFiles(dirPath)
        let fileStr = ''
        if (fileList.length) {
            fileList.forEach(file => {
                if (imgExt.some(ext => file.endsWith(ext))) {
                    fileStr += file + '\n'
                }
            })
        }
        formState.fileList = fileStr
    }
    if (typeof response.canceled === 'boolean') {
        flagDirClick = false
    }
}

// 检视导出文件名配置
const jsonNameCheck = () => {
    const extJson = '.json'
    if (!formState.jsonFileName || !(formState.jsonFileName.trim())) {
        formState.jsonFileName = jsonNameDefault
        return true
    }
    if (formState.jsonFileName === extJson) {
        formState.jsonFileName = jsonNameDefault
        return true
    }

    if (!formState.jsonFileName.endsWith(extJson)) {
        formState.jsonFileName += extJson
    }
    return true
}

// 导出 点击事件
const exportPicturesInJson = async () => {
    // 基本校验
    if (!formState.dirPath) {
        const result = confirm('请选择图片所在目录！')
        if (result === true) {
            inputDirChoose()
        }
        return
    }
    jsonNameCheck()
    const exportOption = {
        dirPath: formState.dirPath,
        jsonFileName: formState.jsonFileName
    }

    let result = await window.electron.exportPicturesInJson(exportOption)
    console.log(result)
}

</script>
<script>
export default {
    name: 'AboutComp'
}
</script>