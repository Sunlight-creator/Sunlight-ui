<template> 
   <div> 
     <SunlightTable 
       :data="tableData" 
       :columns="columns" 
       :toolbar-config="toolbarConfig" 
       :export-config="exportConfig"
       v-model:hide-columns="hideColumns" <!-- 使用 v-model 双向绑定隐藏列 -->
       @export="handleExport" 
       @refresh="handleRefresh" 
       @custom-button-click="handleCustomButtonClick" 
       v-model:current-page="currentPage" 
       v-model:page-size="pageSize" 
       :total="total" 
     /> 
     <div style="margin-top: 20px;"> 
       <el-button type="primary" @click="toggleHideColumn('age')">
         {{ hideColumns.includes('age') ? '显示年龄列' : '隐藏年龄列' }}
       </el-button>
       <el-button type="primary" @click="toggleHideColumn('city')">
         {{ hideColumns.includes('city') ? '显示城市列' : '隐藏城市列' }}
       </el-button>
       <div style="margin-top: 10px;">当前隐藏的列: {{ hideColumns.join(', ') || '无' }}</div>
     </div>
   </div> 
 </template> 
 
 <script setup> 
 import { ref, reactive } from 'vue' 
 import { SunlightTable } from '../../index' 
 
 const toolbarConfig = reactive({ 
   showDensity: true, // 显示密度切换 
   showExport: true, // 显示导出按钮 
   showColumnConfig: true, // 显示列配置（重要：需要开启才能在工具栏中显示列配置按钮） 
   showRefresh: true, // 显示刷新按钮 
   customButtons: [ 
     { 
       key: 'add', 
       label: '新增', 
       icon: 'Plus', 
       type: 'primary', 
       position: 'left' // 放在左侧 
     } 
   ] 
 }) 
 
 const exportConfig = reactive({ 
   enableColumnSelection: true, // 启用导出列选择 
   defaultExportColumns: ['id', 'name', 'age'], // 默认选中的导出列 
   excludeColumns: ['action'] // 不导出的列 
 }) 
 
 // 隐藏列配置（重要：父组件需要配置此属性并与 SunlightTable 双向绑定）
 // 初始隐藏 'status' 列
 const hideColumns = ref(['status'])
 
 function handleExport(columns) { 
   console.log('要导出的列:', columns) 
 } 
 
 function handleRefresh() { 
   console.log('刷新表格') 
 } 
 
 function handleCustomButtonClick(key) { 
   console.log('点击了按钮:', key) 
 } 
 
 // 手动切换列的显示/隐藏
 function toggleHideColumn(prop) {
   const index = hideColumns.value.indexOf(prop)
   if (index > -1) {
     // 如果已经隐藏，则显示
     hideColumns.value.splice(index, 1)
   } else {
     // 如果已经显示，则隐藏
     hideColumns.value.push(prop)
   }
 } 
 
 // 表格数据 
 const tableData = ref([]) 
 // 当前页码 
 const currentPage = ref(1) 
 // 每页条数 
 const pageSize = ref(10) 
 // 总条数 
 const total = ref(50) 
 
 // 列配置 
 const columns = [ 
   { prop: 'id', label: 'ID' }, 
   { prop: 'name', label: '姓名' }, 
   { prop: 'age', label: '年龄' }, 
   { prop: 'city', label: '城市' }, 
   { prop: 'status', label: '状态', width: 100 } 
 ] 
 
 // 模拟数据：返回分页数据 
 async function fetchTableData(page = 1, pageSize = 10) { 
   return new Promise(resolve => { 
     setTimeout(() => { 
       // 模拟总共 50 条数据 
       const allData = [] 
       for (let i = 1; i <= 50; i++) { 
         allData.push({ 
           id: i, 
           name: `用户${i}`, 
           age: 20 + (i % 30), 
           city: ['北京', '上海', '广州', '深圳', '杭州'][i % 5], 
           status: i % 3 === 0 ? '离职' : '在职' 
         }) 
       } 
       // 返回当前页的数据 
       const start = (page - 1) * pageSize 
       const end = start + pageSize 
       resolve(allData.slice(start, end)) 
     }, 300) 
   }) 
 } 
 
 // 加载数据函数 
 const loadData = async () => { 
   const data = await fetchTableData(currentPage.value, pageSize.value) 
   tableData.value = data 
 } 
 
 // 监听分页变化，重新加载数据 
 import { watch } from 'vue' 
 watch([currentPage, pageSize], () => { 
   loadData() 
 }) 
 
 // 初始化加载 
 loadData() 
 </script>