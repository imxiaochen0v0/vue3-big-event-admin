<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const open = async (row) => {
  dialogVisible.value = true
  console.log(row)
}

defineExpose({ open })
</script>

<template>
  <div class="">
    <el-dialog v-model="dialogVisible" title="Warning" width="30%" align-center>
      <span>Open the dialog from the center from the screen</span>
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
