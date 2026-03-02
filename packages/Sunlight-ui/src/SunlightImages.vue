<template>
  <div class="upload-box">
    <el-upload
      v-model:file-list="_fileList"
      :action="null"
      list-type="picture-card"
      :class="['upload', disabled ? 'disabled' : '', drag ? 'no-border' : '']"
      :multiple="multiple"
      :disabled="disabled"
      :limit="actualLimit"
      :http-request="handleHttpUpload"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :drag="drag"
      :accept="fileType.join(',')"
      :style="{
        '--item-width': width,
        '--item-height': height,
        '--border-radius': borderRadius,
        '--images-wrapper-border-color': wrapperStyle?.borderColor ?? '#dcdfe6',
        '--images-wrapper-focus-border-color': wrapperStyle?.focusBorderColor ?? '#409eff',
        '--images-wrapper-focus-box-shadow': wrapperStyle?.focusBoxShadow,
        '--images-wrapper-bg-color': wrapperStyle?.backgroundColor,
        '--images-wrapper-box-shadow': wrapperStyle?.boxShadow
      }"
    >
      <div class="upload-empty">
        <slot name="empty">
          <el-icon><Plus /></el-icon>
        </slot>
      </div>
      <template #file="{ file }">
        <img :src="file.url" class="upload-image" />
        <div class="upload-handle" @click.stop>
          <div class="handle-icon" @click="handlePictureCardPreview(file)">
            <el-icon><ZoomIn /></el-icon>
            <span>查看</span>
          </div>
          <div v-if="!disabled" class="handle-icon" @click="handleRemove(file)">
            <el-icon><Delete /></el-icon>
            <span>删除</span>
          </div>
        </div>
      </template>
    </el-upload>
    <div class="el-upload__tip">
      <slot name="tip"></slot>
    </div>
    <el-image-viewer
      v-if="imgViewVisible"
      :url-list="[viewImageUrl]"
      @close="imgViewVisible = false"
    />
  </div>
</template>

<script setup lang="ts" name="UploadImages">
import { ref, computed, watch } from "vue";
import { Plus, ZoomIn, Delete } from "@element-plus/icons-vue";
import type {
  UploadProps,
  UploadFile,
  UploadUserFile,
  UploadRequestOptions,
} from "element-plus";
type ImageMimeType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml";
interface UploadImagesProps {
  fileList: UploadUserFile[];
  api: (formData: FormData) => Promise<{ fileUrl: string }>; // 上传接口，必传
  drag?: boolean;
  disabled?: boolean;
  limit?: number;
  multiple?: boolean; // 是否支持多选上传，默认 true
  fileSize?: number; // 单位 MB
  fileType?: ImageMimeType[];
  height?: string;
  width?: string;
  borderRadius?: string;
  wrapperStyle?: {
    borderColor?: string; // 边框颜色
    focusBorderColor?: string; // 聚焦/悬停时边框颜色
    focusBoxShadow?: string; // 聚焦/悬停时阴影
    backgroundColor?: string; // 背景颜色
    boxShadow?: string; // 阴影
  };
}

const props = withDefaults(defineProps<UploadImagesProps>(), {
  fileList: () => [],
  drag: true,
  disabled: false,
  limit: 5,
  multiple: true,
  fileSize: 5,
  fileType: () => ["image/jpeg", "image/png", "image/gif"],
  height: "150px",
  width: "150px",
  borderRadius: "8px",
  wrapperStyle: () => ({}),
});

const emit = defineEmits<{
  (event: "update:fileList", value: UploadUserFile[]): void;
  (event: "upload-success", response: any, file: UploadFile): void;
  (event: "upload-error", error: any, file: UploadFile): void;
  (event: "remove", file: UploadFile): void;
}>();

const _fileList = ref<UploadUserFile[]>([...props.fileList]);

watch(
  () => props.fileList,
  (newList) => {
    _fileList.value = [...newList];
  }
);

// 计算实际限制数量，单张上传时限制为1
const actualLimit = computed(() => {
  return props.multiple ? props.limit! : 1;
});

// 上传前校验文件类型和大小
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  const isValidType = props.fileType!.includes(rawFile.type as ImageMimeType);
  const isValidSize = rawFile.size / 1024 / 1024 < props.fileSize!;
  if (!isValidType) {
    emit("upload-error", new Error("上传图片格式不符合要求"), rawFile as any);
    return false;
  }
  if (!isValidSize) {
    emit(
      "upload-error",
      new Error(`上传图片大小不能超过 ${props.fileSize}MB`),
      rawFile as any
    );
    return false;
  }
  return true;
};

