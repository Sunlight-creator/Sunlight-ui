<template>
  <div>
    <el-card>
      <SunlightTable :data="tableData" :columns="columns" :table-props="tableProps" />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightTable } from 'sunlight-ui'

const tableData = ref([])

const columns = [
  { prop: 'name', label: '名称' },
  { prop: 'code', label: '编码' },
  { prop: 'type', label: '类型' },
  { prop: 'sort', label: '排序' }
]

const tableProps = {
  border: true,
  treeProps: {
    children: 'children',
    hasChildren: 'hasChildren'
  },
  lazy: true,
  load: (tree, treeNode, resolve) => {
    setTimeout(() => {
      const children = generateChildrenData(tree)
      resolve(children)
    }, 300)
  }
}

const categoryData = {
  electronics: {
    name: '数码电子',
    code: 'ELEC',
    children: ['手机', '电脑', '平板', '耳机', '相机']
  },
  clothing: {
    name: '服装鞋帽',
    code: 'CLTH',
    children: ['男装', '女装', '童装', '鞋靴', '配饰']
  },
  food: {
    name: '食品生鲜',
    code: 'FOOD',
    children: ['零食', '饮料', '生鲜', '粮油', '调味品']
  },
  home: {
    name: '家居家装',
    code: 'HOME',
    children: ['家具', '家电', '家纺', '厨具', '清洁']
  },
  sports: {
    name: '运动户外',
    code: 'SPRT',
    children: ['健身器材', '户外运动', '球类运动', '游泳用品', '运动服饰']
  }
}

const productCategories = {
  手机: ['智能手机', '功能手机', '老人机'],
  电脑: ['笔记本电脑', '台式电脑', '平板电脑', '一体机'],
  平板: ['iPad', '安卓平板', '学习平板'],
  耳机: ['蓝牙耳机', '有线耳机', '降噪耳机'],
  相机: ['数码相机', '微单', '运动相机', '摄像机'],
  男装: ['T恤', '衬衫', '卫衣', '外套', '裤子'],
  女装: ['T恤', '衬衫', '连衣裙', '外套', '裤子'],
  童装: ['上衣', '裤子', '套装', '外套'],
  鞋靴: ['运动鞋', '皮鞋', '靴子', '拖鞋'],
  配饰: ['手表', '眼镜', '帽子', '围巾', '包'],
  零食: ['坚果', '糖果', '巧克力', '膨化食品'],
  饮料: ['碳酸饮料', '果汁', '茶饮料', '咖啡'],
  生鲜: ['水果', '蔬菜', '肉类', '海鲜'],
  粮油: ['大米', '面粉', '食用油', '调味品'],
  调味品: ['酱油', '醋', '料酒', '盐', '味精'],
  家具: ['客厅家具', '卧室家具', '书房家具', '餐厅家具'],
  家电: ['大家电', '小家电', '厨房电器', '个护电器'],
  家纺: ['四件套', '被子', '枕头', '窗帘'],
  厨具: ['锅具', '刀具', '餐具', '厨房小工具'],
  清洁: ['清洁工具', '清洁剂', '收纳用品', '一次性用品'],
  健身器材: ['跑步机', '哑铃', '杠铃', '动感单车', '椭圆机'],
  户外运动: ['帐篷', '睡袋', '背包', '登山杖', '头灯'],
  球类运动: ['篮球', '足球', '乒乓球', '羽毛球', '网球'],
  游泳用品: ['泳镜', '泳帽', '泳衣', '游泳圈', '浮板'],
  运动服饰: ['运动T恤', '运动裤', '运动鞋', '运动袜', '运动内衣']
}

function generateChildrenData(parent) {
  const result = []
  const childCount = 2 + Math.floor(Math.random() * 4)

  if (parent.id === 'root') {
    Object.keys(categoryData).forEach(key => {
      result.push({
        id: key,
        name: categoryData[key].name,
        code: categoryData[key].code,
        type: '一级分类',
        sort: Math.floor(Math.random() * 100),
        hasChildren: true
      })
    })
    return result
  }

  if (parent.type === '一级分类') {
    const categoryKey = Object.keys(categoryData).find(key => categoryData[key].name === parent.name)
    if (categoryKey && categoryData[categoryKey].children) {
      categoryData[categoryKey].children.forEach(name => {
        result.push({
          id: `${parent.id}-${name}`,
          name: name,
          code: `${parent.code}_${String(result.length + 1).padStart(2, '0')}`,
          type: '二级分类',
          sort: Math.floor(Math.random() * 100),
          hasChildren: true
        })
      })
    }
    return result
  }

  if (parent.type === '二级分类') {
    const products = productCategories[parent.name] || []
    products.forEach(name => {
      result.push({
        id: `${parent.id}-${name}`,
        name: name,
        code: `${parent.code}_${String(result.length + 1).padStart(3, '0')}`,
        type: '三级分类',
        sort: Math.floor(Math.random() * 100),
        hasChildren: false
      })
    })
    return result
  }

  return result
}

const rootData = [{ id: 'root', name: '商品分类', code: 'ROOT', type: '根目录', sort: 0, hasChildren: true }]

tableData.value = rootData
</script>
