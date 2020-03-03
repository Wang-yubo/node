### 14 node核心模块6

##### 14.1 http模块

> http模块之基本状态类对象
>
> ![image-20200301164532353](..\images\image-20200301164532353.png)
>
> ![image-20200301164602355](..\images\image-20200301164602355.png)
>
> ![image-20200301164622839](..\images\image-20200301164622839.png)
>
> ![image-20200301164648041](..\images\image-20200301164648041.png)
>
> - `http.STATUS_CODES`是一个对象，属性名都是状态码，属性值则是该状态码的简短解释。
> - `http.METHODS`是一个数组,里面存储着所有支持的请求方法

##### 14.2 http模块之搭建基本服务器

> ![image-20200301171046189](..\images\image-20200301171046189.png)
>
> 上面代码第一行var http = require("http")，表示加载http模块。然后，调用http模块的createServer方法，创造一个服务器实例。
>
> - ceateServer方法接受一个函数作为参数，该函数的request参数是一个对象，表示客户端的HTTP请求；response参数也是一个对象，表示服务器端的HTTP回应。
> - response.writeHead方法用来写入HTTP回应的头信息；response.end方法用来写入HTTP回应的具体内容，以及回应完成后关闭本次对话。最后的listen(9527)表示启动服务器实例，监听本机的9527端口。
>
> 运行demo.js >>> 然后打开127.0.0.1:9527
>
> ![image-20200301171332783](..\images\image-20200301171332783.png)
>
> ![image-20200301171536854](..\images\image-20200301171536854.png)
>
> 具体实例 >>>
>
> demo.js
>
> ```js
> const http = require("http");
> const fs = require("fs");
> //* 请求必要的模块
> http.createServer(function(request, response) { //* 创建服务器,传入请求和响应两个形参
>     if (request.url === "/") { //* 如果请求的是根目录
>         //* 判断当前文件夹下有没有index.html文件,并且设置回调
>         fs.readFile(`${__dirname}/index.html`, function(err, data) {
>                 if (err) { //* 如果没有
>                     response.writeHead(404, { //* 发送给前端404页面 下面是返回404的一些设置
>                         "Content-type": "text/html"
>                     });
>                     response.write("file is not exsits");
>                     response.end();
>                 } else {
>                     response.writeHead(200, {
>                         "Content-type": "texthtml"
>                     });
>                     response.write(data);
>                     response.end();
>                 }
>             })
>             //* 如果请求的是以下这个路径
>     } else if (request.url === "/image/logo.png") {
>         fs.readFile(`${__dirname}/src/image/logo.png`, function(err, data) {
>             if (err) {
>                 response.writeHead(404, {
>                     "Content-type": "text/plain"
>                 });
>                 response.write("file is not find");
>                 response.end();
>             } else {
>                 response.writeHead(200, {
>                     "Content-type": "image/*"
>                 });
>                 response.write(data);
>                 response.end();
>             }
>         })
>     }
> }).listen(9527, "127.0.0.1")
> ```
>
> 
>
> 目录结构 :
>
> ![image-20200301195005123](..\images\image-20200301195005123.png)
>
> index页面的请求:
>
> ![image-20200301195046082](..\images\image-20200301195046082.png)
>
> 最终的效果 >>>
>
> ![image-20200301195116172](..\images\image-20200301195116172.png)
>
> `createServer`方法的回调函数的第一个参数是一个request对象，拥有以下属性。
>
> `url`：发出请求的网址。
>
> `method`：HTTP请求的方法。
>
> `headers`：HTTP请求的所有HTTP头信息。

##### 14.3 ajax

