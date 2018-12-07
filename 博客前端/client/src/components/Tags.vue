<template>
  <div class="tag-container">
    <el-row>
      <el-col :span="16">
        <div class="new-article">
          <h2>标签</h2>
        </div>
        <nav>
          <ul class="tags">
            <li v-for="(tag,index) in tags">
              <a href="javascript:void(0)" @click="goAnchor(index)">{{ tag }}</a>
            </li>
          </ul>
        </nav>
        <el-collapse class="xiala" v-model="activeName" accordion>
          <el-collapse-item class="title"  v-for="(tag,index) in tags" :title="tag" :name="index">
            <ul>
              <li v-for="intro in introductions[tag]">
                <router-link class="router-link" :to="'/articles/' + intro.id">{{ intro.title }}
                <span class="time">{{ intro.publishTime }}</span></router-link>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>

      </el-col>
      <el-col :span="7" :offset="1">
        <recom></recom>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Recom from '@/components/common/Recom'
  import axios from '../utils/request'
  import moment from 'moment'

  export default {
    name: "Tags",
    data() {
      return {
        introductions: {},
        tags: [],
        activeName: '1'
      }
    },
    components: {
      Recom
    },
    created() {
      axios.get('/introductions')
        .then(res => {
          console.log(res.data)
          for (let intro of res.data) {
            intro.tags = intro.tags.split(',')
            intro.publishTime = moment(intro.publishTime).format('MM-DD')
            for (let tag of intro.tags) {
              if (this.tags.indexOf(tag) === -1) {
                this.tags.push(tag)
                this.introductions[tag] = []
              }
              this.introductions[tag].push(intro)
            }
          }
        }).catch(err => alert(err))
    },
    methods: {
      goAnchor(id) {
        this.activeName = id
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../assets/style/variable';

  .tag-container {
    .tags {
      padding: 0;
      list-style: none;
      li {
        display: inline;
        margin-right: 0.3em;
        a {
          padding: 5px 10px;
          border: 1px solid #df5000;
          transition: 0.5s;
          &:hover {
            position: relative;
            top: -3px;
            box-shadow: 0px 3px 3px #df5000;
          }
        }
      }
    }

    .xiala {
      font-size: 16px;
      li {
        border-bottom: 1px solid #ccc;
      }
      .router-link {
        display: block;
        width: 100%;
      }
    }
.el-collapse-item__header {
  background-color: #f00;
}
    .tag-list {
      padding: 0;
      list-style: none;
      .tag {
        color: #cbd19e;
      }
      li {
        margin: 0.8em 0;
      }
    }

    a {
      color: $base;
    }
  }
</style>
