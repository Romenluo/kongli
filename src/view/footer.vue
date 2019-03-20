<template>
    <div class="foot-root">
      <Row>
        <Col span="8" order="4">
          <div class="public-style">
            1
          </div>
        </Col>
        <Col span="8" order="3">
          <div class="public-style">
            2
          </div>
        </Col>
        <Col span="8" order="2">
          <div class="public-style">
            3
          </div>
        </Col>

      </Row>
    </div>
</template>

<script>
    export default {
        name: "footer"
    }
</script>

<style lang="scss" scoped>
  .foot-root{
    width: 100%;
    height: 100px;
    color: #e6e6e6;
    background-color: #4d5669;
  }
  .public-style{
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 20px;
  }
</style>
