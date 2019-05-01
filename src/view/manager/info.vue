<template>
  <el-tabs type="border-card">
    <el-tab-pane label="实时资讯">
      <info-manager></info-manager>
    </el-tab-pane>
    <el-tab-pane label="添加实时资讯">
      <add-information></add-information>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import AddInformation from './add-information'
  import InfoManager from './info-manager'
  export default {
    name: "info",
    components:{
      AddInformation,
      InfoManager
    }
  }
</script>

<style scoped>

</style>
