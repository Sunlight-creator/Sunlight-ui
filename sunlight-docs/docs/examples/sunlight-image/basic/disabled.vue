<template>
  <div class="demo-container">
    <h3>禁用状态</h3>
    <SunlightImage v-model:imageUrl="disabledImageUrl" :api="uploadApi" :disabled="true" />
    <div class="demo-info">
      <p>当前图片地址: {{ disabledImageUrl || "未上传" }}</p>
      <p>组件状态: 禁用</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightImage } from "sunlight-ui";
const disabledImageUrl = ref(
  "https://neeko-copilot.bytedance.net/api/text2image?prompt=a%20simple%20icon%20design&size=512x512"
);

// 上传 API
const uploadApi = async formData => {
  try {
    // 使用指定的接口 `https://jsonplaceholder.typicode.com/posts/`
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/", {
      method: "POST",
      body: formData,
    });

    // 模拟返回图片URL，实际项目中根据接口返回格式调整
    const data = await response.json();
    return {
      data: {
        fileUrl: `https://picsum.photos/300/300?random=${data.id}`,
      },
    };
  } catch (error) {
    throw error;
  }
};
</script>

<style scoped>
.demo-container {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background-color: #ffffff;
}

.demo-info {
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}
</style>
