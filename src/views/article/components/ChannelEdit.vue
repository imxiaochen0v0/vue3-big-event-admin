<script setup>
import { ref } from 'vue'
import {
  articleAddChannelService,
  articleEditChannelService
} from '@/api/article'

const dialogVisible = ref(false)
// 表单数据
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
// 规则校验
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
const emit = defineEmits(['success'])
const formRef = ref()
// 发起添加 修改文章分类请求
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await articleEditChannelService(formModel.value)
    ElMessage.success('修改成功')
  } else {
    await articleAddChannelService(formModel.value)
    ElMessage.success('添加')
  }
  dialogVisible.value = false
  emit('success')
}
// 向外暴露方法
const open = async (row) => {
  dialogVisible.value = true
  formModel.value = row
}

defineExpose({ open })
</script>

<template>
  <div class="">
    <el-dialog
      v-model="dialogVisible"
      :title="formModel.id ? '编辑分类' : '添加分类'"
      width="30%"
      align-center
    >
      <el-form ref="formRef" :model="formModel" :rules="rules">
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
          <el-button type="primary" @click="onSubmit"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
