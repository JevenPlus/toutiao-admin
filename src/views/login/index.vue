<template>
  <div class="login-container">
    <div class="login-head">
      <div class="logo"></div>
    </div>
    <!--
      配置表单验证
      1.必须给 el-form组件绑定 model 为表单数据对象
      2.给需要的表单字段绑定prop属性
        注意：prop属性需要指定表单对象中的数据名称
      3.通过el-form组件的rules属性配置验证规则
      手动触发表单验证
      1.给 el-form 设置ref,随便起名，不要重复即可
      2.调用 ref 获取 el-form 组件，调用组件的validate进行验证
    -->
    <el-form class="login-form" ref="login-form" :model="user" :rules="formRules">
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.isAgree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit" :loading="loginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '15150498462',
        code: '123456',
        isAgree: false // 是否同意协议
      },
      loginLoading: false, // 登录的loading状态
      formRules: { // 表单验证规则
        mobile: [
          // trigger为什么时候触发，blur失去焦点触发，change input内容改变时触发
          // pattern为正则验证
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { min: 4, max: 6, message: '验证码不符合规则', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'blur' }
        ]
        // agree: [
        //   {
        //     // 自定义校验规则，验证通过：callback(),验证失败：callback(new Error('错误信息'))
        //     // rule为验证规则，value为布尔值
        //     validator: (rule, value, callback) => {
        //       // console.log(rule)
        //       // console.log(value)
        //       if (value) {
        //         callback()
        //       } else {
        //         callback(new Error('请同意用户协议'))
        //       }
        //     },
        //     trigger: 'blur'
        //   }
        // ]
      }
    }
  },
  methods: {
    onSubmit () {
      // 获取表单数据

      // 表单验证
      // validate方法是异步的
      this.$refs['login-form'].validate((valid, err) => {
        // console.log(valid)
        // console.log(err)
        if (!valid) {
          return
        }
        // 验证通过，提交登录
        this.login()
      })
    },
    login () {
      // 开启登录中 loading...
      this.loginLoading = true
      // login(this.user).then(res => {
      //   console.log(res)
      //   if (res.code === 200) {
      //     this.$message({
      //       message: '登录成功',
      //       type: 'success'
      //     })
      //     this.loginLoading = false
      //
      //     // 将接口返回的用户相关数据放到本地存储
      //     // 本地存储只能存储字符串
      //     // 如果需要存储对象，数组类型的数据，则把他们转为JSON格式字符串
      //     window.localStorage.setItem('user', JSON.stringify(res.data.data))
      //     this.$router.push('/')
      //     this.$router.push({
      //       name: 'home'
      //     })
      //   }
      // }).catch(err => {
      //   console.log('登录失败', err)
      //   this.$message.error('登录失败，手机或验证码错误')
      //   this.loginLoading = false
      // })
      if (this.user.mobile === '15150498462' && this.user.code === '123456') {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$message.error('用户名或验证码错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .login-container{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url("./login_bg.jpg") no-repeat;
    background-size: cover;
    .login-head{
      width: 300px;
      height: 57px;
      background: url("./logo_index.png") no-repeat;
      background-size: cover;
      margin-bottom: 30px;
    }
    .login-form{
      background-color: #fff;
      padding: 50px;
      min-width: 300px;
      .login-btn{
        width: 100%;
      }
    }
  }
</style>
