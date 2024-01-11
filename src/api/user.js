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
