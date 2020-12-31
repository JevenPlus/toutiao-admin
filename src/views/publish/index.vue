<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--面包屑导航开始-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!--面包屑导航结束-->
      </div>
      <el-form ref="publish-form" v-model="article" label-width="80px" :rules="formRules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!--<el-input type="textarea" v-model="article.content"></el-input>-->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            height="400"
            placeholder="请输入文字内容"
          />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="-1">自动</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channelId">
          <el-select v-model="article.channelId" placeholder="请选择频道">
            <el-option
              v-for="(item,index) in channels"
              :key="index"
              :label="item.name"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticles, updateArticle } from '@/api/article'
import { uploadImage } from '@/api/img'
import {
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Image,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
export default {
  name: 'publishIndex',
  data () {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading(),
        new Bold(), // 在气泡菜单中渲染菜单按钮
        new Underline(), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Image({
          // 默认为会把图片生成base64
          // 字符串和内容存储在一起
          // 如果需要自定义图片上传
          uploadRequest (file) {
            // console.log(file)
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            }).catch(err => {
              console.log(err)
            })
          }
        }),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList()
      ],
      channels: [], // 存储文章频道列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // -1自动 0无图 1一张 3三张
          images: [] // 封面图片的地址
        },
        channelId: null // 频道
      },
      formRules: { // 表单验证规则
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在5到30个字符之间', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' },
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channelId: [
          { required: true, message: '请输入文章频道', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    onSubmit (draft) {
      // console.log(this.$refs['publish-form'])
      this.$refs['publish-form'].validate((valid, err) => {
        // 验证失败，停止提交表单
        if (!valid) {
          return
        }
        // 验证通过，提交表单
        // 如果是修改文章，则进行修改操作，否则执行添加操作
        const articleId = this.$route.query.id
        if (articleId) {
          updateArticle(articleId, this.article, draft).then(res => {
            console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            this.$router.push('/article')
          })
        } else {
          addArticles(this.article, draft).then(res => {
            console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            // 跳转到内容管理页面
            this.$router.push('/article')
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
