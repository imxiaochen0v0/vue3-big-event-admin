<script setup>
import { ref } from 'vue'
import { baseURL } from '@/utils/request'
import {
  articleDetailsService,
  articleAddService,
  articleEditService
} from '@/api/article'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// 父组件文章分类
const props = defineProps({
  articleChannelList: Array
})
const emit = defineEmits(['success'])
const drawer = ref(false)
const imgUrl = ref('')
const formModel = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})
// 打开抽屉时判断是添加还是编辑文章
const open = async (row) => {
  drawer.value = true
  // 编辑文章 获取文章详情
  if (row.id) {
    const {
      data: { data }
    } = await articleDetailsService(row.id)
    formModel.value = data
    imgUrl.value = baseURL + data.cover_img
  } else {
    // 添加文章 文章详情清空
    imgUrl.value = ''
    quill.value.setHTML('')
    formModel.value = {
      title: '',
      cate_id: '',
      content: '',
      cover_img: '',
      state: ''
    }
  }
}
// 选择文章封面图片 并预览
const handleImg = (UploadFile) => {
  imgUrl.value = URL.createObjectURL(UploadFile.raw)
  formModel.value.cover_img = UploadFile.raw
}

// 上传文章
const quill = ref()
const upload = async (state) => {
  formModel.value.state = state
  // 编辑
  if (formModel.value.id) {
    // formData请求数据处理
    const formData = new FormData()
    for (const key in formModel.value) {
      formData.append(key, formModel.value[key])
    }
    await articleEditService(formData)
    ElMessage.success('编辑成功')
    emit('success')
  } else {
    // 发布
    const formData = new FormData()
    for (const key in formModel.value) {
      formData.append(key, formModel.value[key])
    }
    await articleAddService(formData)
    ElMessage.success('发布成功')
    emit('success', 'add')
  }
  drawer.value = false
}

// 向外暴露 open 方法
defineExpose({ open })
</script>

<template>
  <div class="ArticleEdit">
    <el-drawer v-model="drawer" :title="formModel.id ? '编辑文章' : '添加文章'">
      <el-form :model="formModel">
        <el-form-item label="文章标题">
          <el-input
            v-model="formModel.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select
            v-model="formModel.cate_id"
            class="m-2"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in props.articleChannelList"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
          <div class="editor">
            <quill-editor
              ref="quill"
              theme="snow"
              v-model:content="formModel.content"
              contentType="html"
            >
            </quill-editor>
          </div>
          <el-button type="primary" @click="upload('已发布')">发布</el-button>
          <el-button @click="upload('草稿')">草稿</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<style lang="scss">
.avatar-uploader {
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    &:hover {
      border-color: var(--el-color-primary);
    }
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    text-align: center;
  }
}
.editor {
  width: 100%;
  height: 200px;
  margin-bottom: 100px;
  :deep(.ql-editor) {
    height: 200px;
  }
}
</style>
