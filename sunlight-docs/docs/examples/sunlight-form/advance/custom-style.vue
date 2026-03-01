<template>
  <el-card shadow="hover">
    <!-- 多功能表单：包含所有类型的表单控件 -->
    <SunlightForm v-model="formData" :columns="columns" :form-options="formOptions">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>

    <div class="result">
      <h3>表单数据：</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { SunlightForm } from "sunlight-ui";
import { ElMessage } from "element-plus";

// 统一颜色主题配置
const themeStyle = {
  borderColor: "#67c23a",
  focusBorderColor: "#67c23a",
  focusBoxShadow: "0 0 0 3px rgba(103, 194, 58, 0.25)",
};

// 模拟异步数据
async function fetchCityOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: "beijing", label: "北京" },
        { value: "shanghai", label: "上海" },
        { value: "guangzhou", label: "广州" },
        { value: "shenzhen", label: "深圳" },
        { value: "hangzhou", label: "杭州" },
        { value: "nanjing", label: "南京" },
        { value: "wuhan", label: "武汉" },
        { value: "chengdu", label: "成都" },
      ]);
    }, 300);
  });
}

async function fetchDepartmentOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: "tech", label: "技术部" },
        { value: "product", label: "产品部" },
        { value: "operation", label: "运营部" },
        { value: "market", label: "市场部" },
        { value: "sales", label: "销售部" },
        { value: "hr", label: "人事部" },
      ]);
    }, 300);
  });
}

// 三级联动数据
async function fetchCascaderOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          value: "beijing",
          label: "北京",
          children: [
            {
              value: "chaoyang",
              label: "朝阳区",
              children: [
                { value: "chaoyang1", label: "朝阳街道1" },
                { value: "chaoyang2", label: "朝阳街道2" },
              ],
            },
            {
              value: "haidian",
              label: "海淀区",
              children: [
                { value: "haidian1", label: "海淀街道1" },
                { value: "haidian2", label: "海淀街道2" },
              ],
            },
          ],
        },
        {
          value: "shanghai",
          label: "上海",
          children: [
            {
              value: "huangpu",
              label: "黄浦区",
              children: [
                { value: "huangpu1", label: "黄浦街道1" },
                { value: "huangpu2", label: "黄浦街道2" },
              ],
            },
            {
              value: "pudong",
              label: "浦东新区",
              children: [
                { value: "pudong1", label: "浦东街道1" },
                { value: "pudong2", label: "浦东街道2" },
              ],
            },
          ],
        },
        {
          value: "guangdong",
          label: "广东",
          children: [
            {
              value: "guangzhou",
              label: "广州",
              children: [
                { value: "tianhe", label: "天河区" },
                { value: "yuexiu", label: "越秀区" },
              ],
            },
            {
              value: "shenzhen",
              label: "深圳",
              children: [
                { value: "nanshan", label: "南山区" },
                { value: "futian", label: "福田区" },
              ],
            },
          ],
        },
      ]);
    }, 300);
  });
}

async function fetchGenderOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: "male", label: "男" },
        { value: "female", label: "女" },
      ]);
    }, 300);
  });
}

async function fetchHobbyOptions() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { value: "reading", label: "阅读" },
        { value: "music", label: "音乐" },
        { value: "sports", label: "运动" },
        { value: "travel", label: "旅行" },
        { value: "movie", label: "电影" },
        { value: "game", label: "游戏" },
      ]);
    }, 300);
  });
}

// 模拟上传 API
async function mockUploadApi(file) {
  return new Promise(resolve => {
    setTimeout(() => {
      const url = URL.createObjectURL(file.raw || file);
      resolve({
        fileUrl: url,
        fileName: file.name || "image.jpg",
      });
    }, 500);
  });
}

// 表单数据
const formData = ref({
  // 单行文本
  name: "",
  email: "",
  phone: "",
  // 多行文本
  description: "",
  // 选择框（单选）
  city: null,
  // 选择框（多选）
  multiCity: [],
  // 三级联动
  region: null,
  // 单选
  gender: null,
  // 多选
  hobby: [],
  // 上传单个图片
  avatar: [],
  // 上传多个图片
  photos: [],
  // 日期选择器（年月日）
  birthdate: null,
  // 日期时间选择器（年月日时分秒）
  createTime: null,
  // 日期范围选择器
  dateRange: [],
  // 日期时间范围选择器
  datetimeRange: [],
});

// 表单配置
const formOptions = {
  labelWidth: "120px",
  size: "default",
  buttonAlign: "center", // 可选值：left, center, right
};

