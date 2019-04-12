
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

* 此项目使用到了element ui组件库。
>1. 安装element ui 依赖包 npm i element-ui -S
>2. 在main.js文件中全局引入，然后就可以在项目中使用element ui组件库
```javascript
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  Vue.use(ElementUI)
```

### 后端项目
* 后端项目使用了spring boot 和 mybatis框架，spring boot主要是用来控制前端发送请求的，接收前端的数据，并返回
给前端。mybatis框架主要是数据层，用来操作数据库，对数据库进行操作。如连接数据库和数据库的曾改删除。
* 项目使用spring boot的快捷创建项目方法

进入此网站https://start.spring.io/创建spring boot项目
. 创建项目如图

![spring boot](./image/springboot.png)
使用idea打开下载好的文件，然后idea编辑器自动下载下载依赖jar包，打开KongApplication文件，点击右边的绿色进行运行
一个spring boot 项目就运行起来了
![运行spring boot ](./image/springRun.png)

* 
### 实现思想

#### 登录实现思想

* 首先前端页面进行数据填写，使用element ui 的form表单对数据进行检查是否为空或填写是否正确。获取填写的数据
用户名和密码，点击登录按钮时触发一个点击事件，把用户名和密码发送到后台，后台通过用户名（邮箱）查询是否存在，
如果存在就对比用户密码，密码需要使用md5加密后才能与数据库中查询出来的密码进行比较。如果密码正确返回登录成功和用户信息。
并将用户信息保存到session中。如果用户名不存在或密码比较错误，则返回状态码-1,表示登录失败。并且用户提示
登录的错误信息。登录后根据用户的角色的不同给角色一个权限，如管理员登录在个人中心可以管理后台数据，普通会员只能查看个人信息、
修改个人信息和修改密码。

#### 注册实现思想

* 注册前端使用element ui中的form实现对数据的校验，检查某些数据是否为空，邮箱格式是否符合。密码和确认密码是否相等，如果
数据校验不通过就不能注册。点击获取验证码时需要查看邮箱是否输入，如果符合规定就发送一个请求到后台，使用(int)(Math.random()*1000000)
生成六位随机数字，使用spring boot自带的SimpleMailMessage类给所填入的邮箱发送验证码邮件，并将邮件保存到session中，返回
“邮件发送成功提示”，点击注册时将页面所填入的信息发送到后台，首先对邮箱进行检测，使用邮箱对数据库进行查询，如果存在就返回用户已被注册
提示，如果用户不存在就从session中取出验证码进行校验对标，验证码正确就执行数据库保存数据操作，在保存呢数据库之前需要使用md5
对密码进行加密再存入数据。保存数据成功后将保存数据成功信息返回给前端页面，提示用户“注册成功”并跳转登录页面。



