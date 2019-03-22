<template>
  <div>
    <!--此页面为普通用户信息页面-->
    <Row>
      <i-col span="5" style="overflow: hidden">
        <Menu :theme="theme3" active-name='manager' @on-select="selectNav" width="100%" style="background-color: #ffffff">
          <Menu-group title="管理系统">
            <Menu-item name="manager">
              <Icon type="document-text"></Icon>
              后台管理
            </Menu-item>
          </Menu-group>
          <Menu-group title="个人信息管理">
            <Menu-item name="personalInfo">
              <Icon type="document-text"></Icon>
              查看个人信息
            </Menu-item>
            <Menu-item name="updateInfo" >
              <Icon type="chatbubbles"></Icon>
              修改个人信息
            </Menu-item>
            <Menu-item name="updatePassword" >
              <Icon type="chatbubbles"></Icon>
              修改密码
            </Menu-item>
          </Menu-group>
        </Menu>
      </i-col>
      <i-col span="19">
        <div class="personal-box">
          <!--后台管理页面-->
          <div v-if="nav=='manager'" class="personal-info">
            <manager-home></manager-home>
          </div>
          <!--个人信息展示页面-->
          <div v-if="nav=='personalInfo'" class="personal-info">
            个人信息
          </div>
          <!--修改个人信息页面-->
          <div v-if="nav=='updateInfo'" class="personal-info">
            修改个人信息
          </div>
          <!--修改密码页面-->
          <div v-if="nav=='updatePassword'" class="personal-info">
            修改密码
          </div>
        </div>
      </i-col>
    </Row>

  </div>
</template>

<script>
  import ManagerHome from './manager/home'
  export default {
    name: "manager-user",
    components:{
      ManagerHome
    },
    data() {
      return {
        theme3:'light',
        nav: 'personalInfo'
      }
    },
    methods: {
      selectNav(name){
        this.nav = name
      }
    }
  }
</script>

<style lang="scss" scoped>

  .personal-box{
    height: 800px;
    border-left: 1px solid #dcdee2;
    .personal-info{

    }
  }
</style>
