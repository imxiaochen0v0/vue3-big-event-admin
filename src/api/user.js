import request from '@/utils/request'

/**
 * 注册接口
 * @param {object}
 * @returns promise
 */
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

/**
 * 登录接口
 * @param {object}
 * @returns promise
 */
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
/**
 * 用户信息接口
 * @returns promise
 */
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}

/**
 * 更新用户基本信息接口
 * @returns promise
 */
export const userUpdateInfoService = (data) => {
  return request.put('/my/userinfo', data)
}

/**
 * 更新用户头像
 * @param {string} data
 * @returns promise
 */
export const userUpdateAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}
