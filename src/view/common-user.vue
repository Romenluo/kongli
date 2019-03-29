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
            <div class="form-box">
              <i-form :label-width="120">
                <Form-item label="邮箱">
                  <i-input v-model="email" disabled   placeholder="请输入邮箱"></i-input>
                </Form-item>
                <Form-item label="昵称">
                  <i-input v-model="petName"  placeholder="请输入昵称"></i-input>
                </Form-item>
                <Form-item label="QQ">
                  <i-input v-model="qq" placeholder="请输入qq"></i-input>
                </Form-item>
                <Form-item label="类型">
                  <i-input v-model="roleNam" disabled></i-input>
                </Form-item>
              </i-form>
              <div class="update-btn" @click="updatePersonal">修改</div>
            </div>
          </div>
          <!--修改密码页面-->
          <div v-if="nav=='updatePassword'" class="update-password">
            <!--********************************************-->
            <div class="password-title">修改密码</div>
            <div class="form-box">
              <i-form :label-width="120">
                <Form-item label="旧密码">
                  <i-input v-model="email" placeholder="请输入旧密码"></i-input>
                </Form-item>
                <Form-item label="新密码">
                  <i-input v-model="petName"  placeholder="请输入新密码"></i-input>
                </Form-item>
                <Form-item label="确认密码">
                  <i-input v-model="qq" placeholder="请输入验证密码"></i-input>
                </Form-item>
                <Row>
                  <i-col span="12">
                    <Form-item label="验证码">
                      <i-input v-model="qq" placeholder="请输入验证码"></i-input>
                    </Form-item>
                  </i-col>
                  <i-col span="12">
                    <div class="time-btn" @click="getCodeTest">
                      {{codeText}}
                    </div>
                  </i-col>
                </Row>
              </i-form>
            </div>
            <!--********************************************-->
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
        nav: 'personalInfo',
        email: '',
        petName: '',
        qq: '',
        roleNam: '',
        codeText: "获取验证码",
        startTime:60,
      }
    },
    methods: {
      selectNav(name){
        this.nav = name
        if(this.nav=='updateInfo'){
          this.email = this.loginMessage.user.email
          this.petName = this.loginMessage.user.petName
          this.qq = this.loginMessage.user.qq
          this.roleNam = this.loginMessage.user.role.name
        }
      },
      /**
       * 修改用户信息
       */
      updatePersonal(){
        let parameter={
          email: this.email,
          petName: this.petName,
          qq: this.qq,
          roleId:this.loginMessage.role
        }
        let self = this
        this.$axios.post('/local/user/updateInfo',parameter).then(function (response) {
          console.log(response)
          let data = response.data
          self.$Message.success(data.msg);
          self.$store.commit('updateMessage', data);
        }).catch(function (error) {
          self.$Message.error("获取验证码失败");
        });
      },
      /********************************************************/
      getCodeTest(){
          if(this.startTime<60){
            return;
          }
          /*let parameter = {
            userName:this.formSignUp.userName
          }
          let self = this;
          this.$axios.post('/local/user/verificationCode',parameter).then(function (response) {
            console.log(response)
            self.$Message.success(response.data.msg);
          }).catch(function (error) {
            self.$Message.error("获取验证码失败");
          });*/
          var newtime=setInterval(()=>{
            if(this.startTime<=0){
              this.startTime=60;
              clearInterval(newtime);
              this.codeText='获取验证码'
            }else{
              this.startTime--;
              this.codeText = this.startTime+'秒重新获取';
            }
          },1000);
      }
      /********************************************************************/
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
      width: 60%;
      margin: 0px auto;
      .personal-title{
        height: 60px;
        font-size: 22px;
        text-align: center;
        line-height: 60px;
      }
      .form-box{
        margin-top: 20px;
        font-size: 16px;
        .update-btn{
          cursor: pointer;
          width: 200px;
          text-align: center;
          line-height: 30px;
          font-size: 18px;
          letter-spacing: 10px;
          margin: 0px auto;
          border: 1px #dedede solid;
          background-color: dodgerblue;
          border-radius: 5px;
          padding: 5px 10px;
        }
      }
    }
    /****************************************/
    .update-password{
      width: 60%;
      margin: 0px auto;
      .password-title{
        height: 60px;
        font-size: 22px;
        text-align: center;
        line-height: 60px;
      }
      .form-box{
        margin-top: 20px;
        .time-btn{
          width: 60%;
          height: 35px;
          line-height: 35px;
          text-align: center;
          margin: 0px auto;
          border: 1px solid #dedede;
          border-radius: 15px;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
    /***********************************/
  }
</style>
