<template>
  <div class="root">
    <div class="login-box">
      <div class="login-title">登录</div>
      <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
        <FormItem prop="userName">
          <Input type="text" size="large" v-model="formLogin.userName" prefix="ios-contact" placeholder="请输入邮箱"/>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" size="large" v-model="formLogin.password" prefix="ios-unlock" placeholder="请输入密码"/>
        </FormItem>
        <FormItem>
          <div class="btn" @click="handleSubmit('formLogin')">
            登录
          </div>
        </FormItem>
      </Form>
      <div class="register" @click="register()">没有账号？去注册！</div>
      <div class="register" @click="forgetPassword()">忘记密码？找回密码</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        formLogin: {
          userName: '',
          password: ''
        },
        ruleLogin: {
          userName: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let parame = {
              username:this.formLogin.userName,
              password:this.formLogin.password
            };
            let self = this;
            this.$axios.post('/local/signIn',parame).then(function (response) {
              let data = response.data;
              console.log(response);
              if(data.resCode=="1"){
                self.$Message.success(data.resMsg);
                let params={
                  name:"Home",
                  params:{
                    user:data
                  }
                };
                self.$router.push(params);
              }else {
                self.$Message.error(data.resMsg);
              }
            }).catch(function (error) {
              self.$Message.error('服务器异常');
            });
          } else {
            this.$Message.error('输入数据不符合要求');
          }
        })
      },
      //注册
      register(){
        this.$router.push({path: '/register'});
      },
      forgetPassword(){
        this.$router.push({path: '/show'});
      }
    }

  }
</script>

<style lang="scss" scoped>
  html,body{height:100%}
  .root{
    background-image: url(../assets/images/login-bg.jpg);
    overflow: auto;
    height: 100%;
  }
  $text-color: #dedede;
  .login-box {
    width: 35%;
    height: 300px;
    margin: 100px auto 0px auto;
    padding-left: 40px;
    padding-right: 40px;
    border: 1px solid #dedede;
    border-radius: 5px;
    @mixin font-style{
      text-align: center;
      font-size: 20px;
    }
    .login-title {
      width: 100%;
      height: 60px;
      @include font-style;
      line-height: 60px;
    }
    .btn {
      width: 60%;
      height: 40px;
      background-color: #2d8cf0;
      border-radius: 5px;
      margin: 0px auto;
      line-height: 40px;
      @include font-style;
      color: $text-color;
      letter-spacing: 15px;
      &:hover {
        cursor: pointer;
      }
    }
    .register {
      text-align: center;
      height: 25px;
      line-height: 25px;
      &:hover {
        cursor: pointer;
        color: dodgerblue;
      }
    }
  }

</style>
