<template>
  <div>
    <!-- 配置化行内编辑：通过 columns 配置 editable 属性即可实现编辑功能 -->
    <SunlightTable
      :data="tableData"
      :columns="columns"
      :table-props="{ border: true }"
      :show-pagination="true"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @update:current-page="currentPage = $event"
      @update:page-size="pageSize = $event"
    >
      <template #action="{ row }">
        <el-button type="primary" size="small" @click="handleSave(row)">保存</el-button>
        <el-button size="small" @click="handleReset(row)">重置</el-button>
      </template>
    </SunlightTable>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { SunlightTable } from "sunlight-ui";
import { ElMessage } from "element-plus";
const departments = [
  "技术部",
  "产品部",
  "运营部",
  "市场部",
  "人事部",
  "财务部",
  "销售部",
  "客服部",
  "设计部",
  "测试部",
];
const managers = ["张总", "刘总", "陈总", "王总", "李总", "赵总", "孙总", "周总", "吴总", "郑总"];
const cities = ["北京", "上海", "广州", "深圳", "杭州", "南京", "武汉", "成都", "西安", "重庆"];
const statusOptions = ["active", "inactive"];
const types = ["研发", "运营", "销售", "管理", "支持"];
const allData = [
  {
    id: 1,
    name: "技术部",
    manager: "张总",
    employeeCount: 20,
    status: "active",
    createDate: "2023-01-01",
    city: "北京",
    type: "研发",
    budget: 500000,
    phone: "13800138001",
    email: "tech@company.com",
    address: "北京市朝阳区科技园",
    description: "负责公司技术研发工作",
  },
  {
    id: 2,
    name: "产品部",
    manager: "刘总",
    employeeCount: 15,
    status: "active",
    createDate: "2023-01-02",
    city: "上海",
    type: "管理",
    budget: 400000,
    phone: "13800138002",
    email: "product@company.com",
    address: "上海市浦东新区商务区",
    description: "负责公司产品规划工作",
  },
  {
    id: 3,
    name: "运营部",
    manager: "陈总",
    employeeCount: 18,
    status: "active",
    createDate: "2023-01-03",
    city: "广州",
    type: "运营",
    budget: 350000,
    phone: "13800138003",
    email: "operation@company.com",
    address: "广州市天河区工业园",
    description: "负责公司运营管理工作",
  },
  {
    id: 4,
    name: "市场部",
    manager: "王总",
    employeeCount: 12,
    status: "active",
    createDate: "2023-01-04",
    city: "深圳",
    type: "市场",
    budget: 300000,
    phone: "13800138004",
    email: "marketing@company.com",
    address: "深圳市南山区科技园",
    description: "负责公司市场推广工作",
  },
  {
    id: 5,
    name: "人事部",
    manager: "李总",
    employeeCount: 8,
    status: "active",
    createDate: "2023-01-05",
    city: "杭州",
    type: "管理",
    budget: 250000,
    phone: "13800138005",
    email: "hr@company.com",
    address: "杭州市西湖区商务区",
    description: "负责人力资源管理工作",
  },
  {
    id: 6,
    name: "财务部",
    manager: "赵总",
    employeeCount: 10,
    status: "active",
    createDate: "2023-01-06",
    city: "南京",
    type: "管理",
    budget: 200000,
    phone: "13800138006",
    email: "finance@company.com",
    address: "南京市玄武区工业园",
    description: "负责财务管理工作",
  },
  {
    id: 7,
    name: "销售部",
    manager: "孙总",
    employeeCount: 25,
    status: "active",
    createDate: "2023-01-07",
    city: "武汉",
    type: "销售",
    budget: 450000,
    phone: "13800138007",
    email: "sales@company.com",
    address: "武汉市武昌区科技园",
    description: "负责公司销售工作",
  },
  {
    id: 8,
    name: "客服部",
    manager: "周总",
    employeeCount: 16,
    status: "active",
    createDate: "2023-01-08",
    city: "成都",
    type: "支持",
    budget: 280000,
    phone: "13800138008",
    email: "service@company.com",
    address: "成都市锦江区商务区",
    description: "负责客户服务工作",
  },
  {
    id: 9,
    name: "设计部",
    manager: "吴总",
    employeeCount: 14,
    status: "active",
    createDate: "2023-01-09",
    city: "西安",
    type: "研发",
    budget: 320000,
    phone: "13800138009",
    email: "design@company.com",
    address: "西安市雁塔区工业园",
    description: "负责公司设计工作",
  },
  {
    id: 10,
    name: "测试部",
    manager: "郑总",
    employeeCount: 12,
    status: "active",
    createDate: "2023-01-10",
    city: "重庆",
    type: "支持",
    budget: 260000,
    phone: "13800138010",
    email: "test@company.com",
    address: "重庆市渝中区科技园",
    description: "负责软件测试工作",
  },
  {
    id: 11,
    name: "研发部",
    manager: "张总",
    employeeCount: 30,
    status: "active",
    createDate: "2023-01-11",
    city: "北京",
    type: "研发",
    budget: 550000,
    phone: "13800138011",
    email: "rd@company.com",
    address: "北京市海淀区科技园",
    description: "负责核心技术研发",
  },
  {
    id: 12,
    name: "数据部",
    manager: "刘总",
    employeeCount: 10,
    status: "active",
    createDate: "2023-01-12",
    city: "上海",
    type: "研发",
    budget: 350000,
    phone: "13800138012",
    email: "data@company.com",
    address: "上海市静安区商务区",
    description: "负责数据管理和分析",
  },
  {
    id: 13,
    name: "运维部",
    manager: "陈总",
    employeeCount: 8,
    status: "active",
    createDate: "2023-01-13",
    city: "广州",
    type: "支持",
    budget: 220000,
    phone: "13800138013",
    email: "ops@company.com",
    address: "广州市番禺区工业园",
    description: "负责系统运维工作",
  },
  {
    id: 14,
    name: "采购部",
    manager: "王总",
    employeeCount: 6,
    status: "active",
    createDate: "2023-01-14",
    city: "深圳",
    type: "管理",
    budget: 180000,
    phone: "13800138014",
    email: "procurement@company.com",
    address: "深圳市福田区商务区",
    description: "负责采购管理工作",
  },
  {
    id: 15,
    name: "法务部",
    manager: "李总",
    employeeCount: 5,
    status: "active",
    createDate: "2023-01-15",
    city: "杭州",
    type: "管理",
    budget: 150000,
    phone: "13800138015",
    email: "legal@company.com",
    address: "杭州市余杭区科技园",
    description: "负责法律事务工作",
  },
  {
    id: 16,
    name: "行政部",
    manager: "赵总",
    employeeCount: 7,
    status: "active",
    createDate: "2023-01-16",
    city: "南京",
    type: "管理",
    budget: 160000,
    phone: "13800138016",
    email: "admin@company.com",
    address: "南京市建邺区商务区",
    description: "负责行政后勤工作",
  },
  {
    id: 17,
    name: "培训部",
    manager: "孙总",
    employeeCount: 4,
    status: "active",
    createDate: "2023-01-17",
    city: "武汉",
    type: "支持",
    budget: 120000,
    phone: "13800138017",
    email: "training@company.com",
    address: "武汉市洪山区工业园",
    description: "负责员工培训工作",
  },
  {
    id: 18,
    name: "品牌部",
    manager: "周总",
    employeeCount: 9,
    status: "active",
    createDate: "2023-01-18",
    city: "成都",
    type: "市场",
    budget: 240000,
    phone: "13800138018",
    email: "brand@company.com",
    address: "成都市武侯区科技园",
    description: "负责品牌建设工作",
  },
  {
    id: 19,
    name: "国际部",
    manager: "吴总",
    employeeCount: 11,
    status: "active",
    createDate: "2023-01-19",
    city: "西安",
    type: "销售",
    budget: 380000,
    phone: "13800138019",
    email: "international@company.com",
    address: "西安市未央区商务区",
    description: "负责国际业务工作",
  },
  {
    id: 20,
    name: "创新部",
    manager: "郑总",
    employeeCount: 13,
    status: "active",
    createDate: "2023-01-20",
    city: "重庆",
    type: "研发",
    budget: 400000,
    phone: "13800138020",
    email: "innovation@company.com",
    address: "重庆市江北区工业园",
    description: "负责创新项目研发",
  },
];

