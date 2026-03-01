<!-- 雷达图组件，支持多组数据 -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 定义雷达图指标项类型
interface RadarIndicator {
  name: string // 指标名称
  max: number // 指标最大值
  min?: number // 指标最小值
}

// 定义雷达图数据项类型
interface RadarDataItem {
  name: string // 数据项名称
  value: number[] // 数据值数组，与指标对应
  symbolSize?: number // 符号大小
  lineStyle?: {
    width?: number
    color?: string
  }
  itemStyle?: {
    color?: string
  }
  areaStyle?: {
    color?: string
    opacity?: number
  }
}

// 定义组件属性接口
interface RadarChartProps {
  // 数据配置
  indicator: RadarIndicator[] // 雷达图指标配置
  data: RadarDataItem[] // 雷达图数据
  height?: string // 图表高度，默认350px

  // 样式配置
  colors?: string[] // 颜色配置数组，默认['#4C87F3', '#8BD8FC', '#43A047', '#FB8C00', '#E53935']

  // 交互配置
  showTooltip?: boolean // 是否显示提示框，默认true
  showLegend?: boolean // 是否显示图例，默认false
  legendPosition?: 'bottom' | 'top' | 'left' | 'right' // 图例位置，默认bottom
  loading?: boolean // 是否加载中，默认false

  // 空数据配置
  isEmpty?: boolean // 是否为空，默认自动判断
}

// 定义默认属性值
const props = withDefaults(defineProps<RadarChartProps>(), {
  height: '350px',
  colors: () => ['#4C87F3', '#8BD8FC', '#43A047', '#FB8C00', '#E53935'],
  showTooltip: true,
  showLegend: false,
  legendPosition: 'bottom',
  loading: false,
  isEmpty: false
})

// 图表容器引用
const chartRef = ref<HTMLDivElement | null>(null)
// 图表实例
let chartInstance: echarts.ECharts | null = null

// 判断是否为空数据
const isEmpty = computed(() => {
  if (props.isEmpty) return true

  if (!props.data?.length || !props.indicator?.length) {
    return true
  }

  return props.data.every(item => item.value.every(val => val === 0))
})

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
          trigger: 'item'
        }
      : undefined,

    // 图例配置
    legend: props.showLegend
      ? {
          data: props.data.map(item => item.name),
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

    // 雷达图配置
    radar: {
      indicator: props.indicator,
      center: ['50%', '50%'],
      radius: '70%',
      axisName: {
        color: '#666',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          color: '#e6e6e6'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#e6e6e6'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(0, 0, 0, 0.02)', 'rgba(0, 0, 0, 0.05)']
        }
      }
    },

    // 系列配置
    series: [
      {
        type: 'radar',
        data: props.data.map((item, index) => {
          const color = props.colors[index % props.colors.length]
          return {
            name: item.name,
            value: item.value,
            symbolSize: item.symbolSize || 4,
            lineStyle: {
              width: item.lineStyle?.width || 2,
              color: item.lineStyle?.color || color
            },
            itemStyle: {
              color: item.itemStyle?.color || color
            },
            areaStyle: {
              color: item.areaStyle?.color || color,
              opacity: item.areaStyle?.opacity || 0.1
            },
            emphasis: {
              areaStyle: {
                opacity: 0.25
              },
              lineStyle: {
                width: 3
              }
            }
          }
        })
      }
    ]
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
    props.indicator,
    props.data,
    props.colors,
    props.showTooltip,
    props.showLegend,
    props.legendPosition,
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
.radar-chart {
  position: relative;
  width: 100%;
}
</style>
