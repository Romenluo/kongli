<template>
  <div class="home-show-root">
    <!--首页显示内容-->
    <!--轮播图-->
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
    <div class="intro">
      <div class="intro-content">
        <div class="intro-title">简介</div>
        <div class="intro-content-text">
          关于普安
        </div>
      </div>
      <div class="intro-video">
        <div class="intro-title">宣传片</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "show"
  }
</script>

<style lang="scss" scoped>
.image-item{
  width: 100%;
  height: 400px;
}
  .intro{
    width: 90%;
    height: auto;
    margin: 10px auto;
    .intro-content{
      width: 100%;
      background-color: dodgerblue;
      height: 200px;

      .intro-content-text{
        width: 100%;
        height: auto;
      }
    }
    .intro-title{
      width: 100%;
      height: 40px;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      background-color: #eb2f96;
    }
    .intro-video{
      width: 100%;
      height: 400px;
      background-color: #8ce6b0;
    }
  }
</style>
