<template>
  <div class="demo-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" v-for="card in statsCards" :key="card.id" style="margin-bottom: 20px;">
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
  </div>
</template>

<script setup>
import { SunlightBasicCard } from 'sunlight-ui';
import { ShoppingCart, User, Money, ChatDotRound } from '@element-plus/icons-vue';
const statsCards = [
  {
    id: 1,
    title: '总订单数',
    count: 4528,
    description: '本月新增订单数量',
    icon: ShoppingCart,
    iconColor: '#409EFF',
    iconSize: 18,
    iconBgColor: '#409EFF',
    textColor: '#409EFF',
    backgroundColor: '#E6F1FF',
    showArrow: false
  },
  {
    id: 2,
    title: '新用户数',
    count: 2845,
    description: '本周注册新用户',
    icon: User,
    iconColor: '#67C23A',
    iconSize: 18,
    iconBgColor: '#67C23A',
    textColor: '#67C23A',
    backgroundColor: '#E8F5E9',
    showArrow: false
  },
  {
    id: 3,
    title: '销售总额',
    count: 1258600,
    description: '本月销售总金额 (元)',
    icon: Money,
    iconColor: '#E6A23C',
    iconSize: 18,
    iconBgColor: '#E6A23C',
    textColor: '#E6A23C',
    backgroundColor: '#FFF8E1',
    showArrow: false
  },
  {
    id: 4,
    title: '客户留存率',
    count: 82.3,
    description: '本月客户留存百分比',
    icon: ChatDotRound,
    iconColor: '#909399',
    iconSize: 18,
    iconBgColor: '#909399',
    textColor: '#909399',
    backgroundColor: '#ECEFF1',
    showArrow: false
  }
]
</script>

<style scoped>
.demo-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
}

</style>