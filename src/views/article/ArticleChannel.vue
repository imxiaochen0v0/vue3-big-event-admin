<script setup>
import {
  articleGetChannelsService,
  articleDelChannelService
} from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

// 文章分类
const channelList = ref([])
// 加载中效果
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await articleGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

// 添加删除修改文章分类
const dialog = ref()
const onEditChannel = async (row) => {
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('您确定要删除该分类吗?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
  await articleDelChannelService(row.id)
  await ElMessage.success('删除成功')
  // 删除成功后 重新获取最新数据
  await getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({})
}

// 修改或添加后 重新获取最新数据
const onSuccess = async () => {
  await getChannelList()
}
</script>

<template>
  <div class="ArticleChannel">
    <PageContainer title="文章分类">
      <template #extra>
        <el-button type="primary" @click="onAddChannel">添加分类</el-button>
      </template>

      <el-table v-loading="loading" :data="channelList" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cate_name"
          label="分类名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cate_alias"
          label="分类别名"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template #default="{ row, $index }">
            <el-button
              @click="onEditChannel(row, $index)"
              type="primary"
              :icon="Edit"
              plain
              circle
            />
            <el-button
              @click="onDelChannel(row, $index)"
              type="danger"
              :icon="Delete"
              plain
              circle
            />
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="description" />
        </template>
      </el-table>
      <!-- 弹出层组件 -->
      <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
    </PageContainer>
  </div>
</template>

<style lang="scss" scoped>
.ArticleChannel {
  height: 100%;
}
</style>
