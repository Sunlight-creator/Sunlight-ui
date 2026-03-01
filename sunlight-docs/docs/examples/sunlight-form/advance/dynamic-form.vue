<template>
  <div class="demo-container">
    <!-- 动态添加/删除字段演示 -->
    <div class="demo-section">
      <h4>1. 动态添加/删除字段</h4>
      <p class="section-description">根据业务需求，动态增减表单字段，实现灵活的表单配置。</p>

      <SunlightForm v-model="formData" :columns="dynamicColumns" :rules="dynamicRules">
        <template #operation>
          <div class="operation-buttons">
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button type="success" @click="addField">添加字段</el-button>
            <el-button type="danger" @click="removeField" :disabled="dynamicColumns.length <= 2">删除字段</el-button>
          </div>
        </template>
      </SunlightForm>
    </div>

    <!-- 条件显示字段演示 -->
    <div class="demo-section">
      <h4>2. 条件显示字段</h4>
      <p class="section-description">根据表单数据的变化，动态显示或隐藏相关字段，实现智能表单交互。</p>

      <SunlightForm v-model="conditionFormData" :columns="conditionColumns" :rules="conditionRules">
        <template #operation>
          <el-button type="primary" @click="handleConditionSubmit">提交</el-button>
          <el-button @click="handleConditionReset">重置</el-button>
        </template>
      </SunlightForm>
    </div>

    <!-- 动态字段类型演示 -->
    <div class="demo-section">
      <h4>3. 动态字段类型</h4>
      <p class="section-description">根据选择的字段类型，动态切换表单控件类型，支持多种表单控件的灵活切换。</p>

      <SunlightForm v-model="dynamicTypeFormData" :columns="dynamicTypeColumns" :rules="dynamicTypeRules">
        <template #operation>
          <el-button type="primary" @click="handleDynamicTypeSubmit">提交</el-button>
          <el-button @click="handleDynamicTypeReset">重置</el-button>
        </template>
      </SunlightForm>
    </div>

    <!-- 提交结果展示 -->
    <div class="result-container" v-if="submitResult">
      <h4>提交结果</h4>
      <pre class="result-json">{{ JSON.stringify(submitResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";

// 动态表单数据
const formData = ref({});
const fieldCount = ref(2);

// 条件表单数据
const conditionFormData = ref({
  type: "person",
  name: "",
  age: null,
  company: "",
  position: "",
});

// 动态字段类型表单数据
const dynamicTypeFormData = ref({
  fieldType: "input",
  fieldValue: "",
});

// 提交结果
const submitResult = ref(null);

// 动态表单列配置
const dynamicColumns = reactive([
  {
    prop: "field1",
    label: "字段1",
    type: "input",
    span: 12,
    placeholder: "请输入字段1",
  },
  {
    prop: "field2",
    label: "字段2",
    type: "select",
    span: 12,
    placeholder: "请选择字段2",
    options: [
      { label: "选项A", value: "optionA" },
      { label: "选项B", value: "optionB" },
      { label: "选项C", value: "optionC" },
    ],
  },
]);

// 动态表单验证规则
const dynamicRules = reactive({
  field1: [{ required: true, message: "请输入字段1", trigger: "blur" }],
  field2: [{ required: true, message: "请选择字段2", trigger: "change" }],
});

// 条件表单列配置 - 根据类型显示不同字段
const conditionColumns = computed(() => {
  const columns = [
    {
      prop: "type",
      label: "表单类型",
      type: "radio",
      span: 24,
      options: [
        { label: "个人信息", value: "person" },
        { label: "公司信息", value: "company" },
      ],
      placeholder: "请选择表单类型",
    },
  ];

  // 根据选择的类型显示对应的字段
  if (conditionFormData.value.type === "person") {
    // 个人信息字段
    columns.push(
      {
        prop: "name",
        label: "姓名",
        type: "input",
        span: 12,
        placeholder: "请输入姓名",
      },
      {
        prop: "age",
        label: "年龄",
        type: "input",
        inputType: "number",
        span: 12,
        placeholder: "请输入年龄",
        config: {
          min: 0,
          max: 150,
        },
      }
    );
  } else if (conditionFormData.value.type === "company") {
    // 公司信息字段
    columns.push(
      {
        prop: "company",
        label: "公司名称",
        type: "input",
        span: 12,
        placeholder: "请输入公司名称",
      },
      {
        prop: "position",
        label: "职位",
        type: "select",
        span: 12,
        placeholder: "请选择职位",
        options: [
          { label: "总经理", value: "generalManager" },
          { label: "部门经理", value: "departmentManager" },
          { label: "员工", value: "employee" },
        ],
      }
    );
  }

  return columns;
});

// 条件表单验证规则
const conditionRules = reactive({
  type: [{ required: true, message: "请选择表单类型", trigger: "change" }],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
  company: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
  position: [{ required: true, message: "请选择职位", trigger: "change" }],
});

// 动态字段类型列配置
const dynamicTypeColumns = computed(() => {
  const columns = [
    {
      prop: "fieldType",
      label: "字段类型",
      type: "select",
      span: 12,
      placeholder: "请选择字段类型",
      options: [
        { label: "文本输入", value: "input" },
        { label: "多行文本", value: "textarea" },
        { label: "数字输入", value: "number" },
        { label: "下拉选择", value: "select" },
        { label: "单选按钮", value: "radio" },
        { label: "多选按钮", value: "checkbox" },
      ],
    },
  ];

  // 根据选择的字段类型显示对应的表单控件
  switch (dynamicTypeFormData.value.fieldType) {
    case "input":
      columns.push({
        prop: "fieldValue",
        label: "文本输入",
        type: "input",
        span: 12,
        placeholder: "请输入文本内容",
      });
      break;
    case "textarea":
      columns.push({
        prop: "fieldValue",
        label: "多行文本",
        type: "textarea",
        span: 24,
        placeholder: "请输入多行文本内容",
        rows: 4,
      });
      break;
    case "number":
      columns.push({
        prop: "fieldValue",
        label: "数字输入",
        type: "input",
        inputType: "number",
        span: 12,
        placeholder: "请输入数字",
        config: {
          min: 0,
          max: 1000,
          step: 1,
        },
      });
      break;
    case "select":
      columns.push({
        prop: "fieldValue",
        label: "下拉选择",
        type: "select",
        span: 12,
        placeholder: "请选择一个选项",
        options: [
          { label: "选项1", value: "option1" },
          { label: "选项2", value: "option2" },
          { label: "选项3", value: "option3" },
          { label: "选项4", value: "option4" },
        ],
      });
      break;
    case "radio":
      columns.push({
        prop: "fieldValue",
        label: "单选按钮",
        type: "radio",
        span: 12,
        options: [
          { label: "选项A", value: "optionA" },
          { label: "选项B", value: "optionB" },
          { label: "选项C", value: "optionC" },
        ],
      });
      break;
    case "checkbox":
      columns.push({
        prop: "fieldValue",
        label: "多选按钮",
        type: "checkbox",
        span: 12,
        options: [
          { label: "选项1", value: "option1" },
          { label: "选项2", value: "option2" },
          { label: "选项3", value: "option3" },
          { label: "选项4", value: "option4" },
        ],
      });
      break;
    default:
      break;
  }

  return columns;
});

// 动态字段类型验证规则
const dynamicTypeRules = reactive({
  fieldType: [{ required: true, message: "请选择字段类型", trigger: "change" }],
  fieldValue: [{ required: true, message: "请填写字段值", trigger: "change" }],
});

// 添加字段
const addField = () => {
  fieldCount.value++;
  const newField = {
    prop: `field${fieldCount.value}`,
    label: `字段${fieldCount.value}`,
    type: fieldCount.value % 2 === 0 ? "input" : "select",
    span: 12,
    placeholder: `请输入字段${fieldCount.value}`,
    options:
      fieldCount.value % 2 === 0
        ? undefined
        : [
            { label: "选项1", value: "1" },
            { label: "选项2", value: "2" },
            { label: "选项3", value: "3" },
          ],
  };

  // 设置不同类型字段的占位符
  if (newField.type === "select") {
    newField.placeholder = `请选择字段${fieldCount.value}`;
  }

  dynamicColumns.push(newField);

  // 添加验证规则
  dynamicRules[newField.prop] = [{ required: true, message: `请输入字段${fieldCount.value}`, trigger: "blur" }];

  // 初始化字段值
  formData.value[newField.prop] = "";

  ElMessage.success(`已添加字段${fieldCount.value}`);
};

// 删除字段
const removeField = () => {
  if (dynamicColumns.length <= 2) {
    ElMessage.warning("至少保留2个字段");
    return;
  }

  const removedField = dynamicColumns.pop();
  if (removedField) {
    // 删除验证规则
    delete dynamicRules[removedField.prop];
    // 删除字段值
    delete formData.value[removedField.prop];
    ElMessage.success(`已删除字段${removedField.label}`);
  }
};

// 提交动态表单
const handleSubmit = () => {
  submitResult.value = { type: "动态添加/删除字段", data: { ...formData.value } };
  ElMessage.success("动态表单提交成功");
  console.log("动态表单数据:", formData.value);
};

// 重置动态表单
const handleReset = () => {
  // 重置到初始状态
  dynamicColumns.splice(2);
  fieldCount.value = 2;

  // 重置验证规则
  Object.keys(dynamicRules).forEach(key => {
    if (key !== "field1" && key !== "field2") {
      delete dynamicRules[key];
    }
  });

  // 重置表单数据
  formData.value = {
    field1: "",
    field2: "",
  };

  submitResult.value = null;
  ElMessage.info("动态表单已重置");
};

// 提交条件表单
const handleConditionSubmit = () => {
  submitResult.value = { type: "条件显示字段", data: { ...conditionFormData.value } };
  ElMessage.success("条件表单提交成功");
  console.log("条件表单数据:", conditionFormData.value);
};

// 重置条件表单
const handleConditionReset = () => {
  conditionFormData.value = {
    type: "person",
    name: "",
    age: null,
    company: "",
    position: "",
  };
  submitResult.value = null;
  ElMessage.info("条件表单已重置");
};

// 提交动态字段类型表单
const handleDynamicTypeSubmit = () => {
  submitResult.value = { type: "动态字段类型", data: { ...dynamicTypeFormData.value } };
  ElMessage.success("动态字段类型表单提交成功");
  console.log("动态字段类型表单数据:", dynamicTypeFormData.value);
};

// 重置动态字段类型表单
const handleDynamicTypeReset = () => {
  dynamicTypeFormData.value = {
    fieldType: "input",
    fieldValue: "",
  };
  submitResult.value = null;
  ElMessage.info("动态字段类型表单已重置");
};
</script>


