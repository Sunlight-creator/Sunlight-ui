<template>
  <div class="upload-box">
    <el-upload
      :id="uuid"
      action="#"
      :class="['upload', self_disabled ? 'disabled' : '', drag ? 'no-border' : '']"
      :multiple="false"
      :disabled="self_disabled"
      :show-file-list="false"
      :http-request="handleHttpUpload"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :drag="drag"
      :accept="fileType.join(',')"
      :style="{
        '--image-wrapper-width': width,
        '--image-wrapper-height': height,
        '--image-wrapper-border-radius': borderRadius,
        '--image-wrapper-border-color': wrapperStyle?.borderColor ?? '#dcdfe6',
        '--image-wrapper-focus-border-color': wrapperStyle?.focusBorderColor ?? '#409eff',
        '--image-wrapper-focus-box-shadow': wrapperStyle?.focusBoxShadow,
        '--image-wrapper-bg-color': wrapperStyle?.backgroundColor,
        '--image-wrapper-box-shadow': wrapperStyle?.boxShadow
      }"
    >
      <template v-if="imageUrl">
        <img :src="imageUrl" class="upload-image" />
        <div class="upload-handle" @click.stop>
          <div v-if="!self_disabled" class="handle-icon" @click="editImg">
            <el-icon><Edit /></el-icon>
            <span>编辑</span>
          </div>
          <div class="handle-icon" @click="imgViewVisible = true">
            <el-icon><ZoomIn /></el-icon>
            <span>查看</span>
          </div>
          <div v-if="!self_disabled" class="handle-icon" @click="deleteImg">
            <el-icon><Delete /></el-icon>
            <span>删除</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="upload-empty">
          <slot name="empty">
            <el-icon><Plus /></el-icon>
            <!-- <span>请上传图片</span> -->
          </slot>
        </div>
      </template>
    </el-upload>
    <div class="el-upload__tip">
      <slot name="tip"></slot>
    </div>
    <teleport to="body">
      <el-image-viewer
        v-if="imgViewVisible"
        :url-list="[imageUrl]"
        @close="imgViewVisible = false"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts" name="UploadImg">
import { ref, computed, inject } from "vue";
import { generateUUID } from "../utils/index";
import { ElNotification, formContextKey, formItemContextKey } from "element-plus";
import type { UploadProps, UploadRequestOptions } from "element-plus";

interface UploadFileProps {
  imageUrl: string; // 图片地址 ==> 必传
  api: (params: any) => Promise<any>; // 上传图片的 api 方法，必须传入
  drag?: boolean; // 是否支持拖拽上传 ==> 非必传（默认为 true）
  disabled?: boolean; // 是否禁用上传组件 ==> 非必传（默认为 false）
  fileSize?: number; // 图片大小限制 ==> 非必传（默认为 5M）
  fileType?: string[]; // 图片类型限制 ==> 非必传（默认为 ["image/jpeg", "image/png", "image/gif"]）
  height?: string; // 组件高度 ==> 非必传（默认为 150px）
  width?: string; // 组件宽度 ==> 非必传（默认为 150px）
  borderRadius?: string; // 组件边框圆角 ==> 非必传（默认为 8px）
  wrapperStyle?: {
    borderColor?: string; // 边框颜色
    focusBorderColor?: string; // 聚焦/悬停时边框颜色
    focusBoxShadow?: string; // 聚焦/悬停时阴影
    backgroundColor?: string; // 背景颜色
    boxShadow?: string; // 阴影
  };
}

// 接受父组件参数
const props = withDefaults(defineProps<UploadFileProps>(), {
  imageUrl: "",
  drag: true,
  disabled: false,
  fileSize: 5,
  fileType: () => ["image/jpeg", "image/png", "image/gif"],
  height: "150px",
  width: "150px",
  borderRadius: "8px",
  wrapperStyle: () => ({}),
});

// 生成组件唯一id
const uuid = ref("id-" + generateUUID());

// 查看图片
const imgViewVisible = ref(false);
// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
  return props.disabled || formContext?.disabled;
});

/**
 * @description 图片上传
 * @param options upload 所有配置项
 * */
const emit = defineEmits<{
  (event: "update:imageUrl", value: string): void;
  (event: "upload-success", response: any, file: any): void;
  (event: "upload-error", error: any, file: any): void;
}>();
const handleHttpUpload = async (options: UploadRequestOptions) => {
  const formData = new FormData();
  formData.append("file", options.file);
  try {
    const response = await props.api(formData);
    options.onSuccess(response);
  } catch (error) {
    // Element Plus Upload 组件的 onError 接受 UploadAjaxError 类型
    const uploadError: any = {
      status: 500,
      method: 'POST',
      url: '#',
      message: error instanceof Error ? error.message : String(error)
    };
    if (error instanceof Error) {
      uploadError.stack = error.stack;
    }
    options.onError(uploadError);
  }
};

/**
 * @description 删除图片
 * */
const deleteImg = () => {
  emit("update:imageUrl", "");
};

