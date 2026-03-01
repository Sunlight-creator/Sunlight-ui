<template>
  <div>
    <h3>查看</h3>
    <p>有图（禁用编辑、删除）</p>
    <SunlightImage v-model:imageUrl="imageUrl" :api="uploadApi" :width="'120px'" :height="'120px'" :disabled="true" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightImage } from "sunlight-ui";

const imageUrl = ref("https://picsum.photos/300/300?random=1");

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
