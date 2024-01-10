<script setup>
import { useUserStore } from '@/stores/index'

const userStore = useUserStore()
</script>

<template>
  <div>
    <RouterView></RouterView>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('imxiaochen')">登录</el-button>
    <el-button @click="userStore.setToken('')">注册</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