// 自定义上传请求，调用传入的 api
const handleHttpUpload = async (options: UploadRequestOptions) => {
  const formData = new FormData();
  formData.append("file", options.file);
  try {
    const response = await props.api(formData);
    options.onSuccess(response);
  } catch (error) {
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

// 上传成功处理，更新文件列表并触发事件
const uploadSuccess = (
  response: { fileUrl: string },
  uploadFile: UploadFile
) => {
  if (!response) return;
  uploadFile.url = response.fileUrl;

  // 单张上传时，替换列表为当前文件
  if (!props.multiple) {
    _fileList.value = [uploadFile as UploadUserFile];
  } else {
    // 多张上传时，更新对应文件
    const index = _fileList.value.findIndex((f) => f.uid === uploadFile.uid);
    if (index !== -1) {
      _fileList.value[index] = uploadFile as UploadUserFile;
    } else {
      _fileList.value.push(uploadFile as UploadUserFile);
    }
  }

  emit("update:fileList", _fileList.value);
  emit("upload-success", response, uploadFile);
};

// 删除文件
const handleRemove = (file: UploadFile) => {
  _fileList.value = _fileList.value.filter((item) => item.uid !== file.uid);
  emit("update:fileList", _fileList.value);
  emit("remove", file);
};

// 上传失败处理
const uploadError = (error: any, file: UploadFile) => {
  emit("upload-error", error, file);
};

// 超出上传数量限制
const handleExceed = () => {
  emit(
    "upload-error",
    new Error(`最多只能上传 ${actualLimit.value} 张图片`),
    null as any
  );
};

// 图片预览
const viewImageUrl = ref("");
const imgViewVisible = ref(false);
const handlePictureCardPreview: UploadProps["onPreview"] = (file) => {
  viewImageUrl.value = file.url!;
  imgViewVisible.value = true;
};
</script>


<style scoped lang="scss">
.is-error {
  .upload {
    :deep(.el-upload--picture-card),
    :deep(.el-upload-dragger) {
      border: 1px dashed var(--el-color-danger)    ;
      &:hover {
        border-color: var(--images-wrapper-focus-border-color, var(--el-color-primary))    ;
      }
    }
  }
}
:deep(.disabled) {
  .el-upload--picture-card,
  .el-upload-dragger {
    cursor: not-allowed;
    background: var(--el-disabled-bg-color)    ;
    border: 1px dashed var(--el-border-color-darker);
    &:hover {
      border-color: var(--el-border-color-darker)    ;
    }
  }
}
.upload-box {
  .no-border {
    :deep(.el-upload--picture-card) {
      border: none    ;
    }
  }
  :deep(.upload) {
    .el-upload-dragger {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 0;
      overflow: hidden;
      border: 1px dashed var(--images-wrapper-border-color, var(--el-border-color-darker))    ;
      border-radius: v-bind(borderRadius);
      background-color: var(--images-wrapper-bg-color, transparent);
      box-shadow: var(--images-wrapper-box-shadow, none);
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:hover {
        border-color: var(--images-wrapper-focus-border-color, var(--el-color-primary))    ;
        box-shadow: var(--images-wrapper-focus-box-shadow, none);
      }
    }
    .el-upload-dragger.is-dragover {
      background-color: var(--images-wrapper-bg-color, var(--el-color-primary-light-9));
      border: 2px dashed var(--images-wrapper-focus-border-color, var(--el-color-primary))    ;
      box-shadow: var(--images-wrapper-focus-box-shadow, 0 0 0 3px rgba(64, 158, 255, 0.15))    ;
    }
    .el-upload-list__item,
    .el-upload--picture-card {
      width: v-bind(width);
      height: v-bind(height);
      background-color: transparent;
      border-radius: v-bind(borderRadius);
      border: 1px dashed var(--images-wrapper-border-color, var(--el-border-color-darker))    ;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:hover {
        border-color: var(--images-wrapper-focus-border-color, var(--images-wrapper-focus-border-color, var(--el-color-primary)))    ;
        box-shadow: var(--images-wrapper-focus-box-shadow, none);
      }
    }
    .upload-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
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
          margin-bottom: 15%;
          font-size: 140%;
        }
        span {
          font-size: 100%;
        }
      }
    }
    .el-upload-list__item {
      &:hover {
        .upload-handle {
          opacity: 1;
        }
      }
    }
    .upload-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      line-height: 30px;
      color: var(--el-color-info);
      .el-icon {
        font-size: 28px;
        color: var(--el-text-color-secondary);
      }
    }
  }
  .el-upload__tip {
    line-height: 15px;
    text-align: center;
  }
}
</style>

