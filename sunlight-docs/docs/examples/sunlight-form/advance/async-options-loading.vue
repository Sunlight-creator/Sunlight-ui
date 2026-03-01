<template>
  <div class="demo-container">
    <h3>异步选项加载</h3>
    <p>展示简单的异步选项加载功能，包括异步下拉选择和异步级联选择。</p>

    <SunlightForm v-model="formData" :columns="columns">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </SunlightForm>

    <!-- 提交结果 -->
    <div class="result-container" v-if="showResult">
      <h4>提交结果</h4>
      <pre class="result-json">{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";

// 表单数据
const formData = ref({
  // 异步下拉选择
  city: "",
  // 异步级联选择
  address: [],
});

// 表单选项
const formOptions = reactive({
  labelWidth: "120px",
});

// 是否显示结果
const showResult = ref(false);

// 模拟城市数据加载
const loadCities = async () => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));

  return [
    { label: "北京", value: "beijing" },
    { label: "上海", value: "shanghai" },
    { label: "广州", value: "guangzhou" },
    { label: "深圳", value: "shenzhen" },
    { label: "杭州", value: "hangzhou" },
  ];
};

// 模拟级联数据加载
const loadCascaderOptions = async (node: any, resolve: Function) => {
  const { level, value } = node;

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  if (level === 0) {
    // 加载省份
    resolve([
      { label: "北京", value: "beijing" },
      { label: "上海", value: "shanghai" },
      { label: "广东", value: "guangdong" },
    ]);
  } else if (level === 1) {
    // 加载城市
    const cityMap: Record<string, any[]> = {
      beijing: [
        { label: "朝阳区", value: "chaoyang" },
        { label: "海淀区", value: "haidian" },
      ],
      shanghai: [
        { label: "浦东新区", value: "pudong" },
        { label: "徐汇区", value: "xuhui" },
      ],
      guangdong: [
        { label: "广州", value: "guangzhou" },
        { label: "深圳", value: "shenzhen" },
      ],
    };
    resolve(cityMap[value] || []);
  } else if (level === 2) {
    // 加载区县
    const districtMap: Record<string, any[]> = {
      chaoyang: [
        { label: "三里屯", value: "sanlitun" },
        { label: "国贸", value: "guomao" },
      ],
      haidian: [
        { label: "中关村", value: "zhongguancun" },
        { label: "五道口", value: "wudaokou" },
      ],
      pudong: [
        { label: "陆家嘴", value: "lujiazui" },
        { label: "张江", value: "zhangjiang" },
      ],
      xuhui: [
        { label: "徐家汇", value: "xujiahui" },
        { label: "衡山路", value: "hengshanlu" },
      ],
      guangzhou: [
        { label: "天河区", value: "tianhe" },
        { label: "越秀区", value: "yuexiu" },
      ],
      shenzhen: [
        { label: "南山区", value: "nanshan" },
        { label: "福田区", value: "futian" },
      ],
    };
    resolve(districtMap[value] || []);
  }
};

// 表单列配置
const columns = reactive([
  // 异步下拉选择
  {
    prop: "city",
    label: "城市选择",
    type: "select",
    span: 12,
    placeholder: "请选择城市",
    options: loadCities,
    clearable: true,
  },
  // 异步级联选择
  {
    prop: "address",
    label: "详细地址",
    type: "cascader",
    span: 12,
    placeholder: "请选择地址",
    load: loadCascaderOptions,
    clearable: true,
  },
]);

// 提交表单
const handleSubmit = () => {
  showResult.value = true;
  ElMessage.success("表单提交成功");
  console.log("表单数据:", formData.value);
};

// 重置表单
const handleReset = () => {
  formData.value = {
    city: "",
    address: [],
  };
  showResult.value = false;
  ElMessage.info("表单已重置");
};
</script>


