<template>
    <div class="generate-picture">
        <h3>批量生成图片</h3>
        <a-form name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off">
            <a-form-item style="text-align: left;" label="宽度模式">
                <a-radio-group v-model:value="widthMode" name="radioGroup">
                    <a-radio value="0">固定宽度</a-radio>
                    <a-radio value="1">范围宽度</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-if="widthMode === '0'" style="text-align: left;" label="宽度设置">
                <a-input-number :min="50" style="width: 140px;" v-model:value="width">
                    <template #addonAfter>
                        <span>px</span>
                    </template>
                </a-input-number>
            </a-form-item>
            <a-form-item v-if="widthMode === '1'" style="text-align: left;" label="宽度设置">
                <a-row>
                    <a-form-item style="text-align: left;" label="最小值">
                        <a-input-number :min="50" style="width: 140px;" v-model:value="widthRange.min">
                            <template #addonAfter>
                                <span>px</span>
                            </template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item style="text-align: left;margin-left: 16px;" label="最大值">
                        <a-input-number :min="50" style="width: 140px;" v-model:value="widthRange.max">
                            <template #addonAfter>
                                <span>px</span>
                            </template>
                        </a-input-number>
                    </a-form-item>
                </a-row>

            </a-form-item>
            <a-form-item style="text-align: left;" label="高度模式">
                <a-radio-group v-model:value="heightMode" name="radioGroup">
                    <a-radio value="0">固定高度</a-radio>
                    <a-radio value="1">范围高度</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-if="heightMode === '0'" style="text-align: left;" label="高度设置">
                <a-input-number :min="50" style="width: 140px;" v-model:value="height">
                    <template #addonAfter>
                        <span>px</span>
                    </template>
                </a-input-number>
            </a-form-item>
            <a-form-item v-if="heightMode === '1'" style="text-align: left;" label="高度设置">
                <a-row>
                    <a-form-item style="text-align: left;" label="最小值">
                        <a-input-number :min="50" style="width: 140px;" v-model:value="heightRange.min">
                            <template #addonAfter>
                                <span>px</span>
                            </template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item style="text-align: left;margin-left: 16px;" label="最大值">
                        <a-input-number :min="50" style="width: 140px;" v-model:value="heightRange.max">
                            <template #addonAfter>
                                <span>px</span>
                            </template>
                        </a-input-number>
                    </a-form-item>
                </a-row>

            </a-form-item>

            <a-form-item style="text-align: left;" label="图片内容">
                <a-input style="width: 140px;" v-model:value="content" placeholder="默认为图片尺寸" />
            </a-form-item>
            <a-form-item style="text-align: left;" label="数量">
                <a-input-number :min="1" :max="1000" style="width: 140px;" v-model:value="qty">
                    <template #addonAfter>
                        <span>张</span>
                    </template>
                </a-input-number>
            </a-form-item>
            <a-form-item style="text-align: left;" label="操作">
                <a-button @click="preGeneratePic" type="primary">生成</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
import { Modal, message } from 'ant-design-vue';
import { ref, reactive, h } from 'vue';
import { getRandomInt } from '@/utils'
const cache = {}
const widthMode = ref('0')
const width = ref(50)
const widthRange = reactive({
    min: 50,
    max: 5000
})
const heightMode = ref('0')
const height = ref(50)
const heightRange = reactive({
    min: 50,
    max: 10000
})
// 图片上的文本
const content = ref('')
// 生成数量
const qty = ref(1)
// 二次确认数量阀值, 当用户输入或选择的图片数量大于阀值时就弹框确认
const thresholdQty = 20
// 绘制canvas，基本宽高文本
const generateCanvas = ({ width, height, text }) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = '#d5d5d5';// 设置填充画笔颜色为红色，即字体颜色
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';// 设置填充画笔颜色为红色，即字体颜色
    ctx.font = '28px serif';// 设置字体大小
    ctx.fillText(text, 20, 60);// 绘制 "实心" 文字
    ctx.closePath();
    return canvas
}
// 开始生成图片
const generatePic = () => {
    const total = qty.value
    for (let index = 0; index < total; index++) {
        const widthPic = widthMode.value === '0' ? width.value : getRandomInt(widthRange.min, widthRange.max)
        const heightPic = heightMode.value === '0' ? height.value : getRandomInt(heightRange.min, heightRange.max)
        const contentPic = content.value ? content.value : `${widthPic} X ${heightPic}`
        const canvas = generateCanvas({ width: widthPic, height: heightPic, text: contentPic })
        const base64 = canvas.toDataURL()
        window.electron.generatePicWithBase64({ imgData: base64, width: widthPic, height: heightPic, text: contentPic, path: cache.path }).then(resp => {
            console.log(resp);
        })
    }
}
// “生成” 按钮点击事件
const preGeneratePic = async () => {
    Object.assign(cache, { path: '' })
    cache.path = await window.electron.dirChooseSync()
    if (!cache.path) {
        message.info('请选择图片保存的文件夹！')
        return
    }
    if (qty.value > thresholdQty) {
        Modal.confirm({
            title: '请确认',
            content: h('div', { style: 'color:red;' }, `确认要一次性生成${qty.value}张图片`),
            onOk: generatePic,
            onCancel () {
                console.log('取消生成！');
            },
            class: 'test',
        });
        return
    }
    generatePic()
}

</script>