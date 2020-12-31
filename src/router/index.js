import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index'
import Home from '@/views/Home/index'
import Layout from '@/views/Layout/index'
import Article from '@/views/article/index'
import Publish from '@/views/publish/index'
import Image from '@/views/images/index'
import Comment from '@/views/comment/index'
import Setting from '@/views/setting/index'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 命名路由 layout 有一个默认的子路由，这个名字没有意义
    // 正确的做法是：如果有默认子路由，就不要给父路由起名字
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path为空，会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/setting',
        name: 'setting',
        component: Setting
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫 所有页面的导航都会经过这里
// 守卫页面导航的
// to: 要去的路由信息
// from：来自哪里的路由信息
// next 放行方法
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面，如果登录了，则允许通过
  // const user = JSON.parse(window.localStorage.getItem('user'))
  const a = 1
  // 校验非登录界面的登录状态
  if (to.path !== '/login') {
    // 因为没有user,所以
    if (a === 1) {
      // 已登录
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 允许通过
    next()
  }
})

export default router
