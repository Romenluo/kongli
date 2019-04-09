<template>
  <div class="info">
    <!--实时资讯详情页，显示实时资讯的内容。根据点击传过来的id进行查询，然后通过此页面渲染出来-->
    <div class="info-main">
      <div class="main">
        <div class="info-content">
          <div class="info-title">
            {{info.title}}
          </div>
          <div v-html="info.content" class="content">
          </div>
          <div class="info-foot">
          <span class="info-upVote-downVote">
            <span @click="goUpVote('upVote')"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>{{upVote}}
          </span>
            <span class="info-upVote-downVote">
              <span @click="goUpVote('downVote')"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></span>{{downVote}}
          </span>
            <span class="info-date"><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;&nbsp;{{info.infoDate|dateFilter}}</span>
          </div>
        </div>
      </div>
      <div class="right-info">
        <div class="info-nav" v-for="item in count" :key="item.id" @click="getInfoData(item)">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "info-detail",
    data() {
      return {
        info: {},
        count: [],
        commentContent: '',
        upVote: 0,
        downVote: 0
      }
    },
    methods: {
      getInfoData(item) {
        this.info = item
      },
      //点赞
      goUpVote(val) {
        if (val == 'downVote') {
          this.downVote = this.downVote + 1
        } else {
          this.upVote = this.upVote + 1
        }
        let params = {
          id: this.info.id,
          upVote: this.upVote,
          downVote: this.downVote
        }
        let self = this
        this.$axios.post('/local/user/upVote', params).then(function (response) {
          self.upVote = response.data.upVote
          self.downVote = response.data.downVote
          console.log(response)
        }).catch(function (error) {
          self.$Message.error('服务器异常')
        });
      },
      //反对
      goDownVote() {

      }
    },
    filters: {
      dateFilter: function (value) {
        if (!value) return ''
        return value.toString().split("T")[0]
      }
    },
    mounted() {
      this.info = this.$route.params.ff
      this.count = this.$route.params.count
      this.upVote = this.info.upVote
      this.downVote = this.info.downVote
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

  .info {
    background-color: #f8f8f8;
    overflow: auto;
  }

  .info-main {
    overflow: auto;
    width: 90%;
    min-height: 500px;
    margin: 20px auto;
    .main {
      float: left;
      width: 78%;
      .info-content {
        border: 1px solid #dedede;
        border-radius: 5px;
        .info-title {
          margin-top: 20px;
          height: 50px;
          line-height: 50px;
          font-size: 22px;
          text-align: center;
        }
        .content {
          min-height: 300px;
          padding: 10px;
        }
        .info-foot {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          .info-date {
            float: right;
            display: inline-block;
            width: 200px;
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
      /**
  评论样式
   */
      .comment-box {
        min-height: 200px;
        margin-top: 100px !important;
        /*background-color: #666666;*/
        .writer-comment {
          span {
            display: inline-block;
            width: 100%;
            margin: 20px auto;
            border: 1px solid #dedede;
            padding: 10px 0px;
            border-radius: 5px;
            text-align: center;
            font-size: 16px;
          }
          .submit-comment {
            width: 100%;
            margin: 20px auto;
            overflow: auto;
            /*border: 1px solid #dedede;*/

          }
        }
        .comment-show {
          width: 100%;
          min-height: 200px;
          border: 1px solid #dedede;
          border-radius: 5px;
          span {
            display: inline-block;
            width: 100%;
            margin: 20px auto;
            padding: 10px 0px;
            text-align: center;
            font-size: 16px;
          }
          .comment-content {
            min-height: 100px;
            width: 95%;
            margin: 5px auto;
            background-color: #2baee9;
          }
        }
      }
    }
    .right-info {
      float: right;
      width: 20%;
      min-height: 200px;
      border-radius: 5px;
      border: 1px solid #dedede;
      .info-nav {
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 0px 10px;
        overflow: hidden;
        font-size: 16px;
        &:hover {
          background-color: #666666;
          color: #2baee9;
          cursor: pointer;
        }
      }
    }
  }
</style>
