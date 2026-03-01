<template>
  <div style="background-color: #ffffff; padding: 20px">
    <h2 style="margin-bottom: 20px; color: #333">柱状图多种风格使用案例</h2>

    <!-- 第一行：基础风格 -->
    <h3 style="margin: 30px 0 15px 0; color: #666; font-size: 18px">基础风格</h3>
    <el-row :gutter="20">
      <!-- 单数据示例 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">单数据示例</h4>
          <barChart
            :data="singleBarData"
            :x-axis-data="xAxisData"
            height="300px"
            :enableGradient="true"
            :show-legend="false"
          />
        </div>
      </el-col>
      <!-- 多数据示例 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">多数据示例</h4>
          <barChart
            :data="multiBarData"
            :x-axis-data="xAxisData"
            height="300px"
            :show-legend="true"
            :colors="['#5470C6', '#91CC75']"
          />
        </div>
      </el-col>

      <!-- 堆叠柱状图示例 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">堆叠柱状图示例</h4>
          <barChart
            :data="stackBarData"
            :x-axis-data="['一月', '二月', '三月', '四月', '五月']"
            height="300px"
            :stack="true"
            :show-legend="true"
            :colors="['#5470C6', '#91CC75']"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第二行：主题风格 -->
    <h3 style="margin: 30px 0 15px 0; color: #666; font-size: 18px">主题风格</h3>
    <el-row :gutter="20">
      <!-- 活力主题 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">活力主题</h4>
          <barChart
            :data="themeBarData"
            :x-axis-data="xAxisData"
            height="300px"
            :show-legend="true"
            :colors="['#FF6B6B', '#4ECDC4', '#45B7D1', '#F9CA24', '#6C5CE7']"
          />
        </div>
      </el-col>

      <!-- 科技主题 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">科技主题</h4>
          <barChart
            :data="themeBarData"
            :x-axis-data="xAxisData"
            height="300px"
            :show-legend="true"
            :colors="['#00C4FF', '#4361EE', '#3A0CA3', '#7209B7', '#F72585']"
          />
        </div>
      </el-col>

      <!-- 商务主题 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">商务主题</h4>
          <barChart
            :data="themeBarData"
            :x-axis-data="xAxisData"
            height="300px"
            :show-legend="true"
            :colors="['#2C3E50', '#3498DB', '#E74C3C', '#F39C12', '#9B59B6']"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第三行：特殊配置 -->
    <h3 style="margin: 30px 0 15px 0; color: #666; font-size: 18px">特殊配置</h3>
    <el-row :gutter="20">
      <!-- 细柱子示例 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">细柱子示例</h4>
          <barChart
            :data="singleBarData"
            :x-axis-data="xAxisData"
            height="300px"
            bar-width="20%"
            :show-legend="false"
          />
        </div>
      </el-col>

      <!-- 粗柱子示例 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">粗柱子示例</h4>
          <barChart
            :data="singleBarData"
            :x-axis-data="xAxisData"
            height="300px"
            bar-width="60%"
            :show-legend="false"
          />
        </div>
      </el-col>

      <!-- 无边线示例 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">无边线示例</h4>
          <barChart
            :data="singleBarData"
            :x-axis-data="xAxisData"
            height="300px"
            :show-legend="false"
            :show-axis-line="false"
            :show-split-line="false"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第四行：不同高度和布局 -->
    <h3 style="margin: 30px 0 15px 0; color: #666; font-size: 18px">不同高度和布局</h3>
    <el-row :gutter="20">
      <!-- 低高度示例 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">低高度示例</h4>
          <barChart :data="singleBarData" :x-axis-data="xAxisData" height="200px" :show-legend="false" />
        </div>
      </el-col>

      <!-- 高高示例 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">高高度示例</h4>
          <barChart :data="singleBarData" :x-axis-data="xAxisData" height="400px" :show-legend="false" />
        </div>
      </el-col>

      <!-- 四系列示例 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">四系列示例</h4>
          <barChart :data="fourSeriesData" :x-axis-data="['Q1', 'Q2', 'Q3', 'Q4']" height="300px" :show-legend="true" />
        </div>
      </el-col>
    </el-row>

    <!-- 第五行：折线图示例 -->
    <h2 style="margin: 40px 0 20px 0; color: #333">折线图多种风格使用案例</h2>
    <el-row :gutter="20">
      <!-- 单系列折线图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">单系列折线图</h4>
          <lineChart
            :data="singleLineData"
            :x-axis-data="xAxisData"
            height="300px"
            :smooth="true"
            :symbol="'circle'"
            :symbol-size="6"
          />
        </div>
      </el-col>

      <!-- 多系列折线图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">多系列折线图</h4>
          <lineChart
            :data="multiLineData"
            :x-axis-data="xAxisData"
            height="300px"
            :show-legend="true"
            :colors="['#409EFF', '#67C23A', '#E6A23C']"
          />
        </div>
      </el-col>

      <!-- 区域填充折线图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">区域填充折线图</h4>
          <lineChart
            :data="areaLineData"
            :x-axis-data="xAxisData"
            height="300px"
            :show-legend="true"
            :colors="['#409EFF', '#67C23A']"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第六行：kLineChart 示例 -->
    <h2 style="margin: 40px 0 20px 0; color: #333">kLineChart 多种风格使用案例</h2>
    <el-row :gutter="20">
      <!-- 基础 K线图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">基础 K线图</h4>
          <kLineChart :data="basicKLineData" height="300px" />
        </div>
      </el-col>

      <!-- 带数据缩放的 K线图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">带数据缩放的 K线图</h4>
          <kLineChart :data="basicKLineData" height="300px" :show-data-zoom="true" />
        </div>
      </el-col>

      <!-- 多系列 K线图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">多系列 K线图</h4>
          <kLineChart :data="multiKLineData" height="300px" :show-legend="true" />
        </div>
      </el-col>
    </el-row>

    <!-- 第七行：K线图特殊样式 -->
    <h3 style="margin: 30px 0 15px 0; color: #666; font-size: 18px">K线图特殊样式</h3>
    <el-row :gutter="20">
      <!-- 紧凑布局 K线图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">紧凑布局 K线图</h4>
          <kLineChart :data="basicKLineData" height="250px" :show-split-line="false" />
        </div>
      </el-col>

      <!-- 详细信息 K线图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">详细信息 K线图</h4>
          <kLineChart :data="detailedKLineData" height="350px" :show-data-zoom="true" />
        </div>
      </el-col>

      <!-- 自定义颜色 K线图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">自定义颜色 K线图</h4>
          <kLineChart :data="basicKLineData" height="300px" :colors="['#FF6B6B', '#4ECDC4']" />
        </div>
      </el-col>
    </el-row>

    <!-- 第八行：散点图示例 -->
    <h2 style="margin: 40px 0 20px 0; color: #333">散点图多种风格使用案例</h2>
    <el-row :gutter="20">
      <!-- 基础散点图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">基础散点图</h4>
          <scatteChart :data="basicScatterData" height="300px" />
        </div>
      </el-col>

      <!-- 多系列散点图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">多系列散点图</h4>
          <scatteChart :data="multiScatterData" height="300px" :show-legend="true" :colors="['#409EFF', '#67C23A']" />
        </div>
      </el-col>

      <!-- 自定义大小散点图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">自定义大小散点图</h4>
          <scatteChart :data="sizeScatterData" height="300px" :symbol-size="20" :colors="['#E6A23C']" />
        </div>
      </el-col>
    </el-row>

    <!-- 第九行：散点图特殊样式 -->
    <h3 style="margin: 30px 0 15px 0; color: #666; font-size: 18px">散点图特殊样式</h3>
    <el-row :gutter="20">
      <!-- 自定义颜色散点图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">自定义颜色散点图</h4>
          <scatteChart
            :data="multiScatterData"
            height="300px"
            :show-legend="true"
            :colors="['#FF6B6B', '#4ECDC4', '#45B7D1', '#F9CA24', '#6C5CE7']"
          />
        </div>
      </el-col>

      <!-- 无网格线散点图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">无网格线散点图</h4>
          <scatteChart :data="basicScatterData" height="300px" :show-split-line="false" :colors="['#9C27B0']" />
        </div>
      </el-col>

      <!-- 顶部图例散点图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">顶部图例散点图</h4>
          <scatteChart
            :data="multiScatterData"
            height="300px"
            :show-legend="true"
            legend-position="top"
            :colors="['#3498DB', '#E74C3C']"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第十行：双向堆叠柱状图示例 -->
    <h2 style="margin: 40px 0 20px 0; color: #333">双向堆叠柱状图多种风格使用案例</h2>
    <el-row :gutter="20">
      <!-- 基础双向堆叠柱状图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">基础双向堆叠柱状图</h4>
          <dualBarCompareChart
            :positive-data="positiveData"
            :negative-data="negativeData"
            :x-axis-data="dualBarXAxisData"
            height="300px"
          />
        </div>
      </el-col>

      <!-- 带图例的双向堆叠柱状图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">带图例的双向堆叠柱状图</h4>
          <dualBarCompareChart
            :positive-data="positiveData"
            :negative-data="negativeData"
            :x-axis-data="dualBarXAxisData"
            height="300px"
            :show-legend="true"
            :positive-name="'收入'"
            :negative-name="'支出'"
            :colors="['#4CAF50', '#FF5252']"
          />
        </div>
      </el-col>

      <!-- 带数据标签的双向堆叠柱状图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">带数据标签的双向堆叠柱状图</h4>
          <dualBarCompareChart
            :positive-data="positiveData"
            :negative-data="negativeData"
            :x-axis-data="dualBarXAxisData"
            height="300px"
            :show-data-label="true"
            :positive-name="'增长'"
            :negative-name="'下降'"
            :colors="['#2196F3', '#FF9800']"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第十一行：双向堆叠柱状图特殊样式 -->
    <h3 style="margin: 30px 0 15px 0; color: #666; font-size: 18px">双向堆叠柱状图特殊样式</h3>
    <el-row :gutter="20">
      <!-- 自定义圆角的双向堆叠柱状图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">自定义圆角的双向堆叠柱状图</h4>
          <dualBarCompareChart
            :positive-data="positiveData"
            :negative-data="negativeData"
            :x-axis-data="dualBarXAxisData"
            height="300px"
            :positive-border-radius="[5, 5, 0, 0]"
            :negative-border-radius="[0, 0, 5, 5]"
            :colors="['#9C27B0', '#FFEB3B']"
          />
        </div>
      </el-col>

      <!-- 带网格线的双向堆叠柱状图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">带网格线的双向堆叠柱状图</h4>
          <dualBarCompareChart
            :positive-data="positiveData"
            :negative-data="negativeData"
            :x-axis-data="dualBarXAxisData"
            height="300px"
            :show-split-line="true"
            :colors="['#3F51B5', '#FF4081']"
          />
        </div>
      </el-col>

      <!-- 自定义Y轴范围的双向堆叠柱状图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">自定义Y轴范围的双向堆叠柱状图</h4>
          <dualBarCompareChart
            :positive-data="positiveData"
            :negative-data="negativeData"
            :x-axis-data="dualBarXAxisData"
            height="300px"
            :y-axis-min="-150"
            :y-axis-max="150"
            :colors="['#00BCD4', '#FF5722']"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第十二行：雷达图示例 -->
    <h2 style="margin: 40px 0 20px 0; color: #333">雷达图多种风格使用案例</h2>
    <el-row :gutter="20">
      <!-- 基础雷达图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">基础雷达图</h4>
          <radarChart :indicator="radarIndicator" :data="basicRadarData" height="300px" />
        </div>
      </el-col>

      <!-- 带图例的雷达图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">带图例的雷达图</h4>
          <radarChart
            :indicator="radarIndicator"
            :data="multiRadarData"
            height="300px"
            :show-legend="true"
            :colors="['#409EFF', '#67C23A', '#E6A23C']"
          />
        </div>
      </el-col>

      <!-- 自定义样式的雷达图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">自定义样式的雷达图</h4>
          <radarChart
            :indicator="radarIndicator"
            :data="customRadarData"
            height="300px"
            :show-legend="true"
            :colors="['#9C27B0', '#FF5722', '#00BCD4']"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第十三行：雷达图特殊样式 -->
    <h3 style="margin: 30px 0 15px 0; color: #666; font-size: 18px">雷达图特殊样式</h3>
    <el-row :gutter="20">
      <!-- 产品评估雷达图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">产品评估雷达图</h4>
          <radarChart
            :indicator="productIndicator"
            :data="productRadarData"
            height="300px"
            :show-legend="true"
            :colors="['#FF6B6B', '#4ECDC4']"
          />
        </div>
      </el-col>

      <!-- 顶部图例雷达图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">顶部图例雷达图</h4>
          <radarChart
            :indicator="radarIndicator"
            :data="multiRadarData"
            height="300px"
            :show-legend="true"
            legend-position="top"
            :colors="['#3498DB', '#E74C3C', '#9B59B6']"
          />
        </div>
      </el-col>

      <!-- 精简指标雷达图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">精简指标雷达图</h4>
          <radarChart
            :indicator="simpleIndicator"
            :data="simpleRadarData"
            height="300px"
            :show-legend="true"
            :colors="['#2196F3', '#FF9800']"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第十四行：环形图示例 -->
    <h2 style="margin: 40px 0 20px 0; color: #333">环形图多种风格使用案例</h2>
    <el-row :gutter="20">
      <!-- 基础环形图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">基础环形图</h4>
          <ringChart :data="basicRingData" height="300px" />
        </div>
      </el-col>

      <!-- 带中心文字的环形图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">带中心文字的环形图</h4>
          <ringChart :data="basicRingData" height="300px" center-text="总销售额\n1000万" />
        </div>
      </el-col>

      <!-- 带图例的环形图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">带图例的环形图</h4>
          <ringChart
            :data="basicRingData"
            height="300px"
            :show-legend="true"
            :colors="['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第十五行：环形图特殊样式 -->
    <h3 style="margin: 30px 0 15px 0; color: #666; font-size: 18px">环形图特殊样式</h3>
    <el-row :gutter="20">
      <!-- 带标签的环形图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">带标签的环形图</h4>
          <ringChart :data="basicRingData" height="300px" :show-label="true" />
        </div>
      </el-col>

      <!-- 自定义半径的环形图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">自定义半径的环形图</h4>
          <ringChart :data="basicRingData" height="300px" :radius="['30%', '70%']" center-text="自定义半径" />
        </div>
      </el-col>

      <!-- 底部图例的环形图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">底部图例的环形图</h4>
          <ringChart
            :data="basicRingData"
            height="300px"
            :show-legend="true"
            legend-position="bottom"
            :colors="['#FF6B6B', '#4ECDC4', '#45B7D1', '#F9CA24', '#6C5CE7']"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 第十六行：饼状图示例 -->
    <h3 style="margin: 30px 0 15px 0; color: #666; font-size: 18px">饼状图特殊样式</h3>
    <el-row :gutter="20">
      <!-- 小型饼状图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">小型饼状图</h4>
          <ringChart :data="basicRingData" height="200px" :radius="['0%', '80%']" />
        </div>
      </el-col>

      <!-- 彩色饼状图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">彩色饼状图</h4>
          <ringChart
            :data="basicRingData"
            height="300px"
            :radius="['0%', '80%']"
            :colors="['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']"
          />
        </div>
      </el-col>

      <!-- 半圆饼状图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">半圆饼状图</h4>
          <ringChart :data="basicRingData" height="300px" :radius="['40%', '70%']" center-text="半圆展示" />
        </div>
      </el-col>
    </el-row>

    <!-- 第十六行：水平柱状图示例 -->
    <h2 style="margin: 40px 0 20px 0; color: #333">水平柱状图多种风格使用案例</h2>
    <el-row :gutter="20">
      <!-- 基础水平柱状图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">基础水平柱状图</h4>
          <hBarChart :data="basicHBarData" :x-axis-data="hBarXAxisData" height="300px" />
        </div>
      </el-col>

      <!-- 多系列水平柱状图 -->
      <el-col :xs="24" :sm="12" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">多系列水平柱状图</h4>
          <hBarChart
            :data="multiHBarData"
            :x-axis-data="hBarXAxisData"
            height="300px"
            :show-legend="true"
            :colors="['#409EFF', '#67C23A']"
          />
        </div>
      </el-col>

      <!-- 堆叠水平柱状图 -->
      <el-col :xs="24" :sm="24" :md="8">
        <div
          style="
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <h4 style="margin-bottom: 15px; color: #666; font-size: 16px">堆叠水平柱状图</h4>
          <hBarChart
            :data="stackHBarData"
            :x-axis-data="hBarXAxisData"
            height="300px"
            :stack="true"
            :show-legend="true"
            :colors="['#E6A23C', '#F56C6C']"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import barChart from './components/barChart.vue'
