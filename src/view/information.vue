<template>
  <div class="box">
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
    <div class="information-box">
      <div class='title'>实时资讯</div>
      <div v-if="info.length==0" class="no-data">暂时没有数据</div>
      <div v-else class="information-content">
        <!--此处为循环显示-->
        <div v-for="item in info" :key="item.id" class="content">
          <div class="content-title">{{item.title}}</div>
          <div class="content-text" v-html="item.content" @click="goInfoDetail(item)"></div>
          <div class="content-foot">
            <span class="info-upVote-downVote">
              <span><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>{{item.upVote}}
            </span>
            <span class="info-upVote-downVote">
              <span><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></span>{{item.downVote}}
            </span>
            <span class="info-date"><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;&nbsp;{{item.infoDate.split("T")[0]}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "information",
    data() {
      return {
        info: [],
        infoLength: 0
      }
    },
    methods: {
      getInfo() {
        let self = this
        this.$axios.post('/local/manager/findAllInfo').then(function (response) {
          self.info = response.data
          self.infoLength = response.data.length
        }).catch(function (error) {
          self.$Message.error('服务器异常')
        });
      },
      /**
       * 跳转到详情页
       */
      goInfoDetail(item) {
        let params={
          name:"InfoDetail",
          params:{
            ff:item,
            count: this.info
          }
        };
        this.$router.push(params);
      }

    },
    created() {
      this.getInfo()
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    background-color: #f8f8f8;
  }

  .image-item {
    width: 100%;
    height: 350px;
  }

  .information-box {
    width: 90%;
    min-height: 500px;
    margin: 0px auto;
    background-color: #fff;
    .no-data {
      width: 100%;
      height: 200px;
      line-height: 200px;
      border: 1px solid #2baee9;
      /*background-color: #f8f8f8;*/
      text-align: center;
      font-size: 18px;
      border-radius: 5px;
    }
    .title {
      width: 150px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      text-align: center;
      margin: 10px auto;
      border: 1px solid #dedede;
      border-radius: 5px;
      box-shadow: 0px 0px 3px 3px #dedede;
    }
    .information-content {
      width: 98%;
      height: 100%;
      margin: 10px auto;
      /*background-color: #f8f8f8;*/
      .content {
        width: 100%;
        height: 250px;
        margin-top: 20px;
        background-color: #f8f8f8;
        .content-title {
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          background-color: #e6e6e6;
          padding-left: 20px;
          &:hover {
            color: dodgerblue;
          }
        }
        .content-text {
          height: 170px;
          overflow: hidden;
          padding-left: 25px;
          font-size: 14px;
          /*background-color: #666666;*/
        }
        .content-foot {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          background-color: #f8f8f8;
          .info-date {
            float: right;
            display: inline-block;
            width: 150px;
            height: 100%;
          }
          .info-upVote-downVote {
            float: right;
            width: 80px;
            height: 100%;
            span {
              display: inline-block;
              width: 30px;
              height: 30px;
              text-align: center;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
</style>
