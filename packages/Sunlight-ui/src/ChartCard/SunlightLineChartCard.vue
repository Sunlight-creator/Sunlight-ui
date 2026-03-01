<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { animate } from "../../utils/tool"

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
    /** 是否显示区域颜色 */
    enableAreaColor?: boolean
    /** 图表数据 */
    dataList?: number[]
    /** 图表容器宽度 */
    chartWidth?: string | number
    /** 图表容器高度 */
    chartHeight?: string | number
  }>(),
  {
    timeRange: '',
    cardHeight: 11,
    chartColor: '',
    enableAreaColor: false,
    dataList: () => [],
    chartWidth: 200,
    chartHeight: 60
  } 
)

// 图表实例
const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 数值动画
const countValue = ref(0)

// 格式化高度
const formatHeight = (height: string | number): string => {
  if (typeof height === 'string') {
    return height
  }
  return `${height}px`
};

// 格式化尺寸
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
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: props.dataList || [],
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: computedColor
        },
        areaStyle: props.enableAreaColor
          ? {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: computedColor + '33'
                },
                {
                  offset: 1,
                  color: computedColor + '05'
                }
              ])
            }
          : undefined
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
  () => [props.dataList, props.chartColor, props.enableAreaColor],
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
const finalHeight = formatHeight(props.cardHeight);

// 计算图表容器尺寸
const finalChartWidth = formatSize(props.chartWidth);
const finalChartHeight = formatSize(props.chartHeight);
</script>

<template>
  <div class="line-chart-card" :style="{ height: finalHeight }">
    <div class="card-content">
      <div class="top-section">
        <div class="left-content">
          <h2 class="value">{{ countValue }}</h2>
          <p class="label">{{ title }}</p>
        </div>
        <div class="chart-container" :style="{ width: finalChartWidth, height: finalChartHeight }">
          <div 
            ref="chartRef" 
            class="chart-content"
          ></div>
        </div>
      </div>
      <div class="bottom-info">
        <div class="percentage" :class="percentageClass">
          {{ changeRate > 0 ? "+" : "" }}{{ changeRate }}%
        </div>
        <div class="time-range" v-if="timeRange">{{ timeRange }}</div>
      </div>  
    </div>
  </div>
</template>

<style scoped>
/* 主容器 */
.line-chart-card {
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

/* 卡片内容 */
.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 顶部区域 */
.top-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* 左侧内容 */
.left-content {
  flex: 1;
}

/* 数值 */
.value {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

/* 标签 */
.label {
  font-size: 14px;
  color: #909399;
  margin: 0 0 8px 0;
}

/* 百分比 */
.percentage {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.percentage.positive {
  color: #67c23a;
}

.percentage.negative {
  color: #f56c6c;
}

/* 底部信息区域 */
.bottom-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 8px;
}

/* 时间范围 */
.time-range {
  font-size: 12px;
  color: #909399;
  margin: 0;
}

/* 图表容器 */
.chart-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* 图表内容 */
.chart-content {
  width: 100%;
  height: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .line-chart-card {
    padding: 12px;
  }
  
  .value {
    font-size: 24px;
  }
  
  .chart-container {
    width: 80px;
    height: 50px;
  }
}
</style>
