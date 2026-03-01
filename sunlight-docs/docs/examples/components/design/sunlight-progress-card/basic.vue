<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" v-for="card in progressCards" :key="card.id" style="margin-bottom: 20px;">
        <SunlightProgressCard
          :percentage="card.percentage"
          :title="card.title"
          :color="card.color"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { SunlightProgressCard } from 'sunlight-ui';
import { ElRow, ElCol } from 'element-plus';
const progressCards = [
  {
    id: 1,
    title: 'Q1销售目标',
    percentage: 87,
    color: '#52c41a'
  },
  {
    id: 2,
    title: '产品开发进度',
    percentage: 65,
    color: '#1890ff'
  },
  {
    id: 3,
    title: '品牌推广活动',
    percentage: 78,
    color: '#ff4d4f'
  },
  {
    id: 4,
    title: '客户满意度',
    percentage: 92,
    color: '#722ed1'
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