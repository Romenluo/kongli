<template>
  <div>
    <!--<button @click="firstRequest">获取请求</button>-->
    <!---->
    <div v-if="loginMessage.cases=='1'">
      <div v-if="loginMessage.user.role.id=='1'"><manager-user></manager-user></div>
      <div v-else><common-user></common-user></div>
    </div>
    <div v-else>没有登录</div>
  </div>
</template>

<script>
  import CommonUser from './common-user'
  import ManagerUser from './manager-user'
  export default {
    name: "personal",
    components:{
      CommonUser,
      ManagerUser
    },
    data(){
      return {
      }
    },
    methods: {
      firstRequest(){
        this.$axios.post('/local/contoner/signIn').then(function (response) {
          // console.log(response)
        }).catch(function (error) {

          // console.log(error)
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

<style scoped>

</style>
