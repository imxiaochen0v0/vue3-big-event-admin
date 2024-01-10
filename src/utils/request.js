import axios from 'axios'
import { useUserStore } from '@/stores/index'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // TODO 3. 摘取核心响应数据
    if (response.data.code === 0) {
      return response
    }
    ElMessage({ message: response.data.message || '服务异常', type: 'error' })
    return Promise.reject(response.data)
  },
  (error) => {
    // TODO 5. 处理401错误
    if (error.response?.status === 401) {
      router.push('/login')
    }
    ElMessage.error(error.response.data.message || '服务异常')
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
