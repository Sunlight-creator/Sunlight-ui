<template>
  <div class="login-container">
    <!-- 左侧品牌区域 -->
    <div class="login-brand">
      <div class="brand-content">
        <h1 class="brand-title">管理系统</h1>
        <p class="brand-desc">高效、优雅的管理系统解决方案</p>
        <div class="brand-features">
          <div class="feature-item">
            <svg-icon name="component" class-name="feature-icon" />
            <span>组件化设计</span>
          </div>
          <div class="feature-item">
            <svg-icon name="setting" class-name="feature-icon" />
            <span>灵活配置</span>
          </div>
          <div class="feature-item">
            <svg-icon name="guide" class-name="feature-icon" />
            <span>易用性优先</span>
          </div>
        </div>
      </div>
      <!-- 装饰图形 -->
      <div class="decorative-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

    <!-- 右侧登录表单区域 -->
    <div class="login-form-wrapper">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">欢迎回来</h3>
          <p class="subtitle">请登录您的账号继续</p>
        </div>

        <el-form-item prop="username">
          <div class="input-wrapper">
            <span class="svg-container">
              <svg-icon name="user" class-name="icon-style" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
              :class="{ 'input-focused': focusedInput === 'username' }"
              @focus="focusedInput = 'username'"
              @blur="focusedInput = ''"
            />
          </div>
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock 已开启" placement="right" manual>
          <el-form-item prop="password">
            <div class="input-wrapper">
              <span class="svg-container">
                <svg-icon name="password" class-name="icon-style" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup="checkCapslock"
                @blur="capsTooltip = false; focusedInput = ''"
                @keyup.enter="handleLogin"
                :class="{ 'input-focused': focusedInput === 'password' }"
                @focus="focusedInput = 'password'"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" class-name="icon-style" />
              </span>
            </div>
          </el-form-item>
        </el-tooltip>

        <div class="login-options">
          <el-checkbox v-model="loginForm.remember" class="remember-me">记住密码</el-checkbox>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>

        <el-button :loading="loading" type="primary" size="large" class="login-button" @click.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登录中...</span>
        </el-button>

        <div class="login-tips">
          <div class="tips-title">测试账号：</div>
          <div class="tips-item">
            <span class="role">管理员：</span>
            <span class="account">admin / any</span>
          </div>
          <div class="tips-item">
            <span class="role">编辑者：</span>
            <span class="account">editor / any</span>
          </div>
        </div>
      </el-form>

      <div class="login-footer">
        <p>© 2026 管理系统. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api'
import { setToken } from '@/utils/auth'
import { getTimeState } from '@/utils/index'
import { ElNotification } from 'element-plus'
import { ref, reactive, toRefs, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const validateUsername = (rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
  if (!value) {
    callback('请输入用户名')
  } else {
    callback()
  }
}
const validatePassword = (rule: unknown, value: string | undefined, callback: (msg?: string) => void) => {
  if (!value || value.length < 6) {
    callback('密码不能少于6位')
  } else {
    callback()
  }
}
const initData = reactive({
  loginForm: {
    username: 'admin',
    password: '123456sss',
    remember: false
  },
  rules: {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
  },
  passwordType: 'password', // 展示或隐藏密码
  capsTooltip: false, // 判断是否显示提示内容
  loading: false,
  redirect: undefined,
  otherQuery: {}
})
let { loginForm, rules, capsTooltip, passwordType, loading } = toRefs(initData)
const password = ref()
const loginFormRef = ref()
const focusedInput = ref('')

// watch 监听区域
watch(
  route,
  (newValue: any) => {
    const query = newValue?.query
    if (query) {
      initData.redirect = query.redirect
      initData.otherQuery = getOtherQuery(query)
    }
  },
  { immediate: true, deep: true }
)

function checkCapslock(e: any) {
  const { key } = e
  capsTooltip.value = key && key.length === 1 && key >= 'A' && key <= 'Z'
}
function showPwd() {
  if (passwordType.value == 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    password.value.focus() // 设置焦点
  })
}

