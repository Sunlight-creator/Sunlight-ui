<template>
  <div>
    <SunlightForm v-model="formData" :columns="columns" :rules="rules">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>

    <div class="result-container" v-if="submitResult">
      <h4>提交结果</h4>
      <pre class="result-json">{{ JSON.stringify(submitResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { ElMessage } from "element-plus";

// 表单数据
const formData = ref({
  country: "",
  city: "",
  province: "",
  address: "",
});

// 提交结果
const submitResult = ref(null);

// 国家选项
const countryOptions = [
  { label: "中国", value: "china", code: "CN" },
  { label: "美国", value: "usa", code: "US" },
  { label: "日本", value: "japan", code: "JP" },
];

// 城市选项
const cityOptions = reactive({
  china: [
    { label: "北京", value: "beijing" },
    { label: "上海", value: "shanghai" },
    { label: "广州", value: "guangzhou" },
    { label: "深圳", value: "shenzhen" },
  ],
  usa: [
    { label: "纽约", value: "newyork" },
    { label: "洛杉矶", value: "losangeles" },
    { label: "芝加哥", value: "chicago" },
  ],
  japan: [
    { label: "东京", value: "tokyo" },
    { label: "大阪", value: "osaka" },
    { label: "京都", value: "kyoto" },
  ],
});

// 省份/州选项 - 按国家和城市分类
const provinceOptions = reactive({
  china: {
    beijing: [{ label: "北京市", value: "beijing" }],
    shanghai: [{ label: "上海市", value: "shanghai" }],
    guangzhou: [{ label: "广东省", value: "guangdong" }],
    shenzhen: [{ label: "广东省", value: "guangdong" }],
  },
  usa: {
    newyork: [{ label: "纽约州", value: "newyork" }],
    losangeles: [{ label: "加利福尼亚州", value: "california" }],
    chicago: [{ label: "伊利诺伊州", value: "illinois" }],
  },
  japan: {
    tokyo: [{ label: "东京都", value: "tokyo" }],
    osaka: [{ label: "大阪府", value: "osaka" }],
    kyoto: [{ label: "京都府", value: "kyoto" }],
  },
});

// 表单列配置
const columns = reactive([
  {
    prop: "country",
    label: "国家",
    type: "select",
    span: 8,
    placeholder: "请选择国家",
    options: countryOptions,
    setValue: "value",
    setLabel: "label",
  },
  {
    prop: "city",
    label: "城市",
    type: "select",
    span: 8,
    placeholder: "请选择城市",
    options: [],
    setValue: "value",
    setLabel: "label",
    disabled: !formData.value.country,
  },
  {
    prop: "province",
    label: "省份/州",
    type: "select",
    span: 8,
    placeholder: "请选择省份/州",
    options: [],
    setValue: "value",
    setLabel: "label",
    disabled: !formData.value.city,
  },
  {
    prop: "address",
    label: "详细地址",
    type: "textarea",
    span: 24,
    placeholder: "请输入详细地址",
    rows: 3,
  },
]);

// 表单规则
const rules = reactive({
  country: [{ required: true, message: "请选择国家", trigger: "change" }],
  city: [{ required: true, message: "请选择城市", trigger: "change" }],
  province: [{ required: true, message: "请选择省份/州", trigger: "change" }],
  address: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
});

// 监听国家变化，动态更新城市选项
watch(
  () => formData.value.country,
  newCountry => {
    // 更新城市选项
    columns[1].options = cityOptions[newCountry] || [];
    // 重置城市和省份值
    formData.value.city = "";
    formData.value.province = "";
    // 重置省份选项
    columns[2].options = [];
    // 更新城市和省份选择器的禁用状态
    columns[1].disabled = !newCountry;
    columns[2].disabled = true;

    if (newCountry) {
      ElMessage.info(`已切换国家为：${newCountry}`);
    }
  },
  { immediate: true }
);

// 监听城市变化，动态更新省份选项
watch(
  () => formData.value.city,
  newCity => {
    const country = formData.value.country;
    // 更新省份/州选项
    columns[2].options = country && newCity ? provinceOptions[country][newCity] || [] : [];
    // 重置省份值
    formData.value.province = "";
    // 更新省份选择器的禁用状态
    columns[2].disabled = !newCity;

    if (newCity) {
      ElMessage.info(`已切换城市为：${newCity}`);
    }
  },
  { immediate: true }
);

// 提交表单
const handleSubmit = () => {
  submitResult.value = { ...formData.value };
  ElMessage.success("表单提交成功");
  console.log("表单数据:", formData.value);
};

// 重置表单
const handleReset = () => {
  formData.value = {
    country: "",
    city: "",
    province: "",
    address: "",
  };
  submitResult.value = null;
  // 重置所有选项和禁用状态
  columns[1].options = [];
  columns[2].options = [];
  columns[1].disabled = true;
  columns[2].disabled = true;
  ElMessage.info("表单已重置");
};
</script>

