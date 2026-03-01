<template>
  <div class="content-box">
    <el-card class="box-card" shadow="hover">
      <div class="card-header">
        <span class="title">SunlightThree 自定义节点内容</span>
      </div>

      <div class="display-wrapper">
        <div class="label">黄色主题示例</div>
        <SunlightThree :data="treeData1" :defaultValue="selected1" @change="handleChange1" title="自定义节点示例">
          <template #default="{ row }">
            <span style="color: #fbc119; font-weight: bold"> {{ row.node.label }} (ID: {{ row.node.id }}) </span>
          </template>
        </SunlightThree>
        <p>当前选中ID：{{ selected1 }}</p>
      </div>

      <div class="display-wrapper">
        <div class="label">图标主题示例</div>
        <SunlightThree :data="treeData2" :defaultValue="selected2" @change="handleChange2" title="自定义节点内容">
          <template #default="{ row }">
            <div style="display: flex; align-items: center">
              <el-icon style="margin-right: 6px; color: #409eff">
                <svg viewBox="0 0 1024 1024" width="16" height="16" fill="currentColor">
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.2 0-372-166.8-372-372s166.8-372 372-372 372 166.8 372 372-166.8 372-372 372z"
                  />
                  <path d="M464 336h96v352h-96z" />
                  <path d="M464 704h96v96h-96z" />
                </svg>
              </el-icon>
              <span style="font-weight: 600; color: #303133"> {{ row.node.label }} (自定义内容) </span>
            </div>
          </template>
        </SunlightThree>
        <p>当前选中ID：{{ selected2 }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SunlightThree } from 'sunlight-ui'

const treeData1 = [
  {
    id: '1',
    label: '一级 1',
    children: [
      { id: '1-1', label: '二级 1-1' },
      { id: '1-2', label: '二级 1-2' }
    ]
  },
  {
    id: '2',
    label: '一级 2',
    children: [{ id: '2-1', label: '二级 2-1' }]
  }
]

const selected1 = ref('1-2')

function handleChange1(val) {
  selected1.value = val
}

const treeData2 = [
  {
    id: '1',
    label: '一级节点 1',
    children: [
      { id: '1-1', label: '二级节点 1-1' },
      { id: '1-2', label: '二级节点 1-2' }
    ]
  },
  {
    id: '2',
    label: '一级节点 2',
    children: [{ id: '2-1', label: '二级节点 2-1' }]
  }
]

const selected2 = ref('1-1')

function handleChange2(val) {
  selected2.value = val
}
</script>

<style scoped>
.content-box {
  width: 100%;
  padding: 0;
  overflow-x: hidden;
}
.box-card {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgb(64 158 255 / 0.15);
  padding: 32px 40px;
  transition: box-shadow 0.3s ease;
  box-sizing: border-box;
  border: none;
}
.box-card:hover {
  box-shadow: 0 16px 40px rgb(64 158 255 / 0.25);
}

.card-header {
  font-weight: 900;
  font-size: 28px;
  color: #1f2d4a;
  border-bottom: 4px solid #409eff;
  padding-bottom: 14px;
  margin-bottom: 36px;
  letter-spacing: 1.4px;
}

.title {
  font-weight: 900;
  font-size: 28px;
  color: #1f2d4a;
  border-bottom: 4px solid #409eff;
  padding-bottom: 14px;
  margin-bottom: 36px;
  letter-spacing: 1.4px;
}

.display-wrapper {
  margin-bottom: 48px;
  padding: 22px 32px;
  border-radius: 14px;
  user-select: text;
}

.label {
  font-weight: 700;
  font-size: 18px;
  color: #409eff;
  margin-bottom: 16px;
  letter-spacing: 0.6px;
}

:deep(.filter) {
  width: 100%;
  max-width: 293px;
}
:deep(.sunlight-three) {
  max-width: 100%;
  overflow: hidden;
}
</style>
