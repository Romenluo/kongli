<template>
  <div>
    <div class="manager-title">后台管理系统</div>
    <div class="tabs-box">
      <Tabs type="card" @on-click="tabContent">
        <Tab-pane :label="item.name" :key="item.value" v-for="item in tabDate">
          <div v-if="item.value=='userManager'">
              <user-manager :list="userDate"></user-manager>
          </div>
          <div v-else-if="item.value=='addNote'">
            <editor-note :category="category"></editor-note>
          </div>
          <div v-else-if="item.value=='addInformation'">
            <add-information></add-information>
          </div>
          <div v-else-if="item.value=='informationManager'">
            <info-manager></info-manager>
          </div>
          <div v-else-if="item.value=='noteManager'">
            <manager-note></manager-note>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import UserManager from './user-manager'
  import EditorNote from './editor-note'
  import AddInformation from './add-information'
  import InfoManager from './info-manager'
  import ManagerNote from './manager-note'
  export default {
    name: "home",
    components:{
      ManagerNote,
      UserManager,
      EditorNote,
      AddInformation,
      InfoManager
    },
    data() {
      return {
        tabDate:[
          {
            value: "userManager",
            name: '用户管理'
          },
          {
            value: "addNote",
            name: '添加文章'
          },
          {
            value: "noteManager",
            name: '文章管理'
          },
          {
            value: "addInformation",
            name: '添加实时资讯'
          },
          {
            value: "informationManager",
            name: '时日资讯管理'
          }
        ],
        userDate: [],
        category:[]
      }
    },
    methods:{
      tabContent(val){
        if(this.tabDate[val].value=='userManager'){
          this.findUser();
        }
        if(this.tabDate[val].value=='addNote'){
          this.getCategory()
        }
      },
      findUser() {
        let self = this
        this.$axios.post('/local/manager/findAllUser').then(function (response) {
          let userList = response.data;
          let array = []
          if(userList!=null){
            for(let i=0;i<userList.length;i++){
              array.push({
                email: userList[i].email,
                petName: userList[i].petName,
                qq: userList[i].qq,
                role: userList[i].role.name,
                forbidden:userList[i].forbidden=='N'? '否':'是'
              })
            }
            self.userDate=[...array]
          }else {
          }
        }).catch(function (error) {
          self.$Message.error('服务器异常');
        });
      },
      getCategory(){
        let self = this
        this.$axios.post('/local/manager/findAllCategory').then(function (response) {
          self.category = response.data.categoryList;
        }).catch(function (error) {
          self.$Message.error('服务器异常');
        });
      }

    },
    created(){
      this.findUser();
    }


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
