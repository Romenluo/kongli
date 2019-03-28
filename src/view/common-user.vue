<template>
  <div>
    <!--此页面为普通用户信息页面，显示用户信息，用户修改密码，修改个人信息等-->
    <Row>
      <i-col span="5" style="overflow: hidden">
        <Menu :theme="theme3" active-name='personalInfo' @on-select="selectNav" width="100%" style="background-color: #ffffff">
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
          <!--个人信息展示页面-->
          <div v-if="nav=='personalInfo'" class="personal-info">
            <div class="personal-title">个人信息</div>
            <div class="personal-text-box">
              <div class="label-box">邮箱</div>
              <div class="content-box">{{loginMessage.user.email}}</div>
            </div>
            <div class="personal-text-box">
              <div class="label-box">昵称</div>
              <div class="content-box">{{loginMessage.user.petName}}</div>
            </div>
            <div class="personal-text-box">
              <div class="label-box">QQ</div>
              <div class="content-box">{{loginMessage.user.qq}}</div>
            </div>
            <div class="personal-text-box">
              <div class="label-box">类型</div>
              <div class="content-box">{{loginMessage.user.role.name}}</div>
            </div>
          </div>
          <!--修改个人信息页面-->
          <div v-if="nav=='updateInfo'" class="update-info">
            <div class="personal-title">个人信息</div>
            <div>

            </div>
          </div>
          <!--修改密码页面-->
          <div v-if="nav=='updatePassword'" class="update-password">
            修改密码
          </div>
        </div>
      </i-col>
    </Row>

  </div>
</template>

<script>
  export default {
    name: "common-user",
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
    },
    computed:{
      loginMessage:{
        get(){
          return this.$store.state.message;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .personal-box{
    min-height: 500px;
    border-left: 1px solid #dcdee2;
    .personal-info{
      width: 80%;
      margin: 0px auto;
      .personal-title{
        height: 60px;
        font-size: 22px;
        text-align: center;
        line-height: 60px;
      }
      .personal-text-box{
        margin-top: 20px;
        font-size: 18px;
        padding: 5px 0px;
        .label-box{
          text-align: right;
          display: inline-block;
          width: 40%;
        }
        .content-box{
          padding-left: 20px;
          display: inline-block;
          width: 59%;
          padding-right: 15px;
        }
      }
    }
    .update-info{
      width: 80%;
      margin: 0px auto;
      .personal-title{
        height: 60px;
        font-size: 22px;
        text-align: center;
        line-height: 60px;
      }
    }
  }
</style>
