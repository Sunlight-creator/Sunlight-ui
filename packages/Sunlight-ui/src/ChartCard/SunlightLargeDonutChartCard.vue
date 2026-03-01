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
    /** 标题 */
    title: string
    /** 百分比 */
    changeRate: number
    /** 百分比标签 */
    changeRateLabel?: string
    /** 当前年份 */
    currentYear?: string
    /** 去年年份 */
    previousYear?: string
    /** 日期 */
    timeRange?: string
    /** 高度 */
    cardHeight?: string | number
    /** 颜色 */
    chartColor?: string
    /** 半径，默认 ["70%", "90%"] */
    chartRadius?: [string, string]
    /** 数据，默认 [0, 0] */
    chartData?: [number, number]
  }>(),
  {
    changeRateLabel: '',
    currentYear: '',
    previousYear: '',
    timeRange: '',
    cardHeight: 11,
    chartColor: '',
    chartRadius: () => ['70%', '90%'],
    chartData: () => [0, 0]
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
  return `${height}rem`
};

// 格式化数字
const formatNumber = (num: number): string => {
  return num.toLocaleString()
};

// 生成图表配置
const generateChartOptions = (): EChartsOption => {
  const defaultColor = '#409eff'
  const colorPrimary = props.chartColor || defaultColor
  const colorSecondary = '#e6e8f7'
  
  return {
    series: [
      {
        type: 'pie',
        radius: props.chartRadius,
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { value: props.chartData[0], name: props.currentYear, itemStyle: { color: colorPrimary } },
          { value: props.chartData[1], name: props.previousYear, itemStyle: { color: colorSecondary } }
        ]
      }
    ]
  }
};

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    updateChart()
  }
};

// 更新图表
const updateChart = () => {
  if (chartInstance) {
    const options = generateChartOptions()
    chartInstance.setOption(options)
  }
};

// 监听窗口大小变化
const handleResize = () => {
  chartInstance?.resize()
};

// 监听属性变化
watch(
  () => [props.chartData, props.chartColor, props.chartRadius, props.currentYear, props.previousYear],
  () => {
    updateChart()
  },
  { deep: true }
);

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
});

// 计算颜色
const computedColor = props.chartColor || '#303133';
const secondaryColor = '#e6e8f7';

// 计算百分比样式
const percentageClass = {
  positive: props.changeRate > 0,
  negative: props.changeRate < 0
};

// 计算最终高度
const finalHeight = formatHeight(props.cardHeight);
</script>

<template>
  <div class="donut-chart-card" :style="{ height: finalHeight, '--text-color-primary': computedColor, '--text-color-secondary': secondaryColor }">
    <div class="content">
      <div class="data-section">
        <p class="title">{{ title }}</p>
        <div>
          <p class="value">{{ formatNumber(countValue) }}</p>
          <div class="percentage" :class="percentageClass">
            {{ changeRate > 0 ? "+" : "" }}{{ changeRate }}%
            <span v-if="changeRateLabel">{{ changeRateLabel }}</span>
          </div>
        </div>
        <div class="legend" v-if="currentYear || previousYear">
          <span class="legend-item current" v-if="currentYear">{{ currentYear }}</span>
          <span class="legend-item previous" v-if="previousYear">{{ previousYear }}</span>
        </div>
      </div>
      <div class="section">
        <div ref="chartRef" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 主容器 */
.donut-chart-card {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: hidden;
  color: #303133;
  background-color: #ffffff;
  border-radius: 8px;
  transition: 0.3s;
}

/* 卡片内容 */
.content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

/* 数据部分 */
.data-section {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

/* 标题 */
.title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
  color: #909399;
}

/* 数值 */
.value {
  margin: 10px 0 0;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.2;
  color: #303133;
}

/* 百分比 */
.percentage {
  margin-top: 5px;
  font-size: 12px;
  font-weight: 500;
  color: #f56c6c;
}

.percentage.positive {
  color: #67c23a;
}

.percentage.negative {
  color: #f56c6c;
}

/* 图表部分 */
.section {
  display: flex;
  flex: 1;
  align-items: center;
  max-width: 200px;
  height: 100%;
}

/* 图表容器 */
.chart-container {
  width: 100%;
  height: 120px;
}

/* 图例 */
.legend {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
}

/* 图例项 */
.legend-item {
  position: relative;
  padding-left: 16px;
}

.legend-item::before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 8px;
  height: 8px;
  content: "";
  border-radius: 50%;
  transform: translateY(-50%);
}

.legend-item.current::before {
  background-color: var(--text-color-primary);
}

.legend-item.previous::before {
  background-color: var(--text-color-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .donut-chart-card {
    padding: 12px;
  }
  
  .content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .title {
    font-size: 14px;
  }
  
  .value {
    font-size: 20px;
    margin-top: 8px;
  }
  
  .percentage {
    font-size: 11px;
  }
  
  .section {
    width: 100%;
    max-width: none;
    justify-content: center;
  }
  
  .chart-container {
    height: 100px;
  }
  
  .legend {
    gap: 12px;
  }
  
  .legend-item {
    font-size: 11px;
    padding-left: 14px;
  }
  
  .legend-item::before {
    width: 6px;
    height: 6px;
  }
}
</style>