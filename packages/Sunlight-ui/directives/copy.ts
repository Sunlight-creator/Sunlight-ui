import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
import { unref } from "vue";

interface ElType extends HTMLElement {
  copyData: string;
}

const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = getCopyValue(binding.value);
    el.addEventListener("click", handleClick);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = getCopyValue(binding.value);
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", handleClick);
  }
};

function getCopyValue(value: any): string {
  // unref 会自动解包 Ref 或 Reactive，非响应式数据直接返回
  const val = unref(value);
  return val != null ? String(val) : "";
}

async function handleClick(this: ElType) {
  try {
    await navigator.clipboard.writeText(this.copyData);
    ElMessage({
      type: "success",
      message: "复制成功"
    });
  } catch (err) {
    console.error("复制操作不被支持或失败: ", err);
    ElMessage({
      type: "error",
      message: "复制失败，请手动复制"
    });
  }
}

export default copy;
