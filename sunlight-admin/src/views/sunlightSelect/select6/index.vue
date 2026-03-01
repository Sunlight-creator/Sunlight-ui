<template>
  <el-card class="box-card" shadow="hover">
    <div class="card-header">
      <span class="title">SunlightSelect 自定义颜色样式示例</span>
    </div>

    <el-divider>默认样式</el-divider>
    <div class="input-wrapper">
      <SunlightSelect
        v-model="defaultValue"
        :item="{
          placeholder: '默认样式',
          options: options,
          clearable: true
        }"
      />
    </div>

    <el-divider>绿色主题</el-divider>
    <div class="input-wrapper">
      <SunlightSelect
        v-model="greenValue"
        :item="{
          placeholder: '绿色主题',
          options: options,
          clearable: true,
          wrapperStyle: {
            borderColor: '#67c23a',
            focusBorderColor: '#67c23a',
            focusBoxShadow: '0 0 0 3px rgba(103, 194, 58, 0.25)'
          }
        }"
      />
    </div>

    <el-divider>蓝色主题</el-divider>
    <div class="input-wrapper">
      <SunlightSelect
        v-model="blueValue"
        :item="{
          placeholder: '蓝色主题',
          options: options,
          clearable: true,
          wrapperStyle: {
            borderColor: '#409eff',
            focusBorderColor: '#409eff',
            focusBoxShadow: '0 0 0 3px rgba(64, 158, 255, 0.25)'
          }
        }"
      />
    </div>

    <el-divider>事件配置示例</el-divider>
    <div class="input-wrapper">
      <SunlightSelect
        v-model="eventValue"
        :item="{
          placeholder: '事件配置示例',
          options: options,
          clearable: true,
          filterable: true,
          wrapperStyle: {
            borderColor: '#e6a23c',
            focusBorderColor: '#e6a23c',
            focusBoxShadow: '0 0 0 3px rgba(230, 162, 60, 0.25)'
          },
          eventFunction: {
            change: val => {
              console.log('eventFunction - change:', val)
              eventStatus.change = val
            },
            focus: () => {
              console.log('eventFunction - focus')
              eventStatus.focus = true
            },
            blur: () => {
              console.log('eventFunction - blur')
              eventStatus.blur = true
            },
            clear: () => {
              console.log('eventFunction - clear')
              eventStatus.clear = true
            },
            search: val => {
              console.log('eventFunction - search:', val)
              eventStatus.search = val
            },
            'visible-change': val => {
              console.log('eventFunction - visible-change:', val)
              eventStatus.visibleChange = val
            }
          }
        }"
      />
    </div>

    <!-- 事件状态展示 -->
    <div class="event-status">
      <div class="event-header">
        <h4>事件触发状态：</h4>
        <el-button type="primary" size="small" @click="resetEventStatus">重置状态</el-button>
      </div>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="change事件">
          <span v-if="eventStatus.change" class="success">{{ eventStatus.change }}</span>
          <span v-else class="default">未触发</span>
        </el-descriptions-item>
        <el-descriptions-item label="focus事件">
          <span :class="eventStatus.focus ? 'success' : 'default'">
            {{ eventStatus.focus ? '已触发' : '未触发' }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="blur事件">
          <span :class="eventStatus.blur ? 'success' : 'default'">
            {{ eventStatus.blur ? '已触发' : '未触发' }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="clear事件">
          <span :class="eventStatus.clear ? 'success' : 'default'">
            {{ eventStatus.clear ? '已触发' : '未触发' }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="search事件">
          <span v-if="eventStatus.search" class="success">搜索: {{ eventStatus.search }}</span>
          <span v-else class="default">未触发</span>
        </el-descriptions-item>
        <el-descriptions-item label="visible-change事件">
          <span :class="eventStatus.visibleChange !== null ? 'success' : 'default'">
            {{ eventStatus.visibleChange !== null ? (eventStatus.visibleChange ? '显示' : '隐藏') : '未触发' }}
          </span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { SunlightSelect } from 'sunlight-ui'

const defaultValue = ref('')
const greenValue = ref('')
const blueValue = ref('')
const eventValue = ref('')

// 事件状态跟踪
const eventStatus = reactive({
  change: null,
  focus: false,
  blur: false,
  clear: false,
  search: '',
  visibleChange: null
})

// 重置事件状态
function resetEventStatus() {
  eventStatus.change = null
  eventStatus.focus = false
  eventStatus.blur = false
  eventStatus.clear = false
  eventStatus.search = ''
  eventStatus.visibleChange = null
}

const options = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' }
]
</script>

<style scoped>
.box-card {
  margin: 20px;
}

.card-header {
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.input-wrapper {
  margin: 20px 0;
}

.event-status {
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.event-status h4 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.success {
  color: #67c23a;
  font-weight: 500;
}

.default {
  color: #909399;
}
</style>
