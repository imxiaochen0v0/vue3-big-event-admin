import request from '@/utils/request'

/**
 * 获取文章分类
 * @returns promise
 */
export const articleGetChannelsService = () => {
  return request.get('/my/cate/list')
}

/**
 * 添加文章分类
 * @param {object} data
 * @returns promise
 */
export const articleAddChannelService = (data) => {
  return request.post('/my/cate/add', data)
}

/**
 * 编辑文章分类
 * @param {object} data
 * @returns promise
 */
export const articleEditChannelService = (data) => {
  return request.put('/my/cate/info', data)
}

/**
 * 删除文章分类
 * @param {number} id
 * @returns promise
 */
export const articleDelChannelService = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}

/**
 * 获取文章列表
 * @param {number} id
 * @returns promise
 */
export const articleListService = ({ pagenum, pagesize, cate_id, state }) => {
  return request.get('/my/article/list', {
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}
/**
 * 删除文章列表
 * @param {number} id
 * @returns promise
 */
export const articleDelListService = (id) => {
  return request.delete('/my/article/info', {
    params: {
      id
    }
  })
}

/**
 * 获取文章详情
 * @param {number} id
 * @returns promise
 */
export const articleDetailsService = (id) => {
  return request.get('/my/article/info', {
    params: {
      id
    }
  })
}

/**
 * 发布文章
 * @param {FormData} data
 * @returns promise
 */
export const articleAddService = (data) => {
  return request.post('/my/article/add', data)
}

/**
 * 编辑文章
 * @param {FormData} data
 * @returns promise
 */
export const articleEditService = (data) => {
  return request.put('/my/article/info', data)
}