> `Asynchronous JavaScript and XML(ajax)`，意思就是用JavaScript执行异步网络请求。
>
> `ajax`的实现目的是为了能够做到局部更新网页的数据, 从而避免高频次的网页整体更新
>
> 
>
> `ajax`之构造函数`XMLHttpRequest()` >>>
>
> 在现代浏览器上写AJAX主要依靠XMLHttpRequest对象 , 该构造函数用于初始化一个 XMLHttpRequest 对象。在调用下列任何其他方法之前，必须先调用该构造函数，或通过其他方式间接得到一个 XMLHttpRequest 对象。
>
> ![image-20200301201546529](..\images\image-20200301201546529.png)
>
> ajax实例之open方法 >>>
>
> xhrReq.open(method, url, async?, user?, password?);
>
> - method : 要使用的HTTP方法，比如「GET」、「POST」、「PUT」、「DELETE」、等
> - url : 一个DOMString表示要向其发送请求的URL。
> - async 可选 : 一个可选的布尔参数，默认为true，表示要不要异步执行操作。如果值为false，send()方法直到收到答复前不会返回。如果true，已完成事务的通知可供事件监听器使用。如果multipart属性为true则这个必须为true，否则将引发异常。
> - user和password没人会把用户名和密码放在上面 , 要容易被别人截取了 , 所以这两个参数几乎不会被使用
>
> ajax实例之send方法 >>>
>
> XMLHttpRequest.send() 方法用于发送 HTTP 请求
>
> - 如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。
> - XMLHttpRequest.send() 方法接受一个可选的参数，其作为请求主体；如果请求方法是 GET 或者 HEAD，则应将请求主体设置为 null.
> - 如果没有使用 setRequestHeader() 方法设置 Accept 头部信息，则会发送带有 "* / *" 的Accept 头部。
>
> 发送的主体信息类型 :
>
> 1. XMLHttpRequest.send();
> 2. XMLHttpRequest.send(ArrayBuffer data);
> 3. XMLHttpRequest.send(ArrayBufferView data);
> 4. XMLHttpRequest.send(Blob data);//上传文件必备
> 5. XMLHttpRequest.send(Document data);
> 6. XMLHttpRequest.send(DOMString? data);
> 7. XMLHttpRequest.send(FormData data);
>
> ajax实例之setRequestHeader方法 >>>
>
> XMLHttpRequest.setRequestHeader() 是设置HTTP请求头部的方法。此方法必须在  open() 方法和 send()   之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
>
> ![image-20200301203951096](..\images\image-20200301203951096.png)
>
> 但是我们的http请求是一个异步的结果, 所以得使用事件监听和回调函数的方式来对得到的数据进行处理
>
> `ajax`实例之`onreadystatechange`和`readyState` >>>
>
> XMLHttpRequest.readyState 属性返回一个 XMLHttpRequest  代理当前所处的状态。一个 XHR 代理总是处于下列状态中的一个：
>
> | **值** | **状态**         | **描述**                                          |
> | ------ | ---------------- | ------------------------------------------------- |
> | 0      | UNSENT           | 代理被创建，但尚未调用 open() 方法。              |
> | 1      | OPENED           | open() 方法已经被调用。                           |
> | 2      | HEADERS_RECEIVED | send() 方法已经被调用，并且头部和状态已经可获得。 |
> | 3      | LOADING          | 下载中； responseText 属性已经包含部分数据。      |
> | 4      | DONE             | 下载操作已完成。                                  |
>
> - 这个状态码可不是http协议的状态码 , 它是反映ajax状态的状态码
> - 只要 readyState 属性发生变化，就会调用相应的处理函数。这个回调函数会被用户线程所调用。
> - XMLHttpRequest.onreadystatechange 会在 XMLHttpRequest 的readyState 属性发生改变时触发 readystatechange 事件的时候被调用。
>
> 实例 >>>
>
> ![image-20200302155034001](..\images\image-20200302155034001.png)
>
> ![image-20200302155128761](..\images\image-20200302155128761.png)
>
> 网页效果 >>>
>
> ![image-20200302155245222](..\images\image-20200302155245222.png)
>
> ajax实例之响应报文的基本数据 :
>
> 1. XMLHttpRequest.response >>> 返回一个 ArrayBuffer、Blob、Document，或 DOMString，具体是哪种类型取决于 XMLHttpRequest.responseType 的值。其中包含整个响应体（response body）。
> 2. XMLHttpRequest.responseText >>> 返回一个 DOMString，该 DOMString 包含对请求的响应，如果请求未成功或尚未发送，则返回 null。
> 3. XMLHttpRequest.status >>> 返回了XMLHttpRequest 响应报名的数字状态码
> 4. XMLHttpRequest.responseType >>> 一个用于定义响应类型的枚举值（enumerated value）。
> 5. XMLHttpRequest.responseURL >>> 只读返回响应的序列化（serialized）URL，如果该 URL 为空，则返回空字符串。
> 6. XMLHttpRequest.responseXML 只读 >>> 返回一个 Document，其中包含该请求的响应，如果请求未成功、尚未发送或时不能被解析为 XML 或 HTML，则返回 null。
> 7. XMLHttpRequest.statusText >>> 只读返回一个 DOMString，其中包含 HTTP 服务器返回的响应状态。与 XMLHTTPRequest.status 不同的是，它包含完整的响应状态文本（例如，"200 OK"）。

