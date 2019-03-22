<template>
  <div>
    <Layout>
      <Header class="header-box" >
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
              <span class="wel-content">欢迎XXX，<a>退出</a></span>
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
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        theme1: 'light',
        copyright: '\xA9',
        user: {}
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
    },
    created () {
      this.$router.replace({path: '/show'});
    },
    mounted() {
      this.user = this.$route.params.user;
    }
  }
</script>

<style lang="scss" scoped>

  .header-box{
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
    }
  }
</style>
