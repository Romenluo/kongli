<template>
  <div class="puan-box">
    <Carousel autoplay
              :autoplay-speed="3000">
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
    </Carousel>
    <div class="pull-main">
      <div class="nav-title"></div>
      <Tabs type="card" @on-click="clickNav">
        <Tab-pane v-for="item in category" :label="item.name" :key="item.id">
          <div class="card-box">
            <div class="no-note" v-if="notes.length==0">暂无数据</div>
            <div class="tab-box" @click="goInfoDetail(ite,item)" v-for="ite in notes.slice((currentPage-1)*pageSize,currentPage*pageSize)">
              <div class="tab-image"><img :src="local+ite.photos.imageUrl"/></div>
              <div class="note-title">{{ite.title}}</div>
            </div>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
    <div v-show="notes.length>0" class="pagination">
      <el-pagination background :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next,jumper"
                     :total="notes.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "puan",
    data() {
      return {
        category: [],
        title: '景点标题',
        notes: [],
        local: 'http://localhost:8080/image/',
        pageSize: 8,
        currentPage: 1
      }
    },
    methods: {
      clickNav(val) {
        this.getNote(this.category[val].id)
        // onsole.log(val)
      },
      /*获取所有的分类*/
      getCategory(){
        let self = this
        this.$axios.post('/local/manager/findAllCategory').then(function (response) {
          self.category = response.data.categoryList;
        }).catch(function (error) {
          self.$Message.error('服务器异常');
        });
      },
      /**
       * 根据分类id查询数据
       */
      getNote(id){
        let self = this
        let params = {
          id:id
        }
        this.$axios.post('/local/app/getNote',params).then(function (response) {
          self.notes =  response.data
        }).catch(function (error) {
          self.$Message.error('服务器异常');
        });
      },
      /**
       * 跳转到详情页
       */
      goInfoDetail(item,category) {
        let params={
          name:"NoteDetail",
          params:{
            ff:item,
            category: category,
            count:this.notes
          }
        };
        this.$router.push(params);
      }
    },
    created(){
      this.getCategory()
      this.getNote(1)
    }
  }
</script>

<style lang="scss" scoped>
  .puan-box {
    background-color: #f8f8f8;
  }

  .image-item {
    width: 100%;
    height: 350px;
  }

  .pull-main {
    width: 90%;
    height: auto;
    margin: 5px auto;
    background-color: #fff;
    .nav-title {
      width: 100%;
      height: 30px;
      /*background-color: #eb2f96;*/
    }
    .card-box {
      display: flex;
      width: 100%;
      min-height: 500px;
      flex-wrap: wrap;
      .tab-box {
        width: 23%;
        height: 200px;
        margin: 7px 1%;
        /*background-color: #4d5669;*/
        border: 2px solid #dedede;
        border-radius: 3px;
        &:hover{
          border: 2px solid #2baee9;
          color: #2baee9;
          cursor: pointer;
        }
        .tab-image{
          width: 100%;
          height: 160px;
          background-color: #2baee9;
          img{
            width: 100%;
            height: 160px;
          }
        }
        .note-title{
          width: 100%;
          height: 38px;
          line-height: 38px;
          text-align: center;
          font-size: 16px;
        }
      }
      .no-note{
        width: 100%;
        height: 200px;
        font-size: 18px;
        color: #666666;
        text-align: center;
        line-height: 200px;
      }
    }
  }
  .pagination{
    width: 50%;
    margin: 40px auto;
  }
</style>
