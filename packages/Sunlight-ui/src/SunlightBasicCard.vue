<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { addUnit,animate } from "../utils/tool";
// 定义 props 类型
interface Props {
  icon?: any
  title?: string
  count?: number
  description?: string
  iconColor?: string
  iconBgColor?: string
  iconBgRadius?: number
  iconSize?: number
  textColor?: string
  backgroundColor?: string
  showArrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: null,
  title: '',
  count: null,
  description: '',
  iconColor: '#409EFF',
  iconBgColor: '',
  iconBgRadius: 50,
  iconSize: 30,
  textColor: '#333333',
  backgroundColor: '#fff',
  showArrow: false
})

const countValue = ref()

onMounted(() => {
  if (props.count !== null) {
    animate(0, props.count, 1000, (value) => {
      countValue.value = Math.floor(value)
    })
  }
})

</script>

<template>
  <div class="stats-card card-minimal flx-align-center" :style="{ backgroundColor: props.backgroundColor }">
    <div
      v-if="props.icon"
      class="stats-card__icon flx-center"
      :style="{ backgroundColor: props.iconBgColor, borderRadius: addUnit(props.iconBgRadius) }"
    >
      <component
        :is="props.icon"
        :style="{
           fontWeight: 'bold',
          width: addUnit(props.iconSize),
          height: addUnit(props.iconSize),
          color: props.iconColor
        }"
      />
    </div>

    <div class="stats-card__content">
      <p v-if="props.title" class="stats-card__title" :style="{ color: props.textColor }">
        {{ props.title }}
      </p>
      <p class="stats-card__count" :style="{ color: props.textColor }">{{ countValue }}</p>
      <p v-if="props.description" class="stats-card__description" :style="{ color: props.textColor }">
        {{ props.description }}
      </p>
    </div>

    <div v-if="props.showArrow" class="stats-card__arrow">
      <ArrowRight style="font-size: 18px; color: #666" />
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  height: 8rem;
  padding: 0 20px;
  cursor: pointer;
  background-color: #fff;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  border-radius:10px;
}

.stats-card:hover {
  transform: translateY(-2px);
}

.stats-card__icon {
  width: 46px;
  height: 46px;
  margin-right: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stats-card__content {
  flex: 1;
}

.stats-card__title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.stats-card__count {
  margin: 0;
  font-size: 28px;
  font-weight: 500;
  color: #333;
}

.stats-card__description {
  margin: 4px 0 0;
  font-size: 14px;
  color: #7d8093;
  opacity: 0.8;
}

.stats-card__arrow {
  display: flex;
  align-items: center;
}
</style>
