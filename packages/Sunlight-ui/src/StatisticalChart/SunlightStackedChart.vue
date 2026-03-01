<!-- 双向堆叠柱状图组件，支持多组数据 -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 定义组件属性接口
interface DualBarCompareChartProps {
  // 数据配置
  positiveData: number[]  // 正向数据
  negativeData: number[]  // 负向数据
  xAxisData: string[]     // X轴数据
  height?: string         // 图表高度，默认350px
  
  // 样式配置
  colors?: string[]       // 颜色配置数组，默认['#4C87F3', '#8BD8FC']
  barWidth?: number       // 柱状图宽度，默认16
  positiveName?: string   // 正向数据名称，默认"正向数据"
  negativeName?: string   // 负向数据名称，默认"负向数据"
  yAxisMin?: number       // Y轴最小值，默认-100
  yAxisMax?: number       // Y轴最大值，默认100
  positiveBorderRadius?: number | number[]  // 正向数据圆角，默认[10, 10, 0, 0]
  negativeBorderRadius?: number | number[]  // 负向数据圆角，默认[0, 0, 10, 10]
  showDataLabel?: boolean // 是否显示数据标签，默认false
  
  // 标题配置
  title?: string          // 图表标题
  showTitle?: boolean     // 是否显示标题，默认false
  titlePosition?: 'top' | 'left' | 'right' | 'bottom' | 'center' // 标题位置，默认top
  titleStyle?: any        // 标题样式
  
  // 交互配置
  showLegend?: boolean    // 是否显示图例，默认false
  legendPosition?: 'bottom' | 'top' | 'left' | 'right' // 图例位置，默认bottom
  showTooltip?: boolean   // 是否显示提示框，默认true
  loading?: boolean       // 是否加载中，默认false
  
  // 轴线配置
  showAxisLine?: boolean  // 是否显示轴线，默认false
  showAxisLabel?: boolean // 是否显示轴标签，默认true
  showSplitLine?: boolean // 是否显示分割线，默认false
  
  // 空数据配置
  isEmpty?: boolean       // 是否为空，默认自动判断
}

// 定义默认属性值
const props = withDefaults(defineProps<DualBarCompareChartProps>(), {
  height: '350px',
  colors: () => ['#4C87F3', '#8BD8FC'],
  barWidth: 16,
  positiveName: '正向数据',
  negativeName: '负向数据',
  yAxisMin: -100,
  yAxisMax: 100,
  positiveBorderRadius: () => [10, 10, 0, 0],
  negativeBorderRadius: () => [0, 0, 10, 10],
  showDataLabel: false,
  title: '',
  showTitle: false,
  titlePosition: 'top',
  titleStyle: undefined,
  showLegend: false,
  legendPosition: 'bottom',
  showTooltip: true,
  loading: false,
  showAxisLine: false,
  showAxisLabel: true,
  showSplitLine: false,
  isEmpty: false
})

// 图表容器引用
const chartRef = ref<HTMLDivElement | null>(null)
// 图表实例
let chartInstance: echarts.ECharts | null = null

// 判断是否为空数据
const isEmpty = computed(() => {
  if (props.isEmpty) return true
  
  if (!props.positiveData.length || !props.negativeData.length || !props.xAxisData.length) {
    return true
  }
  
  return props.positiveData.every(val => val === 0) && props.negativeData.every(val => val === 0)
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
  
  // 处理负向数据，确保为负值
  const processedNegativeData = props.negativeData.map(val => (val > 0 ? -val : val))
  
  // 构建图表配置
  const option: echarts.EChartsOption = {
    // 颜色配置
    color: props.colors,
    
    // 标题配置
    title: props.showTitle && props.title ? {
      text: props.title,
      left: props.titlePosition,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        ...props.titleStyle
      }
    } : undefined,
    
    // 提示框配置
    tooltip: props.showTooltip ? {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: function(params: any) {
        let result = `${params[0].name}<br/>`
        params.forEach((item: any) => {
          const value = Math.abs(item.value)
          result += `${item.marker}${item.seriesName}: ${value}<br/>`
        })
        return result
      }
    } : undefined,
    
    // 图例配置
    legend: props.showLegend ? {
      data: [props.positiveName, props.negativeName],
      [props.legendPosition]: 0
    } : undefined,
    
    // 网格配置
    grid: {
      top: props.showTitle ? 60 : (props.showLegend && props.legendPosition === 'top' ? 40 : 20),
      left: props.showLegend && props.legendPosition === 'left' ? 80 : 40,
      right: props.showLegend && props.legendPosition === 'right' ? 80 : 20,
      bottom: props.showLegend && props.legendPosition === 'bottom' ? 40 : 20,
      containLabel: true
    },
    
    // X轴配置
    xAxis: {
      type: 'category',
      data: props.xAxisData,
      boundaryGap: true,
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
    
    // Y轴配置
    yAxis: {
      type: 'value',
      min: props.yAxisMin,
      max: props.yAxisMax,
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
    
    // 系列配置
    series: [
      // 负向数据系列
      {
        name: props.negativeName,
        type: 'bar',
        stack: 'total',
        barWidth: props.barWidth,
        barGap: '-100%',
        data: processedNegativeData,
        itemStyle: {
          borderRadius: props.negativeBorderRadius,
          color: props.colors[1]
        },
        label: {
          show: props.showDataLabel,
          position: 'bottom' as const,
          formatter: (params: any) => String(Math.abs(params.value)),
          color: '#999',
          fontSize: 12
        }
      },
      // 正向数据系列
      {
        name: props.positiveName,
        type: 'bar',
        stack: 'total',
        barWidth: props.barWidth,
        barGap: '-100%',
        data: props.positiveData,
        itemStyle: {
          borderRadius: props.positiveBorderRadius,
          color: props.colors[0]
        },
        label: {
          show: props.showDataLabel,
          position: 'top' as const,
          formatter: (params: any) => String(params.value),
          color: '#999',
          fontSize: 12
        }
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
    props.positiveData,
    props.negativeData,
    props.xAxisData,
    props.colors,
    props.barWidth,
    props.positiveName,
    props.negativeName,
    props.yAxisMin,
    props.yAxisMax,
    props.positiveBorderRadius,
    props.negativeBorderRadius,
    props.showDataLabel,
    props.title,
    props.showTitle,
    props.titlePosition,
    props.titleStyle,
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
.dual-bar-chart {
  position: relative;
  width: 100%;
}
</style>