const tableData = ref([]);
// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(20);

const originalData = ref({});

const columns = [
  {
    prop: "id",
    label: "ID",
    width: 80,
    // editable 未设置，默认为不可编辑（只读）
  },
  {
    prop: "name",
    label: "部门名称",
    width: 150,
    editable: true, // 设置为可编辑
    editType: "input", // 使用文本输入框
    editProps: {
      placeholder: "请输入部门名称",
      maxlength: 50,
    },
  },
  {
    prop: "manager",
    label: "负责人",
    width: 120,
    editable: true, // 设置为可编辑
    editType: "input", // 使用文本输入框
    editProps: {
      placeholder: "请输入负责人",
    },
  },
  {
    prop: "employeeCount",
    label: "人数",
    width: 100,
    editable: true, //  设置为可编辑
    editType: "input-number", // 使用数字输入框
    editProps: {
      min: 0,
      max: 9999,
      precision: 0,
    },
  },
  {
    prop: "status",
    label: "状态",
    width: 120,
    editable: true, //  设置为可编辑
    editType: "select", // 使用下拉选择器
    editOptions: [
      { label: "启用", value: "active" },
      { label: "禁用", value: "inactive" },
    ],
    editProps: {
      placeholder: "请选择状态",
    },
  },
  {
    prop: "type",
    label: "类型",
    width: 120,
    editable: true, //  设置为可编辑
    editType: "select", // 使用下拉选择器
    editOptions: [
      { label: "研发", value: "研发" },
      { label: "运营", value: "运营" },
      { label: "销售", value: "销售" },
      { label: "管理", value: "管理" },
      { label: "支持", value: "支持" },
    ],
    editProps: {
      placeholder: "请选择类型",
    },
  },
  {
    prop: "city",
    label: "城市",
    width: 120,
    editable: true, //  设置为可编辑
    editType: "select", // 使用下拉选择器
    editOptions: cities.map(city => ({ label: city, value: city })),
    editProps: {
      placeholder: "请选择城市",
    },
  },
  {
    prop: "budget",
    label: "预算(元)",
    width: 150,
    editable: true, //  设置为可编辑
    editType: "input-number", // 使用数字输入框
    editProps: {
      min: 0,
      max: 10000000,
      precision: 0,
      step: 1000,
    },
  },
  {
    prop: "createDate",
    label: "创建日期",
    width: 150,
    editable: true, //  设置为可编辑
    editType: "date-picker", // 使用日期选择器
    editProps: {
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
      placeholder: "请选择日期",
    },
  },
  {
    prop: "phone",
    label: "联系电话",
    width: 150,
    editable: true, //  设置为可编辑
    editType: "input", // 使用文本输入框
    editProps: {
      placeholder: "请输入联系电话",
      maxlength: 11,
    },
  },
  {
    prop: "email",
    label: "邮箱",
    width: 180,
    editable: true, //  设置为可编辑
    editType: "input", // 使用文本输入框
    editProps: {
      placeholder: "请输入邮箱地址",
      type: "email",
    },
  },
  {
    prop: "address",
    label: "地址",
    width: 200,
    editable: true, //  设置为可编辑
    editType: "textarea", // 使用多行文本输入框
    editProps: {
      placeholder: "请输入地址",
      rows: 2,
      maxlength: 200,
    },
  },
  {
    prop: "description",
    label: "描述",
    width: 200,
    // 不可编辑，只读显示
  },
  {
    prop: "action",
    label: "操作",
    width: 180,
    fixed: "right",
    align: "center",
    slotName: "action", // 操作列使用自定义插槽
  },
];

