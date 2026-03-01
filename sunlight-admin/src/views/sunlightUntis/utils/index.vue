<template>
  <el-card class="box-card" shadow="hover">
    <div class="utils-demo">
      <h2>工具函数全功能演示</h2>

      <!-- localStorage 操作 -->
      <section>
        <h3>1. localStorage 操作</h3>
        <input v-model="storageKey" placeholder="Storage Key" />
        <input v-model="storageValue" placeholder="Storage Value" />
        <div class="btn-group">
          <el-button type="primary" @click="saveToStorage">保存</el-button>
          <el-button @click="readFromStorage">读取</el-button>
          <el-button type="danger" @click="removeFromStorage">删除</el-button>
          <el-button @click="clearStorage">清空所有</el-button>
        </div>
        <p class="result">读取结果：{{ storageResult }}</p>
      </section>

      <!-- 生成 UUID -->
      <section>
        <h3>2. 生成 UUID</h3>
        <el-button type="success" @click="generateNewUUID">生成 UUID</el-button>
        <p class="result">{{ uuid }}</p>
      </section>

      <!-- 判断数据类型 -->
      <section>
        <h3>3. 判断数据类型</h3>
        <input v-model="typeCheckInput" placeholder="输入任意值" />
        <el-button @click="checkType">检测类型</el-button>
        <p class="result">类型：{{ detectedType }}</p>
      </section>

      <!-- 比较两个对象是否相等 -->
      <section>
        <h3>4. 比较两个对象是否相等</h3>
        <el-input type="textarea" v-model="objA" placeholder='对象 A，格式如：{"a":1,"b":2}' rows="3" />
        <el-input type="textarea" v-model="objB" placeholder='对象 B，格式如：{"a":1,"b":2}' rows="3" />
        <el-button type="warning" @click="compareObjects">比较</el-button>
        <p class="result">是否相等：{{ objectsEqual ? '是' : '否' }}</p>
      </section>

      <!-- 生成随机数 -->
      <section>
        <h3>5. 生成随机数</h3>
        <el-input-number v-model="randomMin" :min="0" label="最小值" />
        <el-input-number v-model="randomMax" :min="0" label="最大值" />
        <el-button type="info" @click="generateRandom">生成随机数</el-button>
        <p class="result">随机数：{{ randomNumber }}</p>
      </section>

      <!-- 手机号校验 -->
      <section>
        <h3>6. 手机号校验</h3>
        <input v-model="phoneNumber" placeholder="请输入手机号" />
        <el-button type="primary" @click="validatePhone">校验手机号</el-button>
        <p class="result" :class="{ error: phoneError }">{{ phoneMessage }}</p>
      </section>

      <!-- 类型判断辅助函数演示 -->
      <section>
        <h3>7. 类型判断辅助函数</h3>
        <input v-model="checkVal" placeholder="输入任意值" />
        <el-button @click="checkAllTypes">检测所有类型</el-button>
        <ul class="type-list">
          <li>isFunction: {{ typeResults.isFunction }}</li>
          <li>isDef: {{ typeResults.isDef }}</li>
          <li>isUnDef: {{ typeResults.isUnDef }}</li>
          <li>isObject: {{ typeResults.isObject }}</li>
          <li>isDate: {{ typeResults.isDate }}</li>
          <li>isNumber: {{ typeResults.isNumber }}</li>
          <li>isAsyncFunction: {{ typeResults.isAsyncFunction }}</li>
          <li>isPromise: {{ typeResults.isPromise }}</li>
          <li>isString: {{ typeResults.isString }}</li>
          <li>isBoolean: {{ typeResults.isBoolean }}</li>
          <li>isArray: {{ typeResults.isArray }}</li>
          <li>isClient: {{ typeResults.isClient }}</li>
          <li>isWindow: {{ typeResults.isWindow }}</li>
          <li>isElement: {{ typeResults.isElement }}</li>
          <li>isNull: {{ typeResults.isNull }}</li>
          <li>isNullOrUnDef: {{ typeResults.isNullOrUnDef }}</li>
        </ul>
      </section>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  localGet,
  localSet,
  localRemove,
  localClear,
  generateUUID,
  isType,
  isObjectValueEqual,
  randomNum,
  checkPhoneNumber,
  isFunction,
  isDef,
  isUnDef,
  isObject,
  isDate,
  isNumber,
  isAsyncFunction,
  isPromise,
  isString,
  isBoolean,
  isArray,
  isClient,
  isWindow,
  isElement,
  isNull,
  isNullOrUnDef
} from 'sunlight-ui'
// localStorage 相关
const storageKey = ref('myKey')
const storageValue = ref('Hello World')
const storageResult = ref('')

