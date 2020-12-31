<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--面包屑导航开始-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!--面包屑导航结束-->
      </div>
      <el-row>
        <el-col :span="16">
          <el-form ref="form" label-width="80px">
            <el-form-item label="编号">
              {{user.id}}
            </el-form-item>
            <el-form-item label="手机">
              {{user.mobile}}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="updateProfileLoading">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="4" :span="4">
          <!--<p @click="$refs.file.click()">点击修改头像</p>-->
          <label for="file">
            <el-avatar
              shape="square"
              :size="150"
              fit="cover"
              :src="user.photo"
            ></el-avatar>
          </label>
          <p>点击修改头像</p>
          <input id="file" type="file" hidden ref="file" @change="onFileChange">
        </el-col>
      </el-row>
    </el-card>
    <!--修改头像-->
    <el-dialog
      append-to-body
      title="修改头像"
      width="20%"
      :visible.sync="dialogVisible"
      @opened="onDialogOpen"
      @closed="closeDialog"
    >
      <div class="preview-image-wrap">
        <img class="preview-image" :src="previewImage" ref="preview-image">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdateAvatar" :loading="updateAvatarLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, updateUserAvatar, updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus'

export default {
  name: 'SettingIndex',
  data () {
    return {
      // 用户资料
      user: {
        email: 'liuninggang2020@163.com',
        id: 35479373,
        intro: '萨瓦迪卡',
        mobile: '19945627831',
        name: 'Jeven',
        photo: 'https://img2.woyaogexing.com/2020/12/29/b7b95857002d4b6eb27d91b9069bab0e!400x400.webp'
      },
      dialogVisible: false, // 控制上传图片裁切预览的显示状态
      previewImage: '', // 预览图片
      cropper: null, // 裁切器实例
      updateAvatarLoading: false, // 更新用户头像的loading
      updateProfileLoading: false // 更新用户基本信息的loading
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    loadUser () {
      getUserProfile().then(res => {
        console.log(res)
      })
    },
    onSubmit () {
      this.updateProfileLoading = true
      // console.log('submit!')
      updateUserPhoto(this.user).then(res => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: '用户信息修改成功'
        })
        this.updateProfileLoading = false
        // 发布通知，用户信息已修改
        globalBus.$emit('update-user', this.user)
      })
    },
    onFileChange () {
      // console.log('file change')
      // 展示弹出层，预览用户选择的照片
      this.dialogVisible = true
      // 处于图片预览
      const file = this.$refs.file
      // 获取到预览的图片
      // console.log(file.files[0])
      const blobData = window.URL.createObjectURL(file.files[0])
      // console.log(blobData)
      this.previewImage = blobData

      // 解决选择相同文件不触发 change 事件
      this.$refs.file.value = ''
    },
    onDialogOpen () {
      // 图片裁切器必须基于 img 进行初始化
      // 注意：img必须是可见状态才能正常完成初始化
      // 因为我们这里要在对话框里面初始化裁切器，所以我们务必要在对话框完全打开的状态下去进行初始化
      // 获取图片DOM节点
      const image = this.$refs['preview-image']
      // 第一次初始化以后，如果预览裁切的图片发生了变化，裁切器默认不会更新
      // 如果需要预览图片发生变化更新裁切器
      // 方法一：需要调用裁切器的 replace 方法；方法二：销毁裁切器，重新初始化
      // 初始化裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        // 初始化的比例
        aspectRatio: 1,
        viewMode: 1
        // 当你移动裁切器的时候就会触发调用crop方法
        // crop (event) {
        //   console.log(event.detail.X)
        //   console.log(event.detail.Y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },
    closeDialog () {
      // 对话框关闭，销毁裁切器
      // this.cropper.destroy()
    },
    onUpdateAvatar () {
      this.updateAvatarLoading = true
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        // console.log(file)
        const fd = new FormData()
        fd.append('photo', file)
        // 请求更新用户头像 发起请求提交 fd
        updateUserAvatar(fd).then(res => {
          // 关闭对话框
          this.dialogVisible = false
          // 更新试图展示
          // 把服务端返回的图片进行展示有点慢
          // 直接吧裁切结果的文件对象转为 blob 数据本地预览
          this.user.photo = window.URL.createObjectURL(file)
          this.updateAvatarLoading = false
          // this.user.photo = this.data.data.photo
          this.$message({
            type: 'success',
            message: '头像上传成功'
          })
          this.$emit('update-user', this.user)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.preview-image-wrap{
  .preview-image{
    display: block;
    max-width: 100%;
  }
}
</style>