// 模拟分页数据获取
function fetchTableData(page = 1, pageSizeVal = 10) {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page - 1) * pageSizeVal;
      const end = start + pageSizeVal;
      resolve({
        data: allData.slice(start, end),
        total: allData.length,
      });
    }, 300);
  });
}

// 加载数据
const loadData = async () => {
  const result = await fetchTableData(currentPage.value, pageSize.value);
  tableData.value = result.data;
  total.value = result.total;
  // 每次加载数据后，重新保存原始数据
  initOriginalData();
};

// 初始化时保存原始数据
const initOriginalData = () => {
  tableData.value.forEach(row => {
    originalData.value[row.id] = { ...row };
  });
};

// 保存操作
const handleSave = row => {
  if (!row.name || !row.name.trim()) {
    ElMessage.warning("部门名称不能为空");
    return;
  }
  if (!row.manager || !row.manager.trim()) {
    ElMessage.warning("负责人不能为空");
    return;
  }
  if (row.employeeCount < 0) {
    ElMessage.warning("人数不能为负数");
    return;
  }
  if (row.budget < 0) {
    ElMessage.warning("预算不能为负数");
    return;
  }

  // 这里可以调用 API 保存数据
  console.log("保存数据：", row);
  ElMessage.success("保存成功");

  // 更新原始数据
  originalData.value[row.id] = { ...row };
};

// 重置操作
const handleReset = row => {
  if (originalData.value[row.id]) {
    Object.assign(row, originalData.value[row.id]);
    ElMessage.info("已重置为原始数据");
  } else {
    ElMessage.warning("没有可重置的数据");
  }
};

// 监听分页变化
watch([currentPage, pageSize], () => {
  loadData();
});

// 初始化加载数据
loadData();
</script>

<style scoped></style>
