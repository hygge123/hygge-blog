<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="文章" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="归档" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="标签" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="阅读列表" name="fourth">定时任务补偿</el-tab-pane>
    <el-tab-pane label="关于我" name="fifth">关于我</el-tab-pane>
  </el-tabs>
</template>
<script>
    export default {
        name: "NavBar",
      data() {
        return {
          activeName: 'second'
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      }
    }
</script>

<style scoped>

</style>