// UUID
const uuid = ref('')

// 类型检测
const typeCheckInput = ref('')
const detectedType = ref('')

// 对象比较
const objA = ref('{"a":1,"b":2}')
const objB = ref('{"a":1,"b":2}')
const objectsEqual = ref(false)

// 随机数
const randomMin = ref(1)
const randomMax = ref(100)
const randomNumber = ref(0)

// 手机号校验
const phoneNumber = ref('')
const phoneMessage = ref('')
const phoneError = ref(false)

// 类型判断辅助函数演示
const checkVal = ref('')
const typeResults = ref({
  isFunction: false,
  isDef: false,
  isUnDef: false,
  isObject: false,
  isDate: false,
  isNumber: false,
  isAsyncFunction: false,
  isPromise: false,
  isString: false,
  isBoolean: false,
  isArray: false,
  isClient: false,
  isWindow: false,
  isElement: false,
  isNull: false,
  isNullOrUnDef: false
})

// localStorage 操作函数
function saveToStorage() {
  localSet(storageKey.value, storageValue.value)
  storageResult.value = '已保存'
}
function readFromStorage() {
  const val = localGet(storageKey.value)
  storageResult.value = val === null ? '无数据' : JSON.stringify(val)
}
function removeFromStorage() {
  localRemove(storageKey.value)
  storageResult.value = '已删除'
}
function clearStorage() {
  localClear()
  storageResult.value = '已清空所有'
}

// 生成 UUID
function generateNewUUID() {
  uuid.value = generateUUID()
}

// 类型检测
function checkType() {
  let val: any
  try {
    val = JSON.parse(typeCheckInput.value)
  } catch {
    val = typeCheckInput.value
  }
  detectedType.value = isType(val)
}

// 对象比较
function compareObjects() {
  let aObj, bObj
  try {
    aObj = JSON.parse(objA.value)
    bObj = JSON.parse(objB.value)
  } catch {
    objectsEqual.value = false
    return
  }
  objectsEqual.value = isObjectValueEqual(aObj, bObj)
}

// 生成随机数
function generateRandom() {
  if (randomMin.value > randomMax.value) {
    randomNumber.value = NaN
    return
  }
  randomNumber.value = randomNum(randomMin.value, randomMax.value)
}

// 手机号校验
function validatePhone() {
  phoneError.value = false
  phoneMessage.value = ''
  checkPhoneNumber(null, phoneNumber.value, (err: string | Error | undefined) => {
    if (err) {
      phoneError.value = true
      phoneMessage.value = typeof err === 'string' ? err : err.message
    } else {
      phoneMessage.value = '手机号格式正确'
    }
  })
}

// 类型判断辅助函数演示
function checkAllTypes() {
  let val: any
  try {
    val = JSON.parse(checkVal.value)
  } catch {
    val = checkVal.value
  }
  typeResults.value = {
    isFunction: isFunction(val),
    isDef: isDef(val),
    isUnDef: isUnDef(val),
    isObject: isObject(val),
    isDate: isDate(val),
    isNumber: isNumber(val),
    isAsyncFunction: isAsyncFunction(val),
    isPromise: isPromise(val),
    isString: isString(val),
    isBoolean: isBoolean(val),
    isArray: isArray(val),
    isClient: isClient(),
    isWindow: isWindow(val),
    isElement: isElement(val),
    isNull: isNull(val),
    isNullOrUnDef: isNullOrUnDef(val)
  }
}
</script>

<style scoped>
.utils-demo {
  max-width: 700px;
  margin: 20px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  border-radius: 8px;
  padding: 20px 30px;
  box-shadow: 0 0 10px rgb(0 0 0 / 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #409eff;
}
section {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}
h3 {
  color: #606266;
  margin-bottom: 10px;
}
input,
.el-input,
.el-input__inner,
.el-input-number__input,
textarea {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 6px 10px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  transition: border-color 0.3s;
  resize: vertical;
}
input:focus,
.el-input__inner:focus,
.el-input-number__input:focus,
textarea:focus {
  border-color: #409eff;
  outline: none;
}
.btn-group {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.result {
  margin-top: 10px;
  font-weight: 600;
  color: #303133;
  background: #e6f7ff;
  padding: 8px 12px;
  border-radius: 4px;
  user-select: text;
  word-break: break-word;
}
.error {
  color: #f56c6c;
  background: #fde2e2;
}
.el-button {
  min-width: 100px;
}
.type-list {
  margin-top: 10px;
  list-style: none;
  padding-left: 0;
  color: #606266;
}
.type-list li {
  margin-bottom: 4px;
}
</style>
