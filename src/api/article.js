import request from '@/utils/request'

/**
 * 获取文章分类
 * @returns promise
 */
export const articleGetChannelsService = () => {
  return request.get('/my/cate/list')
}
