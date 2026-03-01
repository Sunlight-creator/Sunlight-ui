<template>
  <div class="data-list-card card-minimal">
    <div class="data-list-card-header">
      <p class="data-list-card-header-title">{{ title }}</p>
      <p class="data-list-card-header-subtitle">{{ subtitle }}</p>
    </div>
    <el-scrollbar :style="{ height: maxHeight }">
      <div v-for="(item, index) in list" :key="index" class="data-list-card-item flex-align-center">
        <div v-if="item.icon" :class="['data-list-card-item-icon']" class="flex-center" :style="item.iconBgStyle">
          <component
            :is="item.icon"
            :style="{
              width: '20px',
              height: '20px',
              color: item.iconColor || 'inherit'
            }"
          />
        </div>

        <div class="data-list-card-item-content flex-1">
          <div class="data-list-card-item-content-title">{{ item.title }}</div>
          <div class="data-list-card-item-content-status">{{ item.status }}</div>
        </div>

        <div class="data-list-card-item-time">{{ item.time }}</div>
      </div>
    </el-scrollbar>

    <el-button class="data-list-card-more-btn" v-if="showMoreButton" @click="handleMore"> 查看更多 </el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'DataListCard' })

interface DataListCardProps {
  title: string
  subtitle?: string
  list: Array<{
    title: string
    status: string
    time: string
    icon?: any
    iconColor?: string
    iconBgStyle?: { [key: string]: string }
  }>
  maxCount?: number
  showMoreButton?: boolean
}

interface DataListCardEmits {
  (e: 'more'): void
}

const itemHeight = 66

const props = withDefaults(defineProps<DataListCardProps>(), {
  subtitle: '',
  maxCount: 5,
  showMoreButton: false,
  list: () => []
})

const maxHeight = computed(() => `${itemHeight * props.maxCount}px`)

const emit = defineEmits<DataListCardEmits>()

const handleMore = () => emit('more')
</script>

<style lang="scss" scoped>

.flex-align-center {
  display: flex;
  align-items: center;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-1 {
  flex: 1;
}


.bg-primary {
  background-color: #409EFF;
}

.bg-secondary {
  background-color: #67C23A;
}

.bg-warning {
  background-color: #E6A23C;
}

.bg-danger {
  background-color: #F56C6C;
}

.bg-success {
  background-color: #67C23A;
}

.bg-info {
  background-color: #909399;
}


.data-list-card {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px; 
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); 
}


.card-minimal {

}


.data-list-card-header {
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0; 
  margin-bottom: 15px;
}


.data-list-card-header-title {
  font-size: 18px;
  font-weight: 500;
  color: #222222; 
  margin: 0 0 5px 0; 
}


.data-list-card-header-subtitle {
  font-size: 14px;
  color: #888888; 
  margin: 0; 
}


.data-list-card-item {
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5; 
}

.data-list-card-item:last-child {
  border-bottom: none; 
}


.data-list-card-item-icon {
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.data-list-card-item-content {
  flex: 1;
}


.data-list-card-item-content-title {
  margin-bottom: 4px;
  font-size: 15px;
  color: #222222; 
}


.data-list-card-item-content-status {
  font-size: 12px;
  color: #666666; 
}


.data-list-card-item-time {
  margin-left: 12px;
  font-size: 12px;
  color: #999999;
  white-space: nowrap; 
}


.data-list-card-more-btn {
  width: 100%;
  margin-top: 15px;
  text-align: center;
  background-color: #f5f7fa;
  border: 1px solid #e4e7ed;
  color: #606266;
  font-size: 13px;
}

.data-list-card-more-btn:hover {
  background-color: #ecf5ff;
  border-color: #c6e2ff;
  color: #409eff;
}


:deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
}
</style>
