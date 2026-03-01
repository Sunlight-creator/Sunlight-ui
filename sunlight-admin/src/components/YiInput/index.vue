<script setup lang="ts">
import { h, getCurrentInstance, ComponentInstance } from 'vue'
import { ElInput } from 'element-plus'

const vm = getCurrentInstance()
function changeRef(exposed) {
  console.log(exposed)
  vm.exposed = exposed
}
defineExpose({} as ComponentInstance<typeof ElInput>)
</script>
<template>
  <component :is="h(ElInput, { ...$attrs, ref: changeRef }, $slots)" />
</template>
