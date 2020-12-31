<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--面包屑导航开始-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--面包屑导航结束-->
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div class="action-head">
        <el-radio-group v-model="collect" size="mini" @change="loadImages(1)">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible = true"
        >上传素材</el-button>
      </div>
      <!--素材列表-->
      <el-row :gutter="20">
        <el-col
          :span="4"
          :sm="6"
          :xs="12"
          :md="6"
          :lg="4"
          v-for="(item,index) in image"
          :key="index"
          class="image-item"
        >
          <el-image
            :src="item.url"
            fit="cover"></el-image>
          <div class="image-action">
            <el-button
              type="warning"
              :icon="item.is_collected ? 'el-icon-star-on':'el-icon-star-off'"
              size="small"
              circle
              @click="onCollect(item)"
              :loading="item.loading"
            ></el-button>
            <el-button
              type="warning"
              :icon="item.is_collected ? 'el-icon-delete-solid':'el-icon-delete'"
              size="small"
              circle
              :loading="item.loading"
              @click="onDelete(item)"
            ></el-button>
            <!--<i
              :class="{
                'el-icon-star-on': item.is_collected,
                'el-icon-star-off': !item.is_collected
              }"
              @click="onCollect(item)"
            ></i>-->
            <!--<i class="el-icon-delete"></i>-->
          </div>
        </el-col>
      </el-row>
      <!--数据分页-->
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        background
        :page-size="pageSize"
        :current-page.sync="page"
        @current-change="onPageChange"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <el-upload
        v-if="dialogUploadVisible"
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/app/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage, deleteImage } from '@/api/img'

export default {
  name: 'Image',
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: 'false', // 默认查询全部的图片素材
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      image: [
        {
          id: 0,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: true
        },
        {
          id: 1,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: true
        },
        {
          id: 2,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: true
        },
        {
          id: 3,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: false
        },
        {
          id: 4,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: true
        },
        {
          id: 5,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: true
        },
        {
          id: 6,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: true
        },
        {
          id: 7,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: false
        },
        {
          id: 8,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: true
        },
        {
          id: 9,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: true
        },
        {
          id: 10,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: false
        },
        {
          id: 11,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: true
        },
        {
          id: 12,
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          is_collected: false
        }
      ],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: 'Bearer ' + user.token
      },
      totalCount: 100,
      pageSize: 10,
      page: 1
    }
  },
  created () {
    this.loadImages(1)
  },
  methods: {
    loadImages (page) {
      this.page = page
      getImages({
        // 如果collect为true,查询已收藏的图片
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        // console.log(res)
        const results = res.data.data.results
        results.forEach(item => {
          // item里面本来是没有loading数据，我们在获取到数据的时候往里面添加loading数据，
          // 是用来控制每个收藏图标的加载状态
          item.loading = false
        })
        this.image = results
        this.totalCount = res.data.data.total_count
      })
    },
    // onCollectChange (value) {
    //   this.loadImages(1)
    // },
    onUploadSuccess () {
      // 关闭弹窗
      this.dialogUploadVisible = false
      // 更新素材列表
      this.loadImages(this.page)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onPageChange (page) {
      // console.log(page)
      this.loadImages(page)
    },
    onCollect (item) {
      item.loading = true
      collectImage(item.id, !item.is_collected).then(res => {
        // console.log(res)
        item.is_collected = !item.is_collected
        item.loading = false
      })
      // if (item.is_collected) {
      //   // 已收藏，取消收藏
      //   collectImage(item.id, false)
      // } else {
      //   // 没有收藏，添加收藏
      //   collectImage(item.id, true)
      // }
    },
    onDelete (item) {
      item.loading = true
      deleteImage(item.id).then(res => {
        // console.log(res)
        this.loadImages(this.page)
        item.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.action-head{
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image-item{
  position: relative;
}
.image-action{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #ffffff;
  height: 40px;
  background-color: rgba(204,204,204,.5);
  position: absolute;
  bottom: 4px;
  left: 10px;
  right: 10px;
  font-size: 25px;
}
</style>
