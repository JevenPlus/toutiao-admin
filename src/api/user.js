// 用户相关的请求模块

// 用户登录
import request from '@/utils/request'

export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: data
  })
}
// 获取用户信息
export const getUserProfile = (data) => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}
// 修改用户信息
export const updateUser = () => {}

// 修改用户头像
// data必须传递formData 对象
export const updateUserAvatar = (data) => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 修改用户基本信息
export const updateUserPhoto = (data) => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
