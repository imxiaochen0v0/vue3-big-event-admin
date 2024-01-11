<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="PageContainer">
    <el-card>
      <template #header>
        <div class="header">
          <span>{{ title }}</span>
          <div class="extra">
            <slot name="extra"></slot>
          </div>
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.PageContainer {
  height: 100%;

  .el-card {
    min-height: 100%;
    box-sizing: border-box;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .extra {
        display: flex;
        align-items: center;

        .el-button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
