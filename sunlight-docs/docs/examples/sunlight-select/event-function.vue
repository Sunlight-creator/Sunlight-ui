<template>
  <div class="card-header">
    <span class="title">eventFunction 使用示例</span>
  </div>

  <el-divider>可查询多选事件配置</el-divider>
  <div class="input-wrapper">
    <SunlightSelect
      v-model="eventValue"
      :item="{
        placeholder: '可查询多选事件配置',
        options: options,
        clearable: true,
        filterable: true,
        wrapperStyle: {
          borderColor: '#e6a23c',
          focusBorderColor: '#e6a23c',
          focusBoxShadow: '0 0 0 3px rgba(230, 162, 60, 0.25)',
        },
        config: {
          multiple: true,
        },
        eventFunction: {
          change: val => {
            console.log('eventFunction - change:', val);
            eventStatus.change = val;
          },
          focus: () => {
            console.log('eventFunction - focus');
            eventStatus.focus = true;
          },
          blur: () => {
            console.log('eventFunction - blur');
            eventStatus.blur = true;
          },
          clear: () => {
            console.log('eventFunction - clear');
            eventStatus.clear = true;
          },
          'visible-change': val => {
            console.log('eventFunction - visible-change:', val);
            eventStatus.visibleChange = val;
          },
        },
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
          {{ eventStatus.focus ? "已触发" : "未触发" }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="blur事件">
        <span :class="eventStatus.blur ? 'success' : 'default'">
          {{ eventStatus.blur ? "已触发" : "未触发" }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="clear事件">
        <span :class="eventStatus.clear ? 'success' : 'default'">
          {{ eventStatus.clear ? "已触发" : "未触发" }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item label="visible-change事件">
        <span :class="eventStatus.visibleChange !== null ? 'success' : 'default'">
          {{ eventStatus.visibleChange !== null ? (eventStatus.visibleChange ? "显示" : "隐藏") : "未触发" }}
        </span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const eventValue = ref([]);

// 事件状态跟踪
const eventStatus = reactive({
  change: [],
  focus: false,
  blur: false,
  clear: false,
  visibleChange: null,
});

// 重置事件状态
function resetEventStatus() {
  eventStatus.change = [];
  eventStatus.focus = false;
  eventStatus.blur = false;
  eventStatus.clear = false;
  eventStatus.visibleChange = null;
}

const options = [
  { label: "选项1", value: "option1" },
  { label: "选项2", value: "option2" },
  { label: "选项3", value: "option3" },
  { label: "选项4", value: "option4" },
  { label: "选项5", value: "option5" },
];
</script>

<style scoped>
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
