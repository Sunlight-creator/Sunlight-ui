<template>
  <div class="demo-container">
    <h3>事件处理</h3>
    <SunlightImage
      v-model:imageUrl="eventImageUrl"
      :api="uploadApi"
      @upload-success="handleUploadSuccess"
      @upload-error="handleUploadError"
    />
    <div class="demo-info">
      <p>当前图片地址: {{ eventImageUrl || "未上传" }}</p>
      <p v-if="uploadMessage" class="upload-message">{{ uploadMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightImage } from "sunlight-ui";
const eventImageUrl = ref("");
const uploadMessage = ref("");

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

const handleUploadSuccess = (response, file) => {
  uploadMessage.value = "上传成功！";
  setTimeout(() => {
    uploadMessage.value = "";
  }, 3000);
};

const handleUploadError = (error, file) => {
  uploadMessage.value = "上传失败：" + error.message;
  setTimeout(() => {
    uploadMessage.value = "";
  }, 3000);
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

.upload-message {
  color: #67c23a;
  font-weight: 500;
  margin-top: 10px;
}

.upload-message.error {
  color: #f56c6c;
}
</style>
