### 16 node核心模块8

##### 16.1 http模块补充

> http模块之服务器处理POST请求 >>>
>
> 当客户端采用POST方法发送数据时，服务器端可以对data和end两个事件，设立监听函数。
>
> ![image-20200303164956436](..\images\image-20200303164956436.png)
>
> data事件会在数据接收过程中，每收到一段数据就触发一次，接收到的数据被传入回调函数。end事件则是在所有数据接收完成后触发。
>
> 
>
> http模块之服务器端发送请求 >>>
>
> ![image-20200303165633288](..\images\image-20200303165633288.png)
>
> get方法用于发出get请求。
>
> ```js
> http.request(options[,callback])
> ```
>
> request方法的options参数，可以是一个对象，也可以是一个字符串。如果是字符串，就表示这是一个URL，Node内部就会自动调用url.parse()，处理这个参数。
>
> options对象可以设置如下属性 , 更加详细的request指令
>
> ![image-20200303165802173](..\images\image-20200303165802173.png)
>
> 
>
> http模块之启动服务器的listen >>>
>
> listen方法用于启动服务器，它可以接受多种参数。
>
> ```js
> // 端口
> server.listen(8000);
> 
> //端口,主机
> server.listen(8000,"www.wyb.plus")
> 
> //对象
> server.listen({
>     port:8000,
>     host:"www.wyb.plus"
> })
> ```

##### 16.2 fs模块补充

> 删除文件和删除目录 >>>
>
> 删除文件夹: rmdir(path,callback)
>
> 删除文件: unlink(path,callback)
>
> ![image-20200303173955325](..\images\image-20200303173955325.png)
>
> ![image-20200303174013201](..\images\image-20200303174013201.png)
>
> 注意 >>> 删除文件和删除目录不是依赖于名称,而是内容的类型, 即便给文件夹设置一个文件的名称, 给文件设置文件夹的名称也是没有用的 , 也就是说用unlink只能删除文件 , rmdir只能删除文件夹, 不能混着用
>
> 
>
> 移动文件/重命名 >>>
>
> - 重命名和移动文件所使用的方法都是rename
> - fs.rename(path1,path2,callback);
> - 如果path1和path2在同一路径下,只是文件名不同,那么就相当于改名
> - 如果path1和path2不在同一路径下,那么就是文件移动(还可以一边移动一边改名)
>   文件夹的操作同文件一样
>
> ![image-20200303201447441](..\images\image-20200303201447441.png)
>
> ![image-20200303201512088](..\images\image-20200303201512088.png)
>
> 