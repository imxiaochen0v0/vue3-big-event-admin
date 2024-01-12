<script setup>
import { ref } from 'vue'
import { userUpdatePasswordService } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index'

// 表单数据
const form = ref()
const fromModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const rules = {
  old_pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },

    {
      min: 6,
      max: 15,
      message: '密码必须在 6 到 16 个字符',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },

    {
      min: 6,
      max: 15,
      message: '密码必须在 6 到 16 个字符',
      trigger: 'blur'
    }
  ],
  re_pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },

    {
      min: 6,
      max: 15,
      message: '密码必须在 6 到 16 个字符',
      trigger: 'blur'
    }
  ]
}
// 提交表单
const router = useRouter()
const userStore = useUserStore()
const onSubmit = async () => {
  await form.value.validate()
  await userUpdatePasswordService(fromModel.value)
  await userStore.setUser({})
  await userStore.setToken()
  ElMessage.success('修改成功')
  router.push('/login')
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
        <el-form-item label="旧密码" prop="old_pwd">
          <el-input v-model="fromModel.old_pwd" />
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input v-model="fromModel.new_pwd" />
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="re_pwd">
          <el-input v-model="fromModel.re_pwd" />
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
