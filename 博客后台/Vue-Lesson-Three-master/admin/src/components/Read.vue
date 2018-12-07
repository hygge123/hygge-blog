<template>
    <div>
      <head-nav></head-nav>
      <Aside id="aside"></Aside>
      <div class="box">
        <section>
          <p>阅读列表/READING LIST</p>
          <hr>
        </section>
        <button @click="show=!show" >添加书籍</button>
        <div >
          <table class="readlist">
            <th>书籍名称</th>
            <th>作者</th>
            <th>评分</th>
            <th>操作</th>
             <tr v-for="{name,author,score},index in readLists" class="item">
               <td>{{name}}</td>
               <td>{{author}}</td>
               <td>{{score}}  </td>

               <td>
                 <button @click="editorRead(index)">编辑</button>
                 <button @click="removList(index)">删除</button>
               </td>
             </tr>

          </table>
        </div>
          <div v-show="show" class="dialog" >
            <h1>添加书籍表单</h1>
            <div class="addList  List">
              <p>
                <label>书籍名称</label>
                <input type="text" id="name">
              </p>
              <p>
                <label>作者</label>
                <input type="text"  id="author">
              </p>
              <p>
                <label>评分</label>
                <input type="text" id="score">
              </p>
            </div>
            <button @click="addBooks">提交</button>
            <button @click="resetList">取消</button>
        </div>
          <div v-show = "isEidt"  class="dialog" >
            <h1>编辑书籍表单</h1>
            <div class="updateList  List">
              <p>
                <label>书籍名称</label>
                <input type="text" class="name" >
              </p>
              <p>
                <label>作者</label>
                <input type="text" class="author">
              </p>
              <p>
                <label>评分</label>
                <input type="text" class="score">
              </p>
            </div>
            <button @click="updateRead">提交</button>
            <button @click="resetList">取消</button>

          </div>

      </div>
    </div>
</template>

<script>
  import HeadNav from'@/components/common/HeadNav'
  import Aside from '@/components/common/Aside'
  import request from '../utils/request'
    export default {
        name: "Read",
     mounted(){
          this.getbooks();
     },
      data(){
          return{
            readLists:[],
            show:false,
            isEidt:false,
            isEditId:0

        }
      },
      methods:{
        addBooks(){
          //querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
          this.show = false;
          const  name = document.querySelector("#name").value;
          const  score = document.querySelector("#score").value;
          const  author = document.querySelector("#author").value;
          request({
            url:'/addBooks',
            method:'post',
            data:{
              name,
              score,
              author
            }
          }).then(()=>{
             console.log('添加成功')
           const book = {
               name,
               score,
               author
           }
           this.readLists.push(book);
             document.querySelector("#name").value = '';
             document.querySelector("#score").value = '';
             document.querySelector("#author").value = '';
          }).catch(err=>{
            console.log(err)
          })
        },
        getbooks(){
          request({
            url:'/getbooks',
            method:'get',
          }).then(res=>{
            //把查询的每一条 都做为一个对象 一一的赋值给  并渲染起来
            let dataArray = res

            this.readLists = dataArray;

          }).catch(err=>{
            console.log(err);
          })
        },
        resetList(){
          if(!this.show){
            this.isEidt = false;
          }else{
            document.querySelector("#name").value = '';
            document.querySelector("#score").value = '';
            document.querySelector("#author").value = '';
            this.show = false;
          }

        },
        editorRead(index){
          this.isEidt=true;
          this.isEditId = this.readLists[index].id;
          document.querySelector(".name").value= this.readLists[index].name;
          document.querySelector(".author").value= this.readLists[index].author;
          document.querySelector(".score").value= this.readLists[index].score;

        },
        updateRead(){
            this.isEidt = !this.isEidt;
            let id = this.isEditId;
            let name  = document.querySelector(".name").value
            let author = document.querySelector(".author").value
            let score = document.querySelector(".score").value
            request({
              url:'/updateRead',
              method:'post',
              data:{
                id,
                name,
                author,
                score
              }
            }).then(res=>{
              let messages = res.message;
              console.log(messages);
              this.getbooks();
            }).catch(err=>{
              console.log(err);
            })

        },
        removList(index){
          var r=confirm("Press a button!");
          if (r==true)
          {
            request({
              url:'/removList',
              method:'post',
              data:{
                id:this.readLists[index].id
              }
            }).then(res=>{
              console.log(res);
              this.getbooks();
            })
          }
          else
          {

          }
        }
      },
      components:{
        HeadNav,
        Aside
      }

    }
</script>

<style scoped>
  table{
    width: 40%;
    margin: 0 auto ;
    border-collapse: collapse;

  font-size: 1.6rem;
  }
  th{
    border-bottom:solid 2px #f18f01;
  }
  .item{
    height: 50px;
    text-align: center;
    border-bottom:solid 2px #f18f01 ;
  }
  #aside{

    height: 852px;
  }
    .box{
      position: relative;
      top: 10px;
      left: 80px;
    }
    hr{
      margin-bottom:20px;
    }
  p{
    font-size:16px;
  }

  .dialog{
    position: absolute;
    position:fixed;
    box-shadow: 0 0 5px #f18f01;
    background-color: white;
    text-align: center;
    left: 600px;
    top:250px;
    width: 500px;
    height: 300px;
  }
  .List {
    width: 400px;
    text-align:right;
    margin: 60px auto 20px auto;
    padding-right:20px;

  }
  .List input{
    width:260px;
    height:36px;
    margin-left:40px;
  }
  button{
    border: solid 1px #f18f01;
    color:#f18f01;
    background: white;

  }

</style>
