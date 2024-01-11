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
  return request.delete('/my/cate/del', id)
}
