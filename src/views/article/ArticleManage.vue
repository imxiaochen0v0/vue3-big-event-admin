<script setup>
import {
  articleGetChannelsService,
  articleListService,
  articleDelListService
} from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { formatTime } from '@/utils/format'
// 引入中文包
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
import ArticleEdit from './components/ArticleEdit.vue'

// 获取文章分类
const articleChannelList = ref([])
const getChannels = async () => {
  const {
    data: { data }
  } = await articleGetChannelsService()
  articleChannelList.value = data
}
getChannels()

// 获取所有文章列表
const loading = ref(false)
const state = ref(['已发布', '草稿'])
const value = ref({
  pagenum: 1,
  pagesize: 10,
  cate_id: '',
  state: ''
})
const articleList = ref([])
const totalCount = ref(0) // 总条数
// 调用接口获取文章列表数据
const getArticleList = async () => {
  loading.value = true
  const { data } = await articleListService(value.value)
  articleList.value = data.data
  totalCount.value = data.total
  loading.value = false
}
getArticleList()

// 更改每页条数
const handleSizeChange = async (pagesize) => {
  value.value.pagesize = pagesize
  getArticleList()
}
// 选择页码
const handleCurrentChange = (pagenum) => {
  value.value.pagenum = pagenum
  getArticleList()
}

// 搜索文章列表
const search = async () => {
  await getArticleList()
}
// 重置文章列表
const reset = (pagesize) => {
  value.value = {
    pagenum: 1,
    pagesize,
    cate_id: '',
    state: ''
  }
  getArticleList()
}

// 删除文章
const onDelArticle = async (id) => {
  await ElMessageBox.confirm('您确定要删除该文章吗?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
  await articleDelListService(id)
  await ElMessage.success('删除成功')
  await getArticleList()
}

// 打开抽屉
const drawer = ref()
const onEditArticle = (row) => {
  drawer.value.open(row)
}

// 添加编辑成功 重新渲染
const onSuccess = (msg) => {
  if (msg === 'add') {
    value.value.pagenum = Math.ceil(
      (totalCount.value + 1) / value.value.pagesize
    )
  }
  getArticleList()
}
</script>

<template>
  <div class="ArticleManage">
    <PageContainer title="文章管理">
      <template #extra>
        <el-button type="primary" @click="onEditArticle">添加文章</el-button>
      </template>

      <!-- 查询文章列表 -->
      <el-form inline>
        <el-form-item label="文章分类：">
          <el-select
            v-model="value.cate_id"
            class="m-2"
            placeholder="请选择"
            style="width: 240px"
          >
            <el-option
              v-for="item in articleChannelList"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态：">
          <el-select
            v-model="value.state"
            class="m-2"
            placeholder="请选择"
            style="width: 240px"
          >
            <el-option
              v-for="item in state"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset(value.pagesize)">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table v-loading="loading" :data="articleList" style="width: 100%">
        <el-table-column
          prop="title"
          label="文章标题"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cate_name"
          label="分类"
          align="center"
        ></el-table-column>
        <el-table-column label="发布时间" align="center">
          <template #default="{ row }">
            <span>{{ formatTime(row.pub_date) }}</span></template
          >
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template #default="{ row }">
            <el-button
              @click="onEditArticle(row)"
              type="primary"
              :icon="Edit"
              plain
              circle
            />
            <el-button
              @click="onDelArticle(row.id)"
              type="danger"
              :icon="Delete"
              plain
              circle
            />
          </template>
        </el-table-column>
      </el-table>

      <!-- 页码 -->
      <el-config-provider :locale="zh">
        <el-pagination
          v-model:current-page="value.pagenum"
          background
          :page-sizes="[2, 3, 5, 10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-config-provider>
    </PageContainer>

    <!-- 弹层 -->
    <ArticleEdit
      ref="drawer"
      :articleChannelList="articleChannelList"
      @success="onSuccess"
    ></ArticleEdit>
  </div>
</template>

<style lang="scss" scoped>
.ArticleManage {
  height: 100%;
  .el-pagination {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
