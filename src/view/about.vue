<template>
  <div>
    <!--<van-uploader :after-read="onRead" accept="image/jpg, image/jpeg" multiple class="icon-add">
    </van-uploader>-->

    <!--<input type='file' accept="image/jpg, image/jpeg" multiple @change="onRead"/>-->
    <el-upload
      class="upload-file"
      drag
      action="/doUpload"
      :before-upload="beforeUpload"
      ref="newupload"
      multiple
      :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>
<script>
  export default {
    name: 'about',
    data() {
      return {
        modal1: false,
        img: []
      }
    },
    methods: {
      onRead(e) {
        e.preventDefault();
        //注意，我们这里没有使用form表单提交文件，所以需要用new FormData来进行提交
        let fd = new FormData();
        fd.append("upfile", e.file);//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file

        this.$axios.post('/local/upload/uploadImage', {params: fd}).then(res => {
        }).catch(err => {
        });
      }
    }
  }
</script>
