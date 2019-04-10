<template>
  <div>
    <div class="renovate-box">
      <div class="btn-box" title="刷新" @click="renovate"><i class="el-icon-refresh"></i></div>
    </div>
    <el-table
      :align="align"
      :data="info"
      style="width: 100%;margin-top: 10px"
      border
    >
      <el-table-column
        fixed
        :align="align"
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        fixed
        :align="align"
        prop="upVote"
        label="赞成"
      >
      </el-table-column>
      <el-table-column
        fixed
        :align="align"
        prop="downVote"
        label="反对"
      >
      </el-table-column>
      <el-table-column
        fixed
        :align="align"
        :formatter="formatter"
        prop="infoDate"
        label="发布时间"
      >
      </el-table-column>

      <el-table-column
        :align="align"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="updateInfo(scope.$index, scope.row)" size="small">修改</el-button>
          <el-button type="danger" @click="deleteInfo(scope.$index, scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹出框修改文章-->
    <el-dialog
      title="修改"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <div class="edit_container">
        <el-row>
          <el-col :span="3">
            <span class="label-name">标题</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="title" placeholder="请输入标题"></el-input>
          </el-col>
        </el-row>
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
         >
        </quill-editor>
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveHtml">修改</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "info-manager",
    data() {
      return {
        align: 'center',
        info: [],
        updateShow: true,
        loading: false,
        dialogVisible: false,
        editorOption: {},
        content: '',
        title: '',
        id: 0
      }
    },
    methods: {
      getInfo() {
        let self = this
        this.$axios.post('/local/manager/findAllInfo').then(function (response) {
          self.info = response.data
        }).catch(function (error) {
          self.$Message.error('服务器异常')
        });
      },
      formatter(row) {
        let arr = row.infoDate.split('T')
        return arr[0]
      },
      /**
       * 刷新按钮
       * */
      renovate() {
        this.getInfo()
      },
      /**
       * 删除实时资讯
       */
      deleteInfo(index, row) {
        let self = this
        this.$confirm('你确定要删除这条消息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/local/manager/deleteInfo', {id: row.id}).then(function (response) {
            let data = response.data
            if (data.cases == '1') {
              self.getInfo();
              self.$message({
                type: 'info',
                message: '已删除'
              });
            } else {
              self.$message({
                type: 'error',
                message: '删除失败'
              });
            }
          }).catch(function (error) {
            self.$Message.error("请求异常");
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /**
       * 点击修改弹出修改实时资讯页面
       */
      updateInfo(index, row) {
        this.id = row.id
        this.title = row.title
        this.content = row.content
        this.dialogVisible = true
      },
      /**
       * 点击X时关闭弹窗
       * */
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      /**
       * 修改保存文章
       */
      saveHtml(){
        let self = this
        let params = {
          id:this.id,
          title:this.title,
          content: this.content
        }
        this.$axios.post('/local/manager/updateInfo',params).then(function (response) {
          let data = response.data
          if (data.cases == '1') {
            self.getInfo()
            self.dialogVisible=false
            self.$message({
              type: 'success',
              message: data.msg
            });
          } else {
            self.$message({
              type: 'error',
              message: data.msg
            });
          }
        }).catch(function (error) {
          self.$Message.error("请求异常");
        });
      }
    },
    mounted() {
      this.getInfo()
    }
  }
</script>

<style lang="scss" scoped>

  .renovate-box {
    display: flex;
    justify-content: center;
    font-size: 18px;
    .btn-box {
      display: block;
      width: 25px;
      height: 25px;
      cursor: pointer;
      line-height: 25px;
      text-align: center;
      &:hover {
        color: dodgerblue;
      }
    }
  }

  .update-box {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2222;
    top: 0px;
    background: rgba(0, 0, 0, 0.1);
    .update-content {
      width: 45%;
      height: 300px;
      background-color: #fff;
      opacity: 1;
      position: relative;
      top: 80px;
      left: 25%;
      padding: 0px 7%;
      border-radius: 10px
    }
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
    /*.save-btn{
      display: flex;
      margin-top: 20px;
      justify-content: center;
    }*/
  }
</style>
