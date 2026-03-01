<template>
  <div class="demo-container">
    <h3>响应式布局示例</h3>
    <p>此示例展示了SunlightBasicCard在不同屏幕尺寸下的响应式布局效果。</p>
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
    count: 4528,
    description: '本月新增订单数量',
    icon: ShoppingCart,
    iconColor: '#fff',
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
    iconColor: '#fff',
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
    iconColor: '#fff',
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
    iconColor: '#fff',
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
  background-color: #F6F8FC;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>