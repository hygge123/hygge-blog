<template>
    <div class="archive-container">
     <el-row>
       <el-col :span="16">
         <div class="new-article">
           <h2>文章归档</h2>
         </div>
         <section class="section" v-for="year in years">
           <h2>{{ year }}>>>>></h2>
           <ul class="list" v-for="intro in introductions[year]">
             <router-link :to="/articles/ + intro.id">
               <li class="li">
                 {{ intro.title }}
                 <span class="time">{{ intro.publishTime }}</span>
               </li>
             </router-link>
           </ul>
         </section>
       </el-col>
       <el-col :span="7" :offset="1">
         <recom></recom>
       </el-col>
     </el-row>
    </div>
</template>

<script>
  import Recom from '@/components/common/Recom'
  import moment from 'moment'
  import axios from '@/utils/request'
  export default {
    name: "Archives",
    data(){
      return {
        introductions: {},
        years: []
      }
    },
    components: {
      Recom
    },
    created(){
      axios.get('/home').then(res=>{
        for (let intro of res.data) {
          const introYear = moment(intro.publishTime).year()
          if (this.years.indexOf(introYear) === -1) {
            this.years.push(introYear)
            this.introductions[introYear] = []
          }
          intro.publishTime = moment(intro.publishTime).format('MM-DD')
          this.introductions[introYear].push(intro)
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/style/variable';
  .section {
    position: relative;
    &:before {
      position: absolute;
      top: 45px;
      left: 94px;
      content: '';
      display: inline-block;
      height: 100%;
      width: 3px;
      background-color: #dcae98;
    }
    h2{
      color: #cbd19e;
    }
    ul {
      padding-left: 108px;
      li {
        position: relative;
        .time {
          position: absolute;
          left: -60px;
        }
      }
    }
  }

  .archive-container {
  ul {
    /*padding-left: .2em;*/
    list-style-type: circle;
  li {
    position: relative;
    margin: 0.8em 0;
    background-color: #FFF;
    padding: 8px;
    border-radius: 5px;
    transition: .5s;
    &:hover{
      top: -3px;
      box-shadow: 5px 5px 5px #ccc;
    }
  }
  }

  .date {
    color: $special;
  }

  a {
    color: $base;
  }
  }
</style>