import lineChart from './components/lineChart.vue'
import kLineChart from './components/kLineChart.vue'
import scatteChart from './components/scatteChart.vue'
import dualBarCompareChart from './components/dualBarCompareChart.vue'
import radarChart from './components/radarChart.vue'
import ringChart from './components/ringChart.vue'
import hBarChart from './components/hBarChart.vue'




// 单数据示例
const singleBarData = ref([120, 200, 150, 80, 70, 110, 130])
const xAxisData = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日'])

// 多数据示例
const multiBarData = ref([
  {
    name: '销售额',
    data: [120, 200, 150, 80, 70, 110, 130]
  },
  {
    name: '利润',
    data: [20, 50, 30, 15, 10, 25, 35]
  }
])

// 堆叠柱状图示例
const stackBarData = ref([
  {
    name: 'Q1',
    data: [20, 25, 30, 35, 40],
    stack: 'total'
  },
  {
    name: 'Q2',
    data: [30, 35, 40, 45, 50],
    stack: 'total'
  }
])

// 主题示例数据
const themeBarData = ref([
  {
    name: '系列1',
    data: [120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: '系列2',
    data: [220, 182, 191, 234, 290, 330, 310]
  }
])

// 四系列示例数据
const fourSeriesData = ref([
  {
    name: '产品A',
    data: [120, 200, 150, 80]
  },
  {
    name: '产品B',
    data: [220, 182, 191, 234]
  },
  {
    name: '产品C',
    data: [150, 232, 201, 154]
  },
  {
    name: '产品D',
    data: [320, 332, 301, 334]
  }
])

// 折线图示例数据
const singleLineData = ref([120, 200, 150, 80, 70, 110, 130])
const multiLineData = ref([
  {
    name: '销售额',
    data: [120, 200, 150, 80, 70, 110, 130]
  },
  {
    name: '利润',
    data: [20, 50, 30, 15, 10, 25, 35]
  },
  {
    name: '成本',
    data: [100, 150, 120, 65, 60, 85, 95]
  }
])
const areaLineData = ref([
  {
    name: '销售额',
    data: [120, 200, 150, 80, 70, 110, 130],
    areaStyle: true
  },
  {
    name: '利润',
    data: [20, 50, 30, 15, 10, 25, 35],
    areaStyle: true
  }
])

// kLineChart 示例数据
const basicKLineData = ref([
  { time: '09:00', open: 100, close: 105, low: 98, high: 106 },
  { time: '10:00', open: 105, close: 110, low: 103, high: 112 },
  { time: '11:00', open: 110, close: 108, low: 107, high: 111 },
  { time: '14:00', open: 108, close: 115, low: 106, high: 116 },
  { time: '15:00', open: 115, close: 120, low: 114, high: 122 },
  { time: '16:00', open: 120, close: 118, low: 117, high: 121 },
  { time: '17:00', open: 118, close: 125, low: 116, high: 126 }
])

const multiKLineData = ref([
  {
    name: '股票A',
    data: [
      { time: '09:00', open: 100, close: 105, low: 98, high: 106 },
      { time: '10:00', open: 105, close: 110, low: 103, high: 112 },
      { time: '11:00', open: 110, close: 108, low: 107, high: 111 },
      { time: '14:00', open: 108, close: 115, low: 106, high: 116 },
      { time: '15:00', open: 115, close: 120, low: 114, high: 122 }
    ]
  },
  {
    name: '股票B',
    data: [
      { time: '09:00', open: 200, close: 205, low: 198, high: 206 },
      { time: '10:00', open: 205, close: 210, low: 203, high: 212 },
      { time: '11:00', open: 210, close: 208, low: 207, high: 211 },
      { time: '14:00', open: 208, close: 215, low: 206, high: 216 },
      { time: '15:00', open: 215, close: 220, low: 214, high: 222 }
    ]
  }
])

const detailedKLineData = ref([
  { time: '09:00', open: 100, close: 105, low: 98, high: 106 },
  { time: '09:30', open: 105, close: 108, low: 104, high: 109 },
  { time: '10:00', open: 108, close: 110, low: 107, high: 112 },
  { time: '10:30', open: 110, close: 107, low: 106, high: 111 },
  { time: '11:00', open: 107, close: 109, low: 105, high: 110 },
  { time: '14:00', open: 109, close: 115, low: 108, high: 116 },
  { time: '14:30', open: 115, close: 118, low: 114, high: 119 },
  { time: '15:00', open: 118, close: 120, low: 117, high: 122 },
  { time: '15:30', open: 120, close: 119, low: 118, high: 121 },
  { time: '16:00', open: 119, close: 123, low: 117, high: 124 },
  { time: '16:30', open: 123, close: 121, low: 120, high: 125 },
  { time: '17:00', open: 121, close: 125, low: 120, high: 126 }
])

// 散点图示例数据
const basicScatterData = ref([
  { value: [10, 20] },
  { value: [20, 30] },
  { value: [30, 40] },
  { value: [40, 50] },
  { value: [50, 60] },
  { value: [60, 70] },
  { value: [70, 80] },
  { value: [80, 90] },
  { value: [90, 100] },
  { value: [100, 110] }
])

const multiScatterData = ref([
  {
    name: '系列1',
    data: [{ value: [10, 20] }, { value: [20, 40] }, { value: [30, 60] }, { value: [40, 80] }, { value: [50, 100] }]
  },
  {
    name: '系列2',
    data: [{ value: [20, 10] }, { value: [40, 30] }, { value: [60, 50] }, { value: [80, 70] }, { value: [100, 90] }]
  }
])

const sizeScatterData = ref([
  { value: [15, 25] },
  { value: [25, 35] },
  { value: [35, 45] },
  { value: [45, 55] },
  { value: [55, 65] },
  { value: [65, 75] },
  { value: [75, 85] }
])

// 双向堆叠柱状图示例数据
const positiveData = ref([65, 78, 90, 85, 76, 92, 88])
const negativeData = ref([45, 58, 65, 52, 48, 60, 55])
const dualBarXAxisData = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日'])

// 雷达图示例数据
const radarIndicator = ref([
  { name: '销售', max: 100 },
  { name: '市场', max: 100 },
  { name: '研发', max: 100 },
  { name: '客服', max: 100 },
  { name: '财务', max: 100 },
  { name: '人事', max: 100 }
])

const basicRadarData = ref([
  {
    name: '公司A',
    value: [80, 70, 90, 60, 85, 75]
  }
])

const multiRadarData = ref([
  {
    name: '公司A',
    value: [80, 70, 90, 60, 85, 75]
  },
  {
    name: '公司B',
    value: [70, 80, 60, 90, 75, 85]
  },
  {
    name: '公司C',
    value: [90, 60, 80, 70, 65, 90]
  }
])

const customRadarData = ref([
  {
    name: '公司A',
    value: [80, 70, 90, 60, 85, 75],
    symbolSize: 6,
    lineStyle: {
      width: 3
    },
    areaStyle: {
      opacity: 0.2
    }
  },
  {
    name: '公司B',
    value: [70, 80, 60, 90, 75, 85],
    symbolSize: 6,
    lineStyle: {
      width: 3
    },
    areaStyle: {
      opacity: 0.2
    }
  },
  {
    name: '公司C',
    value: [90, 60, 80, 70, 65, 90],
    symbolSize: 6,
    lineStyle: {
      width: 3
    },
    areaStyle: {
      opacity: 0.2
    }
  }
])

// 产品评估雷达图数据
const productIndicator = ref([
  { name: '功能', max: 100 },
  { name: '性能', max: 100 },
  { name: '易用性', max: 100 },
  { name: '稳定性', max: 100 },
  { name: '美观度', max: 100 },
  { name: '性价比', max: 100 }
])

const productRadarData = ref([
  {
    name: '产品X',
    value: [85, 90, 80, 95, 85, 90]
  },
  {
    name: '产品Y',
    value: [75, 80, 90, 85, 95, 80]
  }
])

// 精简指标雷达图数据
const simpleIndicator = ref([
  { name: '效率', max: 100 },
  { name: '质量', max: 100 },
  { name: '成本', max: 100 },
  { name: '创新', max: 100 }
])

const simpleRadarData = ref([
  {
    name: '团队A',
    value: [90, 85, 75, 95]
  },
  {
    name: '团队B',
    value: [80, 90, 95, 75]
  }
])

// 环形图示例数据
const basicRingData = ref([
  { name: '类别1', value: 300 },
  { name: '类别2', value: 200 },
  { name: '类别3', value: 150 },
  { name: '类别4', value: 100 },
  { name: '类别5', value: 50 }
])

// 水平柱状图示例数据
const hBarXAxisData = ref(['类别1', '类别2', '类别3', '类别4', '类别5', '类别6', '类别7'])

const basicHBarData = ref([120, 200, 150, 80, 70, 110, 130])

const multiHBarData = ref([
  {
    name: '系列1',
    data: [120, 200, 150, 80, 70, 110, 130]
  },
  {
    name: '系列2',
    data: [80, 150, 120, 50, 40, 80, 90]
  }
])

const stackHBarData = ref([
  {
    name: '部分1',
    data: [60, 100, 75, 40, 35, 55, 65]
  },
  {
    name: '部分2',
    data: [60, 100, 75, 40, 35, 55, 65]
  }
])
</script>
