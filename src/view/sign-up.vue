<template>
  <div class="register-root">
    <div class="register-box">
      <div class="login-title">注册</div>
      <Form ref="formSignUp" :model="formSignUp" :rules="ruleSignUp">
        <FormItem prop="userName">
          <Input type="text" size="large" v-model="formSignUp.userName" prefix="ios-contact" placeholder="请输入邮箱"/>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" size="large" v-model="formSignUp.password" prefix="ios-unlock" placeholder="请输入密码"/>
        </FormItem>
        <FormItem prop="confirm">
          <Input type="password" size="large" v-model="formSignUp.confirm" prefix="ios-unlock" placeholder="请输入确认密码"/>
        </FormItem>
        <FormItem prop="petName">
          <Input type="text" size="large" v-model="formSignUp.petName" prefix="logo-octocat" placeholder="请输入昵称"/>
        </FormItem>
        <FormItem prop="code">
          <div class="out-time">
            <Row>
              <Col span="12"><Input v-model="formSignUp.code" placeholder="输入验证码"/></Col>
              <Col span="12">
                <div class="time-btn" @click="getCodeTest">
                  {{codeText}}
                </div>
              </Col>
            </Row>
          </div>
        </FormItem>

        <FormItem>
          <div class="btn" @click="submit('formSignUp')">
            注册
          </div>
        </FormItem>
      </Form>
    </div>

  </div>
</template>

<script>
  export default {
    name: "sign-up",
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入你的密码'));
        } else if (value !== this.formSignUp.password) {
          callback(new Error('两个密码不一致'));
        } else {
          callback();
        }
      };
      return {
        formSignUp: {
          userName: '',
          password: '',
          confirm: '',
          petName:'',
          code:''
        },
        ruleSignUp: {
          userName: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          password: [
            {type: 'string', min: 6, message: '密码最少为6个字符', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          confirm: [
            {validator: validatePassCheck, trigger: 'blur'}
          ],
          petName:[
            {required: true, message: '昵称不能为空', trigger: 'blur'},
          ],
          code:[
            {required: true, message: '验证码不能为空', trigger: 'blur'},
            {type: 'string', min: 6, max:6, message: '输入六位数的验证码', trigger: 'blur'}
          ]
        },
        codeText:"获取验证码",
        startTime:60,
        show:false,
        clickCode:false
      }
    },
    methods: {
      //注册
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.clickCode==false){
              this.$Message.error('请获取验证码');
              return
            }
            let paramet = {
              username:this.formSignUp.userName,
              pass:this.formSignUp.password,
              petName:this.formSignUp.petName,
              pageCode:this.formSignUp.code
            }
            let self = this;
            this.$axios.post('/local/user/signUp',paramet).then(function (response) {
              // console.log(response);
              let data = response.data;
              if(data.cases=="1"){
                self.$Message.success(data.msg);
                self.$router.push({path: '/login'});
              }else {
                self.$Message.error(data.msg);
              }

            }).catch(function (error) {
              // console.log(error);
            });
          } else {
            this.$Message.error('请填写正确信息');
          }
        })
      },
      /*定时器，获取验证码*/
      getCodeTest:function(){
        this.clickCode = true;
        if(this.formSignUp.userName==""){
          this.$Message.success('用户名不能为空');
        }else {
          if(this.startTime<60){
            return;
          }
          let parameter = {
            userName:this.formSignUp.userName
          }
          let self = this;
          //请求后台数据
          this.$axios.post('/local/user/verificationCode',parameter).then(function (response) {
            // console.log(response)
            self.$Message.success(response.data.msg);
          }).catch(function (error) {
            self.$Message.error("获取验证码失败");
          });
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
      },
      login(){
        this.$router.push({path: '/login'});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .register-root {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-image: url(../assets/images/login-bg.jpg);
  }

  .register-box {
    width: 40%;
    height: 450px;
    margin: 80px auto 0px auto;
    padding: 0px 40px;
    border: 1px solid #dedede;
    border-radius: 5px;
    @mixin font-style {
      text-align: center;
      font-size: 20px;
      color: #dedede;
    }
    .login-title {
      width: 100%;
      height: 60px;
      @include font-style;
      line-height: 60px;
    }
    .out-time {
      width: 100%;
      height: 40px;
    }
    .time-btn{
      width: 80%;
      text-align: center;
      margin: 0px auto;
      border: 1px solid #dedede;
      border-radius: 15px;
      &:hover{
        cursor: pointer;
      }
    }
    .btn {
      width: 60%;
      height: 40px;
      background-color: #2d8cf0;
      border-radius: 5px;
      margin: 0px auto;
      line-height: 40px;
      @include font-style;
      letter-spacing: 15px;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
