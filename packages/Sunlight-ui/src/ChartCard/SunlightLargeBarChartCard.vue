<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { animate } from "../../utils/tool";

// 定义组件属性
const props = withDefaults(
  defineProps<{
    /** 数值 */
    count: number
    /** 标签 */
    title: string
    /** 百分比 */
    changeRate: number
    /** 日期 */
    timeRange?: string
    /** 高度 */
    cardHeight?: string | number
    /** 颜色 */
    chartColor?: string
    /** 图表数据 */
    dataList?: number[]
    /** 柱状图宽度 */
    barWidth?: string
    /** 柱状图圆角 */
    barRadius?: number
  }>(),
  {
    timeRange: '',
    cardHeight: 11,
    chartColor: '',
    dataList: () => [],
    barWidth: '26%',
    barRadius: 4
  }
)

// 图表实例
const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 数值动画
const countValue = ref(0)

// 格式化高度
const formatSize = (size: string | number): string => {
  if (typeof size === 'string') {
    return size
  }
  return `${size}px`
};

// 生成图表配置
const generateChartOptions = (): EChartsOption => {
  const defaultColor = '#303133'
  const computedColor = props.chartColor || defaultColor

  return {
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    xAxis: {
      type: 'category',
      show: false,
      boundaryGap: true
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: props.dataList || [],
        type: 'bar',
        barWidth: props.barWidth,
        itemStyle: {
          color: computedColor,
          borderRadius: props.barRadius
        }
      }
    ]
  }
}

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    updateChart()
  }
}

// 更新图表
const updateChart = () => {
  if (chartInstance) {
    const options = generateChartOptions()
    chartInstance.setOption(options)
  }
}

// 监听窗口大小变化
const handleResize = () => {
  chartInstance?.resize()
}

// 监听属性变化
watch(
  () => [props.dataList, props.chartColor, props.barWidth, props.barRadius],
  () => {
    updateChart()
  },
  { deep: true }
)

// 生命周期钩子
onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
  
  // 添加数字滚动动画
  if (props.count !== null) {
    animate(0, props.count, 1000, (value) => {
      countValue.value = Math.floor(value)
    })
  }
})

// 计算百分比样式
const percentageClass = {
  positive: props.changeRate > 0,
  negative: props.changeRate < 0
}

// 计算最终高度
const finalHeight = formatSize(props.cardHeight);
</script>

<template>
  <div class="bar-chart-card" :style="{ height: finalHeight }">
    <div class="card-headers">
      <div class="metric">
        <h2 class="value">{{ countValue }}</h2>
        <p class="label">{{ title }}</p>
      </div>
      <div class="percentage" :class="percentageClass">
        {{ changeRate > 0 ? "+" : "" }}{{ changeRate }}%
      </div>
      <div v-if="timeRange" class="date">{{ timeRange }}</div>
    </div>
    <div ref="chartRef" class="chart-content"></div>
  </div>
</template>

<style scoped>
/* 主容器 */
.bar-chart-card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

/* 卡片头部 */
.card-headers {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 指标部分 */
.metric {
  flex: 1;
}

/* 数值 */
.value {
  font-size: 28px;
  font-weight: 500;
  color: #303133;
  margin: 0;
  line-height: 1;
}

/* 标签 */
.label {
  margin: 4px 0 0;
  font-size: 14px;
  color: #909399;
}

/* 百分比 */
.percentage {
  font-size: 14px;
  font-weight: 500;
  color: #f56c6c;
}

.percentage.positive {
  color: #67c23a;
}

.percentage.negative {
  color: #f56c6c;
}

/* 日期 */
.date {
  font-size: 12px;
  color: #909399;
  margin-left: 16px;
}

/* 图表内容 */
.chart-content {
  width: 100%;
  height: calc(100% - 80px);
  margin: 0;
  padding: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .bar-chart-card {
    padding: 12px;
  }
  
  .card-headers {
    margin-bottom: 16px;
  }
  
  .value {
    font-size: 24px;
  }
  
  .chart-content {
    height: calc(100% - 70px);
  }
}
</style>