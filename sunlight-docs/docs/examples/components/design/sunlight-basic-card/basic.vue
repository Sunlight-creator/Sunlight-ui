<template>
  <div class="demo-container">
     <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" v-for="card in statsCards" :key="card.id" style="margin-bottom: 20px;">
        <SunlightBasicCard
          :icon="card.icon"
          :count="card.count"
          :description="card.description"
          :iconSize="card.iconSize"
          :iconColor="card.iconColor"
          :iconBgColor="card.iconBgColor"
          :showArrow="card.showArrow"
        />
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { SunlightBasicCard } from 'sunlight-ui';
import { ElRow, ElCol } from 'element-plus';
import { ShoppingCart, User, Money, ChatDotRound } from '@element-plus/icons-vue';
const statsCards = [
  {
    id: 1,
    title: '总订单数',
    count: 3285,
    description: '本月新增订单数量',
    icon: ShoppingCart,
    iconColor: '#fff',
    iconSize: 18,
    iconBgColor: '#409EFF',
    textColor: '#409EFF',
    backgroundColor: '#F0F6FF',
    showArrow: false
  },
  {
    id: 2,
    title: '新用户数',
    count: 1568,
    description: '本周注册新用户',
    icon: User,
    iconColor: '#fff',
    iconSize: 18,
    iconBgColor: '#67C23A',
    textColor: '#67C23A',
    backgroundColor: '#F0F9EB',
    showArrow: false
  },
  {
    id: 3,
    title: '销售总额',
    count: 896500,
    description: '本月销售总金额 (元)',
    icon: Money,
    iconColor: '#fff',
    iconSize: 18,
    iconBgColor: '#E6A23C',
    textColor: '#E6A23C',
    backgroundColor: '#FDF6EC',
    showArrow: false
  },
  {
    id: 4,
    title: '满意度',
    count: 96.5,
    description: '用户满意度百分比',
    icon: ChatDotRound,
    iconColor: '#fff',
    iconSize: 18,
    iconBgColor: '#909399',
    textColor: '#909399',
    backgroundColor: '#F5F7FA',
    showArrow: false
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