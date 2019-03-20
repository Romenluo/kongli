<template>
  <div>
    <Layout>
      <Header :style="{background:'#ffffff',height:'60px',background:'#dedede'}">
        <Row>
          <Col span="4">
            <div class="log-box">
              <img src="../assets/images/log.png"/>
            </div>
          </Col>
          <Col span="16" class="nav-box">
            <Menu mode="horizontal" :theme="theme1" active-name="home" @on-select="selectItem">
              <MenuItem name="home">
               首页
              </MenuItem>
              <MenuItem name="readNode">
                日志
              </MenuItem>
              <MenuItem name="writeNote">
                写日志
              </MenuItem>
            </Menu>
          </Col>
          <Col span="4">
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
          {{copyright}} 版权归Romen所有
        </div>
      </Footer>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        theme1: 'light',
        copyright: '\xA9',
        user: {},

      }
    },
    methods: {
      selectItem(name){
        console.log(name);
        if(name=='home'){
          this.$router.replace({path: '/show'});
        }
        if(name=='readNode'){
          this.$router.replace({path: '/readNote'});
        }
        if(name=='writeNote'){
          this.$router.replace({path: '/writeNote'});
        }
      },
    },
    mounted() {
      this.user = this.$route.params.user;
    }
  }
</script>

<style lang="scss" scoped>

  .ivu-menu{
    font-size: 16px;
    background-color: #dedede;
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