// 获取剩余的路径参数
type queryType = Record<string, string>
function getOtherQuery(query: queryType) {
  return Object.keys(query).reduce((acc: queryType, cur: string) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

function handleLogin() {
  loginFormRef.value.validate(async (valid: Boolean) => {
    if (valid) {
      loading.value = true
      try {
        let bkToken = `${'admin'}-${'eyJhbGci0iJIUzUxMi9,eyJzdhli0iJhzG1pbiisImlyZNF0ZWD0JE2NDC0ODY2NA30TUsImV4CCI6HITY0ODA5NTQ3MH0iahkWaZBe FCYh8Gia0pr54R1NTOoUAIhef3sqANP902qxdG04Pw XPXIEXXV8-7DHFHpTxlaiUMwUp6wM1AXg'}`
        setToken(bkToken)
        // 路由跳转
        router.push({
          path: initData.redirect || '/',
          query: initData.otherQuery
        })
        ElNotification({
          title: getTimeState(),
          message: '欢迎登录管理系统',
          type: 'success',
          duration: 3000
        })
      } finally {
        loading.value = false
      }
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
// 颜色变量
$primary-color: #1890ff;
$success-color: #52c41a;
$warning-color: #faad14;
$danger-color: #f5222d;
$info-color: #40a9ff;

$white: #ffffff;
$light-gray: #f5f7fa;
$gray: #c0c4cc;
$dark-gray: #606266;
$darker-gray: #303133;

$gradient-start: #1890ff;
$gradient-end: #40a9ff;
$gradient-light: rgba(255, 255, 255, 0.1);
$gradient-hover: rgba(255, 255, 255, 0.15);

$shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
$shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.15);
$shadow-input: 0 4px 12px rgba(24, 144, 255, 0.15);

$transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
$transition-slow: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);

.login-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: $light-gray;
  background-image: radial-gradient(circle at 10% 20%, rgba(64, 169, 255, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(64, 169, 255, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 50% 50%, rgba(64, 169, 255, 0.03) 0%, transparent 30%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;

  // 左侧品牌区域
  .login-brand {
    flex: 1;
    background: linear-gradient(135deg, $gradient-start 0%, $gradient-end 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    // 装饰元素
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, $gradient-light 0%, transparent 70%);
      animation: float 20s ease-in-out infinite;
    }

    // 装饰图形
    .decorative-shapes {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      animation: floatShape 15s ease-in-out infinite;
    }

    .shape-1 {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }

    .shape-2 {
      width: 150px;
      height: 150px;
      bottom: 15%;
      right: 15%;
      animation-delay: 5s;
    }

    .shape-3 {
      width: 100px;
      height: 100px;
      top: 50%;
      right: 20%;
      animation-delay: 10s;
    }

    .brand-content {
      position: relative;
      z-index: 2;
      color: $white;
      text-align: center;
      padding: 0 40px;
      animation: fadeInUp 1s ease-out 0.2s both;
    }

    .brand-title {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 16px;
      background: linear-gradient(135deg, $white, rgba(255, 255, 255, 0.8));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .brand-desc {
      font-size: 18px;
      margin-bottom: 48px;
      opacity: 0.9;
      line-height: 1.5;
    }

    .brand-features {
      display: flex;
      gap: 40px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      opacity: 0.9;
      transition: $transition;
      animation: fadeInUp 1s ease-out 0.4s both;

      &:hover {
        opacity: 1;
        transform: translateY(-5px);
      }
    }

    .feature-icon {
      font-size: 32px;
      color: $white;
      transition: $transition;

      .feature-item:hover & {
        transform: scale(1.1);
      }
    }
  }

  // 右侧表单区域
  .login-form-wrapper {
    width: 480px;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: $shadow;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
    animation: slideInRight 1s ease-out both;

    // 表单
    .login-form {
      max-width: 400px;
      margin: 0 auto;
      width: 100%;

      .title-container {
        text-align: center;
        margin-bottom: 40px;
        animation: fadeInUp 1s ease-out 0.6s both;

        .title {
          font-size: 28px;
          font-weight: bold;
          color: $darker-gray;
          margin-bottom: 8px;
          position: relative;
          display: inline-block;

          &::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            background: linear-gradient(135deg, $gradient-start, $gradient-end);
            border-radius: 2px;
          }
        }

        .subtitle {
          font-size: 14px;
          color: $info-color;
          margin-top: 16px;
        }
      }

      // 输入框容器
      :deep(.el-form-item) {
        margin-bottom: 24px;
        border-radius: 8px;
        transition: $transition;
        animation: fadeInUp 1s ease-out 0.8s both;

        &:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        &.is-error {
          .input-wrapper {
            border-color: $danger-color;
            box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.1);
          }
        }
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        background-color: $light-gray;
        border: 1px solid transparent;
        border-radius: 8px;
        transition: $transition;

        &:hover {
          background-color: rgba(64, 158, 255, 0.05);
        }

        &:has(:deep(.input-focused)) {
          background-color: $white;
          border-color: $primary-color;
          box-shadow: $shadow-input;
        }

        :deep(.el-input__wrapper) {
          box-shadow: none;
          background-color: transparent;
          border: none;
        }
      }

      .svg-container {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        color: $info-color;
        transition: $transition;

        .input-wrapper:has(:deep(.input-focused)) & {
          color: $primary-color;
        }
      }

      .icon-style {
        font-size: 20px;
      }

      :deep(.el-input__inner) {
        height: 48px;
        line-height: 48px;
        background-color: transparent;
        border: none;
        border-radius: 0;
        padding: 0 12px;
        font-size: 14px;
        color: $darker-gray;
        transition: $transition;

        &:focus {
          background-color: transparent;
        }

        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px $light-gray inset !important;
          -webkit-text-fill-color: $darker-gray !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      }

      .show-pwd {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        color: $info-color;
        cursor: pointer;
        user-select: none;
        transition: $transition;

        &:hover {
          color: $primary-color;
          transform: scale(1.1);
        }
      }

      // 登录选项
      .login-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        animation: fadeInUp 1s ease-out 1s both;

        .remember-me {
          font-size: 14px;
          color: $dark-gray;

          :deep(.el-checkbox__label) {
            color: $dark-gray;
            transition: $transition;
          }

          :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
            background-color: $primary-color;
            border-color: $primary-color;
          }

          :deep(.el-checkbox__input:hover .el-checkbox__inner) {
            border-color: $primary-color;
          }
        }

        .forgot-password {
          font-size: 14px;
          color: $primary-color;
          text-decoration: none;
          transition: $transition;
          position: relative;

          &:hover {
            color: rgba(24, 144, 255, 0.8);
          }

          &::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background-color: $primary-color;
            transition: $transition;
          }

          &:hover::after {
            width: 100%;
          }
        }
      }

      // 登录按钮
      .login-button {
        width: 100%;
        margin-bottom: 24px;
        height: 48px;
        line-height: 48px;
        font-size: 16px;
        font-weight: 500;
        border-radius: 8px;
        background: linear-gradient(135deg, $gradient-start 0%, $gradient-end 100%);
        border: none;
        transition: $transition;
        animation: fadeInUp 1s ease-out 1.2s both;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(64, 158, 255, 0.3);
        }

        &:active {
          transform: translateY(0);
        }

        &:focus {
          box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.2);
        }
      }

      // 测试账号提示
      .login-tips {
        background-color: $light-gray;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 24px;
        border-left: 4px solid $info-color;
        animation: fadeInUp 1s ease-out 1.4s both;

        .tips-title {
          font-size: 14px;
          font-weight: 500;
          color: $dark-gray;
          margin-bottom: 12px;
        }

        .tips-item {
          font-size: 13px;
          color: $info-color;
          margin-bottom: 8px;
          display: flex;
          align-items: center;

          &:last-child {
            margin-bottom: 0;
          }

          .role {
            font-weight: 500;
            color: $dark-gray;
            min-width: 60px;
          }

          .account {
            margin-left: 8px;
            background-color: rgba(64, 169, 255, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
          }
        }
      }
    }

    // 页脚
    .login-footer {
      text-align: center;
      margin-top: 40px;
      animation: fadeInUp 1s ease-out 1.6s both;

      p {
        font-size: 12px;
        color: $info-color;
        opacity: 0.8;
        transition: $transition;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

// 动画
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(20px, -20px) rotate(1deg);
  }
  50% {
    transform: translate(0, -40px) rotate(0deg);
  }
  75% {
    transform: translate(-20px, -20px) rotate(-1deg);
  }
}

@keyframes floatShape {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.08;
  }
  50% {
    transform: translate(20px, -20px) scale(1.1);
    opacity: 0.12;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// 响应式设计
@media (max-width: 992px) {
  .login-container {
    flex-direction: column;

    .login-brand {
      width: 100%;
      height: 300px;
      padding: 40px 20px;
    }

    .login-form-wrapper {
      width: 100%;
      box-shadow: none;
      padding: 40px 20px;
    }
  }
}

@media (max-width: 576px) {
  .login-container {
    .login-brand {
      height: 250px;

      .brand-title {
        font-size: 36px;
      }

      .brand-desc {
        font-size: 16px;
      }

      .brand-features {
        gap: 20px;
      }

      .shape-1 {
        width: 150px;
        height: 150px;
      }

      .shape-2 {
        width: 100px;
        height: 100px;
      }

      .shape-3 {
        width: 80px;
        height: 80px;
      }
    }

    .login-form-wrapper {
      padding: 30px 20px;

      .login-form {
        .title-container {
          .title {
            font-size: 24px;

            &::after {
              width: 30px;
              height: 3px;
            }
          }
        }

        .input-wrapper {
          .svg-container {
            width: 40px;
            height: 40px;
          }

          :deep(.el-input__inner) {
            height: 40px;
            line-height: 40px;
          }
        }

        .login-button {
          height: 44px;
          line-height: 44px;
        }
      }
    }
  }
}
</style>
