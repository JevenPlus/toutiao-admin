<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!--面包屑导航开始-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--面包屑导航结束-->
      </div>
      <el-table
        class="table-list"
        :data="articles"
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          prop="comment_status"
          label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.disabled"
              @change="onSwitchChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!--数据分页-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 30]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, changeComment } from '@/api/article'

export default {
  name: 'commentIndex',
  data () {
    return {
      articles: [
        {
          id: 0,
          title: '动态路由匹配',
          total_comment_count: 120,
          fans_comment_count: 1200,
          comment_status: false,
          disabled: false
        },
        {
          id: 1,
          title: '嵌套路由',
          total_comment_count: 13,
          fans_comment_count: 120,
          comment_status: false,
          disabled: false
        },
        {
          id: 2,
          title: '编程式的导航',
          total_comment_count: 34,
          fans_comment_count: 780,
          comment_status: true,
          disabled: false
        },
        {
          id: 3,
          title: '命名路由',
          total_comment_count: 780,
          fans_comment_count: 11230,
          comment_status: true,
          disabled: false
        },
        {
          id: 4,
          title: '命名视图',
          total_comment_count: 563,
          fans_comment_count: 1456,
          comment_status: false,
          disabled: false
        },
        {
          id: 5,
          title: '重定向和别名',
          total_comment_count: 672,
          fans_comment_count: 644,
          comment_status: false,
          disabled: false
        },
        {
          id: 6,
          title: '路由组件传参',
          total_comment_count: 421,
          fans_comment_count: 877,
          comment_status: false,
          disabled: false
        },
        {
          id: 7,
          title: '导航守卫',
          total_comment_count: 665,
          fans_comment_count: 333,
          comment_status: true,
          disabled: false
        },
        {
          id: 8,
          title: '路由元信息',
          total_comment_count: 667,
          fans_comment_count: 321,
          comment_status: false,
          disabled: false
        },
        {
          id: 9,
          title: '过度特效',
          total_comment_count: 567,
          fans_comment_count: 321,
          comment_status: true,
          disabled: false
        }
      ],
      totalCount: 10,
      pageSize: 10,
      page: 1 // 当前激活的页码
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles (page = 1) {
      // 让分页组件激活的页码和请求数据的页码保持一致
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        // console.log(res)
        this.totalCount = res.data.data.total_count
        this.articles = res.data.data.results
      })
    },
    handleSizeChange (val) {
      this.loadArticles(1)
    },
    handleCurrentChange (val) {
      // console.log(val)
      this.loadArticles(val)
    },
    onSwitchChange (article) {
      // console.log(article)
      article.disabled = true
      changeComment(article.id, article.comment_status).then(res => {
        // console.log(res)
        article.disabled = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启文章评论状态' : '关闭文章评论状态'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.table-list{
  margin-bottom: 20px;
}
</style>
