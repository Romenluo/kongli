<template>
  <div>

    <Layout>
      <Header class="header-box">
        <Row>
          <Col span="4">
            <div class="log-box">
              <img src="../assets/images/log.png"/>
            </div>
          </Col>
          <Col span="17" class="nav-box">
            <Menu mode="horizontal" :theme="theme1" active-name="home" @on-select="selectItem">
              <MenuItem name="home">
                首页
              </MenuItem>
              <MenuItem name="pull">
                普安
              </MenuItem>
              <MenuItem name="personal">
                个人中心
              </MenuItem>
              <MenuItem name="about">
                关于我们
              </MenuItem>
            </Menu>
          </Col>
          <Col span="3">
            <div class="is-login">
              <div class="wel-content" v-if="loginMessage.cases==1">
                <span class="sing-box">欢迎{{loginMessage.user.petName}}</span>
                <span class="sing-box logout" @click="logout">退出</span>
              </div>
              <div class="wel-content" v-else>
                <span class="sing-box" @click="login">登录</span>
                <span>|</span>
                <span class="sing-box" @click="sigUp">注册</span>
              </div>
            </div>
          </Col>
        </Row>
      </Header>
      <Content>
        <div class="content-box">
          <router-view/>
        </div>
      </Content>
      <Footer :style="{height:'80px',background:'#dedede',padding:'0px 0px'}">
        <div class="foot-box">
          {{copyright}} 版权归 Kong Li 所有
        </div>
      </Footer>
    </Layout>
    <!--登录弹出框-->
    <div class="login-box" v-show="loginModel">
      <div class="login-content">
        <div class="login-title">登录</div>
        <span class="clear-icon" @click="clear"><i class="fa fa-times-circle" aria-hidden="true"></i></span>
        <div class="form-content">
          <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
            <FormItem prop="userName">
              <Input type="text" size="large" v-model="formLogin.userName" prefix="ios-contact" placeholder="请输入邮箱"/>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" size="large" v-model="formLogin.password" prefix="ios-unlock" placeholder="请输入密码"/>
            </FormItem>
            <FormItem>
              <div class="login-btn" @click="sigIn('formLogin')">
                登录
              </div>
            </FormItem>
          </Form>
          <div class="register" @click="sigUp()">没有账号？去注册！</div>
          <div class="register" @click="forgetPassword()">忘记密码？找回密码</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        theme1: 'light',
        copyright: '\xA9',
        user: {},
        loginModel: false,
        formLogin: {
          userName: '',
          password: ''
        },
        ruleLogin: {
          userName: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      selectItem(name) {
        if (name == 'home') {
          this.$router.replace({path: '/show'});
        }
        if (name == 'pull') {
          this.$router.replace({path: '/pull'});
        }
        if (name == 'personal') {
          this.$router.replace({path: '/personal'});
        }
        if (name == 'about') {
          this.$router.replace({path: '/about'});
        }
      },
      /*点击登录按钮后弹出登录框*/
      login() {
        this.loginModel = true
      },
      logout() {
        let self = this;
        this.$axios.post('/local/user/logout').then(function (response) {
          let data = response.data;
          console.log(response);
          self.$store.commit('updateMessage', data);
        }).catch(function (error) {
          self.$Message.error('服务器异常');
        });
      },
      /*点击登录按钮后登录。取消model框*/
      sigIn(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {

            if (valid) {
              let parame = {
                username: this.formLogin.userName,
                password: this.formLogin.password
              };
              let self = this;
              this.$axios.post('/local/user/signIn', parame).then(function (response) {
                let data = response.data;
                console.log(response);
                self.$store.commit('updateMessage', data);
                if (data.cases == "1") {
                  self.$Message.success(data.msg);
                  self.loginModel = false
                } else {
                  self.$Message.error(data.msg);
                }
              }).catch(function (error) {
                self.$Message.error('服务器异常');
                console.log(error)
              });
            } else {
              this.$Message.error('输入数据不符合要求');
            }
          } else {
            this.$Message.error('输入数据不符合要求');
          }
        })
      },
      /*登录取消按钮*/
      clear() {
        this.loginModel = false
      },
      sigUp() {
        this.$router.push({path: '/register'});
      },
      // 忘记密码
      forgetPassword() {

      }

    },
    created() {
      this.$router.replace({path: '/show'});
    },
    computed: {
      loginMessage: {
        get() {
          return this.$store.state.message;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .header-box {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 60px;
    background: #dedede;
    z-index: 1000;
    .ivu-menu {
      display: flex;
      justify-content: flex-end;
      font-size: 18px;
      background-color: #dedede;
    }
  }

  @mixin log {
    height: 60px;
    width: 157px;
  }

  .log-box {
    @include log;
    img {
      @include log;
    }
  }

  .content-box {
    min-height: 500px;
    margin-top: 60px;
    background-color: #ffffff;
  }

  @mixin wh {
    width: 100%;
    height: 100%;
  }

  .foot-box {
    @include wh;
    text-align: center;
    line-height: 80px;
  }

  .is-login {
    @include wh;
    display: flex;
    justify-content: flex-end;
    .wel-content {
      // background-color: #C3D5ED;
      .sing-box {
        &:hover {
          cursor: pointer;
          color: dodgerblue;
        }
      }
      .logout {
        color: #2baee9;
        margin-left: 5px;
      }
    }
  }

  .login-box {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2222;
    top: 0px;
    background: rgba(0, 0, 0, 0.5);
    .login-content {
      width: 45%;
      height: 300px;
      background-color: #fff;
      opacity: 1;
      position: relative;
      top: 80px;
      left: 25%;
      padding: 0px 7%;
      border-radius: 10px;
      .clear-icon {
        display: inline-block;
        width: 45px;
        height: 45px;
        font-size: 32px;
        line-height: 45px;
        text-align: center;
        position: relative;
        top: -45px;
        right: -111%;
        &:hover {
          cursor: pointer;
        }
      }
      .login-title {
        width: 100%;
        height: 45px;
        text-align: center;
        font-size: 22px;
        line-height: 45px;
        letter-spacing: 10px;
      }
      .form-content {
        position: relative;
        top: -45px;
        overflow: hidden;
        .login-btn {
          width: 100%;
          height: 40px;
          background-color: #2d8cf0;
          border-radius: 5px;
          margin: 0px auto;
          line-height: 40px;
          text-align: center;
          font-size: 20px;
          color: #fff;
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

    }
  }
</style>
