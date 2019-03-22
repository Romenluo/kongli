<template>
  <div>
    <!--<button @click="firstRequest">获取请求</button>-->
    <!--<common-user></common-user>-->
    <manager-user></manager-user>
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
    methods: {
      firstRequest(){
        this.$axios.post('/local/contoner/signIn').then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.log('请求失败')
          console.log(error)
        });
      }
    }
  }
</script>

<style scoped>

</style>
