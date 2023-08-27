<template>
  <div id="nav">
    <a-menu @click="menuItemClick" v-model:selectedKeys="current" mode="horizontal" :items="items" />
  </div>
  <router-view />
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const current = ref(['home']);
const items = ref([
  {
    key: 'home',
    label: '首页',
    title: 'Navigation Three - Submenu',
  },
  {
    key: 'tools',
    label: '常用小工具',
    title: 'Navigation Three - Submenu',
    children: [
      {
        label: 'Excel批量修改小工具',
        key: 'excelBatchFill',
      },
      {
        label: '导出全部图片信息为JSON格式',
        key: 'exportPicturesInJson',
      },
      {
        label: '批量生成图片',
        key: 'generatePicture',
      },
    ],
  }
])
const menuItemClick = item => {
  if (item.key === 'home') {
    router.push('/')
  } else {
    router.push(`/${item.key}`)
  }

}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
