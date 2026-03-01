<template>
  <div>
    <SunlightForm v-model="formData" :columns="columns" :rules="rules" :formOptions="formOptions">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>

    <!-- 上传结果预览 -->
    <div class="preview-container" v-if="showPreview">
      <h4>上传结果预览</h4>
      <div class="preview-content">
        <!-- 头像预览 -->
        <div class="preview-item">
          <h5>用户头像</h5>
          <div class="avatar-preview">
            <el-image
              v-if="formData.avatar"
              :src="formData.avatar"
              fit="cover"
              :style="{ borderRadius: '50%', width: '120px', height: '120px' }"
            >
              <template #error>
                <div class="image-error">加载失败</div>
              </template>
            </el-image>
            <div v-else class="no-image">暂无头像</div>
          </div>
        </div>

        <!-- 照片预览 -->
        <div class="preview-item">
          <h5>用户照片</h5>
          <div class="photos-preview">
            <el-image
              v-for="(photo, index) in formData.photos"
              :key="index"
              :src="photo.url"
              fit="cover"
              :preview-src-list="photoPreviewList"
              :style="{ borderRadius: '8px', width: '100px', height: '100px', margin: '5px' }"
            >
              <template #error>
                <div class="image-error">加载失败</div>
              </template>
            </el-image>
            <div v-if="formData.photos.length === 0" class="no-image">暂无照片</div>
          </div>
        </div>

        <!-- Banner预览 -->
        <div class="preview-item">
          <h5>Banner图</h5>
          <div class="banner-preview">
            <el-image
              v-if="formData.banner"
              :src="formData.banner"
              fit="cover"
              :style="{ borderRadius: '4px', width: '300px', height: '100px' }"
            >
              <template #error>
                <div class="image-error">加载失败</div>
              </template>
            </el-image>
            <div v-else class="no-image">暂无Banner图</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";

// 表单数据
const formData = ref({
  avatar: "",
  photos: [],
  banner: "",
  username: "",
  email: "",
  description: "",
});

// 表单选项
const formOptions = reactive({
  labelWidth: "120px",
  size: "default",
});

// 表单验证规则
const rules = reactive({
  avatar: [{ required: true, message: "请上传用户头像", trigger: "change" }],
  photos: [{ required: true, message: "请上传至少一张照片", trigger: "change" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
});

// 照片预览列表
const photoPreviewList = computed(() => {
  return formData.value.photos.map(item => item.url);
});

// 是否显示预览
const showPreview = ref(false);

// 上传接口 - 使用指定接口 https://jsonplaceholder.typicode.com/posts/
const mockUploadApi = async formData => {
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

// 表单列配置
const columns = reactive([
  {
    prop: "username",
    label: "用户名",
    type: "input",
    span: 12,
    placeholder: "请输入用户名",
    clearable: true,
  },
  {
    prop: "email",
    label: "邮箱",
    type: "input",
    inputType: "email",
    span: 12,
    placeholder: "请输入邮箱",
    clearable: true,
  },
  {
    prop: "avatar",
    label: "用户头像",
    type: "images",
    span: 12,
    multiple: false,
    limit: 1,
    api: mockUploadApi,
    fileSize: 3, // 3MB
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    drag: false,
    customStyle: {
      borderColor: "#67C23A",
    },
    placeholder: "请上传圆形头像",
  },
  {
    prop: "photos",
    label: "用户照片",
    type: "images",
    span: 12,
    multiple: true,
    limit: 3,
    api: mockUploadApi,
    fileSize: 5, // 5MB
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    drag: true,
    customStyle: {
      borderColor: "#409EFF",
    },
    placeholder: "请上传照片（最多3张）",
  },
  {
    prop: "banner",
    label: "Banner图",
    type: "images",
    span: 24,
    multiple: false,
    limit: 1,
    api: mockUploadApi,
    fileSize: 5, // 5MB
    width: "300px",
    height: "100px",
    borderRadius: "4px",
    drag: true,
    customStyle: {
      borderColor: "#E6A23C",
    },
    placeholder: "请上传横幅图片",
  },
  {
    prop: "description",
    label: "个人简介",
    type: "textarea",
    span: 24,
    rows: 4,
    maxlength: 200,
    showWordLimit: true,
    placeholder: "请输入个人简介",
  },
]);

// 提交表单
const handleSubmit = () => {
  console.log("表单数据:", formData.value);
  showPreview.value = true;
  ElMessage.success("表单提交成功，预览已更新");
};

// 重置表单
const handleReset = () => {
  formData.value = {
    avatar: "",
    photos: [],
    banner: "",
    username: "",
    email: "",
    description: "",
  };
  showPreview.value = false;
  ElMessage.info("表单已重置");
};
</script>

<style scoped></style>
