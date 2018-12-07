<template>
  <div id="app">
    <header-nav class="header"></header-nav>
    <div id="main" class="container" @click="sweepMask">
      <transition mode="out-in" name="fade" @before-enter="beforeEnter" @after-enter="afterEnter">
        <router-view/>
      </transition>
    </div>
    <footer id="app-footer">
      本博客由lmphygge独家赞助.
    </footer>
  </div>
</template>

<script>
  import HeaderNav from '@/components/common/HeaderNav'
export default {
  name: 'App',
  components: {
    HeaderNav
  },
  methods: {
    sweepMask() {
      this.maskFlag = !this.maskFlag
    },
    afterEnter() {
      const footer = document.getElementById('app-footer')
      footer.className = 'solid'
    },
    beforeEnter() {
      const footer = document.getElementById('app-footer')
      footer.className = 'trans'
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  @import './assets/style/variable';
  .header {
    background-color: #fff;
  }
  #app {
    /*background-color: #fffbf0;*/
  }
  #main {
    min-height: 380px;
  }
  footer {
    font-weight: 200;
    width: 95%;
    max-width: 850px;
    text-align: center;
    font-size: 1.4rem;
    margin: 50px auto 0;
    padding: 2em 0;
    color: $special;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .25);
    .github {
      color: $base;
    }
  }

  .trans {
    opacity: 0;
  }

  .solid {
    opacity: 1;
  }
</style>
