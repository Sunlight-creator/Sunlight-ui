<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightTextarea 自定义样式和事件绑定</span>
    </div>
    <div class="input-wrapper">
      <SunlightTextarea v-model="value" :item="styledItem" />
    </div>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { SunlightTextarea } from 'sunlight-ui'
const value = ref('')
const styledItem = reactive({
  config: {
    style: 'border: 1px solid #409EFF; padding: 10px; font-size: 40px;'
  },
  eventFunction: {
    input: e => {
      console.log('输入内容:', e)
      handleInput(e)
    }
  }
})

const handleInput = e => {
  console.log(e, '输入内容')
}
</script>

<style scoped lang="scss"></style>
