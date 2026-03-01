import type { Directive, DirectiveBinding } from "vue";

// 扩展 HTMLElement，添加自定义属性用于存储定时器和事件处理函数
interface ElType extends HTMLElement {
  __handleClick__?: (event: Event) => void; // 事件处理函数引用，方便解绑
  __timer__?: ReturnType<typeof setTimeout>; // 定时器引用，用于防抖控制
}

const debounce: Directive = {
  // 指令绑定到元素时调用
  mounted(el: ElType, binding: DirectiveBinding) {
    // 校验绑定值是否为函数
    if (typeof binding.value !== "function") {
      console.warn("[v-debounce] 指令绑定的值必须是函数");
      return;
    }


    // 解析防抖延迟时间，支持通过指令参数传入，默认500ms
    const delay = (binding.arg && !isNaN(Number(binding.arg))) ? Number(binding.arg) : 500;

    // 定义防抖事件处理函数
    el.__handleClick__ = (event: Event) => {
      // 如果已有定时器，清除，重新计时
      if (el.__timer__) clearTimeout(el.__timer__);
      el.__timer__ = setTimeout(() => {
        // 延迟执行绑定的回调函数，传入事件对象
        binding.value(event);
      }, delay);
    };

    // 绑定点击事件监听器
    el.addEventListener("click", el.__handleClick__);
  },

  // 指令绑定的值更新时调用（如回调函数变化）
  updated(el: ElType, binding: DirectiveBinding) {
    // 校验绑定值是否为函数
    if (typeof binding.value !== "function") {
      console.warn("[v-debounce] 指令绑定的值必须是函数");
      return;
    }

    // 移除旧的事件监听器，防止重复绑定
    if (el.__handleClick__) {
      el.removeEventListener("click", el.__handleClick__);
    }

    // 重新解析防抖延迟时间
    const delay = (binding.arg && !isNaN(Number(binding.arg))) ? Number(binding.arg) : 500;

    // 重新定义事件处理函数
    el.__handleClick__ = (event: Event) => {
      if (el.__timer__) clearTimeout(el.__timer__);
      el.__timer__ = setTimeout(() => {
        binding.value(event);
      }, delay);
    };

    // 重新绑定点击事件监听器
    el.addEventListener("click", el.__handleClick__);
  },

  // 指令解绑时调用，清理事件监听和定时器
  beforeUnmount(el: ElType) {
    if (el.__handleClick__) {
      el.removeEventListener("click", el.__handleClick__);
    }
    if (el.__timer__) {
      clearTimeout(el.__timer__);
    }
  }
};

export default debounce;


// <!-- 默认防抖500ms -->
// <button v-debounce="handleClick">点击防抖</button>

// <!-- 自定义防抖时间为 1000ms -->
// <button v-debounce:1000="handleClick">点击防抖</button>


/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 */
// import type { Directive, DirectiveBinding } from "vue";
// interface ElType extends HTMLElement {
//   __handleClick__: () => any;
// }
// const debounce: Directive = {
//   mounted(el: ElType, binding: DirectiveBinding) {
//     if (typeof binding.value !== "function") {
//       throw "callback must be a function";
//     }
//     let timer: NodeJS.Timeout | null = null;
//     el.__handleClick__ = function () {
//       if (timer) {
//         clearInterval(timer);
//       }
//       timer = setTimeout(() => {
//         binding.value();
//       }, 500);
//     };
//     el.addEventListener("click", el.__handleClick__);
//   },
//   beforeUnmount(el: ElType) {
//     el.removeEventListener("click", el.__handleClick__);
//   }
// };

// export default debounce;
