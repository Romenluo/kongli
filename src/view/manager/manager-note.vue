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
              <!--<el-table-column
                fixed
                :align="align"
                prop="content"
                label="内容"
              >
              </el-table-column>-->
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
                  <el-button type="primary" @click="updateInfo(scope.$index, scope.row)" size="small">修改</el-button>
                  <el-button type="danger" @click="deleteInfo(scope.$index, scope.row)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "manager-note",
    data() {
      return {
        align: 'center',
        category: [],
        notes: []
      }
    },
    methods: {
      getCategory() {
        let self = this
        this.$axios.post('/local/manager/findAllCategory').then(function (response) {
          self.category = response.data.categoryList;
        }).catch(function (error) {
          console.log(error)
          self.$Message.error('服务器异常');
        });
      },
      clickNav(val) {
        this.getNote(this.category[val].id)
        console.log(this.notes)
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
          console.log(response)
          self.notes = response.data
        }).catch(function (error) {
          console.log(error)
          self.$Message.error('服务器异常');
        });
      },
      /*更新数据*/
      updateInfo(){

      },
      /**
       * 删除数据
       */
      deleteInfo(){

      }
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
    .no-note{
      width: 100%;
      height: 200px;
      font-size: 18px;
      color: #666666;
      text-align: center;
      line-height: 200px;
    }
    .card-box{
      padding: 0px 5px;
    }
  }
</style>
