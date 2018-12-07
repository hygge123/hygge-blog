<template>
  <header class="nav-container">
    <!--<img class="topImg" src="../../assets/img/top (2).jpg" alt="banner">-->
    <el-row class="nav">
      <el-col :span="20" :offset="4">
        <el-menu
          :default-active="activeIndex2"
          mode="horizontal"
          @select="handleSelect"
          background-color="rgb(220, 174, 152)"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">文章</el-menu-item>
          <el-menu-item index="2">归档</el-menu-item>
          <el-menu-item index="3">标签</el-menu-item>
          <el-menu-item index="4">阅读列表</el-menu-item>
          <el-menu-item index="5">关于我</el-menu-item>

        </el-menu>
      </el-col>
    </el-row>
  </header>
</template>

<script>
  export default {
    name: "HeaderNav",
    data(){
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key);
        switch (key) {
          case '1':
            // this.$router.push({path: `/${path}`, query: {page: 0}})
            this.$router.push('/articles')
            break
          case '2':
            this.$router.push('/archives')
            break
          case '3':
            this.$router.push('/tags')
            break
          case '4':
            this.$router.push('/lists')
            break
          case '5':
            this.$router.push('/about')
            break
          default:
            break
        }
      },
      jump(evt) {
        const path = evt.target.name
        console.log(path)
        switch (path) {
          case 'articles':
            // this.$router.push({path: `/${path}`, query: {page: 0}})
            this.$router.push('/articles')
            break
          case 'archives':
            this.$router.push('/archives')
            break
          case 'tags':
            this.$router.push('/tags')
            break
          case 'lists':
            this.$router.push('/lists')
            break
          case 'about':
            this.$router.push('/about')
            break
          default:
            break
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import '../../assets/style/variable';
  .topImg {
    height: 170px;
    width: 100%;
  }
  .nav{
    background-color: rgb(220, 174, 152);
    margin-top: -2px;
    .logo-title {
      margin-top: 6px;
    }
    .logo{
      vertical-align: middle;
    }
    .title {
      font-size: 20px;
      vertical-align: middle;
      color: #fff;
    }
  }

  .nav-container {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  }

  .site-nav {
    position: relative;
    margin: 0 auto;
    @include flex($justify: space-between);
    z-index: 2;
    padding: 0.5em 0;
    height: 4em;
    width: 95%;
    max-width: 850px;
    font-size: 1.6rem;
    background: $white;
    .site-nav-list {
      @include flex;
    }
    .nav-title {
      @include flex;
      .logo {
        width: 2.5em;
        height: 2.5em;
        margin-right: 0.5em;
      }
      .title {
        font: {
          size: 2rem;
          family: Dosis, Source Sans Pro, Helvetica Neue, Arial, sans-serif;
        }
        letter-spacing: 0.1em;
      }
    }
    .nav-menu {
      position: absolute;
      right: 0.5em;
      top: 50%;
      transform: translateY(-50%);
      visibility: hidden;
      width: 1.5em;
      height: 1.5em;
      border: 1px solid $word;
      border-radius: 2px;
      fill: $word;
    }
  }

  .mask-nav {
    z-index: 1;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 235px;
    font-size: 1.6rem;
    padding: 4.5em 1.5em 4em 1.5em;
    background: #f9f9f9;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.25);
    .mask-nav-list {
      li {
        font-size: 1.4rem;
        margin-bottom: 0.8em;
      }
    }
  }

  [class$="nav-list"] {
    padding: 0;
    list-style: none;
    a {
      padding-bottom: 0.2em;
      margin: auto 0.3em;
      cursor: pointer;
      &:hover {
        @include chosen-item;
      }
    }
    .active {
      @include chosen-item;
    }
  }

  .menu-chosen {
    border: 1px solid $base !important;
    fill: $base !important;
  }

  @media screen and (max-width: 480px) {
    .site-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      padding: 0.5em;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
      .site-nav-list {
        display: none;
      }
      .nav-menu {
        visibility: visible;
      }
    }
  }
</style>
