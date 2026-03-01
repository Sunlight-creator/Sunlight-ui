<template>
  <div>
    <h3>事件处理</h3>
    <p>处理上传成功、失败和删除事件</p>
    <SunlightImages
      v-model:fileList="fileList"
      :api="uploadApi"
      @upload-success="handleUploadSuccess"
      @upload-error="handleUploadError"
      @remove="handleRemove"
    />
    <div v-if="message" class="message" :class="messageType">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightImages } from "sunlight-ui";

const fileList = ref([]);
const message = ref("");
const messageType = ref("");

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

const handleUploadSuccess = (response, file) => {
  message.value = "上传成功！";
  messageType.value = "success";
  setTimeout(() => {
    message.value = "";
  }, 3000);
};

const handleUploadError = (error, file) => {
  message.value = "上传失败，请重试！";
  messageType.value = "error";
  setTimeout(() => {
    message.value = "";
  }, 3000);
};

const handleRemove = file => {
  message.value = "删除成功！";
  messageType.value = "info";
  setTimeout(() => {
    message.value = "";
  }, 3000);
};
</script>

<style scoped>
.message {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
}

.success {
  background-color: #f0f9eb;
  border: 1px solid #e1f3d8;
  color: #67c23a;
}

.error {
  background-color: #fef0f0;
  border: 1px solid #fbc4c4;
  color: #f56c6c;
}

.info {
  background-color: #ecf5ff;
  border: 1px solid #d9ecff;
  color: #409eff;
}
</style>
