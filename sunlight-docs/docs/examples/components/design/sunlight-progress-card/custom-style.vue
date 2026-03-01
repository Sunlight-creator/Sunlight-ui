<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" v-for="card in progressCards" :key="card.id" style="margin-bottom: 20px;">
        <SunlightProgressCard
          :percentage="card.percentage"
          :title="card.title"
          :color="card.color"
          :icon="card.icon"
          :iconColor="card.iconColor"
          :iconSize="card.iconSize"
          :iconBgColor="card.iconBgColor"
          :iconBgRadius="8"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightProgressCard } from 'sunlight-ui';
import { ElRow, ElCol } from 'element-plus';
import { Check, Monitor, MilkTea, Ticket } from '@element-plus/icons-vue';
const progressCards = [
  {
    id: 1,
    title: 'Q1销售目标',
    percentage: 87,
    color: '#52c41a',
    icon: Check,
    iconColor: '#52c41a',
    iconSize: 20,
    iconBgColor: '#E6F0FF'
  },
  {
    id: 2,
    title: '产品开发进度',
    percentage: 65,
    color: '#1890ff',
    icon: Monitor,
    iconColor: '#1890ff',
    iconSize: 20,
    iconBgColor: '#e6f7ff'
  },
  {
    id: 3,
    title: '品牌推广活动',
    percentage: 78,
    color: '#ff4d4f',
    icon: MilkTea,
    iconColor: '#ff4d4f',
    iconSize: 20,
    iconBgColor: '#fff1f0'
  },
  {
    id: 4,
    title: '客户满意度',
    percentage: 92,
    color: '#722ed1',
    icon: Ticket,
    iconColor: '#722ed1',
    iconSize: 20,
    iconBgColor: '#f9f0ff'
  }
]
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>