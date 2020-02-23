### 05 node的核心模块2

##### 5.1 URL模块

> url模块用于生成的解析URL , 该模块使用前必须加载
>
> ![image-20200221211930845](..\images\image-20200221211930845.png)
>
> ![image-20200221212011435](..\images\image-20200221212011435.png)
>
> url模块提供了两套API来处理URL >>>
>
> - 一个是旧版本遗留的API , 一个是实现了WHATWG标准的新API
> - 旧API就是`url.parse`里面的部分 , 新API就是URL里面的部分
> - 建议只使用新API
>
> ![image-20200221212630975](..\images\image-20200221212630975.png)
>
> ![image-20200221212613912](..\images\image-20200221212613912.png)
>
> URL解析 >>>
>
> - input <string> 要解析的绝对或相对的 URL。如果 input 是相对路径，则需要 base。 如果 input 是绝对路径，则忽略 base。
> - base <string> | <URL> 如果 input 不是绝对路径，则为要解析的基本 URL。
>
> ![image-20200221214236583](..\images\image-20200221214236583.png)
>
> ![image-20200221214307907](..\images\image-20200221214307907.png)
>
> `new URL()` 里面还可以换种写法 >>>
>
> 把相对路径部分写在第一个参数位置 , 把绝对路径写在第二个参数位置
>
> ![image-20200221214734026](..\images\image-20200221214734026.png)
>
> ![image-20200221214823153](..\images\image-20200221214823153.png)
>
> 两种写法输出的结果一模一样
>
> URL参数详解 >>>
>
> 1. `hash` >>> 获取及设置URL的片段部分 , 分配给hash属性的 值中包含的无效URL字符是百分比编码
> 2. `host` >>> 获取及设置URL的主机名部分(也就是域名加端口部分) , 一般都是8080端口 , 所以默认不写
> 3. `url.hostname` >>> 获取及设置 URL 的主机名部分。 `url.host` 和 `url.hostname` 之间的区别是 `url.hostname` 不包含端口
> 4. `href` >>> 获取及设置序列化的URL , 获取href属性的值等同于调用URL.tostring , 将此属性的值设置为新值等同于使用new URL(value) 创建新的URL对象 , URL对象的每个属性都将被修改 , 如果给href属性设置的值是无效的URL , 则将会抛出typeError
> 5. `origin` >>> 包含了协议的host , 获取只读的序列化的URL的origin
> 6. `port` >>> 端口获取及设置URL的端口部分, 端口值可以是数字或包含(0~65535]范围内的数字字符串 , 端口可以是空字符串 , 这时端口就会自动根据协议来选取
> 7. `protocol` >>> 设置连接协议 , 无效协议值会被忽略 , 比如http或是https
> 8. `search` >>> 获取及设置 URL 的序列化查询部分。
> 9. `searchParams` >>> 获取表示 URL 查询参数的 `URLSearchParams` 对象。 该属性是只读的。 使用 `url.search` 设置来替换 URL 的整个查询参数

##### 5.2 queryString模块

> querystring模块主要用来解析查询字符串
>
> ![image-20200222145114459](..\images\image-20200222145114459.png)
>
> ![image-20200222145146851](..\images\image-20200222145146851.png)
>
> `querystring.parse()`方法用于将一个查询字符串解析为`JavaScript`对象 >>>
>
> ![image-20200222145547085](..\images\image-20200222145547085.png)
>
> ![image-20200222145614736](..\images\image-20200222145614736.png)
>
> `querystring.parse()`方法一共可以接受4个参数
>
> ```nginx
> querystring.parse(str[,sep[,eq[,options]]])
> ```
>
> `str` >>> 需要解析的查询字符串
>
> `sep` >>> 多个键值对之间的分隔符 , 默认为&
>
> `eq` >>> 键名与键值之间的分隔符 , 默认为=
>
> `options` >>> 配置对象 , 它有两个属性，`decodeURIComponent`属性是一个函数，用来将编码后的字符串还原，默认是`querystring.unescape()`，默认情况下，将假定查询字符串中的百分比编码字符使用 UTF-8 编码。 如果使用其他字符编码，则需要指定其他值;  maxKeys属性指定最多解析多少个属性，默认是1000，如果设为0就表示不限制属性的最大数量。
>
> ![image-20200222150513515](..\images\image-20200222150513515.png)
>
> ![image-20200222150533850](..\images\image-20200222150533850.png)
>
> 
>
> `querystring.stringify()` >>> 
>
> - 该方法可以理解为parse的逆向方法 , 作用是把一个对象改成一个查询字符串
> - 比如本地经过一番操作,确定了一组数据,现在要把数据组合成一个请求连接, 那么就需要这个操作了
> - 该方法一共可以接受四个参数
>
> `obj` >>> 需要组合的目标对象
>
> `sep` >>> 多个键值对之间的分隔符 , 默认为&
>
> `eq` : 键名与键值之间的分隔符 , 默认为=
>
> `options` >>> 配置对象，它有两个属性，encodeURIComponent:在查询字符串中将 URL 不安全字符转换为百分比编码时使用的函数, 默认就是querystring.escape()
>
> ![image-20200222151650068](..\images\image-20200222151650068.png)
>
> ![image-20200222151708701](..\images\image-20200222151708701.png)

##### 5.3 os模块

> ![image-20200222155032405](..\images\image-20200222155032405.png)
>
> EOL属性 >>>
>
> os.EOL属性是一个常量，返回当前操作系统的换行符（Windows系统是\r\n，其他系统是\n）,记住,这个换行符是不可见的
>
> ![image-20200222155203092](..\images\image-20200222155203092.png)
>
> `os.arch()` >>>
>
> os.arch方法返回当前计算机的架构
>
> ![image-20200222155337396](..\images\image-20200222155337396.png)
>
> ![image-20200222155355467](..\images\image-20200222155355467.png)
>
> 现在可能的值有：'arm'、 'arm64'、 'ia32'、 'mips'、 'mipsel'、 'ppc'、 'ppc64'、 's390'、 's390x'、 'x32'、 'x64'。
>
> 
>
> `os.networkInterfaces()` >>>
>
> 该方法返回一个对象，包含只有被赋予网络地址的网络接口
>
> ![image-20200222155628062](..\images\image-20200222155628062.png)
>
> ![image-20200222155746024](..\images\image-20200222155746024.png)
>
> 被赋予网络地址的对象包含的属性：
>
> 1. address <string> 被赋予的 IPv4 或 IPv6 地址。
> 2. netmask <string> IPv4 或 IPv6 子网掩码。
> 3. family <string> IPv4 或 IPv6。
> 4. mac <string> 网络接口的 MAC 地址。
> 5. internal <boolean> 如果网络接口是 loopback 或相似的远程不能用的接口时，值为 true，否则为 false。
> 6. scopeid <number> IPv6 数字领域识别码（只有当 family 是 IPv6 时可用）。
> 7. cidr <string> 以 CIDR 表示法分配的带有路由前缀的 IPv4 或 IPv6 地址。如果 netmask 参数不可用，则该属性是 null。

##### 5.4 其他接口

> 1. `platform()` >>> 返回一个字符串，指定 Node.js 编译时的操作系统平台
> 2. `release()` >>> 返回一个操作系统的版本号
> 3. `cpus()` >>> 返回一个逻辑CPU内核的信息