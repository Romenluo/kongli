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
            <span><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>{{info.upVote}}
          </span>
            <span class="info-upVote-downVote">
              <span><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></span>{{info.downVote}}
          </span>
            <!--<span class="info-date"><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;&nbsp;{{info.infoDate}}</span>-->
          </div>
        </div>
        <!--评论区-->
        <div class="comment-box">
          <div class="writer-comment">
            <div class="submit-comment" v-if="loginMessage.cases==1">
              <el-input style="float: left"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入评论内容"
                        v-model="commentContent">
              </el-input>
              <el-button style="float: right;margin-top: 10px" type="primary">发表</el-button>
            </div>
            <span v-else><i class="el-icon-warning" aria-hidden="true"></i>&nbsp;&nbsp;你没有登录，登录后才能发表评论</span>
          </div>
          <!--评论显示区-->
          <div class="comment-show">
            <div>
              <div class="comment-content">

              </div>
            </div>
            <span><i class="el-icon-warning" aria-hidden="true"></i>&nbsp;&nbsp;暂无评论</span>
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
    name: "note-detail",
    data() {
      return {
        info: {},
        count:[],
        commentContent: ''
      }
    },
    methods: {
      getInfoData(item) {
        this.info = item
      }
    },
    mounted() {
      this.info = this.$route.params.ff
      this.count = this.$route.params.count

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
      .info-content{
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
            width: 400px;
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
      .comment-box{
        min-height: 200px;
        margin-top: 100px !important;
        /*background-color: #666666;*/
        .writer-comment{
          span{
            display: inline-block;
            width: 100%;
            margin: 20px auto;
            border: 1px solid #dedede;
            padding: 10px 0px;
            border-radius: 5px;
            text-align: center;
            font-size: 16px;
          }
          .submit-comment{
            width: 100%;
            margin: 20px auto;
            overflow: auto;
            /*border: 1px solid #dedede;*/

          }
        }
        .comment-show{
          width: 100%;
          min-height: 200px;
          border: 1px solid #dedede;
          border-radius: 5px;
          span{
            display: inline-block;
            width: 100%;
            margin: 20px auto;
            padding: 10px 0px;
            text-align: center;
            font-size: 16px;
          }
          .comment-content{
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
      border: 1px solid #e13d13;
      .info-nav{
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 0px 10px;
        overflow: hidden;
        font-size: 16px;
        &:hover{
          background-color: #666666;
          color: #2baee9;
          cursor: pointer;
        }
      }
    }
  }
</style>
