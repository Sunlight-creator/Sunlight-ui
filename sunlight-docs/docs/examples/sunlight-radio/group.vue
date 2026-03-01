<script setup lang="ts">
import { ref } from "vue";
import { SunlightRadio } from "sunlight-ui";

// 分组模式示例数据
const groupValue = ref("option2");
const singleValue = ref("option1");
const options = [
  { label: "选项一", value: "option1" },
  { label: "选项二", value: "option2" },
  { label: "选项三", value: "option3" },
  { label: "选项四", value: "option4" },
  { label: "选项五", value: "option5" },
];
</script>

<template>
  <div>
    <h3 style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px">分组模式 vs 独立模式</h3>

    <!-- 分组模式 -->
    <div style="margin-bottom: 40px">
      <div style="margin-bottom: 15px">
        <p style="font-weight: bold; margin-bottom: 8px">分组模式（isGroup: true）</p>
        <p style="color: #606266; font-size: 14px; margin-bottom: 10px">
          适用于多个相关选项需要组合在一起的场景，例如性别选择、状态选择等。
          会将所有选项包装在一个分组容器中，确保只能选择其中一个选项。
        </p>
      </div>
      <SunlightRadio
        v-model="groupValue"
        :item="{
          options: options,
          isGroup: true,
          wrapperStyle: {
            focusBorderColor: '#409eff',
          },
        }"
      />
      <div style="margin-top: 15px">
        <p>当前选择值：{{ groupValue || "暂无选择" }}</p>
      </div>
    </div>

    <!-- 独立模式 -->
    <div style="margin-bottom: 40px">
      <div style="margin-bottom: 15px">
        <p style="font-weight: bold; margin-bottom: 8px">独立模式（isGroup: false）</p>
        <p style="color: #606266; font-size: 14px; margin-bottom: 10px">
          适用于单个独立的单选框，例如是否同意条款、是否开启某项功能等。 每个单选框都是独立的，需要单独配置选项。
        </p>
      </div>
      <div style="display: flex; gap: 20px; margin-bottom: 20px">
        <div style="display: flex; align-items: center">
          <SunlightRadio
            v-model="singleValue"
            :item="{
              options: [{ label: '选项一', value: 'option1' }],
              isGroup: false,
              wrapperStyle: {
                focusBorderColor: '#67c23a',
              },
            }"
          />
        </div>
        <div style="display: flex; align-items: center">
          <SunlightRadio
            v-model="singleValue"
            :item="{
              options: [{ label: '选项二', value: 'option2' }],
              isGroup: false,
              wrapperStyle: {
                focusBorderColor: '#e6a23c',
              },
            }"
          />
        </div>
      </div>
      <div style="margin-top: 15px">
        <p>当前选择值：{{ singleValue || "暂无选择" }}</p>
      </div>
    </div>

    <!-- 实际应用场景 -->
    <div style="margin-top: 40px; padding: 15px; background-color: #f5f7fa; border-radius: 8px">
      <p style="font-weight: bold; margin-bottom: 10px">实际应用场景</p>
      <div style="color: #606266; font-size: 14px; line-height: 1.6">
        <p><strong>分组模式适合：</strong></p>
        <ul style="margin: 8px 0 15px 20px; padding-left: 15px; list-style-type: disc">
          <li>性别选择：男 / 女 / 其他</li>
          <li>学历选择：本科 / 硕士 / 博士 / 其他</li>
          <li>状态选择：启用 / 禁用</li>
        </ul>
        <p><strong>独立模式适合：</strong></p>
        <ul style="margin: 8px 0 0 20px; padding-left: 15px; list-style-type: disc">
          <li>同意服务条款</li>
          <li>开启通知</li>
          <li>记住密码</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
