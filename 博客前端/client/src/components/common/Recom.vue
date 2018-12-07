<template>
    <div class="aside">
      <el-row class="module new-articl">
        <el-col>
          <h2>最新文章</h2>
          <ul>
            <li v-for="{title,id,publishTime} in articles" @click="url">
              <el-row>
                <router-link :to="'/articles/' + id">
                  <el-col class="title" :span="15" :offset="1">  ☛&#X3000{{ title }}</el-col>
                  <el-col :span="5" :offset="2" style="color: #ccc">{{ publishTime }}</el-col>
                </router-link>
              </el-row>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row class="module book-recom">
        <el-col>
          <h2>阅读推荐</h2>
          <ul>
            <li v-for="book in books">{{ book.name }}</li>
          </ul>
        </el-col>
      </el-row>
      <el-row class="module friend-link">
        <el-col>
          <h2>友情链接</h2>
          <ul>
            <li v-for="item in 6">{{ item }}</li>
          </ul>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  /*
  *
  * 推荐组件
  * */
  import moment from 'moment'
  import axios from '@/utils/request'
  export default {
    name: "Recom",
    data(){
      return {
        oldId: null,
        articles: [],
        books: []
      }
    },
    methods: {
      url(){
        let newId = this.$route.params.id
        if (this.oldId !== newId){
          console.log(1111)
          window.location.reload()
        }
      }
    },
    created(){
      this.oldId = this.$route.params.id
      console.log(this.oldId)
      axios.get('/home').then(res=>{
        for (let i = 0;i<6;i++){
          if (i >= res.data.length){
            break
          }
          res.data[i].publishTime = moment(res.data[i].publishTime).format('MM月 DD日')
          this.articles.push(res.data[i])
        }
      }).catch(err=>{
        console.log(err)
      })

      axios.get('/books').then(res=>{
        for (let i = 0;i<6;i++){
          if (i >= res.data.length){
            break
          }
          this.books.push(res.data[i])
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
.aside {
  margin-top: 50px;
}
  .module{
    margin-top: 10px;
    padding: 5px;
    background: #fff;
    h2 {
      line-height: 40px;
      color: #38485A;
      font-size: 18px;
      border-bottom: 1px solid #dcae98;
      height: 40px;
      font-weight: 400;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      line-height: 25px;
      height: 25px;
      font-size: 12px;
      color: #333;
      cursor: pointer;
      border-bottom: transparent;
      &:hover {
        border-bottom: 1px solid #000;
      }
    }
    .title {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
</style>
