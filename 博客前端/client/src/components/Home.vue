<template>
  <div class="articlelist-container" style="padding: 30px 0;">
    <!-- 轮播图 - 个人信息 -->
    <el-row class="banner-per">
      <el-col :span="16">
        <!-- 轮播图 -->
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(item,index) in items" :key="index">
            <img class="carer-img" :src="item.url" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col class="pre" :span="7" :offset="1">
        <!-- 个人信息 -->
        <div>
          <dl>
            <dt>
              <h2>刘梦萍个人名片</h2>
            </dt>
            <dd>
              <el-card class="li" shadow="hover" body-style="padding: 5px">
                职业: WEB前端
              </el-card>
            </dd>
            <dd>
              <el-card class="li" shadow="hover" body-style="padding: 5px">
                现居: 河南省-郑州市
              </el-card>
            </dd>
            <dd>
              <el-card class="li" shadow="hover" body-style="padding: 5px">
                单位:
              </el-card>
            </dd>
            <dd>
              <el-card class="li" shadow="hover" body-style="padding: 5px">
                Email: 2750990613@qq.com
              </el-card>
            </dd>
          </dl>
          <ul class="callme">
            <li>
              <img class="icon" src="../assets/img/weixin.jpg" alt="">
            </li>
            <li>
              <img class="icon" src="../assets/img/QQ.jpg" alt="">
            </li>
            <li>
              <img class="icon" src="../assets/img/xinlang.jpg" alt="">
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>

    <!-- 文章 - 右侧边栏-->
    <el-row>
      <el-col :span="16">
        <div class="article-list">
          <div class="new-article">
            <h2>最新文章</h2>
          </div>
          <article class="article" v-for="{id, title, publishTime, content} in articles" :key="id">
            <!-- 文章头部 -->
            <el-row class="article-header">
              <el-col>
                <header>
                  <h2>
                    <router-link class="title" :to="'/articles/' + id">{{ title }}</router-link>
                  </h2>
                </header>
              </el-col>
            </el-row>
            <!-- 文章内容 -->
            <el-row class="article-content">
              <el-col>
                <p class="content" v-html="parseMarkdown(content)"></p>
              </el-col>
            </el-row>
            <!-- 阅读全文 -->
            <el-row>
              <el-col :span="5" :offset="19">
                <el-button class="read-more" size="mini">
                  <router-link :to="'/articles/' + id">阅读全文>>></router-link>
                </el-button>
              </el-col>
            </el-row>
            <!-- 文章底部 -->
            <el-row class="article-footer">
              <el-col>
                <footer>
                  <p class="time">{{ publishTime }}</p>
                </footer>
              </el-col>
            </el-row>
          </article>
        </div>
        <!-- 分页 -->
        <div class="pagination">
            <span class="prev" :class="{'hide': parseInt(this.$route.query.page, 10) === 0}">←
                <a @click="prevPage">上一页</a>
            </span>
          <span class="next" :class="{'hide': parseInt(this.$route.query.page, 10) === this.maxPage - 1}">
                <a @click="nextPage">下一页</a>→</span>
        </div>
      </el-col>
      <el-col :span="7" :offset="1">
        <recom></recom>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Recom from '@/components/common/Recom'
  import parseMarkdown from '@/utils/parseMarkdown'
  import axios from '@/utils/request'
  import moment from 'moment'
    export default {
      name: "Home",
      data(){
        return {
          offset: '',
          maxPage: '',
          articles: '',
          items: [
            {url: require('../assets/img/轮播2.jpg')},
            {url: require('../assets/img/轮播1.jpeg')},
            {url: require('../assets/img/轮播3.jpeg')},
            {url: require('../assets/img/轮播4.jpg')}
          ]
        }
      },
      components: {
        Recom
      },
      methods: {
        parseMarkdown,
        prevPage() {
          if (this.$route.query.page > 0) {
            this.$router.push({path: '/articles', query: {page: this.$route.query.page - 1}})
          }
        },
        nextPage() {
          if (this.$route.query.page < this.maxPage - 1) {
            this.$router.push({path: '/articles', query: {page: parseInt(this.$route.query.page, 10) + 1}})
          }
        },
        beforeRouteUpdate(to, from, next) {
          if (to.path === '/articles') {
            this.offset = to.query.page * 5
            axios.get(`/api/v1/articles?isPublished=1&offset=${this.offset}&limit=5`)
              .then(res => {
                const pattern = /<!-- more -->/i
                for (let article of res.data.articles) {
                  article.publishTime = moment(article.publishTime).format('YYYY年 MMM DD日 HH:mm:ss')
                  pattern.test(article.content)
                  article.content = RegExp['$`']
                }
                this.articles = res.data.articles
              })
              .catch(err => alert(err))
          }
          next()
        }
      },
      created(){
        axios.get('/home')
          .then(res=>{
            this.articles = res.data
            for (let article of res.data) {
              // 处理时间格式
              article.publishTime = moment(article.publishTime).format('YYYY年 MM月 DD日 HH:mm:ss')
            }
          }).catch(err=>{
            console.log(err)
        })
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/style/variable';
  /* 轮播图 + 个人信息 */
  .banner-per {
    /* 轮播图 */
    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    .carer-img {
      width: 100%;
    }
    /* 个人信息 */
    .pre {
      padding: 5px 10px 0 0 ;
      border: 1px solid #FFCC00;
      background-color: #FFFFF7;
      border-radius: 5px;
    }
    h2 {
      font-size: 22px;
      margin: 10px;
      color: #cbd19e;
      font-weight: 600;
      padding-bottom: 10px;
    }
    .li {
      margin-top: 10px;
    }
    .callme {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-evenly;
    }
    .icon {
      width: 45px;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .article-header {
    color: #474645;
    h2 {
      margin: 0;
    }
    a {
      padding-bottom: 0;
    }
  }
  .article-content {
    color: #777;
    font-size: 14px;
    .content{
      max-height: 71px;
      overflow: hidden;
    }
  }
  .article-footer {
    font-size: 12px;
    p {
      font-size: 12px;
      color: #999;
      margin-bottom: 0;
    }
  }

  // 覆盖article全局样式
  .article {
    border: 1px solid #CCEFF5;
    background-color: #FAFCFD;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
  }
  h2 {

    border-bottom: none;
    padding: 0;
  }

  .title {
    color: $title;
    padding-bottom: 0.3em;
  }

  .title:hover {
    border-bottom: 2px solid $base;
  }

  .read-more {
    color: $base;
    text-align: center;
    width: 100%;
    display: inline-block;
  }

  .pagination {
    @include flex($justify: space-between);
    font-size: 1.5rem;
    margin-top: 1.5em;
  }

  .prev,
  .next {
    a {
      cursor: pointer;
      color: $base;
    }
  }

  .hide {
    opacity: 0;
  }
</style>
