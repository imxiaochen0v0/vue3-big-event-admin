<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const rows = ref({})
const open = async (row) => {
  dialogVisible.value = true
  rows.value = row
}

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    {
      required: true,
      message: '请输入分类名称',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    {
      required: true,
      message: '请输入分类别名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: '分类别名只能为字母或数字',
      trigger: 'blur'
    }
  ]
}

defineExpose({ open })
</script>

<template>
  <div class="">
    <el-dialog
      v-model="dialogVisible"
      :title="rows.title"
      width="30%"
      align-center
    >
      <el-form :model="formModel" :rules="rules">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="formModel.cate_name"
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="formModel.cate_alias"
            placeholder="请输入分类别名"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
