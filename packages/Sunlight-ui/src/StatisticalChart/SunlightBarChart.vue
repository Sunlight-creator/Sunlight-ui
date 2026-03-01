<script setup lang="ts">
import { ref, watch, onMounted, computed, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 定义单系列数据类型
type SingleBarData = Array<number>

// 定义多系列数据项类型
interface BarDataItem {
  name: string // 系列名称
  data: number[] // 系列数据
  color?: string // 系列颜色
  stack?: string // 堆叠名称
  barWidth?: string | number // 柱宽
}

// 定义组件属性接口，新增 enableGradient 控制是否渐变
interface BarChartProps {
  data: SingleBarData | BarDataItem[]
  xAxisData: string[]
  height?: string
  colors?: string[]
  barWidth?: string | number
  borderRadius?: number | number[]
  stack?: boolean
  showLegend?: boolean
  legendPosition?: 'bottom' | 'top' | 'left' | 'right'
  showTooltip?: boolean
  loading?: boolean
  showAxisLine?: boolean
  showAxisLabel?: boolean
  showSplitLine?: boolean
  isEmpty?: boolean
  enableGradient?: boolean // 新增渐变开关，默认关闭
  title?: string // 图表标题
  showTitle?: boolean // 是否显示标题
  titlePosition?: 'left' | 'center' | 'right' // 标题位置
  titleStyle?: {
    fontSize?: string | number
    fontWeight?: string | number
    color?: string
    padding?: number | number[]
  } // 标题样式
}

// 定义props及默认值，新增 enableGradient 默认 false
const props = withDefaults(defineProps<BarChartProps>(), {
  height: '350px', // 图表高度
  colors: () => [], // 颜色数组
  barWidth: '40%', // 柱宽
  borderRadius: 4, // 圆角半径
  stack: false, // 是否堆叠
  showLegend: false, // 是否显示图例
  legendPosition: 'bottom', // 图例位置
  showTooltip: true, // 是否显示提示框
  loading: false, // 是否加载中
  showAxisLine: true, // 是否显示坐标轴线
  showAxisLabel: true, // 是否显示坐标轴标签
  showSplitLine: true, // 是否显示分割线
  isEmpty: false, // 是否为空数据
  enableGradient: false, // 默认不开启渐变色
  title: '', // 图表标题
  showTitle: false, // 是否显示标题
  titlePosition: 'center', // 标题位置
  titleStyle: () => ({}), // 标题样式
})

const chartRef = ref<HTMLDivElement | null>(null) // 图表容器ref
let chartInstance: echarts.ECharts | null = null // echarts实例

// 判断是否多系列数据
const isMultipleSeries = computed(() => {
  return (
    Array.isArray(props.data) &&
    props.data.length > 0 &&
    typeof props.data[0] === 'object' &&
    'name' in (props.data[0] as any)
  )
})

// 判断数据是否为空
const isEmptyData = computed(() => {
  if (props.isEmpty) return true
  if (!props.data || (Array.isArray(props.data) && props.data.length === 0)) return true
  if (isMultipleSeries.value) {
    const multiData = props.data as BarDataItem[]
    return multiData.every(item => !item.data || (Array.isArray(item.data) && item.data.every(v => v === 0)))
  } else {
    const singleData = props.data as SingleBarData
    return singleData.every(v => v === 0)
  }
})

// 获取颜色，优先使用自定义颜色，其次使用props.colors，最后默认蓝色
const getColor = (customColor: string | undefined, index: number): string => {
  if (customColor) return customColor
  if (props.colors && props.colors.length > 0) return props.colors[index % props.colors.length]
  return '#5470C6' // 默认颜色
}

// 根据 enableGradient 决定返回渐变色还是纯色
const getBarColor = (color: string) => {
  if (props.enableGradient) {
    // 渐变色：底部主色到顶部白色
    return new echarts.graphic.LinearGradient(0, 1, 0, 0, [
      { offset: 0, color: color },       // 底部主色
      { offset: 1, color: '#ffffff' }    // 顶部白色
    ])
  } else {
    // 纯色填充
    return color
  }
}

// 创建series配置
const createSeries = () => {
  if (isMultipleSeries.value) {
    const multiData = props.data as BarDataItem[]
    return multiData.map((item, index) => {
      const color = getColor(item.color, index)
      
      // 为堆叠柱状图设置不同的圆角
      let borderRadius = props.borderRadius
      if (props.stack) {
        const seriesCount = multiData.length
        if (index === 0) {
          // 底部系列，只设置底部圆角
          borderRadius = [0, 0, props.borderRadius, props.borderRadius]
        } else if (index === seriesCount - 1) {
          // 顶部系列，只设置顶部圆角
          borderRadius = [props.borderRadius, props.borderRadius, 0, 0]
        } else {
          // 中间系列，不设置圆角
          borderRadius = 0
        }
      }
      
      return {
        name: item.name,
        type: 'bar',
        data: item.data,
        stack: props.stack ? item.stack || 'total' : undefined,
        barWidth: item.barWidth || props.barWidth,
        itemStyle: {
          color: getBarColor(color), // 根据enableGradient决定颜色类型
          borderRadius: borderRadius
        }
      }
    })
  } else {
    const singleData = props.data as SingleBarData
    const color = getColor(undefined, 0)
    return [
      {
        name: '数量',
        type: 'bar',
        data: singleData,
        barWidth: props.barWidth,
        itemStyle: {
          color: getBarColor(color), // 根据enableGradient决定颜色类型
          borderRadius: props.borderRadius
        }
      }
    ]
  }
}

// 渲染图表
const renderChart = () => {
  if (!chartRef.value) return

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value) // 初始化echarts实例
  }

  if (isEmptyData.value) {
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

  const option: echarts.EChartsOption = {
    title: props.showTitle && props.title
      ? {
          text: props.title,
          left: props.titlePosition,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal',
            color: '#333',
            ...props.titleStyle
          }
        }
      : undefined,
    tooltip: props.showTooltip
      ? {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        }
      : undefined,
    legend:
      props.showLegend && isMultipleSeries.value
        ? {
            data: (props.data as BarDataItem[]).map(item => item.name),
            [props.legendPosition]: 0
          }
        : undefined,
    grid: {
      top: (props.showTitle ? 60 : 20) + (props.showLegend && props.legendPosition === 'top' ? 40 : 0),
      left: props.showLegend && props.legendPosition === 'left' ? 80 : 40,
      right: props.showLegend && props.legendPosition === 'right' ? 80 : 20,
      bottom: props.showLegend && props.legendPosition === 'bottom' ? 40 : 20,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.xAxisData,
      axisLine: {
        show: props.showAxisLine,
        lineStyle: { color: '#e0e0e0' }
      },
      axisLabel: {
        show: props.showAxisLabel,
        color: '#999'
      },
      axisTick: {
        alignWithLabel: true,
        lineStyle: { color: '#e0e0e0' }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: props.showAxisLine,
        lineStyle: { color: '#e0e0e0' }
      },
      axisLabel: {
        show: props.showAxisLabel,
        color: '#999'
      },
      axisTick: {
        lineStyle: { color: '#e0e0e0' }
      },
      splitLine: {
        show: props.showSplitLine,
        lineStyle: {
          color: '#f0f0f0',
          type: 'dashed'
        }
      }
    },
    series: createSeries() // 生成series
  }

  chartInstance.setOption(option, true) // 设置配置项并更新
}

// 监听窗口resize事件，图表自适应
const handleResize = () => {
  chartInstance?.resize()
}

// 监听props变化，重新渲染图表
watch(
  () => [
    props.data,
    props.xAxisData,
    props.colors,
    props.barWidth,
    props.borderRadius,
    props.stack,
    props.showLegend,
    props.legendPosition,
    props.showTooltip,
    props.showAxisLine,
    props.showAxisLabel,
    props.showSplitLine,
    props.isEmpty,
    props.enableGradient, // 监听渐变开关变化
    props.title, // 监听标题变化
    props.showTitle, // 监听标题显示变化
    props.titlePosition, // 监听标题位置变化
    props.titleStyle // 监听标题样式变化
  ],
  () => {
    renderChart()
  },
  { deep: true }
)

// 组件挂载时初始化图表并绑定resize事件
onMounted(() => {
  renderChart()
  window.addEventListener('resize', handleResize)
})

// 组件卸载时销毁图表并解绑事件
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<template>
  <div :style="{ height: props.height, width: '100%', position: 'relative' }" ref="chartRef">
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
        z-index: 10;
      "
    >
      加载中...
    </div>
  </div>
</template>
