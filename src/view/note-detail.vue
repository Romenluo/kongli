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
            <span @click="noteVote('upVote')"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>{{info.upVote}}
          </span>
            <span class="info-upVote-downVote">
              <span @click="noteVote('downVote')"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></span>{{info.downVote}}
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
                        :rows="4"
                        placeholder="请输入评论内容"
                        v-model="commentContent">
              </el-input>
              <el-button style="float: right;margin-top: 10px" @click="saveComment" type="primary">发表</el-button>
            </div>
            <span v-else><i class="el-icon-warning" aria-hidden="true"></i>&nbsp;&nbsp;你没有登录，登录后才能发表评论</span>
          </div>
          <!--评论显示区-->
          <div class="comment-show">
            <span v-if="comment.length==0"><i class="el-icon-warning" aria-hidden="true"></i>&nbsp;&nbsp;暂无评论</span>
            <div>
              <div v-for="(item,index) in comment" :key="item.id" class="comment-content">
                <div class="comment-title">{{item.user.petName}}</div>
                <div class="comment-content-text">{{item.content}}</div>

                <div class="comment-foot">
                  <div class="comment-upVote-downVote">
                      <div @click="goUpVote(index,'upVote')"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></div>{{item.upVote}}
                  </div>
                  <div class="comment-upVote-downVote">
                      <div @click="goUpVote(index,'downVote')"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></div>{{item.downVote}}
                  </div>
                  <div class="comment-date"><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;{{item.commentDate|dateFilter}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-info">
        <!--<button @click="test">测试</button>-->
        <div class="tuijian">{{category.name}}相关推荐</div>
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
        count: [],
        commentContent: '',
        category: '',
        comment: []

      }
    },
    methods: {
      test() {
        console.log(this.info)
      },
      getInfoData(item) {
        this.info = item
        this.comment = item.commentList
      },
      /**
       * 发表评论
       */
      saveComment() {
        let params = {
          content: this.commentContent,
          userId: this.loginMessage.user.id,
          noteId: this.info.id
        }
        let self = this
        this.$axios.post('/local/app/saveComment', params).then(function (response) {
          //self.category = response.data.categoryList;
          console.log(response)
          let data = response.data
          if (data.cases == '1') {
            self.$Message.success(data.msg);
          } else {
            self.$Message.error(data.msg);
          }
        }).catch(function (error) {
          console.log(error)
          self.$Message.error('服务器异常');
        });
      },
      /**
       * 文章点赞
       * */
      noteVote(val){
        if (val == 'downVote') {
          this.info.downVote = this.info.downVote + 1
        } else {
          this.info.upVote = this.info.upVote + 1
        }
        let params = {
          id: this.info.id,
          upVote: this.info.upVote,
          downVote: this.info.downVote
        }
        let self = this
        this.$axios.post('/local/app/noteUpVote', params).then(function (response) {
          /*self.upVote = response.data.upVote
          self.downVote = response.data.downVote*/
          console.log(response)
        }).catch(function (error) {
          self.$Message.error('服务器异常')
        });
      },
      /**
       * 评论点赞
       */
      goUpVote(index,val){
        if (val == 'downVote') {
          this.comment[index].downVote = this.comment[index].downVote + 1
        } else {
          this.comment[index].upVote = this.comment[index].upVote + 1
        }
        let params = {
          id: this.comment[index].id,
          upVote: this.comment[index].upVote,
          downVote: this.comment[index].downVote
        }
        let self = this
        this.$axios.post('/local/app/commentUpVote', params).then(function (response) {
          /*self.upVote = response.data.upVote
          self.downVote = response.data.downVote*/
          console.log(response)
        }).catch(function (error) {
          self.$Message.error('服务器异常')
        });

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
      this.category = this.$route.params.category
      this.comment = this.info.commentList
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
            min-height: 150px;
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
            /*background-color: #2baee9;*/
            border-bottom: 1px solid #dedede;
            .comment-title{
              height: 30px;
              font-size: 14px;
              line-height: 30px;
              color: #e95864;
            }
            .comment-content-text{
              min-height: 40px;
              font-size: 14px;
              margin-top: 5px;
              padding: 0px 5px;
            }
            .comment-foot {
              /*background-color: #666666;*/
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              .comment-upVote-downVote{
                display: inline-block;
                float: right;
                width: 80px;
                height: 100%;
                div{
                  display: inline-block;
                  text-align: center;
                  width: 30px;
                  height: 100%;
                  /*background-color: #e9b1ad;*/
                  &:hover{
                    cursor: pointer;
                    color: #2baee9;
                  }
                }
              }
              .comment-date{
                display: inline-block;
                width: 200px;
                float: right;
              }
            }
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
      .tuijian {
        width: 90%;
        height: 45px;
        font-size: 16px;
        line-height: 45px;
        background-color: #dedede;
        text-align: center;
        border: 1px solid #dedede;
        border-radius: 5px;
        margin: 10px auto;
      }
    }
  }
</style>
