<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <Aside class="aside-menu" :isCollpase="isCollpase" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            :class="{
              'el-icon-s-fold': isCollpase,
              'el-icon-s-unfold': !isCollpase
            }"
            @click="isCollpase = !isCollpase"
          ></i>
          <span class="header-name">头条后台管理系统</span>
        </div>
        <el-dropdown>
          <div class="avator-wrap">
            <img class="avator" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!--组件默认是不识别原生事件的，除非内部做了处理-->
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!--子路由出口-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
  <!--<div class="layout-container">
    <div>顶部导航栏</div>
    <div>侧边导航栏</div>
    子路由出口
    <router-view/>
  </div>-->
</template>

<script>
import Aside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    Aside
  },
  data () {
    return {
      user: {
        photo: 'https://www.google.com/search?q=%E5%A4%B4%E5%83%8F&sxsrf=ALeKk036kldypJVRRA8bbl_mhFFjPFWmMA:1608173366610&tbm=isch&source=iu&ictx=1&fir=6cyq1qksVAm_PM%252CsAsj8SYz781bBM%252C_&vet=1&usg=AI4_-kQafVseFumt6jlL__Ya13vUCwc3TQ&sa=X&ved=2ahUKEwjQ04PSgNTtAhWdzIsBHTGLDmkQ9QF6BAgGEAE#imgrc=6cyq1qksVAm_PM',
        name: 'Jeven'
      },
      isCollpase: true
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside{
  background-color: #d3dce6;
  .aside-menu{
    height: 100%;
  }
}
.header{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .header-name{
    font-weight: bolder;
    margin-left: 10px;
  }
}
.main{
  background-color: #e9eef3;
}
.avator-wrap{
  display: flex;
  align-items: center;
  .avator{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
