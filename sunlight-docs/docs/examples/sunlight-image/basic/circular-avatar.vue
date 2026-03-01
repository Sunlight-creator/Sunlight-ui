<template>
  <div>
    <h3>圆形头像上传</h3>
    <p>圆形组件（禁止拖拽上传）</p>
    <SunlightImage
      v-model:imageUrl="imageUrl"
      :api="uploadApi"
      :width="'120px'"
      :height="'120px'"
      :borderRadius="'50%'"
      :drag="false"
      :fileSize="3"
      :fileType="['image/jpeg', 'image/png']"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightImage } from "sunlight-ui";

const imageUrl = ref("");

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
/* 可添加自定义样式 */
</style>
