<template>
  <el-tabs type="border-card">
    <el-tab-pane label="文章信息">
      <manager-note></manager-note>

    </el-tab-pane>
    <el-tab-pane label="添加文章">
      <editor-note :category="category"></editor-note>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import EditorNote from './editor-note'
  import ManagerNote from './manager-note'
  export default {
    name: "note",
    components:{
      ManagerNote,
      EditorNote
    },
    props:{
      category:Array
    }
  }
</script>

<style scoped>

</style>
