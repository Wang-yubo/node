### 21 express2

##### 21.1 application

> application就是通过调用Express模块导出的顶层的express()方法来创建的一个值,该值一般用变量app表示
>
> ![image-20200309225830204](..\images\image-20200309225830204.png)
>
> app是express功能的主要入口
>
> 路由表示应用程序端点 (URI) 的定义以及端点响应客户机请求的方式
>
> ![image-20200309230146140](..\images\image-20200309230146140.png)

##### 21.2 Application的Properties部分之app.METHOD()

> app.METHOD(path, callback [, callback ...])
>
> ![image-20200309231023128](..\images\image-20200309231023128.png)
>
> 我们使用app.get/post/put等等方式,可以为服务器所接收到的各种请求实现不同的业务处理
>
> app.get >>>
>
> app.get(path, callback [, callback ...])
>
> - 绝大多数请求的方法都支持多个回调函数,这个回调函数会依次执行
> - 如果想要一次执行多个函数的话, 那么一定要注意里面回调函数的第三个参数:next
> - 必须在上一个函数里面的最后执行一次next(),这样才会触发下一个函数
>
> ```js
> const express = require("express");
> let app = express();
> app.get("/", function(req, res, next) {
>     console.log("主页1");
>     next()
> }, function(req, res) {
>     res.send("执行到底了")
> });
> app.listen(8080);
> ```
>
> ![image-20200309231850169](..\images\image-20200309231850169.png)
>
> 单路径可以配置多个路由,多个路由会按照顺序执行
>
>  但是!!!!!!
>
> 1. ​    一定要在前一个路由的里面加上一个next(),否则只会执行单个路由
> 2. ​    一定要在最后一个路由执行send否则会提前发出响应, 后面的路由就不会执行了
>
> 上一个路由不加next() , 导致页面一直卡在上一步 >>>
>
> ![image-20200309233214503](..\images\image-20200309233214503.png)
>
> ![image-20200309233235898](..\images\image-20200309233235898.png)
>
> 截胡 >>> 上一个路由用了send方法,后面的路由会执行,但是不会返回,没有意义
>
> ![image-20200309233436580](..\images\image-20200309233436580.png)
>
> ![image-20200309233401586](..\images\image-20200309233401586.png)

