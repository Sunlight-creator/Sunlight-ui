<template>
  <div>
    <h1>卡片组件展示</h1>
    <el-row :gutter="20" style="margin-bottom: 100px">
      <el-col :xs="24" :sm="12" :lg="8">
        <SunlightListCard :list="dataList" title="工作任务" subtitle="本周待完成工作" />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8">
        <SunlightListCard
          :maxCount="4"
          :list="dataList"
          title="团队动态"
          subtitle="最新团队活动"
          :showMoreButton="true"
          @more="handleMore"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6" v-for="card in statsCards" :key="card.id">
        <SunlightBasicCard
          :icon="card.icon"
          :count="card.count"
          :description="card.description"
          :iconSize="card.iconSize"
          iconColor="#fff"
          :iconBgColor="card.iconBgColor"
          :showArrow="card.showArrow"
        />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6" v-for="card in statsCards" :key="card.id">
        <SunlightBasicCard
          :icon="card.icon"
          :title="card.title"
          :description="card.description"
          :iconColor="card.iconColor"
          :textColor="card.textColor"
          :backgroundColor="card.backgroundColor"
          :showArrow="card.showArrow"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6" v-for="card in progressCards" :key="card.id">
        <SunlightProgressCard
          :percentage="card.percentage"
          :title="card.title"
          :color="card.color"
          :icon="card.icon"
          :iconColor="card.iconColor"
          :iconBgColor="card.iconBgColor"
          :iconSize="card.iconSize"
          :iconBgRadius="8"
        />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6" v-for="card in progressCards" :key="card.id">
        <SunlightProgressCard :percentage="card.percentage" :title="card.title" :color="card.color" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ShoppingCart, User, Money, ChatDotRound } from '@element-plus/icons-vue'
import { ElRow, ElCol } from 'element-plus'
import { Check, Monitor, MilkTea, Ticket, Document, Filter } from '@element-plus/icons-vue'
import { SunlightBasicCard, SunlightListCard, SunlightProgressCard } from 'sunlight-ui'

const progressCards = [
  {
    id: 1,
    title: '销售目标',
    percentage: 85,
    color: '#52c41a',
    icon: Check,
    iconColor: '#52c41a',
    iconBgColor: '#E6F0FF',
    iconSize: 20
  },
  {
    id: 2,
    title: '开发进度',
    percentage: 60,
    color: '#1890ff',
    icon: Monitor,
    iconColor: '#1890ff',
    iconBgColor: '#e6f7ff',
    iconSize: 20
  },
  {
    id: 3,
    title: '市场推广',
    percentage: 70,
    color: '#ff4d4f',
    icon: MilkTea,
    iconColor: '#ff4d4f',
    iconBgColor: '#fff1f0',
    iconSize: 20
  },
  {
    id: 4,
    title: '客户服务',
    percentage: 95,
    color: '#722ed1',
    icon: Ticket,
    iconColor: '#722ed1',
    iconBgColor: '#f9f0ff',
    iconSize: 20
  }
]

const statsCards = [
  {
    id: 1,
    title: '总订单数',
    count: 2850,
    description: '本月新增订单数量',
    icon: ShoppingCart,
    iconColor: '#409EFF',
    iconSize: 18,
    iconBgColor: '#8A96A3',
    textColor: '#409EFF',
    backgroundColor: '#F0F6FF',
    showArrow: false
  },
  {
    id: 2,
    title: '新用户数',
    count: 1200,
    description: '本周注册新用户',
    icon: User,
    iconColor: '#E6A23C',
    iconSize: 18,
    iconBgColor: '#67C23A',
    textColor: '#E6A23C',
    backgroundColor: '#FDF6EC',
    showArrow: false
  },
  {
    id: 3,
    title: '转化率',
    count: 25,
    description: '用户购买转化率',
    icon: Money,
    iconColor: '#909399',
    iconSize: 18,
    iconBgColor: '#909399',
    textColor: '#909399',
    backgroundColor: '#F5F7FA',
    showArrow: false
  },
  {
    id: 4,
    title: '满意度',
    count: 98,
    description: '用户满意度百分比',
    icon: ChatDotRound,
    iconColor: '#F56C6C',
    iconSize: 18,
    iconBgColor: '#F56C6C',
    textColor: '#F56C6C',
    backgroundColor: '#FDE2E2',
    showArrow: false
  }
]
const handleMore = () => {}
const dataList = [
  {
    title: '产品设计评审',
    status: '待进行',
    time: '1小时前',
    icon: Document,
    iconBgStyle: { backgroundColor: '#409EFF' },
    iconColor: '#fff'
  },
  {
    title: '团队周会',
    status: '已完成',
    time: '3小时前',
    icon: Document,
    iconBgStyle: { backgroundColor: '#67C23A' },
    iconColor: '#fff'
  },
  {
    title: '客户需求沟通',
    status: '进行中',
    time: '5小时前',
    icon: User,
    iconBgStyle: { backgroundColor: '#E6A23C' },
    iconColor: '#fff'
  },
  {
    title: '代码审查',
    status: '待处理',
    time: '8小时前',
    icon: Filter,
    iconBgStyle: { backgroundColor: '#F56C6C' },
    iconColor: '#fff'
  },
  {
    title: '测试用例编写',
    status: '已完成',
    time: '1天前',
    icon: Filter,
    iconBgStyle: { backgroundColor: '#67C23A' },
    iconColor: '#fff'
  }
]
</script>

<style scoped lang="scss"></style>
