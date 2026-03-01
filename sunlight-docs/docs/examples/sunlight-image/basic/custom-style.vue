<template>
  <div>
    <h3>自定义样式</h3>
    <p>自定义组件边框、背景等样式</p>
    <div class="custom-background-example">
      <h4>自定义背景色</h4>
      <SunlightImage
        v-model:imageUrl="customStyleImageUrl"
        :api="uploadApi"
        :wrapperStyle="{
          borderColor: '#c0c4cc',
          focusBorderColor: '#67c23a',
          backgroundColor: '#f0f9eb',
          boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
        }"
      />
    </div>
    <div class="custom-background-example">
      <h4>深色背景</h4>
      <SunlightImage
        v-model:imageUrl="darkStyleImageUrl"
        :api="uploadApi"
        :wrapperStyle="{
          borderColor: '#409eff',
          focusBorderColor: '#66b1ff',
          backgroundColor: '#ecf5ff',
          boxShadow: '0 2px 12px 0 rgba(64, 158, 255, 0.2)',
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightImage } from "sunlight-ui";

const customStyleImageUrl = ref("");
const darkStyleImageUrl = ref("");

const uploadApi = async formData => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return {
      fileUrl: `https://picsum.photos/300/300?random=${data.id}`,
    };
  } catch (error) {
    throw error;
  }
};
</script>

<style scoped>
.custom-background-example {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background-color: #fafafa;
}

.custom-background-example h4 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 14px;
  color: #606266;
}
</style>
