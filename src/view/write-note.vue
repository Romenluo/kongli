<template>
  <div class="read-root">
    <div class="read-note-title">写日志</div>
    <div class="read-box">
      <Row>
        <Col span="20">
          <div class="read-left">
            <Input v-model="value" placeholder="输入标题" style="width: 300px" />
          </div>
        </Col>
        <Col span="4">
          <div class="read-right">
            <div class="user-log">
              <img src="../assets/images/log-icon.png"/>
            </div>

          </div>
        </Col>
      </Row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "write-note"
  }
</script>

<style lang="scss" scoped>
  .read-root {
    width: 100%;
    .read-note-title {
      margin-top: 20px;
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 25px;
      color: #000;
      font-family: 华文行楷;
     /* background-color: #666666;*/
    }
    .read-box {
      width: 95%;
      margin: 20px auto;
      /*background-color: #666666;*/
      .read-left {
        height: 400px;
        width: 100%;
        background-color: dodgerblue;
      }
      .read-right {
        width: 100%;
        height: 200px;
        border: 1px solid #dedede;
       /* background-color: #8ce6b0;*/
        overflow: hidden;
        .user-log{
          width: 80px;
          height: 80px;
          margin: 20px auto;
          img{
            display: block;
            width: 70px;
            height: 70px;
            margin: 0px auto;
          }
        }

      }
    }
  }
</style>
