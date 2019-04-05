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
      <!--<el-table-column
        fixed
        :align="align"
        prop="content"
        label="内容"
      >
      </el-table-column>-->
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
  </div>
</template>

<script>
  export default {
    name: "info-manager",
    data() {
      return {
        align: 'center',
        info:[]
      }
    },
    methods: {
      getInfo(){
        let self = this
        this.$axios.post('/local/manager/findAllInfo').then(function (response) {
          self.info = response.data
        }).catch(function (error) {
          self.$Message.error('服务器异常')
        });
      },
      formatter (row){
        let arr = row.infoDate.split('T')
        return arr[0]
      },
      /**
       * 修改实时资讯
       */
      updateInfo(index,row){
        console.log(row.id)
      },
      /**
       * 刷新按钮
       * */
      renovate(){
        this.getInfo()
      },
      /**
       * 删除实时资讯
       */
      deleteInfo(index,row){
        let self = this
        this.$confirm('你确定要删除这条消息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/local/manager/deleteInfo',{id:row.id}).then(function (response) {
            let data = response.data
            if(data.cases=='1'){
              self.getInfo();
              self.$message({
                type: 'info',
                message: '已删除'
              });
            }else {
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
      }
    },
    mounted(){
      this.getInfo()
    }
  }
</script>

<style lang="scss" scoped>

  .renovate-box{
    display: flex;
    justify-content: center;
    font-size: 18px;
    .btn-box{
      display: block;
      width: 25px;
      height: 25px;
      cursor: pointer;
      line-height: 25px;
      text-align: center;
      &:hover{
        color: dodgerblue;
      }
    }
  }
</style>
