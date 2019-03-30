<template>
  <div class="home-show-root">
    <!--首页显示内容-->
    <!--轮播图-->
    <Carousel autoplay
              :autoplay-speed="3000">
      <Carousel-item>
        <div class="image-item">
          <img src="../assets/images/home/photo1.jpg"/>
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="image-item">
          <img src="../assets/images/home/photo2.jpg"/>
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="image-item">
          <img src="../assets/images/home/photo3..jpg"/>
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="image-item">
          <img src="../assets/images/home/photo4..jpg"/>
        </div>
      </Carousel-item>
    </Carousel>
    <div class="intro">
      <div class="intro-content">
        <!---->
        <div class="intro-content-text">
          <div class="content-text">
            <div class="content-title-text">简介</div>
            <div class="content-text-child">
              <span>普安如茶。</span>
              <span>茶，通天地，茶，连内外，茶，品普安，</span>
              <span>茶，就是普安最初的滋味，</span>
              <span>山在水中，水绕山走，恰如一杯茶，守静得欢，杯盏之中装着世界，</span>
              <span>这是普安的境界。</span>
              <span>纷繁至简，回归初心，你会发现，你想要的，一直在这里。</span>
              <span>踏歌山水，一品普安，在这里，找寻最本真的快乐，在自然的放逐中享受生命的纯净。</span>
              <span>奇行圣境，茶源普安。</span>
            </div>
          </div>
          <div class="image-box">
            <img src="../assets/images/home.jpg"/>
          </div>

        </div>
      </div>
      <div class="intro-video">
        <div class="intro-title">宣传片</div>
        <div class="video-box">
          <video src="../assets/images/voide.mp4" width="100%" height="500px" controls="controls"></video>
        </div>
      </div>
      <div class="welcome">
        <p>Puan welcome you.</p>
        <span @click="moreBtn">了解更多</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "show",
    methods:{
      moreBtn(){
        this.$router.replace({path: '/pull'});
      }
    }
  }
</script>

<style lang="scss" scoped>
.image-item{
  width: 100%;
  height: 350px;
}
  .intro{
    width: 95%;
    height: auto;
    margin: 10px auto;
    .intro-content{
      width: 100%;
      height: 600px;
      /*简介内容样式*/
      .intro-content-text{
        width: 100%;
        height: 100%;
        .image-box{
          width: 70%;
          height: auto;
          margin-left: 5px;
          position: relative;
          top: -430px;
          img{
            width: 100%;
            border: 1px solid #dedede;
            box-shadow: 0px 0px 3px 4px #dedede;
          }
        }
        .content-text{
          width: 32%;
          height: 530px;
          position: relative;
          left: 67%;
          top: 8px;
          border: 1px solid #dedede;
          box-shadow: 0px 0px 3px 4px #dedede;
          .content-title-text{
            width: 100%;
            height: 40px;
            font-size: 18px;
            text-align: center;
            line-height: 40px;
          }
          .content-text-child{
            width: 80%;
            height: auto;
            position: relative;
            left: 15%;
            top: 5%;
            font-size: 16px;
            span{
              display: block;
              line-height: 40px;
              text-align: center;
            }

          }
        }
      }
    }
    .intro-video{
      width: 100%;
      height: 550px;
      .intro-title{
        width: 100%;
        height: 50px;
        font-size: 22px;
        text-align: center;
        line-height: 50px;
      }
      .video-box{
        width: 100%;
        height: 500px;
        background-color: #444444;
      }
    }
    .welcome{
      width: 100%;
      height: 200px;
      p{
        font-size: 25px;
        line-height: 100px;
        text-align: center;
      }
      span{
        display: inline-block;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
        width: 100%;
        height: 100px;
        &:hover{
          color: dodgerblue;
          cursor: pointer;
        }
      }
    }
  }
</style>
