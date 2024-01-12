<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userUpdateAvatarService } from '@/api/user'
import { useUserStore } from '@/stores/index'

const uploadImageBase64 = ref()
// 选择头像
const changeImage = (uploadFile) => {
  // 创建FileReader对象 用于读取文件内容
  const reader = new FileReader()
  // 读取文件内容 并转化为base64编码
  reader.readAsDataURL(uploadFile.raw)
  // 读取完成后触发onload事件 读取结果保存在reader.result中 并且赋值给uploadImageBase64
  reader.onload = () => {
    uploadImageBase64.value = reader.result
  }
}

// 上传头像
const userStore = useUserStore()
const uploadImage = async () => {
  await userUpdateAvatarService(uploadImageBase64.value)
  await ElMessage.success('更换头像成功')
  userStore.user.user_pic = uploadImageBase64.value
}
</script>

<template>
  <div class="">
    <el-card>
      <template #header> 更换头像 </template>
      <!-- 选择头像 -->
      <el-upload
        class="avatar-uploader"
        :on-change="changeImage"
        :show-file-list="false"
        :auto-upload="false"
      >
        <img
          v-if="uploadImageBase64 || userStore.user.user_pic"
          :src="uploadImageBase64 || userStore.user.user_pic"
          class="avatar"
        />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <!-- 提交头像 -->
      <el-button type="primary" size="large" :icon="Upload" @click="uploadImage"
        >上传头像</el-button
      >
    </el-card>
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
.el-button {
  margin-top: 2vw;
  margin-left: 40px;
}
</style>
