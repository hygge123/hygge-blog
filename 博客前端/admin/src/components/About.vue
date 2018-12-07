<template>
  <div style="height: 100%;">
    <head-nav></head-nav>
    <Aside></Aside>
    <div class="about-container main">
      <h2>关于我 /
        <span>ABOUT ME</span>
      </h2>
      <hr>
      <main>
        <textarea></textarea>
        <section class="btn-container">
          <button class="not-del" @click="updateAbout">提交修改</button>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import Aside from "@/components/common/Aside";
  import HeadNav from "@/components/common/HeadNav";
  import 'font-awesome/css/font-awesome.min.css'
  import 'simplemde/dist/simplemde.min.css'
  import SimpleMDE from 'simplemde'

  export default {
    name: "ReadingList",
    data(){
      return {
        id: '',
        simplemde: ''
      }
    },
    components: {
      Aside,
      HeadNav,
    },
    mounted() {
      this.simplemde = new SimpleMDE({
        autoDownloadFontAwesome: false,
        spellChecker: false
      })
      request({
        url: '/briefs',
        method: 'get',
      }).then(res=>{
        console.log(res)
        this.id = res[0].id
        this.simplemde.value(res[0].content)
      }).catch(err=>{
        console.log(err)
      })
    },
    methods: {
      updateAbout(){
        request({
          url: `/briefs/${this.id}`,
          method: 'put',
          data: {
            content: this.simplemde.value()
          }
        }).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/style/_variable.scss';
  main {
    height: calc(100% - 48px);
    padding: 0.5em 0;
    overflow: auto;
    font-size: 1.6rem;
  }

  .btn-container {
  @include flex($justify: flex-end);
  }
</style>
