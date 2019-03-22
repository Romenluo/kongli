<template>
  <div>
    <div class="manager-title">后台管理系统</div>
    <div class="tabs-box">
      <Tabs type="card">
        <Tab-pane label="标签一">标签一的内容</Tab-pane>
        <Tab-pane label="标签二">标签二的内容</Tab-pane>
        <Tab-pane label="标签三">标签三的内容</Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home"
  }
</script>

<style lang="scss" scoped>

  .manager-title {
    width: 100%;
    height: 60px;
    font-size: 18px;
    margin: 0px auto;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid #dedede;
  }
  .tabs-box{
    width: 100%;
    margin: 0px auto;
  }
</style>
