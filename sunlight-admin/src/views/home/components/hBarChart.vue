<!-- 水平柱状图组件，支持多组数据 -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 定义单系列数据类型
type SingleBarData = number[]

// 定义多系列数据项类型
interface BarSeriesItem {
  name: string // 系列名称
  data: number[] // 系列数据
  barWidth?: string | number // 系列柱状图宽度
  stack?: string // 系列堆叠名称
  color?: string // 系列颜色
}

// 定义组件属性接口
interface HBarChartProps {
  // 数据配置
  data: SingleBarData | BarSeriesItem[] // 支持单系列和多系列数据
  xAxisData: string[] // X轴数据
  height?: string // 图表高度，默认350px
  barWidth?: string | number // 柱状图宽度，默认36%
  stack?: boolean // 是否堆叠，默认false

  // 样式配置
  colors?: string[] // 颜色配置数组，默认['#4C87F3', '#8BD8FC', '#43A047', '#FB8C00', '#E53935']

  // 交互配置
  showLegend?: boolean // 是否显示图例，默认false
  legendPosition?: 'bottom' | 'top' | 'left' | 'right' // 图例位置，默认bottom
  showTooltip?: boolean // 是否显示提示框，默认true
  loading?: boolean // 是否加载中，默认false

  // 轴线配置
  showAxisLine?: boolean // 是否显示轴线，默认true
  showAxisLabel?: boolean // 是否显示轴标签，默认true
  showSplitLine?: boolean // 是否显示分割线，默认true

  // 空数据配置
  isEmpty?: boolean // 是否为空，默认自动判断
}

// 定义默认属性值
const props = withDefaults(defineProps<HBarChartProps>(), {
  height: '350px',
  barWidth: '36%',
  stack: false,
  colors: () => ['#4C87F3', '#8BD8FC', '#43A047', '#FB8C00', '#E53935'],
  showLegend: false,
  legendPosition: 'bottom',
  showTooltip: true,
  loading: false,
  showAxisLine: true,
  showAxisLabel: true,
  showSplitLine: true,
  isEmpty: false
})

// 图表容器引用
const chartRef = ref<HTMLDivElement | null>(null)
// 图表实例
let chartInstance: echarts.ECharts | null = null

// 判断是否是多系列数据
const isMultipleSeries = computed(() => {
  return (
    Array.isArray(props.data) &&
    props.data.length > 0 &&
    typeof props.data[0] === 'object' &&
    'name' in (props.data[0] as any)
  )
})

// 判断是否为空数据
const isEmpty = computed(() => {
  if (props.isEmpty) return true

  if (!props.data || (Array.isArray(props.data) && props.data.length === 0)) return true

  if (isMultipleSeries.value) {
    const multiData = props.data as BarSeriesItem[]
    return multiData.every(item => !item.data || item.data.every(val => val === 0))
  } else {
    const singleData = props.data as SingleBarData
    return singleData.every(val => val === 0)
  }
})

// 获取颜色，优先使用自定义颜色，其次使用颜色数组循环，最后使用默认颜色
const getColor = (customColor?: string, index?: number): string => {
  if (customColor) return customColor
  if (index !== undefined && props.colors && props.colors.length > 0) {
    return props.colors[index % props.colors.length]
  }
  // 默认颜色
  return '#4C87F3'
}

// 生成系列配置
const createSeries = () => {
  // 多系列数据处理
  if (isMultipleSeries.value) {
    const multiData = props.data as BarSeriesItem[]
    return multiData.map((item, index) => {
      const color = getColor(item.color, index)
      return {
        name: item.name,
        type: 'bar',
        data: item.data,
        stack: props.stack ? item.stack || 'total' : undefined,
        barWidth: item.barWidth || props.barWidth,
        itemStyle: {
          borderRadius: 4,
          color: color
        }
      }
    })
  }
  // 单系列数据处理
  else {
    const singleData = props.data as SingleBarData
    const color = getColor(undefined, 0)
    return [
      {
        name: '数据',
        type: 'bar',
        data: singleData,
        stack: props.stack ? 'total' : undefined,
        barWidth: props.barWidth,
        itemStyle: {
          borderRadius: 4,
          color: color
        }
      }
    ]
  }
}

// 初始化或更新图表
const renderChart = () => {
  if (!chartRef.value) return

  // 创建图表实例
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }

  // 处理空数据情况
  if (isEmpty.value) {
    chartInstance.clear()
    chartInstance.showLoading({
      text: '暂无数据',
      color: '#999',
      textColor: '#999',
      maskColor: 'transparent'
    })
    return
  } else {
    chartInstance.hideLoading()
  }

  // 构建图表配置
  const option: echarts.EChartsOption = {
    // 颜色配置
    color: props.colors,

    // 提示框配置
    tooltip: props.showTooltip
      ? {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        }
      : undefined,

    // 图例配置
    legend:
      props.showLegend && isMultipleSeries.value
        ? {
            data: (props.data as BarSeriesItem[]).map(item => item.name),
            [props.legendPosition]: 0
          }
        : undefined,

    // 网格配置
    grid: {
      top: props.showLegend && props.legendPosition === 'top' ? 40 : 20,
      left: props.showLegend && props.legendPosition === 'left' ? 80 : 40,
      right: props.showLegend && props.legendPosition === 'right' ? 80 : 20,
      bottom: props.showLegend && props.legendPosition === 'bottom' ? 40 : 20,
      containLabel: true
    },

    // X轴配置
    xAxis: {
      type: 'value',
      axisLine: {
        show: props.showAxisLine,
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisLabel: {
        show: props.showAxisLabel,
        color: '#999'
      },
      axisTick: {
        show: props.showAxisLine,
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      splitLine: {
        show: props.showSplitLine,
        lineStyle: {
          color: '#f0f0f0',
          type: 'dashed'
        }
      }
    },

    // Y轴配置
    yAxis: {
      type: 'category',
      data: props.xAxisData,
      axisLine: {
        show: props.showAxisLine,
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisLabel: {
        show: props.showAxisLabel,
        color: '#999'
      },
      axisTick: {
        show: props.showAxisLine,
        lineStyle: {
          color: '#e0e0e0'
        }
      }
    },

    // 系列配置
    series: createSeries()
  }

  // 设置图表配置
  chartInstance.setOption(option, true)
}

// 监听窗口大小变化，自动调整图表
const handleResize = () => {
  chartInstance?.resize()
}

// 监听属性变化，自动更新图表
watch(
  () => [
    props.data,
    props.xAxisData,
    props.colors,
    props.barWidth,
    props.stack,
    props.showLegend,
    props.legendPosition,
    props.showTooltip,
    props.showAxisLine,
    props.showAxisLabel,
    props.showSplitLine,
    props.isEmpty
  ],
  () => {
    renderChart()
  },
  { deep: true }
)

// 组件挂载后初始化图表
onMounted(() => {
  renderChart()
  window.addEventListener('resize', handleResize)
})

// 组件卸载前销毁图表
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<template>
  <div :style="{ height: props.height, width: '100%' }" ref="chartRef">
    <!-- 加载中遮罩 -->
    <div
      v-if="props.loading"
      style="
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #666;
      "
    >
      加载中...
    </div>
  </div>
</template>

<style scoped>
.h-bar-chart {
  position: relative;
  width: 100%;
}
</style>
