<template>
  <div>
    <h3>方形图片</h3>
    <p>方形组件，图片最大为 5M（禁止拖拽上传）</p>
    <SunlightImages
      v-model:fileList="fileList"
      :api="uploadApi"
      :width="'150px'"
      :height="'150px'"
      :borderRadius="'8px'"
      :drag="false"
      :fileSize="5"
    />
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