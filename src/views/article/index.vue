<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!--面包屑导航开始-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--面包屑导航结束-->
      </div>
      <!--数据筛选表单开始-->
      <el-form ref="form" label-width="80px" :model="form" size="mini">
        <el-form-item label="状态" required>
          <el-radio-group v-model="status" required>
            <!--
              el-radio 默认把 label 作为文本和选中之后的 value 值
            -->
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" required>
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option
              v-for="(item,index) in channelList"
              :key="index"
              :label="item.name"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" required>
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="loading" type="primary" @click="getData(1)">筛选</el-button>
        </el-form-item>
      </el-form>
      <!--数据筛选表单结束-->
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">根据筛选条件共查询到 {{totalCount}} 条结果</div>
      <!--数据列表开始-->
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        v-loading="loading"
      >
        <el-table-column
          prop="cover"
          label="封面"
          width="180">
          <template slot-scope="scope">
            <img class="article-cover" :src="scope.row.cover" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.status == 0">草稿</el-tag>
            <el-tag v-if="scope.row.status == 1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status == 2">审核通过</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 3">审核失败</el-tag>
            <el-tag type="info" v-if="scope.row.status == 4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--数据列表结束-->
    <!--分页开始-->
    <el-pagination
      class="page"
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="onCurrentChange"
      background
      :disabled="loading"
      :page-size="pageSize"
    >
    </el-pagination>
    <!--分页结束-->
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      form: {
        resource: '',
        region: '',
        date1: null
      },
      loading: false, // 表单数据加载中 loading
      channelList: [
        { id: 0, name: 'C++' },
        { id: 1, name: 'android' },
        { id: 2, name: 'ios' },
        { id: 3, name: 'css' },
        { id: 4, name: '区块链' },
        { id: 5, name: 'go' },
        { id: 6, name: '产品' },
        { id: 7, name: '后端' },
        { id: 8, name: '前端' },
        { id: 9, name: '运营' }
      ],
      status: null,
      tableData: [
        {
          id: '2324647404',
          cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2448596489,1893080943&fm=26&gp=0.jpg',
          title: '西游记',
          status: '0',
          date: '2020-11-22',
          operation: ''
        },
        {
          id: '3727932084',
          cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2448596489,1893080943&fm=26&gp=0.jpg',
          title: '三国演义',
          status: '1',
          date: '2020-11-23',
          operation: ''
        },
        {
          id: '736472309812',
          cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2448596489,1893080943&fm=26&gp=0.jpg',
          title: '水浒传',
          status: '2',
          date: '2020-11-24',
          operation: ''
        },
        {
          id: '6470527309',
          cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2448596489,1893080943&fm=26&gp=0.jpg',
          title: '红楼梦',
          status: '3',
          date: '2020-11-25',
          operation: ''
        },
        {
          id: '3674290833748',
          cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2448596489,1893080943&fm=26&gp=0.jpg',
          title: '三国志',
          status: '4',
          date: '2020-11-26',
          operation: ''
        }
      ],
      totalCount: 565,
      current: 1,
      pageSize: 20 // 每页显示数据的条数
    }
  },
  created () {
    // this.getData()
    // this.getArticleChannels()
  },
  methods: {
    getData (page = 1) {
      // 在刚开始请求的时候，页面显示为加载中
      this.loading = true
      getArticles({
        page,
        per_page: this.per_page,
        status: this.form.resource,
        channel_id: this.form.region,
        channel_date: this.form.date1,
        begin_pubdate: this.form.date1[0] ? 'this.form.date1[0]' : 'null',
        end_pubdate: this.form.date1[1] ? 'this.form.date1[1]' : 'null'
      }).then(res => {
        if (res.status === 200) {
          // total_count: totalCount 因为语法不支持total_count下划线的写法，要用小驼峰的命名方法，可以利用这种方式为他重命名
          const { results, total_count: totalCount } = res.data.data
          this.tableData = results
          this.totalCount = totalCount
          // 数据请求成功，关闭加载中
          this.loading = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getArticleChannels () {
      getArticleChannels().then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.channelList = res.data.data.channels
        }
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (articleId) {
      console.log(articleId.toString())
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteArticle(articleId.toString()).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
          this.loading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onCurrentChange (page) {
      this.getData(page)
    }
  }
}
</script>

<style scoped lang="less">
.filter-card{
  margin-bottom: 30px;
}
.page{
  text-align: right;
  margin-top: 20px;
}
.article-cover{
  width: 100px;
  height: 100px;
  background-size: cover;
  border-radius: 4px;
}
</style>
