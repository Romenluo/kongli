<template>
  <div v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--添加文章，使用quill-editor富文本编辑器作为编辑文章的编辑器，方便插入图片和编辑文章-->
    <div class="editor-title">
      添加文章
    </div>

    <div class="edit_container">

      <el-row>
        <el-col :span="3">
          <span class="label-name">标题</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="title" placeholder="请输入标题"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="3">
          <span class="label-name">类型</span>
        </el-col>
        <el-col :span="16">
          <el-select v-model="categoryValue" style="width: 100%">
            <el-option v-for="(item,index) in category" :key="index" :value="item.name" :label="item.name"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="3">
          <span class="label-name">图片名</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="imageName" placeholder="请输入图片名称（需要输入后缀）"></el-input>
        </el-col>
      </el-row>
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur()" @focus="onEditorFocus()"
        @change="onEditorChange()">
      </quill-editor>
      <div class="save-btn">
        <el-button type="primary" v-on:click="saveHtml">保存</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'editor-note',
    props:{
      category:Array
    },
    data() {
      return {
        loading: false,
        title: '',
        content: ``,
        categoryValue: '旅游景点',
        imageName: '',
        editorOption: {},
        isSave:false
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      },
    },
    methods: {
      onEditorReady(editor) { // 准备编辑器
      },
      // 失去焦点事件
      onEditorBlur() {
      },
      // 获得焦点事件
      onEditorFocus() {
      },
      // 内容改变事件
      onEditorChange() {
      },
      saveHtml: function () {
        if (this.isSave == true) {
          this.$Message.error("你已经保存过，不能再次保存，如需更改内容请去修改内容！！！");
          return
        }
        this.loading = true
        let parameter={
          title: this.title,
          category: this.categoryValue,
          content: this.content,
          imageName: this.imageName
        }
        let self = this
        this.$axios.post('/local/manager/saveNote',parameter).then(function (response) {
          self.isSave = true
          self.loading = false
          let data = response.data
          if(data.cases=='1'){
            self.$Message.success(data.msg);
          }else {
            self.$Message.error(data.msg);
          }
        }).catch(function (error) {
          console.log(error)
          self.$Message.error("请求异常");
        });
      }
    },
    created(){

    },
    watch:{
      title(){
        this.isSave = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor-title {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }

  .edit_container {
    width: 90%;
    margin: 20px auto;
    .label-name {
      width: 100%;
      font-size: 16px;
      height: 100%;
      text-align: right;
      line-height: 40px;
    }
    .save-btn{
      display: flex;
      margin-top: 20px;
      justify-content: center;
    }
  }


</style>
<style>
  .quill-editor{
    margin-top: 10px;
  }
  .ql-container {
    min-height: 400px !important;
  }
  .ql-editor{
    min-height: 400px !important;
  }
</style>
