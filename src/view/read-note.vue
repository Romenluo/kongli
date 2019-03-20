<template>
  <div class="read-root">
    <div class="read-note-title">我的日志</div>
    <div class="read-box">
      <Row>
        <Col span="20">
          <div class="read-left">

          </div>
        </Col>
        <Col span="4">
          <div class="read-right">

          </div>
        </Col>
      </Row>
    </div>

  </div>
</template>

<script>
    export default {
        name: "read-note"
    }
</script>

<style lang="scss" scoped>
  .read-root{
    width: 100%;
    .read-note-title{
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 25px;
      color: #dedede;
      font-family: 华文行楷;
      background-color: #666666;
    }
    .read-box{
      width: 95%;
      margin: 0px auto;
      background-color: #666666;
      .read-left{
        height: 400px;
        width: 100%;
        background-color: dodgerblue;
      }
      .read-right{
        width: 100%;
        height: 300px;
        background-color: #8ce6b0;

      }
    }
  }
</style>