/**
 * @description 编辑图片
 * */
const editImg = () => {
  const dom = document.querySelector(`#${uuid.value} .el-upload__input`);
  dom && dom.dispatchEvent(new MouseEvent("click"));
};

/**
 * @description 文件上传之前判断
 * @param rawFile 选择的文件
 * */
const beforeUpload: UploadProps["beforeUpload"] = rawFile => {
  const imgSize = rawFile.size / 1024 / 1024 < props.fileSize;
  const imgType = props.fileType.includes(rawFile.type);
  if (!imgType)
    ElNotification({
      title: "温馨提示",
      message: "上传图片不符合所需的格式！",
      type: "warning"
    });
  if (!imgSize)
    setTimeout(() => {
      ElNotification({
        title: "温馨提示",
        message: `上传图片大小不能超过 ${props.fileSize}M！`,
        type: "warning"
      });
    }, 0);
  return imgType && imgSize;
};

/**
 * @description 图片上传成功
 * @param response 上传成功的响应
 * @param file 上传的文件
 * */
const uploadSuccess = (response: any, file: any) => {
  console.log(response,'参数结构')
  // 更新图片地址
  const fileUrl = response?.data?.fileUrl ?? response.fileUrl;
  emit("update:imageUrl", fileUrl);
  // 调用 el-form 内部的校验方法（可自动校验）
  formItemContext?.prop && formContext?.validateField([formItemContext.prop as string]);
  emit("upload-success", response, file);
  ElNotification({
    title: "温馨提示",
    message: "图片上传成功！",
    type: "success"
  });
};

/**
 * @description 图片上传错误
 * @param error 错误信息
 * @param file 上传的文件
 * */
const uploadError = (error: any, file: any) => {
  emit("upload-error", error, file);
  ElNotification({
    title: "温馨提示",
    message: "图片上传失败，请您重新上传！",
    type: "error"
  });
};
</script>

<style scoped lang="scss">
.is-error {
  .upload {
    :deep(.el-upload),
    :deep(.el-upload-dragger) {
      border: 1px dashed var(--el-color-danger)    ;
      &:hover {
        border-color: var(--image-wrapper-focus-border-color, var(--el-color-primary))    ;
      }
    }
  }
}
:deep(.disabled) {
  .el-upload,
  .el-upload-dragger {
    cursor: not-allowed    ;
    background: var(--el-disabled-bg-color);
    border: 1px dashed var(--image-wrapper-border-color, var(--el-border-color-darker))    ;
    &:hover {
      border: 1px dashed var(--image-wrapper-border-color, var(--el-border-color-darker))    ;
    }
  }
}
.upload-box {
  .no-border {
    :deep(.el-upload) {
      border: none    ;
    }
  }
  :deep(.upload) {
    .el-upload {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--image-wrapper-width, v-bind(width));
      height: var(--image-wrapper-height, v-bind(height));
      overflow: hidden;
      border: 1px dashed var(--image-wrapper-border-color, var(--el-border-color-darker))    ;
      border-radius: var(--image-wrapper-border-radius, v-bind(borderRadius));
      background-color: var(--image-wrapper-bg-color, transparent);
      box-shadow: var(--image-wrapper-box-shadow, none);
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:hover {
        border-color: var(--image-wrapper-focus-border-color, var(--el-color-primary))    ;
        box-shadow: var(--image-wrapper-focus-box-shadow, none);
        .upload-handle {
          opacity: 1;
        }
      }
      .el-upload-dragger {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 0;
        overflow: hidden;
        background-color: transparent;
        border: 1px dashed var(--image-wrapper-border-color, var(--el-border-color-darker))    ;
        border-radius: var(--image-wrapper-border-radius, v-bind(borderRadius));
        &:hover {
          border-color: var(--image-wrapper-focus-border-color, var(--el-color-primary))    ;
        }
      }
      .el-upload-dragger.is-dragover {
        background-color: var(--image-wrapper-bg-color, var(--el-color-primary-light-9));
        border: 2px dashed var(--image-wrapper-focus-border-color, var(--el-color-primary))    ;
        box-shadow: var(--image-wrapper-focus-box-shadow, 0 0 0 3px rgba(64, 158, 255, 0.15))    ;
      }
      .upload-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .upload-empty {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 30px;
        color: var(--el-color-info);
        .el-icon {
          font-size: 28px;
          color: var(--el-text-color-secondary);
        }
      }
      .upload-handle {
        position: absolute;
        top: 0;
        right: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: rgb(0 0 0 / 60%);
        opacity: 0;
        transition: var(--el-transition-duration-fast);
        .handle-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 6%;
          color: aliceblue;
          .el-icon {
            margin-bottom: 40%;
            font-size: 130%;
            line-height: 130%;
          }
          span {
            font-size: 85%;
            line-height: 85%;
          }
        }
      }
    }
  }
  .el-upload__tip {
    line-height: 18px;
    text-align: center;
  }
}
</style>
