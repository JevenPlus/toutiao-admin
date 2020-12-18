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
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" required>
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onsubmit">筛选</el-button>
        </el-form-item>
      </el-form>
      <!--数据筛选表单结束-->
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">根据筛选条件共查询到 46167 条结果</div>
      <!--数据列表开始-->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="cover"
          label="封面"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="date"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
        </el-table-column>
      </el-table>
    </el-card>
    <!--数据列表结束-->
    <!--分页开始-->
    <el-pagination
      class="page"
      layout="prev, pager, next"
      :total="1000"
      background
    >
    </el-pagination>
    <!--分页结束-->
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      form: {
        resource: '',
        region: '',
        date1: ''
      },
      tableData: [
        {
          cover: '',
          title: '西游记',
          status: '0',
          date: '2020-11-22',
          operation: ''
        },
        {
          cover: '',
          title: '三国演义',
          status: '1',
          date: '2020-11-23',
          operation: ''
        },
        {
          cover: '',
          title: '水浒传',
          status: '2',
          date: '2020-11-24',
          operation: ''
        },
        {
          cover: '',
          title: '红楼梦',
          status: '3',
          date: '2020-11-25',
          operation: ''
        },
        {
          cover: '',
          title: '三国志',
          status: '4',
          date: '2020-11-26',
          operation: ''
        }
      ]
    }
  },
  created () {
    // this.getData()
  },
  methods: {
    getData () {
      getArticles().then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data.results
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onsubmit () {}
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
</style>
