<template>
    <div style="height: 100%;">
      <head-nav></head-nav>
      <Aside></Aside>
      <h1>阅读列表</h1>
    </div>
</template>

<script>
  import Aside from "@/components/common/Aside";
  import HeadNav from "@/components/common/HeadNav";
  export default {
    name: "ReadingList",
    components: {
      Aside,
      HeadNav,
    },
    created(){
      console.log('阅读页面')
    }
  }
</script>

<style scoped>

</style>
