<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightCascader 异步加载 + 搜索过滤</span>
    </div>

    <div class="input-wrapper">
      <SunlightCascader v-model="value" :item="item" />
    </div>

    <p>选中值：{{ value }}</p>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SunlightCascader } from 'sunlight-ui'

async function fetchCityOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州' },
            { value: 'ningbo', label: '宁波' }
          ]
        },
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            { value: 'nanjing', label: '南京' },
            { value: 'suzhou', label: '苏州' }
          ]
        }
      ])
    }, 1000)
  })
}

const value = ref(null)
const options = ref([])

const item = ref({
  placeholder: '可搜索选择',
  options: options.value,
  filterable: true,
  clearable: true
})

onMounted(async () => {
  options.value = await fetchCityOptions()
  item.value = { ...item.value, options: options.value }
})
</script>
