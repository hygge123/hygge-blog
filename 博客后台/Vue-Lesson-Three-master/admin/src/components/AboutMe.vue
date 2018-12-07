<template>
    <div>
      <head-nav></head-nav>
      <Aside id="aside"></Aside>
      <div class="content">

        <h2>
          关于我 /
          <span>About Me</span>
        </h2>
        <hr>
          <div class="edit-tool">
            <textarea></textarea>
          </div>
        <section>
          <button @click="updateContent">提交修改</button>
        </section>
      </div>
    </div>
</template>
<script>
  import Aside from '@/components/common/Aside'
  import HeadNav from '@/components/common/HeadNav'
  import "simplemde/dist/simplemde.min.css"
  import SimpleMDE from "simplemde";
  import request from '../utils/request'
    export default {
        name: "AboutMe",
      components:{
        Aside,
        HeadNav
      },
     data(){
          return{
            simplemde:'',// 编译器
            id:''
          }
     },
      mounted(){
          this.simplemde = new SimpleMDE({
            placeholder:'Talk to me,what are you say...',
            spellChecker: false,
            toolbarTips:false
          });
        request({
            url:'/content',
            method:'get',
          }).then(res=>{
           this.id = res[0].id
          // console.log(this.id)
          this.simplemde.value(res[0].content)
          }).catch(err=>{
          console.log(err)
        })
      },
      methods:{
        updateContent(){
          request({
            url:`/updateContent/${this.id}`,
            method:'post',
            data:{
                content:this.simplemde.value(),
                id:this.id
            },
          }).then(()=>{
            console.log('添加成功');
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>
#aside{

  height: 852px;
}
  .content{
    position: relative;
    top: 10px;
    left: 80px;

  }
  hr{
    margin-bottom: 20px;
  }
  .edit-tool{
    font-size: 1.6rem;
  }

</style>
