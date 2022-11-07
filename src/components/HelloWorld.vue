<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="click"> 计数器{{ count }}</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
defineProps({
  msg: {
    type: String,
    default: ''
  }
})
const count = ref(0)
const click = () => {
  count.value++
}
</script>
<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
