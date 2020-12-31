import axios from 'axios'
import JSONBig from 'json-bigint'

// 创建axios实例,就是复制了一个axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基础路径
  // 定义后端返回的原始数据的处理
  // 参数data就是后端返回的原始数据(未经处理的JSON格式)
  transformResponse: [function (data) {
    // axios默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
    // 后端返回的数据可能不是JSON格式字符串
    // 如果不是的话，那么 JSONBig.parse 调用就会出错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONBig.parse(data)
    } catch (err) {
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  // 所有请求会经过这里
  // config 是当前请求相关的配置信息对象 config是可以修改的
  function (config) {
    // 然后我们可以在允许请求出去之前定制统一的业务功能处理
    // 例如：统一的设置token
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log('请求经过这里')

    // 这里config return 出去之后，请求才会真正的发出去
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器

// 导出请求方法
export default request
