<template>
  <article>
    <el-row>
      <el-col :span="16">
        <header class="info">
          <h1>{{ title }}</h1>
          <h4 class="time">{{ publishTime }}</h4>
          <h4>
            <span class="tag" v-for="tag in tags">{{ tag }}</span>
          </h4>
        </header>
        <p class="content">{{content}}</p>
      </el-col>
      <el-col :span="7" :offset="1">
        <recom></recom>
      </el-col>
    </el-row>
  </article>
</template>

<script>
  import Recom from '@/components/common/Recom'
  import parseMarkdown from "../utils/parseMarkdown";
  import moment from 'moment'
  import axios from '../utils/request'
  export default {
    name: "Article",
    data(){
      return {
        title: '',
        publishTime: '',
        tags: '',
        content: ''
      }
    },
    components: {
      Recom
    },
    created(){
      const id = this.$route.params.id
      axios.get(`/article/${id}`).then(res=>{
        const data = res.data[0]
        this.title = data.title
        this.publishTime = moment(data.publishTime).format('YYY年 MM月 DD日 HH:mm:ss')
        this.content = data.content
        this.tags = data.tags ? data.tags.split(',') : []
      }).catch(err=>{
        console.log(err)
      })
    },
    methods: {
      parseMarkdown
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .info {
    h1{
      font-size: 24px;
      font-weight: 400;
      padding: 20px 0 10px 0;
      color: #38485A;
    }
    .time{
      font-size: 12px;
      color: #999;
      margin-bottom: 0;
    }
    .tag{
      display: inline-block;
      padding: 3px 10px;
      border: 1px solid #df5000;
      color: #f18f01;
    }
    .content{
        text-indent: 2em;
        line-height: 28px;
        margin: 10px 0;
    }
  }
</style>
