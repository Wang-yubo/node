### 20 express1

##### 20.1 express基本介绍

> Express.js或简称Express，是针对Node.js的web应用框架,主要是帮助我们简化各种web服务的实现方式
>
> 安装指令 >>>
>
> ```nginx
> λ cnpm install express --save
> ```
>
> 引入 >>>
>
> ![image-20200309180752786](..\images\image-20200309180752786.png)
>
> ![image-20200309180725127](..\images\image-20200309180725127.png)
>
> express返回的是一个函数, 我们需要通过执行这个函数来得到一个express实例 >>>
>
> ```js
> let app = express();
> ```

##### 20.2 express的基本服务搭建

> 采取原生思路实现的服务器效果 , 手动配置路由 >>>
>
> ```js
> const express = require("express");
> const fs = require("fs");
> 
> let app = express();
> app.get("/", function(req, res) {
>     fs.readFile(`${__dirname}/src/index.html`, "utf8", function(err, data) {
>         if (err) throw err;
>         res.send(data)
>     })
> })
> 
> //* 监听8080端口,默认域名为localhost
> app.listen(8080);
> ```
>
> 开启服务 >>>
>
> ![image-20200309200539742](..\images\image-20200309200539742.png)
>
> 打开本地服务器的8080端口 >>>
>
> ![image-20200309200621695](..\images\image-20200309200621695.png)
>
> 
>
> 采用express思路实现的服务器效果 , 全自动配置的静态资源服务器 >>>
>
> ```js
> const express = require("express");
> const fs = require("fs");
> 
> let app = express();
> app.use(express.static(`${__dirname}/src`))
> 
> //* 监听8080端口,默认域名为localhost
> app.listen(8080);
> ```
>
> html部分 >>>
>
> ![image-20200309201802274](..\images\image-20200309201802274.png)
>
> 重启服务后 , 打开本地服务器的8080端口 >>>
>
> ![image-20200309201845486](..\images\image-20200309201845486.png)

##### 22.3 中间件的概念

> 中间件的工作就是在特定的工作在执行之前, 提前先做一些基本处理
>
> - 比如在发送数据前做一些基本配置
> - 比如在处理数据前做一些格式化数据的工作等等
>
> ![image-20200309222114427](..\images\image-20200309222114427.png)
>
> ues中间件 >>>
>
> ![image-20200309222304773](..\images\image-20200309222304773.png)
>
> ![image-20200309222424335](..\images\image-20200309222424335.png)

##### 22.4 express的内容分类

> 总体而言,express的大类由这些部分组成的
>
> ![](..\images\express目录.png)