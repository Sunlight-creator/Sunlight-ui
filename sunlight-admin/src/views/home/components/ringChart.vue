<!-- 环形图组件，支持多组数据 -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 定义环形图数据项类型
interface RingDataItem {
  name: string // 数据项名称
  value: number // 数据项值
}
// 定义组件属性接口
interface RingChartProps {
  // 数据配置
  data: RingDataItem[] // 环形图数据
  height?: string // 图表高度，默认350px
  radius?: [string, string] // 环形图半径，默认['50%', '80%']
  borderRadius?: number // 圆角大小，默认10
  centerText?: string // 中心文字
  showLabel?: boolean // 是否显示标签，默认false

  // 样式配置
  colors?: string[] // 颜色配置数组，默认['#4C87F3', '#8BD8FC', '#43A047', '#FB8C00', '#E53935']

  // 交互配置
  showTooltip?: boolean // 是否显示提示框，默认true
  showLegend?: boolean // 是否显示图例，默认false
  legendPosition?: 'bottom' | 'top' | 'left' | 'right' // 图例位置，默认right
  loading?: boolean // 是否加载中，默认false

  // 空数据配置
  isEmpty?: boolean // 是否为空，默认自动判断
}

// 定义默认属性值
const props = withDefaults(defineProps<RingChartProps>(), {
  height: '350px',
  radius: () => ['50%', '80%'],
  borderRadius: 10,
  centerText: '',
  showLabel: false,
  colors: () => ['#4C87F3', '#8BD8FC', '#43A047', '#FB8C00', '#E53935'],
  showTooltip: true,
  showLegend: false,
  legendPosition: 'right',
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

  if (!props.data?.length) {
    return true
  }

  return props.data.every(item => item.value === 0)
})

// 计算环形图中心位置
const getCenterPosition = (): [string, string] => {
  if (!props.showLegend) return ['50%', '50%']

  switch (props.legendPosition) {
    case 'left':
      return ['60%', '50%']
    case 'right':
      return ['40%', '50%']
    case 'top':
      return ['50%', '60%']
    case 'bottom':
      return ['50%', '40%']
    default:
      return ['50%', '50%']
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

  // 计算中心位置
  const centerPos = getCenterPosition()

  // 构建图表配置
  const option: echarts.EChartsOption = {
    // 颜色配置
    color: props.colors,

    // 提示框配置
    tooltip: props.showTooltip
      ? {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        }
      : undefined,

    // 图例配置
    legend: props.showLegend
      ? {
          data: props.data.map(item => item.name),
          [props.legendPosition]: 0
        }
      : undefined,

    // 中心文字配置
    title: props.centerText
      ? {
          text: props.centerText,
          left: centerPos[0],
          top: centerPos[1],
          textAlign: 'center',
          textVerticalAlign: 'middle',
          textStyle: {
            fontSize: 18,
            fontWeight: 500,
            color: '#ADB0BC'
          }
        }
      : undefined,

    // 系列配置
    series: [
      {
        name: '数据占比',
        type: 'pie',
        radius: props.radius,
        center: centerPos,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: props.borderRadius,
          borderColor: '#fff',
          borderWidth: 0
        },
        label: {
          show: props.showLabel,
          formatter: '{b}\n{d}%',
          position: 'outside',
          color: '#999',
          fontSize: 12
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: props.showLabel,
          length: 15,
          length2: 25,
          smooth: true
        },
        data: props.data
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
    props.data,
    props.radius,
    props.borderRadius,
    props.centerText,
    props.showLabel,
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
.ring-chart {
  position: relative;
  width: 100%;
}
</style>
