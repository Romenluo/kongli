<template>
  <div>
    <!--此页面为管理员页面，管理后台系统-->
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
          <div v-if="nav=='manager'" class="manager-box">
            <manager-home></manager-home>
          </div>
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
            <div class="password-title">修改密码</div>
            <div class="form-box">
              <i-form ref="updatePassword" :model="updatePassword" :rules="ruleUpdatePass" :label-width="120">
                <Form-item label="旧密码" prop="oldPassword">
                  <i-input type="password" v-model="updatePassword.oldPassword" placeholder="请输入旧密码"></i-input>
                </Form-item>
                <Form-item label="新密码" prop="newPassword">
                  <i-input type="password" v-model="updatePassword.newPassword" placeholder="请输入新密码"></i-input>
                </Form-item>
                <Form-item label="确认密码" prop="confirm">
                  <i-input type="password" v-model="updatePassword.confirm" placeholder="请输入验证密码"></i-input>
                </Form-item>
                <Row>
                  <i-col span="12">
                    <Form-item label="验证码">
                      <i-input v-model="updatePassword.code" placeholder="请输入验证码"></i-input>
                    </Form-item>
                  </i-col>
                  <i-col span="12">
                    <div class="time-btn" @click="getCodeTest">
                      {{codeText}}
                    </div>
                  </i-col>
                </Row>
                <Form-item>
                  <i-button type="primary" @click="updateBtn('updatePassword')">修改</i-button>
                </Form-item>
              </i-form>
            </div>
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
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.updatePassword.confirm !== '') {
            // 对第二个密码框单独验证
            this.$refs.updatePassword.validateField('confirm');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.updatePassword.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        theme3:'light',
        nav: 'manager',
        email: '',
        petName: '',
        qq: '',
        roleNam: '',
        codeText: "获取验证码",
        startTime: 60,
        updatePassword: {
          oldPassword: '',
          newPassword: '',
          confirm: '',
          code: ''
        },
        ruleUpdatePass: {
          oldPassword: [
            {required: true, message: '旧密码不能为空', trigger: 'blur'}
            /*{validator: this.oldPass, trigger: 'blur'}*/
          ],
          newPassword: [
            {required: true, message: '新密码不能为空', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          confirm: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: validatePassCheck, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      selectNav(name){
        this.nav = name
          this.email = this.loginMessage.user.email
          this.petName = this.loginMessage.user.petName
          this.qq = this.loginMessage.user.qq
          this.roleNam = this.loginMessage.user.role.name
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
          let data = response.data
          self.$Message.success(data.msg);
          self.$store.commit('updateMessage', data);
        }).catch(function (error) {
          self.$Message.error("获取验证码失败");
        });
      },
      getCodeTest() {
        if (this.startTime < 60) {
          return;
        }
        let parameter = {
          userName:this.email
        }
        let self = this;
        this.$axios.post('/local/user/verificationCode',parameter).then(function (response) {
          self.$Message.success(response.data.msg);
        }).catch(function (error) {
          self.$Message.error("获取验证码失败"+error);
        });
        var newtime = setInterval(() => {
          if (this.startTime <= 0) {
            this.startTime = 60;
            clearInterval(newtime);
            this.codeText = '获取验证码'
          } else {
            this.startTime--;
            this.codeText = this.startTime + '秒重新获取';
          }
        }, 1000);
      },
      /**
       * 点击修改按钮就修改密码
       * */
      updateBtn(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let parameter = {
              email: this.email,
              oldPassword: this.updatePassword.oldPassword,
              newPassword: this.updatePassword.newPassword,
              code: this.updatePassword.code
            }
            let self = this
            this.$axios.post('/local/user/updatePassword', parameter).then(function (response) {
              let data = response.data
              self.$Message.success(data.msg)
              /*if(data.cases=='1'){
                self.$Message.success(data.msg)
              }else{
                self.$Message.error(data.ms)
              }*/
            }).catch(function (error) {
              self.$Message.error("服务器出错"+error);
            });
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      oldPass() {
        let parameter = {
          email: this.email,
          oldPassword: this.updatePassword.oldPassword
        }
        let self = this
        this.$axios.post('/local/user/verificationOldPassword', parameter).then(function (response) {
          // console.log(response)
          let data = response.data
          if(data.cases=='1'){
            self.$Message.success(data.msg)
          }else{
            self.$Message.error(data.ms)
          }
        }).catch(function (error) {
          self.$Message.error("服务器出错"+error);
        });
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
    min-height: 800px;
    border-left: 1px solid #dcdee2;
    .manager-box{
      width: 100%;
      min-height: 800px;
    }
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
    .update-password {
      width: 60%;
      margin: 0px auto;
      .password-title {
        height: 60px;
        font-size: 22px;
        text-align: center;
        line-height: 60px;
      }
      .form-box {
        margin-top: 20px;
        .time-btn {
          width: 60%;
          height: 35px;
          line-height: 35px;
          text-align: center;
          margin: 0px auto;
          border: 1px solid #dedede;
          border-radius: 15px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
