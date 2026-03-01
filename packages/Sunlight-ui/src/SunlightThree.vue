<template>
  <div 
    class="card filter sunlight-three-wrapper"
    :style="[
      {
        '--three-wrapper-border-color': props.wrapperStyle?.borderColor || '#c0c4cc',
        '--three-wrapper-border-radius': props.wrapperStyle?.borderRadius || '4px',
        '--three-wrapper-bg-color': props.wrapperStyle?.backgroundColor,
        '--three-wrapper-box-shadow': props.wrapperStyle?.boxShadow,
        '--three-wrapper-focus-border-color': props.wrapperStyle?.focusBorderColor || '#409eff',
        '--three-wrapper-focus-box-shadow': props.wrapperStyle?.focusBoxShadow,
        '--three-selected-bg-color': props.wrapperStyle?.selectedBgColor || '#409eff',
        '--three-selected-text-color': props.wrapperStyle?.selectedTextColor || '#ffffff'
      }
    ]"
  >
    <h4 v-if="title" class="title sle">
      {{ title }}
    </h4>
    <div class="search">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
      <el-dropdown trigger="click">
        <el-icon size="20"><More /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toggleTreeNodes(true)">展开全部</el-dropdown-item>
            <el-dropdown-item @click="toggleTreeNodes(false)">折叠全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-scrollbar class="el-scrollbar" :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
      <el-tree
        ref="treeRef"
        :default-expand-all="!props.lazy"
        :node-key="id"
        :data="multiple ? treeData : treeAllData"
        :show-checkbox="multiple"
        :check-strictly="false"
        :current-node-key="!multiple ? selected : ''"
        :highlight-current="!multiple"
        :expand-on-click-node="false"
        :check-on-click-node="multiple"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :default-checked-keys="multiple ? selected : []"
        :lazy="props.lazy"
        :load="props.load"
        @node-click="handleNodeClick"
        @check="handleCheckChange"
      >
        <template #default="scope">
          <span class="el-tree-node__label">
            <slot :row="scope">
              {{ scope.node.label }}
            </slot>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="TreeFilter">
import { ref, watch, nextTick } from "vue";
import { ElTree } from "element-plus";
import { More } from "@element-plus/icons-vue";

interface TreeFilterProps {
  data: { [key: string]: any }[]; // 必传，树形数据
  title?: string;
  id?: string;
  label?: string;
  multiple?: boolean;
  defaultValue?: any;
  lazy?: boolean; // 是否启用异步加载
  load?: (node: any, resolve: (data: any[]) => void) => void; // 异步加载方法
  wrapperStyle?: {
    borderColor?: string;
    borderRadius?: string;
    backgroundColor?: string;
    boxShadow?: string;
    focusBorderColor?: string;
    focusBoxShadow?: string;
    selectedBgColor?: string;
    selectedTextColor?: string;
  };
}

const props = withDefaults(defineProps<TreeFilterProps>(), {
  id: "id",
  label: "label",
  multiple: false,
  lazy: false,
  load: undefined,
  wrapperStyle: () => ({})
});

const defaultProps = {
  children: "children",
  label: props.label
};

const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);

const selected = ref<any>(props.multiple ? [] : "");

// 设置默认选中值
const setSelected = () => {
  if (props.multiple) {
    selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : (props.defaultValue ? [props.defaultValue] : []);
  } else {
    selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";
  }
};

// 监听 data 变化，更新树数据
watch(() => props.data, (newData) => {
  if (newData && newData.length) {
    treeData.value = newData;
    // 异步加载模式下不添加"全部"节点
    if (!props.lazy) {
      treeAllData.value = [{ [props.id!]: "", [props.label!]: "全部" }, ...newData];
    } else {
      treeAllData.value = newData;
    }
  } else {
    treeData.value = [];
    treeAllData.value = [];
  }
}, { immediate: true, deep: true });

// 监听 defaultValue 变化，更新选中
watch(() => props.defaultValue, () => nextTick(() => setSelected()), { deep: true, immediate: true });

const filterText = ref("");
watch(filterText, val => {
  treeRef.value?.filter(val);
});

// 过滤节点方法，支持多层级匹配
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
  if (!value) return true;
  let parentNode = node.parent,
    labels = [node.label],
    level = 1;
  while (level < node.level) {
    labels.push(parentNode.label);
    parentNode = parentNode.parent;
    level++;
  }
  return labels.some(label => label.indexOf(value) !== -1);
};

// 展开或折叠所有节点
const toggleTreeNodes = (isExpand: boolean) => {
  const nodes = treeRef.value?.store.nodesMap;
  if (!nodes) return;
  Object.values(nodes).forEach(node => {
    node.expanded = isExpand;
  });
};

