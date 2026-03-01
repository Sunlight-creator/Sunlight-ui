<!-- K线图组件，支持多组数据 -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 定义K线数据类型
interface KLineDataItem {
  time: string        // 时间
  open: number        // 开盘价
  close: number       // 收盘价
  low: number         // 最低价
  high: number        // 最高价
}

// 定义单系列数据类型
type SingleKLineData = KLineDataItem[]

// 定义多系列数据项类型
interface KLineSeriesItem {
  name: string          // 系列名称
  data: KLineDataItem[]  // 系列数据
  color?: string         // 系列颜色
}

// 定义组件属性接口
interface KLineChartProps {
  // 数据配置
  data: SingleKLineData | KLineSeriesItem[]  // 支持单系列和多系列数据
  height?: string                           // 图表高度，默认350px
  
  // 样式配置
  colors?: string[]                         // 颜色配置数组，默认['#4C87F3', '#8BD8FC']
  
  // 交互配置
  showLegend?: boolean                      // 是否显示图例，默认false
  legendPosition?: 'bottom' | 'top' | 'left' | 'right' // 图例位置，默认bottom
  showTooltip?: boolean                     // 是否显示提示框，默认true
  loading?: boolean                         // 是否加载中，默认false
  showDataZoom?: boolean                    // 是否显示数据缩放，默认false
  dataZoomStart?: number                    // 数据缩放起始位置，默认0
  dataZoomEnd?: number                      // 数据缩放结束位置，默认100
  
  // 轴线配置
  showAxisLine?: boolean                    // 是否显示轴线，默认true
  showAxisLabel?: boolean                   // 是否显示轴标签，默认true
  showSplitLine?: boolean                   // 是否显示分割线，默认true
  
  // 空数据配置
  isEmpty?: boolean                         // 是否为空，默认自动判断
  
  // 标题配置
  title?: string                            // 图表标题
  showTitle?: boolean                       // 是否显示标题
  titlePosition?: 'left' | 'center' | 'right' // 标题位置
  titleStyle?: {
    fontSize?: string | number
    fontWeight?: string | number
    color?: string
    padding?: number | number[]
  } // 标题样式
}

// 定义默认属性值
const props = withDefaults(defineProps<KLineChartProps>(), {
  height: '350px',
  colors: () => ['#4C87F3', '#8BD8FC'],
  showLegend: false,
  legendPosition: 'bottom',
  showTooltip: true,
  loading: false,
  showDataZoom: false,
  dataZoomStart: 0,
  dataZoomEnd: 100,
  showAxisLine: true,
  showAxisLabel: true,
  showSplitLine: true,
  isEmpty: false,
  title: '',
  showTitle: false,
  titlePosition: 'center',
  titleStyle: () => ({})
})

// 图表容器引用
const chartRef = ref<HTMLDivElement | null>(null)
// 图表实例
let chartInstance: echarts.ECharts | null = null

// 判断是否是多系列数据
const isMultipleSeries = computed(() => {
  return Array.isArray(props.data) && 
         props.data.length > 0 && 
         typeof props.data[0] === 'object' && 
         'name' in (props.data[0] as any)
})

// 判断是否为空数据
const isEmpty = computed(() => {
  if (props.isEmpty) return true
  
  if (!props.data || (Array.isArray(props.data) && props.data.length === 0)) return true
  
  if (isMultipleSeries.value) {
    const multiData = props.data as KLineSeriesItem[]
    return multiData.every(item => !item.data || item.data.length === 0)
  } else {
    const singleData = props.data as SingleKLineData
    return singleData.length === 0
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
    const multiData = props.data as KLineSeriesItem[]
    return multiData.map((item, index) => {
      const color = getColor(item.color, index)
      return {
        name: item.name,
        type: 'candlestick',
        data: item.data.map(klineItem => [
          klineItem.open,
          klineItem.close,
          klineItem.low,
          klineItem.high
        ]),
        itemStyle: {
          color: '#ef5350',
          color0: '#66bb6a',
          borderColor: '#ef5350',
          borderColor0: '#66bb6a'
        }
      }
    })
  } 
  // 单系列数据处理
  else {
    const singleData = props.data as SingleKLineData
    return [
      {
        name: 'K线',
        type: 'candlestick',
        data: singleData.map(klineItem => [
          klineItem.open,
          klineItem.close,
          klineItem.low,
          klineItem.high
        ]),
        itemStyle: {
          color: '#ef5350',
          color0: '#66bb6a',
          borderColor: '#ef5350',
          borderColor0: '#66bb6a'
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
  
  // 准备X轴数据
  let xAxisData: string[] = []
  if (isMultipleSeries.value) {
    const multiData = props.data as KLineSeriesItem[]
    if (multiData.length > 0 && multiData[0].data.length > 0) {
      xAxisData = multiData[0].data.map(item => item.time)
    }
  } else {
    const singleData = props.data as SingleKLineData
    xAxisData = singleData.map(item => item.time)
  }
   
  // 构建图表配置
  const option: echarts.EChartsOption = {
    // 标题配置
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
    
    // 颜色配置
    color: props.colors,
    
    // 提示框配置
    tooltip: props.showTooltip ? {
      trigger: 'axis',
      axisPointer: { 
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function(params: any) {
        const data = params[0].data
        return `
          <div style="padding: 10px;">
            <div>${params[0].name}</div>
            <div>开盘: ${data[0]}</div>
            <div>收盘: ${data[1]}</div>
            <div>最低: ${data[2]}</div>
            <div>最高: ${data[3]}</div>
          </div>
        `
      }
    } : undefined,
    
    // 图例配置
    legend: props.showLegend && isMultipleSeries.value ? {
      data: (props.data as KLineSeriesItem[]).map(item => item.name),
      [props.legendPosition]: 0
    } : undefined,
    
    // 数据缩放配置
    dataZoom: props.showDataZoom ? [
      {
        type: 'inside',
        start: props.dataZoomStart,
        end: props.dataZoomEnd
      },
      {
        start: props.dataZoomStart,
        end: props.dataZoomEnd
      }
    ] : undefined,
    
    // 网格配置
    grid: {
      top: (props.showTitle ? 60 : 20) + (props.showLegend && props.legendPosition === 'top' ? 40 : 0),
      left: props.showLegend && props.legendPosition === 'left' ? 80 : 40,
      right: props.showLegend && props.legendPosition === 'right' ? 80 : 20,
      bottom: props.showLegend && props.legendPosition === 'bottom' ? 40 : 20,
      containLabel: true
    },
    
    // X轴配置
    xAxis: {
      type: 'category',
      data: xAxisData,
      boundaryGap: false,
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
    props.colors,
    props.showLegend,
    props.legendPosition,
    props.showTooltip,
    props.showDataZoom,
    props.dataZoomStart,
    props.dataZoomEnd,
    props.showAxisLine,
    props.showAxisLabel,
    props.showSplitLine,
    props.isEmpty,
    props.title,
    props.showTitle,
    props.titlePosition,
    props.titleStyle
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