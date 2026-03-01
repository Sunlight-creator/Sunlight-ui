<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import { animate } from "../../utils/tool";

// 定义组件属性
const props = withDefaults(
  defineProps<{
    /** 数值 */
    count: number;
    /** 标题 */
    title: string;
    /** 百分比 */
    changeRate: number;
    /** 百分比标签 */
    changeRateLabel?: string;
    /** 当前年份 */
    currentYear?: string;
    /** 去年年份 */
    previousYear?: string;
    /** 高度 */
    cardHeight?: string | number;
    /** 颜色 */
    chartColor?: string;
    /** 半径，默认 ["70%", "90%"] */
    chartRadius?: [string, string];
    /** 数据，默认 [0, 0] */
    chartData?: [number, number];
  }>(),
  {
    changeRateLabel: "",
    currentYear: "",
    previousYear: "",
    cardHeight: 9,
    chartColor: "",
    chartRadius: () => ["70%", "90%"],
    chartData: () => [0, 0],
  },
);

// 图表实例
const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

// 数值动画
const countValue = ref(0);

// 格式化高度
const formatHeight = (height: string | number): string => {
  if (typeof height === "string") {
    return height;
  }
  return `${height}rem`;
};

// 格式化数字
const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

// 生成图表配置
const generateChartOptions = (): EChartsOption => {
  const defaultColor = "#409eff";
  const colorPrimary = props.chartColor || defaultColor;
  const colorSecondary = "#e6e8f7";

  return {
    series: [
      {
        type: "pie",
        radius: props.chartRadius,
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          {
            value: props.chartData[0],
            name: props.currentYear,
            itemStyle: { color: colorPrimary },
          },
          {
            value: props.chartData[1],
            name: props.previousYear,
            itemStyle: { color: colorSecondary },
          },
        ],
      },
    ],
  };
};

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    updateChart();
  }
};

// 更新图表
const updateChart = () => {
  if (chartInstance) {
    const options = generateChartOptions();
    chartInstance.setOption(options);
  }
};

// 监听窗口大小变化
const handleResize = () => {
  chartInstance?.resize();
};

// 监听属性变化
watch(
  () => [
    props.chartData,
    props.chartColor,
    props.chartRadius,
  ],
  () => {
    updateChart();
  },
  { deep: true },
);

// 生命周期钩子
onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
  
  // 添加数字滚动动画
  if (props.count !== null) {
    animate(0, props.count, 1000, (value) => {
      countValue.value = Math.floor(value);
    });
  }
});

// 计算最终高度
const finalHeight = formatHeight(props.cardHeight);

// 计算百分比样式
const percentageClass = {
  positive: props.changeRate > 0,
  negative: props.changeRate < 0,
};
</script>

<template>
  <div class="donut-chart-card" :style="{ height: finalHeight }">
    <div class="card-content">
      <div class="data-section">
        <h3 class="title">{{ title }}</h3>
        <div class="value-section">
          <p class="value">{{ formatNumber(countValue) }}</p>
          <div class="percentage" :class="percentageClass">
            {{ changeRate > 0 ? "+" : "" }}{{ changeRate }}%
            <span v-if="changeRateLabel" class="percentage-label">{{
              changeRateLabel
            }}</span>
          </div>
        </div>
        <div class="legend" v-if="currentYear || previousYear">
          <span class="legend-item current" v-if="currentYear">{{
            currentYear
          }}</span>
          <span class="legend-item previous" v-if="previousYear">{{
            previousYear
          }}</span>
        </div>
      </div>
      <div class="chart-section">
        <div ref="chartRef" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 主容器 */
.donut-chart-card {
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
  align-items: center;
  gap: 20px;
  height: 100%;
}

/* 数据部分 */
.data-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 标题 */
.title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin: 0;
}

/* 数值部分 */
.value-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* 数值 */
.value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  line-height: 1.2;
}

/* 百分比 */
.percentage {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.percentage.positive {
  color: #67c23a;
}

.percentage.negative {
  color: #f56c6c;
}

/* 百分比标签 */
.percentage-label {
  font-size: 12px;
  font-weight: 400;
  color: #909399;
}

/* 图例 */
.legend {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

/* 图例项 */
.legend-item {
  font-size: 12px;
  color: #909399;
}

.legend-item.current {
  font-weight: 500;
  color: #303133;
}

/* 图表部分 */
.chart-section {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

/* 图表容器 */
.chart-container {
  width: 100%;
  height: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .donut-chart-card {
    padding: 12px;
  }

  .card-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .chart-section {
    width: 80px;
    height: 80px;
    align-self: center;
  }

  .value {
    font-size: 20px;
  }
}
</style>