// 事件发射器
const emit = defineEmits<{
  change: [value: any];
}>();

// 单选节点点击事件
const handleNodeClick = (data: { [key: string]: any }) => {
  if (props.multiple) return;
  emit("change", data[props.id!]);
};

// 多选节点勾选事件
const handleCheckChange = () => {
  emit("change", treeRef.value?.getCheckedKeys());
};

// 初始化默认选中
setSelected();

defineExpose({ treeData, treeAllData, treeRef });
</script>

<style scoped lang="scss">
.sunlight-three-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.filter {
  box-sizing: border-box;
  width: 220px;
  height: 100%;
  padding: 18px;
  margin-right: 10px;
  border: 1px solid var(--three-wrapper-border-color);
  border-radius: var(--three-wrapper-border-radius);
  background-color: var(--three-wrapper-bg-color, #fff);
  box-shadow: var(--three-wrapper-box-shadow);
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus-within {
    // border-color: var(--three-wrapper-focus-border-color);
    box-shadow: var(--three-wrapper-focus-box-shadow);
  }
  .title {
    margin: 0 0 15px;
    font-size: 18px;
    font-weight: bold;
    color: #73767A;
    letter-spacing: 0.5px;
  }
  .search {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 15px;
    .el-icon {
      cursor: pointer;
      transform: rotate(90deg) translateY(-8px);
    }
  }
  .el-scrollbar {
    :deep(.el-tree) {
      height: 80%;
      overflow: auto;
      .el-tree-node__content {
        height: 33px;
      }
    }
    // :deep(.el-tree--highlight-current) {
    //   .el-tree-node.is-expanded > .el-tree-node__content {
    //     background-color: #009688;
    //     .el-tree-node__label,
    //     .el-tree-node__expand-icon {
    //       color: white;
    //     }
    //     .is-leaf {
    //       color: #ffffff;
    //     }
    //   }
    // }
        :deep(.el-tree--highlight-current) {
      .el-tree-node.is-current > .el-tree-node__content {
        background-color: var(--three-selected-bg-color);
        .el-tree-node__label,
        .el-tree-node__expand-icon {
          color: var(--three-selected-text-color);
        }
        .is-leaf {
          color: transparent;
        }
      }
    }
  }
}

</style>

<!-- 

---

# TreeFilter 组件使用文档

## 组件简介

`TreeFilter` 是基于 Vue 3 `<script setup>` 语法和 Element Plus 组件库实现的树形过滤组件，支持：

- 树形数据展示（多层级）
- 单选和多选模式切换
- 输入关键字过滤节点（支持多层级匹配）
- 展开全部 / 折叠全部功能
- 默认选中节点设置
- 自定义节点显示内容（通过插槽）

---

## 组件 Props

| 参数名       | 类型                 | 是否必填 | 默认值    | 说明                                                         |
| ------------ | -------------------- | -------- | --------- | ------------------------------------------------------------ |
| `data`       | `Array<object>`      | 是       | -         | 树形数据，数组格式，节点对象需包含唯一标识和显示文本字段     |
| `title`      | `string`             | 否       | -         | 组件标题，显示在顶部                                         |
| `id`         | `string`             | 否       | `"id"`    | 节点唯一标识字段名                                           |
| `label`      | `string`             | 否       | `"label"` | 节点显示文本字段名                                           |
| `multiple`   | `boolean`            | 否       | `false`   | 是否启用多选模式                                             |
| `defaultValue` | `string` 或 `string[]` | 否       | -         | 默认选中节点，单选时为字符串，多选时为字符串数组             |
| `lazy`       | `boolean`            | 否       | `false`   | 是否启用异步加载模式                                         |
| `load`       | `Function`           | 否       | `undefined` | 异步加载子节点的方法，参数为 `(node, resolve)`，`node` 为当前节点，`resolve` 为加载完成回调 |

---

## 事件说明

| 事件名    | 说明                   | 参数类型          |
| --------- | ---------------------- | ----------------- |
| `change`  | 选中节点变化时触发     | 单选：选中节点 id<br>多选：选中节点 id 数组 |

---

## 插槽说明

| 插槽名   | 说明                           | 作用域参数                       |
| -------- | ------------------------------ | ------------------------------- |
| `default` | 自定义树节点内容               | `{ row }`，其中 `row.node` 是当前节点数据 |

---

## 组件使用示例

### 1. 基础单选示例

```vue
<template>
  <TreeFilter
    :data="treeData"
    title="单选树形过滤"
    :defaultValue="defaultSelected"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import TreeFilter from "@/components/TreeFilter.vue";

const treeData = ref([
  {
    id: "1",
    label: "一级 1",
    children: [
      { id: "1-1", label: "二级 1-1" },
      { id: "1-2", label: "二级 1-2" }
    ]
  },
  {
    id: "2",
    label: "一级 2",
    children: [
      { id: "2-1", label: "二级 2-1" }
    ]
  }
]);

const defaultSelected = ref("1-1");

const handleChange = (selectedId: string) => {
  console.log("选中节点 id:", selectedId);
};
</script>
```

---

### 2. 多选示例

```vue
<template>
  <TreeFilter
    :data="treeData"
    title="多选树形过滤"
    multiple
    :defaultValue="defaultSelected"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import TreeFilter from "@/components/TreeFilter.vue";

const treeData = ref([
  {
    id: "1",
    label: "一级 1",
    children: [
      { id: "1-1", label: "二级 1-1" },
      { id: "1-2", label: "二级 1-2" }
    ]
  },
  {
    id: "2",
    label: "一级 2",
    children: [
      { id: "2-1", label: "二级 2-1" }
    ]
  }
]);

const defaultSelected = ref(["1-1", "2-1"]);

const handleChange = (selectedIds: string[]) => {
  console.log("选中节点 id 数组:", selectedIds);
};
</script>
```

---

### 3. 自定义节点内容示例

```vue
<template>
  <TreeFilter :data="treeData" title="自定义节点内容">
    <template #default="{ row }">
      <span style="color: #409EFF;">[{{ row.node.id }}]</span> {{ row.node.label }}
    </template>
  </TreeFilter>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TreeFilter from "@/components/TreeFilter.vue";

const treeData = ref([
  { id: "1", label: "节点 1" },
  { id: "2", label: "节点 2" }
]);
</script>
```

---

### 4. 异步加载示例

```vue
<template>
  <TreeFilter 
    :data="treeData" 
    title="异步加载树形结构"
    lazy
    :load="loadNode"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import TreeFilter from "@/components/TreeFilter.vue";

// 模拟异步加载方法
const loadNode = (node: any, resolve: (data: any[]) => void) => {
  // 根节点，加载一级数据
  if (node.level === 0) {
    return resolve([
      { id: "1", label: "一级节点 1", hasChildren: true },
      { id: "2", label: "一级节点 2", hasChildren: true }
    ]);
  }
  // 一级节点，加载二级数据
  if (node.level === 1) {
    setTimeout(() => {
      resolve([
        { id: `${node.data.id}-1`, label: `二级节点 ${node.data.id}-1`, hasChildren: true },
        { id: `${node.data.id}-2`, label: `二级节点 ${node.data.id}-2` }
      ]);
    }, 500);
    return;
  }
  // 二级节点，加载三级数据
  if (node.level === 2) {
    setTimeout(() => {
      resolve([
        { id: `${node.data.id}-1`, label: `三级节点 ${node.data.id}-1` },
        { id: `${node.data.id}-2`, label: `三级节点 ${node.data.id}-2` }
      ]);
    }, 500);
    return;
  }
  resolve([]);
};

// 初始数据（根节点）
const treeData = ref([]);

const handleChange = (selectedId: string) => {
  console.log("选中节点 id:", selectedId);
};
</script>
```

---

## 组件功能说明

- **搜索过滤**：输入框支持关键字过滤，支持多层级匹配，搜索时会匹配当前节点及其所有父节点的文本。
- **展开/折叠全部**：右侧“更多”按钮点击后可展开或折叠所有节点。
- **默认选中**：通过 `defaultValue` 设置默认选中节点，单选传字符串，多选传字符串数组。
- **多选模式**：开启 `multiple` 后，节点前显示复选框，支持多选。
- **单选模式**：默认模式，点击节点触发选中事件，当前选中节点高亮显示。
- **自定义节点内容**：通过默认插槽自定义节点显示内容。

---

## 注意事项

1. 组件依赖 Element Plus 及其图标库，请确保项目已正确安装并引入。
2. `data` 中树节点的子节点字段默认为 `children`，如果你的数据结构不同，可修改组件源码中的 `defaultProps.children`。
3. `id` 和 `label` 字段默认是 `"id"` 和 `"label"`，如果你的数据字段名不同，可以通过传入对应的 `id` 和 `label` prop 来覆盖。
4. 多选模式下，`defaultValue` 应传入数组，单选模式下传入字符串。
5. 组件内部会自动添加一个“全部”节点（id 为空字符串），用于多选模式下显示全部选项。

--- -->

如果你需要进一步定制或者遇到任何问题，欢迎随时告诉我！