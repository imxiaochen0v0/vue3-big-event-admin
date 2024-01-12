<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'

// 切换登录或注册 并在切换时清空表单数据
const isRegister = ref(false)
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
// 表单实例 数据 规则
const form = ref()
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
const rules = {
  username: [
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
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须在 6 到 15 个非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须在 6 到 15 个非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const loading = ref(false)
// 注册
const register = async () => {
  await form.value.validate()
  loading.value = true
  try {
    await userRegisterService(formModel.value)
    ElMessage.success('注册成功')
    loading.value = false
    isRegister.value = false
  } catch (error) {
    loading.value = false
  }
}
// 登录
const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  loading.value = true
  try {
    const res = await userLoginService(formModel.value)
    userStore.setToken(res.data.token)
    ElMessage.success('登录成功')
    loading.value = false
    router.push('/')
  } catch (error) {
    loading.value = false
  }
}
</script>

<template>
  <div class="LoginPage">
    <el-card>
      <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="11" class="form">
          <!-- 注册 -->
          <el-form
            status-icon
            :model="formModel"
            :rules="rules"
            ref="form"
            size="large"
            autocomplete="off"
            v-if="isRegister"
          >
            <el-form-item>
              <h1>注册</h1>
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                v-model="formModel.username"
                :prefix-icon="User"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formModel.password"
                :prefix-icon="Lock"
                type="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input
                v-model="formModel.repassword"
                :prefix-icon="Lock"
                type="password"
                placeholder="请输入再次密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                @click="register"
                class="button"
                type="primary"
                auto-insert-space
              >
                注册
              </el-button>
            </el-form-item>
            <el-form-item class="flex">
              <el-link
                type="info"
                :underline="false"
                @click="isRegister = false"
              >
                ← 返回
              </el-link>
            </el-form-item>
          </el-form>
          <!-- 登录 -->
          <el-form
            status-icon
            :model="formModel"
            :rules="rules"
            ref="form"
            size="large"
            autocomplete="off"
            v-else
          >
            <el-form-item>
              <h1>登录</h1>
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                v-model="formModel.username"
                :prefix-icon="User"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="formModel.password"
                name="password"
                :prefix-icon="Lock"
                type="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item class="flex">
              <div class="flex">
                <el-checkbox>记住我</el-checkbox>
                <el-link type="primary" :underline="false">忘记密码？</el-link>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="login"
                class="button"
                type="primary"
                auto-insert-space
                :loading="loading"
                >登录</el-button
              >
            </el-form-item>
            <el-form-item class="flex">
              <el-link
                type="info"
                :underline="false"
                @click="isRegister = true"
              >
                注册 →
              </el-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.LoginPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .el-card {
    width: 60vw;
    border-radius: 20px;
    .login-page {
      display: flex;
      justify-content: space-between;
      .bg {
        background: url('/favicon.ico') no-repeat center / cover;
        border-radius: 20px;
      }

      .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
          margin: 0 auto;
        }

        .button {
          width: 100%;
        }

        .flex {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
