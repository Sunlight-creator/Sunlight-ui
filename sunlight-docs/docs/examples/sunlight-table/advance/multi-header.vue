<template>
  <div>
    <h3>高级复杂表头示例</h3>
    <p>展示多层级复杂表头功能，包括嵌套表头、自定义宽度、对齐方式和合并单元格</p>
    <div>
      <SunlightTable :data="tableData" :columns="columns" :table-props="tableProps" :show-selection="false">
        <!-- 自定义操作列 -->
        <template #action="{ row }">
          <div class="action-buttons">
            <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </div>
        </template>
      </SunlightTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SunlightTable } from "sunlight-ui";
import { ElButton } from "element-plus";

// 表格数据
const tableData = ref([
  {
    id: "2023001",
    name: "张三",
    gender: "男",
    age: 18,
    class: "高三(1)班",
    chinese: 95,
    math: 98,
    english: 92,
    physics: 90,
    chemistry: 88,
    history: 85,
    geography: 82,
    biology: 86,
    politics: 89,
    running: 80,
    longJump: 78,
    highJump: 75,
    shotPut: 72,
    music: 90,
    painting: 85,
    calligraphy: 88,
    socialPractice: 92,
    experiment: 89,
    morality: 94,
    behavior: 96,
    teacherEvaluation: "该生学习认真，成绩优异，综合素质全面发展，是一名优秀的学生。",
    studentSelfEvaluation: "我在学习上认真努力，积极参加各项活动，希望能够不断进步，成为更好的自己。",
  },
  {
    id: "2023002",
    name: "李四",
    gender: "女",
    age: 17,
    class: "高三(1)班",
    chinese: 92,
    math: 95,
    english: 90,
    physics: 88,
    chemistry: 86,
    history: 90,
    geography: 88,
    biology: 92,
    politics: 94,
    running: 85,
    longJump: 82,
    highJump: 78,
    shotPut: 75,
    music: 92,
    painting: 90,
    calligraphy: 85,
    socialPractice: 90,
    experiment: 92,
    morality: 95,
    behavior: 97,
    teacherEvaluation: "该生学习态度端正，成绩优秀，乐于助人，是同学们的好榜样。",
    studentSelfEvaluation: "我会继续努力学习，提高自己的综合素质，为班级和学校争光。",
  },
  {
    id: "2023003",
    name: "王五",
    gender: "男",
    age: 18,
    class: "高三(2)班",
    chinese: 88,
    math: 92,
    english: 86,
    physics: 90,
    chemistry: 92,
    history: 85,
    geography: 83,
    biology: 87,
    politics: 88,
    running: 88,
    longJump: 85,
    highJump: 80,
    shotPut: 78,
    music: 85,
    painting: 82,
    calligraphy: 80,
    socialPractice: 88,
    experiment: 90,
    morality: 92,
    behavior: 94,
    teacherEvaluation: "该生学习刻苦，成绩良好，体育特长突出，希望能够平衡发展。",
    studentSelfEvaluation: "我会在保持体育优势的同时，努力提高文化课成绩，争取全面发展。",
  },
  {
    id: "2023004",
    name: "赵六",
    gender: "女",
    age: 17,
    class: "高三(2)班",
    chinese: 90,
    math: 88,
    english: 92,
    physics: 85,
    chemistry: 83,
    history: 92,
    geography: 90,
    biology: 88,
    politics: 90,
    running: 78,
    longJump: 75,
    highJump: 72,
    shotPut: 70,
    music: 95,
    painting: 92,
    calligraphy: 90,
    socialPractice: 94,
    experiment: 86,
    morality: 93,
    behavior: 95,
    teacherEvaluation: "该生艺术天赋突出，学习成绩稳定，是一名有特长的优秀学生。",
    studentSelfEvaluation: "我会继续发挥艺术特长，同时努力提高理科成绩，争取全面发展。",
  },
]);

// 复杂表头配置
const columns = [
  // 基础信息
  {
    label: "基础信息",
    align: "center",
    children: [
      { prop: "id", label: "学号", width: 120, align: "center" },
      { prop: "name", label: "姓名", width: 100, align: "center" },
      { prop: "gender", label: "性别", width: 80, align: "center" },
      { prop: "age", label: "年龄", width: 80, align: "center" },
      { prop: "class", label: "班级", width: 120, align: "center" },
    ],
  },

  // 学习成绩
  {
    label: "学习成绩",
    align: "center",
    children: [
      {
        label: "主要课程",
        align: "center",
        children: [
          { prop: "chinese", label: "语文", width: 80, align: "center" },
          { prop: "math", label: "数学", width: 80, align: "center" },
          { prop: "english", label: "英语", width: 80, align: "center" },
          { prop: "physics", label: "物理", width: 80, align: "center" },
          { prop: "chemistry", label: "化学", width: 80, align: "center" },
        ],
      },
      {
        label: "选修课程",
        align: "center",
        children: [
          { prop: "history", label: "历史", width: 80, align: "center" },
          { prop: "geography", label: "地理", width: 80, align: "center" },
          { prop: "biology", label: "生物", width: 80, align: "center" },
          { prop: "politics", label: "政治", width: 80, align: "center" },
        ],
      },
    ],
  },

  // 综合素质
  {
    label: "综合素质",
    align: "center",
    children: [
      {
        label: "体育",
        align: "center",
        children: [
          { prop: "running", label: "跑步", width: 80, align: "center" },
          { prop: "longJump", label: "跳远", width: 80, align: "center" },
          { prop: "highJump", label: "跳高", width: 80, align: "center" },
          { prop: "shotPut", label: "铅球", width: 80, align: "center" },
        ],
      },
      {
        label: "艺术",
        align: "center",
        children: [
          { prop: "music", label: "音乐", width: 80, align: "center" },
          { prop: "painting", label: "绘画", width: 80, align: "center" },
          { prop: "calligraphy", label: "书法", width: 80, align: "center" },
        ],
      },
      {
        label: "实践",
        align: "center",
        children: [
          { prop: "socialPractice", label: "社会实践", width: 100, align: "center" },
          { prop: "experiment", label: "实验操作", width: 100, align: "center" },
        ],
      },
      {
        label: "德育",
        align: "center",
        children: [
          { prop: "morality", label: "思想品德", width: 100, align: "center" },
          { prop: "behavior", label: "行为规范", width: 100, align: "center" },
        ],
      },
    ],
  },

  {
    label: "评价",
    align: "center",
    children: [
      { prop: "teacherEvaluation", label: "教师评价", minWidth: 200, align: "left" },
      { prop: "studentSelfEvaluation", label: "学生自评", minWidth: 200, align: "left" },
    ],
  },

  // 操作列
  { prop: "action", label: "操作", width: 150, align: "center", slotName: "action" },
];

// 表格属性配置
const tableProps = {
  border: true,
  stripe: true,
  height: 600,
};

// 编辑操作
const handleEdit = row => {
  console.log("编辑:", row);
  // 这里可以实现编辑逻辑
};

// 删除操作
const handleDelete = row => {
  console.log("删除:", row);
  // 这里可以实现删除逻辑
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}
</style>
