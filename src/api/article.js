// 文章相关请求模块
import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => {
  console.log(params)
  return request({
    method: 'GET',
    url: '/app/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params: params
  })
}
// 获取文章频道数据
export const getArticleChannels = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 新建，发表文章
export const addArticles = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/articles',
    params: {
      draft: draft // 是否存为草稿(true为草稿)
    },
    data
  })
}

// 编辑文章
export const updateArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/articles',
    params: {
      draft: draft // 是否存为草稿(true为草稿)
    },
    data
  })
}

// 删除文章
export const deleteArticle = articleId => {
  return request({
    method: 'delete',
    // 看见接口路径中有 :xxx 格式的字段，则需要传递路径参数
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 修改文章评论状态
export const changeComment = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    // 看见接口路径中有 :xxx 格式的字段，则需要传递路径参数
    url: '/app/v1_0/articles/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
