<!-- 进度条卡片 -->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ElProgress } from 'element-plus'
import { addUnit, animate } from "../utils/tool";
interface ProgressCardProps {
  /** 进度百分比 */
  percentage: number
  /** 标题 */
  title?: string
  /** 颜色 */
  color?: string
  /** 图标 */
  icon?: string
  /** 图标颜色 */
  iconColor?: string
  /** 图标背景颜色 */
  iconBgColor?: string
  /** icon 背景圆角大小，默认 8 */
  iconBgRadius?: number
  /** 图标大小 */
  iconSize?: string | number
  /** 进度条宽度，默认 5 */
  strokeWidth?: number
}


const props = withDefaults(defineProps<ProgressCardProps>(), {
  title: '',
  color: '',
  icon: '',
  iconColor: '',
  iconBgColor: '',
  iconBgRadius: 8,
  iconSize: '',
  strokeWidth: 5
})


const currentPercentage = ref(0)


const animateProgress = () => {
  animate(0, props.percentage, 1000, (value) => {
    currentPercentage.value = Math.floor(value)
  })
}


onMounted(() => {
  animateProgress()
})


watch(
  () => props.percentage,
  () => animateProgress()
)
</script>

<template>
 
  <div class="progress-card card-minimal flex-column-center">
    <div class="progress-card-info" :style="{ justifyContent: icon ? 'space-between' : 'flex-start' }">
      <div
        v-if="props.icon"
        class="stats-card__icon"
        :style="{ backgroundColor: props.iconBgColor, borderRadius: addUnit(props.iconBgRadius) }"
      >
        <component
          :is="props.icon"
          :style="{
            width: addUnit(props.iconSize),
            height: addUnit(props.iconSize),
            color: props.iconColor
          }"
        />
      </div>

      <div class="progress-card-info-right">
        <span class="percentage">{{ currentPercentage }}%</span>
        <p class="title">
          <slot name="title">{{ title }}</slot>
        </p>
      </div>
    </div>

    <el-progress :percentage="currentPercentage" :stroke-width="strokeWidth" :show-text="false" :color="color" />
  </div>
</template>

<style scoped lang="scss">
.progress-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 8rem;
  padding: 0 20px;
  background-color: #fff;
  border-radius: 10px;
}

.progress-card-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.stats-card__icon {
  width: 46px;
  height: 46px;
  margin-right: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-card-info-right {
  .percentage {
    display: block;
    margin-bottom: 4px;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
  }

  .title {
    font-size: 0.875rem;
    color: #666;
  }
}


:deep(.el-progress-bar__outer) {
  background-color: #f0f0f0;
}

.flex-column-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
