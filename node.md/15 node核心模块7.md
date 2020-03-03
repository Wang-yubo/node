### 15 node核心模块7

##### 15.1 ajax

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
> ![image-20200301201546529](F:/前端开发/learn node.js/images/image-20200301201546529.png)
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
> ![image-20200301203951096](F:/前端开发/learn node.js/images/image-20200301203951096.png)
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
> ![image-20200302155034001](F:/前端开发/learn node.js/images/image-20200302155034001.png)
>
> ![image-20200302155128761](F:/前端开发/learn node.js/images/image-20200302155128761.png)
>
> 网页效果 >>>
>
> ![image-20200302155245222](F:/前端开发/learn node.js/images/image-20200302155245222.png)
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

##### 15.2 ajax实例之跨域请求

> - 默认情况下，JavaScript在发送AJAX请求时，URL的域名必须和当前页面完全一致。完全一致的意思是，域名要相同（`www.example.com`和example.com不同），协议要相同（http和https不同），端口号要相同（默认是:80端口，它和:8080就不同）。有的浏览器口子松一点，允许端口不同，大多数浏览器都会严格遵守这个限制。
> - 如果我们把node运行的js设置为127.0.0.2而网页则在127.0.0.1中打开, 此时两者就属于不同的域,那么这个请求,就是无效请求
>
> 
>
> ajax实例之跨域请求的实现方式之CORS >>>
>
> CORS全称Cross-Origin Resource Sharing
>
> ![image-20200302171643040](..\images\image-20200302171643040.png)
>
> - 假设本域是my.com，外域是sina.com，只要响应头Access-Control-Allow-Origin为http://my.com，或者是*，本次请求就可以成功。
> - 可见，跨域能否成功，取决于对方服务器是否愿意给你设置一个正确的Access-Control-Allow-Origin，决定权始终在对方手中。
> - 上面这种跨域请求，称之为“简单请求”。简单请求包括GET、HEAD和POST（POST的Content-Type类型 仅限application/x-www-form-urlencoded、multipart/form-data和text/plain），并且不能出现任何自定义头（例如，X-Custom: 12345）。
>
> 对于PUT、DELETE以及其他类型如application/json的POST请求，在发送AJAX请求之前，浏览器会先发送一个OPTIONS请求（称为preflighted请求）到这个URL上，询问目标服务器是否接受：
>
> ![image-20200303144638556](..\images\image-20200303144638556.png)
>
> ![image-20200303144653242](..\images\image-20200303144653242.png)
>
> 服务器必须响应并明确指出允许的Method：
>
> - 浏览器确认服务器响应的Access-Control-Allow-Methods头确实包含将要发送的AJAX请求的Method，才会继续发送AJAX，否则，抛出一个错误。
> - 由于以POST、PUT方式传送JSON格式的数据在REST中很常见，所以要跨域正确处理POST和PUT请求，服务器端必须正确响应OPTIONS请求。
>
> 
>
> ajax实例之跨域请求的实现方式之JSONP的实现思路 >>>
>
> JSONP的全称是JSON with Padding，由于同源策略的限制，XmlHttpRequest只允许请求当前源（协议，域名，端口）的资源。如果要进行跨域请求，我们可以通过使用html的script标记来进行跨域请求，并在相应中返回要执行的script代码( 因为外联的js文件地址没有同源的限制要求, 为了实现CDN )，其中可以直接使用JSON传递javascript对象。这种跨域的通讯方式成为JSONP。
>
> ![image-20200303144956194](..\images\image-20200303144956194.png)
>
> ajax实例之跨域请求的实现方式之JSONP >>>
>
> ![image-20200303161855547](..\images\image-20200303161855547.png)
>
> ![image-20200303161949204](..\images\image-20200303161949204.png)
>
> ![image-20200303162013669](..\images\image-20200303162013669.png)
>
> ![image-20200303162107188](..\images\image-20200303162107188.png)

