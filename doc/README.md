
### 使用的知识点

>1. 使用element UI做前端UI界面
>2. 使用spring boot做后台框架
>3. 前端使用vue.js，后端使用Java
>4. 前端使用到的只是有javaScript、HTML、sass、vuejs、vue-cli。后端使用到的语言Java、sql,使用到的
框架有spring boot、mybatis。

### 前后端分离开发

* 传统的web开发模式，后端一定程度上依赖与前端页面的开发，而前端一定程度的依赖后端的数据接口的开发。
整个开发过程中部分阶段处于串行状态。就是前端和后端处于同一项目下。而前后端分离的核心思路就是打破这种串行，
使得前端与后端能够并行开发，将前端和后端分离，是前端单独使用一个项目目录，并基于nodejs开启一个服务，开发时可以单独运行。
后端将前端分离出来，不依赖于前端界面，只要编写好前端请求接口就可以，无需前端页面。前端与后端通过接口进行交互，其他代码
互不干预。前端页面数据获取是前端发送一个请求到后端，后端返回数据，前端接收到数据后对数据进行渲染，显示在页面上。
* 此项目中异步请求数据通过axios向后后端发送请求。如向后端发送一个请求,获取所有的实时资讯
```javascript
        this.$axios.post('/local/manager/findAllInfo').then(function (response) {
          self.info = response.data
          self.infoLength = response.data.length
        }).catch(function (error) {
          self.$Message.error('服务器异常')
        });
```
以上代码中“/local/manager/findAllInfo”是请求后端的接口，response是后端返回的数据。后端在kong项目中web文件下的Manager.java
中有此段代码
```
     /**
     * 获取所有的实时资讯
     *
     * @return
     */
    public @RequestMapping("findAllInfo")
    List<Information> findAllInfo() {
        List<Information> list;
        try {
            list = infoService.findAll();
            return list;
        } catch (Exception e) {
            return null;
        }
    }

```
此段代码就是后端从数据库中获取所有的实时资讯,此时前后端接口已经打通。

### 前端项目

* 前端项目是使用vue-cli脚手架，创建前端项目

>1. 创建一个vue项目需要nodejs，首先安装nodejs.
>2. 安装vue-cli脚手架 npm install -g vue-cli
>3. 选定一个目录，使用cmd输入指令 vue init webpack kongli,一路回车下载vue-cli脚手架，等待完成下载就创建好kongli项目。
>4. 最后在kongli目录下使用cmd调出命令窗口，下载依赖包npm i 。然后输入 npm run dev 就可以运行项目

* 前后分离开发需要解决vue-cli跨域问题如下：

![vue-cli跨域问题](./image/cli.png)

