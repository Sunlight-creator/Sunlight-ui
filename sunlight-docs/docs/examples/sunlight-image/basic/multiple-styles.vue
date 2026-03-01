<template>
  <div>
    <h3>多种样式组合</h3>
    <p>展示不同样式的图片上传组件</p>

    <div class="styles-container">
      <!-- 样式 1：默认样式 -->
      <div class="style-item">
        <h4>默认样式</h4>
        <SunlightImage v-model:imageUrl="defaultStyleUrl" :api="uploadApi" />
      </div>

      <!-- 样式 2：绿色边框 -->
      <div class="style-item">
        <h4>绿色边框</h4>
        <SunlightImage
          v-model:imageUrl="greenStyleUrl"
          :api="uploadApi"
          :wrapperStyle="{
            borderColor: '#67c23a',
            focusBorderColor: '#85ce61',
          }"
        />
      </div>

      <!-- 样式 3：红色边框 -->
      <div class="style-item">
        <h4>红色边框</h4>
        <SunlightImage
          v-model:imageUrl="redStyleUrl"
          :api="uploadApi"
          :wrapperStyle="{
            borderColor: '#f56c6c',
            focusBorderColor: '#f78989',
          }"
        />
      </div>

      <!-- 样式 4：带阴影 -->
      <div class="style-item">
        <h4>带阴影</h4>
        <SunlightImage
          v-model:imageUrl="shadowStyleUrl"
          :api="uploadApi"
          :wrapperStyle="{
            boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
            focusBoxShadow: '0 2px 12px 0 rgba(64, 158, 255, 0.2)',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightImage } from "sunlight-ui";

const defaultStyleUrl = ref("");
const greenStyleUrl = ref("");
const redStyleUrl = ref("");
const shadowStyleUrl = ref("");

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
.styles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.style-item {
  flex: 1;
  min-width: 150px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background-color: #fafafa;
}

.style-item h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 14px;
  color: #606266;
}
</style>
