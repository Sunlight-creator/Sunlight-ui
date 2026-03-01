<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightCascader 异步加载 + 多选</span>
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
          value: 1,
          label: '东南',
          disabled: true, // 添加禁用
          children: [
            {
              value: 2,
              label: '上海',
              children: [
                { value: 3, label: '普陀' },
                { value: 4, label: '黄埔' },
                { value: 5, label: '徐汇' }
              ]
            },
            {
              value: 7,
              label: '江苏',
              children: [
                { value: 8, label: '南京' },
                { value: 9, label: '苏州' },
                { value: 10, label: '无锡' }
              ]
            },
            {
              value: 12,
              label: '浙江',
              children: [
                { value: 13, label: '杭州' },
                { value: 14, label: '宁波' },
                { value: 15, label: '嘉兴' }
              ]
            }
          ]
        },
        {
          value: 17,
          label: '西北',
          children: [
            {
              value: 18,
              label: '陕西',
              children: [
                { value: 19, label: '西安' },
                { value: 20, label: '延安' }
              ]
            },
            {
              value: 21,
              label: '新疆维吾尔族自治区',
              children: [
                { value: 22, label: '乌鲁木齐' },
                { value: 23, label: '克拉玛依' }
              ]
            }
          ]
        }
      ])
    }, 1000)
  })
}

const value = ref([])
const options = ref([])

const item = ref({
  placeholder: '请选择地区（多选）',
  options,
  clearable: true,
  collapseTags: false, //折叠展示Tag
  multiple: true, // 关键配置
  showCheckbox: true
})

onMounted(async () => {
  options.value = await fetchCityOptions()
})
</script>
