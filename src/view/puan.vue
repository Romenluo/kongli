<template>
  <div>
    <Carousel autoplay
              :autoplay-speed="3000">
      <Carousel-item>
        <div class="image-item">
          <img src="../assets/images/home/home1.jpg"/>
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="image-item">
          <img src="../assets/images/home/home2.png"/>
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="image-item">
          <img src="../assets/images/home/home3.jpg"/>
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="image-item">
          <img src="../assets/images/home/home4.jpg"/>
        </div>
      </Carousel-item>
    </Carousel>
    <div class="pull-main">
      <div class="nav-title"></div>
      <Tabs type="card" @click="clickNav(val)">
        <Tab-pane v-for="item in category" :label="item.name" :key="item.id">
          <div class="card-box" >
            <div class="tab-box" v-for="ite in content">
              {{item.name}}-->{{ite}}
            </div>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "puan",
    data () {
      return {
        category: [
          {
            id:1,
            name: '旅游景点'
          },
          {
            id:2,
            name: '风味小吃'
          },
          {
            id:3,
            name: '民族风情'
          },
          {
            id:4,
            name: '历史文化'
          },
          {
            id:5,
            name: '古茶产品'
          },
          {
            id:6,
            name: '古茶文化'
          },
          {
            id:7,
            name: '本地特产'
          }
        ],
        content:[1,2,3,4]
      }
    },
    methods: {
      clickNav(val){
        console.log(val)
      }
    }
  }
</script>

<style lang="scss" scoped>
.image-item{
  width: 100%;
  height: 350px;
}
  .pull-main{
    width: 90%;
    height: auto;
    margin: 10px auto;
    background-color: #f0faff;
    .nav-title{
      width: 100%;
      height: 30px;
      background-color: #eb2f96;
    }
    .card-box{
      display: flex;
      width: 100%;
      height: 500px;
      .tab-box{
        width: 23%;
        height: 250px;
        margin: 0px 1%;
        background-color: #4d5669;
      }
    }
  }
</style>
