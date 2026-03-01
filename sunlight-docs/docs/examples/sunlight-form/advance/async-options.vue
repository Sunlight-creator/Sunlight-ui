<template>
  <div class="demo-container">
    <h3>异步选项加载 - 复杂案例</h3>
    <p>展示复杂的异步选项加载场景，包括带搜索过滤的异步选项、多数据源加载和缓存机制。</p>
    
    <SunlightForm v-model="formData" :columns="columns" :rules="rules" :formOptions="formOptions">
      <template #operation>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="success" @click="refreshCache">刷新缓存</el-button>
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
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";

// 缓存对象，用于存储异步加载的选项
const optionCache = new Map();

// 表单数据
const formData = ref({
  user: "",
  role: "",
  product: [],
  description: "",
});

// 表单选项
const formOptions = reactive({
  labelWidth: "140px",
  size: "default",
});

// 表单验证规则
const rules = reactive({
  user: [{ required: true, message: "请选择用户", trigger: "change" }],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
  product: [{ required: true, message: "请选择产品", trigger: "change" }],
});

// 是否显示结果
const showResult = ref(false);

// 模拟API请求，带缓存机制
const fetchDataWithCache = async (key: string, fetcher: Function, cache = true) => {
  // 检查缓存
  if (cache && optionCache.has(key)) {
    console.log(`从缓存获取: ${key}`);
    return optionCache.get(key);
  }
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    const data = await fetcher();
    if (cache) {
      optionCache.set(key, data);
    }
    return data;
  } catch (error) {
    ElMessage.error("数据加载失败，请重试");
    throw error;
  }
};

// 模拟用户列表API，支持搜索
const fetchUsers = (keyword = "") => {
  // 模拟用户数据
  const allUsers = [
    { label: "张三 - 管理员", value: "user1", role: "admin" },
    { label: "李四 - 编辑", value: "user2", role: "editor" },
    { label: "王五 - 审核员", value: "user3", role: "reviewer" },
    { label: "赵六 - 访客", value: "user4", role: "visitor" },
    { label: "孙七 - 开发者", value: "user5", role: "developer" },
    { label: "周八 - 设计师", value: "user6", role: "designer" },
    { label: "吴九 - 测试工程师", value: "user7", role: "tester" },
    { label: "郑十 - 产品经理", value: "user8", role: "product" },
  ];
  
  return new Promise(resolve => {
    setTimeout(() => {
      if (!keyword) {
        resolve(allUsers);
      } else {
        const filtered = allUsers.filter(user => 
          user.label.toLowerCase().includes(keyword.toLowerCase())
        );
        resolve(filtered);
      }
    }, 1000);
  });
};

// 模拟角色列表API
const fetchRoles = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { label: "管理员", value: "admin", description: "系统管理员" },
        { label: "编辑", value: "editor", description: "内容编辑" },
        { label: "审核员", value: "reviewer", description: "内容审核" },
        { label: "开发者", value: "developer", description: "系统开发" },
        { label: "设计师", value: "designer", description: "UI/UX设计" },
        { label: "测试工程师", value: "tester", description: "系统测试" },
        { label: "产品经理", value: "product", description: "产品规划" },
        { label: "访客", value: "visitor", description: "普通访客" },
      ]);
    }, 700);
  });
};

// 模拟产品列表API，支持搜索
const fetchProducts = (keyword = "") => {
  // 模拟产品数据
  const allProducts = [
    { label: "Sunlight UI - 企业级UI组件库", value: "sunlight-ui", category: "ui" },
    { label: "Sunlight Table - 高级表格组件", value: "sunlight-table", category: "component" },
    { label: "Sunlight Form - 动态表单组件", value: "sunlight-form", category: "component" },
    { label: "Sunlight Chart - 数据可视化组件", value: "sunlight-chart", category: "component" },
    { label: "Sunlight Admin - 后台管理模板", value: "sunlight-admin", category: "template" },
    { label: "Sunlight CMS - 内容管理系统", value: "sunlight-cms", category: "system" },
    { label: "Sunlight CRM - 客户关系管理", value: "sunlight-crm", category: "system" },
    { label: "Sunlight ERP - 企业资源计划", value: "sunlight-erp", category: "system" },
  ];
  
  return new Promise(resolve => {
    setTimeout(() => {
      if (!keyword) {
        resolve(allProducts);
      } else {
        const filtered = allProducts.filter(product => 
          product.label.toLowerCase().includes(keyword.toLowerCase()) ||
          product.category.toLowerCase().includes(keyword.toLowerCase())
        );
        resolve(filtered);
      }
    }, 900);
  });
};

// 带搜索的用户选项加载函数
const loadUsers = (query: string) => {
  return fetchDataWithCache(`users_${query}`, () => fetchUsers(query), false);
};

// 角色选项加载函数
const loadRoles = () => {
  return fetchDataWithCache("roles", fetchRoles);
};

// 带搜索的产品选项加载函数
const loadProducts = (query: string) => {
  return fetchDataWithCache(`products_${query}`, () => fetchProducts(query), false);
};

// 表单列配置
const columns = reactive([
  // 带搜索的用户选择
  {
    prop: "user",
    label: "用户选择",
    type: "select",
    span: 12,
    placeholder: "请输入用户名搜索",
    options: loadUsers,
    clearable: true,
    filterable: true,
    debounce: 300,
    customStyle: {
      borderColor: "#67C23A",
    },
  },
  
  // 角色选择
  {
    prop: "role",
    label: "角色分配",
    type: "select",
    span: 12,
    placeholder: "请选择角色",
    options: loadRoles,
    clearable: true,
    filterable: true,
    customStyle: {
      borderColor: "#409EFF",
    },
  },
  
  // 带搜索的产品选择
  {
    prop: "product",
    label: "产品选择",
    type: "select",
    span: 24,
    placeholder: "请输入产品名称或分类搜索",
    options: loadProducts,
    clearable: true,
    filterable: true,
    debounce: 300,
    multiple: true,
    limit: 3,
    customStyle: {
      borderColor: "#E6A23C",
    },
  },
  
  // 文本域
  {
    prop: "description",
    label: "备注信息",
    type: "textarea",
    span: 24,
    rows: 4,
    maxlength: 300,
    showWordLimit: true,
    placeholder: "请输入备注信息",
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
    user: "",
    role: "",
    product: [],
    description: "",
  };
  showResult.value = false;
  ElMessage.info("表单已重置");
};

// 刷新缓存
const refreshCache = () => {
  optionCache.clear();
  ElMessage.success("缓存已刷新，下次请求将重新加载数据");
  console.log("缓存已刷新");
};
</script>

<style scoped>
.demo-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

h3 {
  margin-bottom: 10px;
  color: #303133;
  font-size: 18px;
  font-weight: 600;
}

p {
  margin-bottom: 20px;
  color: #909399;
  font-size: 14px;
}

/* 表单操作按钮样式 */
:deep(.el-form-item__content) {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* 结果容器样式 */
.result-container {
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.result-container h4 {
  margin-bottom: 15px;
  color: #606266;
  font-size: 16px;
  font-weight: 500;
}

.result-json {
  padding: 15px;
  background-color: #f5f7fa;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

/* 绿色主题按钮 */
:deep(.el-button--success) {
  background-color: #67C23A;
  border-color: #67C23A;
}

:deep(.el-button--success:hover),
:deep(.el-button--success:focus) {
  background-color: #85CE61;
  border-color: #85CE61;
}
</style>