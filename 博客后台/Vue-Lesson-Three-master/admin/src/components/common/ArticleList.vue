<template>
    <div>
      <ul class="list">
        <li class="article"  :class="{active: activeIndex === index, published: isPublished === 1}" v-for="{title,createTime,isPublished,isChosen},index in articleList" @click="select(index)">
          <header>{{title}}</header>
          <p>{{createTime}}</p>
        </li>
      </ul>
    </div>

</template>

<script>
  import request from '@/utils/request'
  import moment from 'moment'
  import { mapState,mapMutations } from 'vuex'
  export default {
    name: "ArticleList",
    data(){
      return {
        articleList:[],
        activeIndex:-1
      }
    },
    //把全局的vuex里面的state和mutations放到计算属性中...
    computed:{
      ...mapState(['id','title','tags','content','isPublished']),
    },
    //当该组件创建的时候自动执行里面的请求
    created(){
      request({
        method:'get',
        url:'/articles'
      }).then(res=>{
        //for in遍历的是数组的索引（即键名 ），而for of遍历的是数组元素值。
        for(let article of res){
          //遍历返回体里面的每一篇文章 让每篇文章的创建时间格式化 是否被选中
          article.createTime = moment(article.createTime).format('YYYY年-MM月-DD日 HH:mm:ss')
          // console.log(article);
          article.isChosen = true
          // console.log(article);
        }
        this.articleList.push(...res)//解构赋值
        //如果查询出文章，则将第一篇文章作为正在编辑的文章
        if(this.articleList.length !== 0){
          this.SET_CURRENT_ARTICLE(this.articleList[0])
          this.activeIndex = 0;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    methods:{
      updateList(updateId){
        request({
          method:"get",
          url:`/articles/${updateId}`
        }).then(res=>{
          const article = res[0]
          article.createTime = moment(article.createTime).format('YYYY年-MM月-DD日 HH:mm:ss')
          article.isChosen = true
          this.articleList.unshift(article)
          //如果发布了新文章的话，当前被选中的文章下标自动 + 1
          this.activeIndex ++
        }).catch(err=>{
          console.log(err);
        })
      },
      select(index){
        this.activeIndex = index
        //当你在选择文章的时候，当前被选中的文章扔到全局状态管理里面
        this.SET_CURRENT_ARTICLE(this.articleList[index])
      },
      ...mapMutations(['SET_CURRENT_ARTICLE'])
    },
    //监听vuex数据的变化，如果发生变化，
    watch:{
      title(val){
        if(this.articleList.length !==0){
          this.articleList[this.activeIndex].title = val
        }
      },
      tags(val){
        if(this.articleList.length !==0){
          this.articleList[this.activeIndex].tags = val
        }
      },
     content(val){
        if(this.articleList.length !==0){
          this.articleList[this.activeIndex].content = val
        }
      },
      isPublished(val){
        if(this.articleList.length !==0){
          this.articleList[this.activeIndex].isPublished = val
        }
      }
    }
  }
</script>
<style type="text/scss"  lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import '../../assets/style/variable';
  .article {
  @include flex($flow: column wrap, $align: flex-start);
    padding: 0.2em 0.5em;
    margin-bottom: 1.5em;
    height: 5em;
    max-width: 100%;
    background: $white;
    border: 0.1em solid $special;
    cursor: pointer;
  header {
    max-width: 100%;
    font-size: 1.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.2em;
  }
  p {
    margin: 0;
    color: $special;
  }
  &:last-child {
     margin-bottom: 0;
   }
  }
  .active {
    border: 1px solid $base;
  }
  .published {
    border-right: 4px solid $base;
  }
</style>
