<script setup>
import { useUserStore } from '@/stores/index'
import { ref } from 'vue'
import { userUpdateInfoService } from '@/api/user'

const userStore = useUserStore()
// 表单数据
const form = ref()
const fromModel = userStore.user
const rules = {
  nickname: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },

    {
      min: 5,
      max: 10,
      message: '用户名必须在 5 到 10 个字符',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: '格式不正确',
      trigger: 'blur'
    }
  ]
}
// 提交表单
const onSubmit = async () => {
  await form.value.validate()
  await userUpdateInfoService(fromModel)
  await ElMessage.success('修改成功')
  userStore.setUser(fromModel)
}
</script>

<template>
  <div class="UserProfile">
    <el-card class="box-card">
      <el-form
        ref="form"
        size="large"
        :model="fromModel"
        :rules="rules"
        label-position="top"
        label-width="100px"
        style="max-width: 460px"
      >
        <el-form-item label="登录名称">
          <el-input v-model="fromModel.username" disabled />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="fromModel.nickname" />
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="fromModel.email" />
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary" style="margin: 0 auto"
            >提交修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.UserProfile {
  height: 100%;
  .box-card {
    height: 100%;
  }
}
</style>
