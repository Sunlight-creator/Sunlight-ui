<template>
  <div>
    <h3>禁用状态</h3>
    <p>禁用上传功能</p>
    <SunlightImages v-model:fileList="fileList" :api="uploadApi" :disabled="true" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightImages } from "sunlight-ui";

const fileList = ref([]);

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
