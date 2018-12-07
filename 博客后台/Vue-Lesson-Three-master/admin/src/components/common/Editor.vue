<template>

    <div class="editor">
      <input type="text" class="title" id="title" v-model="title" @input="autosave">
      <div class="operate-bar">
        <section class="tag-container">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tag"></use>
          </svg>
          <ul class="tags" >
            <li class="tag" v-for="tag,index in getTags" :key="index">
              {{tag}}
              <sup @click="deleteTag(index)">x</sup>
            </li>
          </ul>
          <input type="text" class="tag-input" id="tag-input" @keydown="addTags" >
          <span class="tag-add">+</span>
        </section>
        <section class="btn-container">
          <button id="delete" class="delete">删除文章</button>
          <button id="submit" class="not-del">发布文章</button>
        </section>
      </div>
      <p class="tips">标签查询页面只能批量更改标签，修改的文章内容会自动保存</p>
      <div class="content">
        <textarea></textarea>
      </div>
    </div>
</template>
<script>
    //引入编辑器
    import "simplemde/dist/simplemde.min.css";
    import SimpleMDE from "simplemde";
    import { mapState,mapGetters } from 'vuex'
    //引入debounce 方法    防抖动函数
    import  debounce from 'lodash.debounce'

    export default {
        name: "Editor",
        data(){
          return {
            simplemde:'',         //编辑器  会自动寻找 textarea

          }
        },
        computed:{
          //全局变量变动  他也会变动
          ...mapState(['id','tags','title','content','isPublished']),
          ...mapGetters(['getTags']),
          //因为这个title 是数据双向绑定，因此，他可能被改变，如果我们直接从mapState中读取他的话
          //那么如果改变title的话，又因为他没有setter方法，就会导致无法直接改变state中的title
          //
          title:{
            get(){
              return this.$store.state.title
            },
            set(value){
              this.$store.commit('SET_TITLE',value)
            }
          }
        },
        mounted(){
          // this.tags = this.$store.getters.getTags;
            //
          this.simplemde = new SimpleMDE({
            placeholder:'Talk to me , what are you say...',
            spellChecker:false,
            toolbarTips: false,
          });
          //将vuex里面的正在编辑的文章的相关信息输出到编辑器里面
          // console.log( this.simplemde.value(this.content))
          this.simplemde.value(this.content)
          //绑定编辑器的按键事件 以及复制 粘贴 的事件发生
          this.simplemde.codemirror.on('keyHandler',()=>this.autosave())
          this.simplemde.codemirror.on('inputRead',()=>this.autosave())

        },
      //监控id 值的变化，如果一旦发生变化，就直接将内容变化 手动绑定编辑器的内容
          watch:{
          id(newVal,oldVal){
            this.simplemde.value(this.content)
          }
          },
      methods:{
         autosave:debounce(function () {
           if(this.id){
             this.$store.dispatch('saveArticle',{
               id:this.id,
               title:this.title,
               tags:this.tags,
               content:this.simplemde.value(),
               isPublished:this.isPublished
             })

           }
         },1000),
        //删除标签
        deleteTag(index){
           this.getTags.split(index)
          this.autosave();
        },
        //添加标签
        addTags:()=>{

        }
      }
    }
</script>

<style type="text/scss" lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import '../../assets/style/variable';

  .title {
    margin-bottom: 0.3em;
    width: 100%;
    height: 2em;
    border: none;
    font-size: 2.4rem;
    color: $title;
    outline: none;
    border-bottom: 1px solid $special;
    background: none;
    text-align: center;
  }
  .operate-bar {
    @include flex($justify: space-between);
    height: 4em;
    font-size: 1.3rem;
    margin-bottom: 1em;
    .tag-container {
      @include flex($justify: flex-start);
      .icon {
        width: 1.5em;
        height: 1.5em;
        margin-right: 10px;
      }
      .tags {
        @include flex;
        list-style: none;
        margin-right: 10px;
        padding: 0;
        .tag {
          margin-right: 10px;
          color: $base;
          position: relative;
          &:last-child {
            margin-right: 0px;
          }
        }
      }
      .tag-add {
        font: {
          weight: 600;
          size: 1.6rem;
        }
        color: $special;
        /*text-decoration: underline;*/
        cursor: pointer;
      }
    }
  }
  .tips {
    color: $quote;
    text-align: center;
  }
  .content {
    font-size: 1.6rem;
  }
</style>
