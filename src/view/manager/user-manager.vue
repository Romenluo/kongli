<template>
  <div>
    <el-button v-if="initValue" @click="init">获取所有用户</el-button>
    <el-table
      :align="align"
      :data="listArray"
      style="width: 100%;margin-top: 10px"
      border
    >
      <el-table-column
        fixed
        :align="align"
        prop="email"
        label="邮箱"
       >
      </el-table-column>
      <el-table-column
        fixed
        :align="align"
        prop="petName"
        label="昵称"
        >
      </el-table-column>
      <el-table-column
        fixed
        :align="align"
        prop="qq"
        label="QQ"
      >
      </el-table-column>
      <el-table-column
        fixed
        :align="align"
        prop="role"
        label="身份"
      ></el-table-column>
      <el-table-column
        fixed
        :align="align"
        prop="forbidden"
        label="是否禁用"
      ></el-table-column>
      <el-table-column
        :align="align"
        fixed="right"
        label="操作"
        >
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" size="small">{{scope.row.forbidden=='否'?'禁用':'解除'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "user-manager",
    props:{
      list:Array
    },
    data() {
      return {
        align: 'center',
        listArray:this.list,
        initValue:false
      }
    },
    methods: {
      init(){
        this.initValue=true
        this.listArray=this.list
      },
      handleEdit(index,row){
        let self = this;
        let str = row.forbidden=='否'?`确定要冻结${row.email}用户吗?`:'确定要解除被冻结用户吗?'
        this.$confirm(str, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let parame = {
            email:row.email,
            forbidden:row.forbidden=='否'?'Y':'N'
          };
          this.$axios.post('/local/manager/updateForbidden',parame).then(function (response) {
            let data = response.data;
            let lists = data.list
            let array = []
            for(let i = 0;i<lists.length;i++){
              array.push({
                email: lists[i].email,
                petName: lists[i].petName,
                qq: lists[i].qq,
                role: lists[i].role.name,
                forbidden:lists[i].forbidden=='N'? '否':'是'
              })
            }
            self.listArray = [...array]
            self.$message({
              type: 'success',
              message: data.msg
            });
          }).catch(function (error) {
            self.$Message.error('服务器异常')
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    created(){
      this.init()
    }
  }
</script>

<style scoped>

</style>
