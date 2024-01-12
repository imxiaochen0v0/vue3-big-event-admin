<script setup>
import {
  User,
  Collection,
  Promotion,
  UserFilled,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'

// 获取用户信息
const userStore = useUserStore()
userStore.getUser()

// 路由跳转
const router = useRouter()
const handleCommand = async (key) => {
  if (key === 'logout') {
    // 退出登录
    await ElMessageBox.confirm('您确定要退出吗?', '温馨提示', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
    userStore.setToken()
    userStore.setUser({})
    router.push('/login')
  } else {
    // 跳转
    router.push(`/user/${key}`)
  }
}
</script>

<template>
  <div class="LayoutContainer">
    <el-container>
      <!-- 侧边 -->
      <el-aside width="200px">
        <img src="/favicon.ico" alt="" />
        <el-menu
          backgroundColor="#fff"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/article/channel" class="demo">
            <el-icon><Collection /></el-icon>
            <span>文章分类</span>
          </el-menu-item>
          <el-menu-item index="/article/manage" class="demo">
            <el-icon><Promotion /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-sub-menu index="/user">
            <template #title>
              <div style="margin-left: 33px">
                <el-icon><UserFilled /></el-icon> <span>个人中心</span>
              </div>
            </template>
            <el-menu-item index="/user/profile">
              <el-icon><User /></el-icon>
              <span>基本资料</span>
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon><Crop /></el-icon>
              <span>更换头像</span>
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon><EditPen /></el-icon>
              <span>重置密码</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div>
            <strong>{{
              userStore.user.nickname || userStore.user.username
            }}</strong>
          </div>
          <el-dropdown placement="bottom-end" @command="handleCommand">
            <span class="el-dropdown__box">
              <el-avatar :src="userStore.user.user_pic || avatar" />
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User"
                  >基本资料</el-dropdown-item
                >
                <el-dropdown-item command="avatar" :icon="Crop"
                  >更换头像</el-dropdown-item
                >
                <el-dropdown-item command="password" :icon="EditPen"
                  >重置密码</el-dropdown-item
                >
                <el-dropdown-item command="logout" :icon="SwitchButton"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- 底部 -->
          <el-footer>大事件 ©2023 Created by 黑马程序员</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.LayoutContainer {
  height: 100vh;
  .el-aside {
    background-color: #fff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 80%;
      margin: 25px auto 25px auto;
    }
    .el-menu {
      width: 100%;
      .el-menu-item {
        border-radius: 10px;
        margin: 10px;
      }
      .demo {
        display: flex;
        justify-content: center;
      }
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    justify-content: center;
  }
}
</style>
