<template>
  <div>
    <div class="manager-note">
      <Tabs @on-click="clickNav">
        <Tab-pane v-for="item in category" :label="item.name" :key="item.id">
          <div class="no-note" v-if="notes.length==0">暂无数据</div>
          <div class="card-box" v-else>
            <el-table
              :align="align"
              :data="notes"
              style="width: 98%;margin-top: 10px"
              border
            >
              <el-table-column
                :align="align"
                prop="title"
                label="标题"
              >
              </el-table-column>
              <el-table-column
                :align="align"
                prop="upVote"
                label="赞成数"
              >
              </el-table-column>
              <el-table-column
                :align="align"
                prop="downVote"
                label="反对数"
              >
              </el-table-column>
              <el-table-column
                :align="align"
                prop="commentList.length"
                label="评论数"
              >
              </el-table-column>
              <el-table-column
                :align="align"
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="primary" @click="updateInfo(scope.$index, scope.row, item)" size="small">修改
                  </el-button>
                  <el-button type="danger" @click="deleteInfo(scope.$index, scope.row)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </Tab-pane>
      </Tabs>
    </div>

    <!--修改弹框-->
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
        <el-row style="margin-top: 10px">
          <el-col :span="3">
            <span class="label-name">类型</span>
          </el-col>
          <el-col :span="16">
            <el-select v-model="categoryValue" style="width: 100%">
              <el-option v-for="(item,index) in category" :key="index" :value="item.name"
                         :label="item.name"></el-option>
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
        >
        </quill-editor>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateBtn">修改</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "manager-note",
    data() {
      return {
        align: 'center',
        tab:0,
        category: [],
        notes: [],
        dialogVisible: false,
        id: '',
        title: '',
        imageName: '',
        content: '',
        categoryValue: '',
        editorOption: {}
      }
    },
    methods: {
      getCategory() {
        let self = this
        this.$axios.post('/local/manager/findAllCategory').then(function (response) {
          self.category = response.data.categoryList;
        }).catch(function (error) {
         // console.log(error)
          self.$Message.error('服务器异常');
        });
      },
      clickNav(val) {
        this.tab = val
        this.getNote(this.category[val].id)
      },
      /**
       * 根据分类id查询数据
       */
      getNote(id) {
        let self = this
        let params = {
          id: id
        }
        this.$axios.post('/local/app/getNote', params).then(function (response) {
          self.notes = response.data
        }).catch(function (error) {
          self.$Message.error('服务器异常');
        });
      },
      /*更新数据*/
      updateInfo(index, row, category) {
        this.id = row.id
        this.title = row.title
        this.content = row.content
        this.imageName = row.photos.imageUrl
        this.categoryValue = category.name
        this.dialogVisible = true
      },
      //修改发送请求
      updateBtn() {
        let self = this
        let params = {
          id: this.id,
          title: this.title,
          content: this.content,
          imageName: this.imageName,
          categoryValue: this.categoryValue
        }
        this.$axios.post('/local/manager/updateNote', params).then(function (response) {
          let data = response.data
          if (data.cases == '1') {
            self.getNote(self.category[self.tab].id)
            self.dialogVisible = false
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
      },
      /**
       * 删除数据
       */
      deleteInfo(index,row) {
        let self = this
        let str = '你确定要删除'+row.title
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/local/manager/deleteNote', {id: row.id}).then(function (response) {
            let data = response.data
            if (data.cases == '1') {
              self.getNote(self.category[self.tab].id)
              self.$message({
                type: 'info',
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
    },
    created() {
      this.getCategory();
      this.getNote(1)
    }
  }
</script>

<style lang="scss" scoped>
  .manager-note {
    width: 95%;
    min-height: 400px;
    margin: 0px auto;
    /*border: 1px solid #dedede;*/
    .no-note {
      width: 100%;
      height: 200px;
      font-size: 18px;
      color: #666666;
      text-align: center;
      line-height: 200px;
    }
    .card-box {
      padding: 0px 5px;
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
  }
</style>
