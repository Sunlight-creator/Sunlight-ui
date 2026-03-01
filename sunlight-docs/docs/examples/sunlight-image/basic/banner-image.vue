<template>
  <div>
    <h3>上传 Banner 图</h3>
    <p>宽横幅组件（可拖拽上传）</p>
    <SunlightImage
      v-model:imageUrl="imageUrl"
      :api="uploadApi"
      :width="'400px'"
      :height="'200px'"
      :borderRadius="'8px'"
      :drag="true"
      :fileSize="5"
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
      fileUrl: `https://picsum.photos/600/300?random=${data.id}`,
    };
  } catch (error) {
    throw error;
  }
};
</script>

<style scoped>
/* 可添加自定义样式 */
</style>