// 列配置：包含所有类型的表单控件
const columns = [
  // ========== 单行文本 ==========
  {
    prop: "name",
    label: "姓名",
    type: "input",
    span: 12,
    placeholder: "请输入姓名",
    clearable: true,
    wrapperStyle: themeStyle,
  },
  {
    prop: "email",
    label: "邮箱",
    type: "input",
    span: 12,
    placeholder: "请输入邮箱",
    inputType: "email",
    clearable: true,
    wrapperStyle: themeStyle,
  },
  {
    prop: "phone",
    label: "手机号",
    type: "input",
    span: 12,
    placeholder: "请输入手机号",
    inputType: "tel",
    clearable: true,
    wrapperStyle: themeStyle,
  },

  // ========== 选择框（单选） ==========
  {
    prop: "city",
    label: "城市",
    type: "select",
    span: 12,
    placeholder: "请选择城市",
    options: fetchCityOptions,
    filterable: true,
    clearable: true,
    wrapperStyle: themeStyle,
  },
  // ========== 选择框（多选） ==========
  {
    prop: "multiCity",
    label: "多选城市",
    type: "select",
    span: 12,
    placeholder: "请选择多个城市",
    options: fetchCityOptions,
    multiple: true,
    filterable: true,
    clearable: true,
    wrapperStyle: themeStyle,
  },
  // ========== 三级联动 ==========
  {
    prop: "region",
    label: "地区（三级联动）",
    type: "cascader",
    span: 12,
    placeholder: "请选择省/市/区",
    options: fetchCascaderOptions,
    filterable: true,
    clearable: true,
    wrapperStyle: themeStyle,
  },

  // ========== 日期选择器（年月日） ==========
  {
    prop: "birthdate",
    label: "出生日期",
    type: "date-picker",
    span: 12,
    placeholder: "请选择出生日期",
    valueFormat: "YYYY-MM-DD",
    clearable: true,
    config: {
      type: "date",
      format: "YYYY-MM-DD",
    },
    wrapperStyle: themeStyle,
  },

  // ========== 日期时间选择器（年月日时分秒） ==========
  {
    prop: "createTime",
    label: "创建时间",
    type: "datetime-picker",
    span: 12,
    placeholder: "请选择创建时间",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    clearable: true,
    config: {
      type: "datetime",
      format: "YYYY-MM-DD HH:mm:ss",
    },
    wrapperStyle: themeStyle,
  },

  // ========== 日期范围选择器 ==========
  {
    prop: "dateRange",
    label: "日期范围",
    type: "date-picker",
    span: 12,
    placeholder: "请选择日期范围",
    valueFormat: "YYYY-MM-DD",
    clearable: true,
    config: {
      type: "daterange",
      format: "YYYY-MM-DD",
      startPlaceholder: "开始日期",
      endPlaceholder: "结束日期",
    },
    wrapperStyle: themeStyle,
  },

  // ========== 日期时间范围选择器 ==========
  {
    prop: "datetimeRange",
    label: "时间范围",
    type: "datetime-picker",
    span: 12,
    placeholder: "请选择时间范围",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    clearable: true,
    config: {
      type: "datetimerange",
      format: "YYYY-MM-DD HH:mm:ss",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
    },
    wrapperStyle: themeStyle,
  },
  // ========== 单选 ==========
  {
    prop: "gender",
    label: "性别",
    type: "radio",
    span: 12,
    options: fetchGenderOptions,
    isGroup: true,
    wrapperStyle: themeStyle,
  },
  // ========== 多选 ==========
  {
    prop: "hobby",
    label: "爱好",
    type: "checkbox",
    span: 24,
    options: fetchHobbyOptions,
    isGroup: true,
    wrapperStyle: themeStyle,
  },
  // ========== 多行文本 ==========
  {
    prop: "description",
    label: "描述",
    type: "textarea",
    span: 24,
    placeholder: "请输入描述信息",
    rows: 4,
    maxlength: 200,
    showWordLimit: true,
    wrapperStyle: themeStyle,
  },
  // ========== 上传单个图片 ==========
  {
    prop: "avatar",
    label: "头像（单个）",
    type: "images",
    span: 12,
    api: mockUploadApi,
    limit: 1,
    multiple: false,
    drag: true,
    height: "150px",
    width: "150px",
    wrapperStyle: themeStyle,
  },
  // ========== 上传多个图片 ==========
  {
    prop: "photos",
    label: "照片（多个）",
    type: "images",
    span: 12,
    api: mockUploadApi,
    limit: 5,
    multiple: true,
    drag: true,
    height: "120px", // 自定义高度
    width: "120px", // 自定义宽度
    wrapperStyle: themeStyle,
  },
];

// 提交表单
const handleSubmit = () => {
  console.log("提交表单数据：", formData.value);
  ElMessage.success("提交成功！");
};

// 重置表单
const handleReset = () => {
  formData.value = {
    name: "",
    email: "",
    phone: "",
    description: "",
    city: null,
    multiCity: [],
    region: null,
    gender: null,
    hobby: [],
    avatar: [],
    photos: [],
    birthdate: null,
    createTime: null,
    dateRange: [],
    datetimeRange: [],
  };
  ElMessage.info("表单已重置");
};
</script>

<style scoped>
.description p {
  margin: 4px 0;
  color: #606266;
}

.result {
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.result h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.result pre {
  margin: 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
