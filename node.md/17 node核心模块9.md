### 17 node核心模块9

##### 17.1 stream模块

> stream的概念 >>>
>
> - 数据读写可以看作是事件模式（Event）的特例，不断发送的数据块好比一个个的事件。读数据是read事件，写数据是write事件，而数据块是事件附带的信息。Node 为这类情况提供了一个特殊接口Stream。
> - "数据流"（stream）是处理系统缓存的一种方式。操作系统采用数据块（chunk）的方式读取数据，每收到一次数据，就存入缓存。Node应用程序有两种缓存的处理方式，第一种是等到所有数据接收完毕，一次性从缓存 读取，这就是传统的读取文件的方式；第二种是采用“数据流”的方式，收到一块数据，就读取一块，即在数据还没有接收完成时，就开始处理它。
> - 第一种方式先将数据全部读入内存，然后处理，优点是符合直觉，流程非常自然，缺点是如果遇到大文件，要花很长时间，才能进入数据处理的步骤。第二种方式每次只读入数据的一小块，像“流水”一样，每当系统读入了一小块数据，就会触发一个事件，发出“新数据块”的信号。应用程序只要监听这个事件，就能掌握数据读取的进展，做出相应处理，这样就提高了程序的性能
>
> stream模块 >>>
>
> ![image-20200306135721827](..\images\image-20200306135721827.png)
>
> 在 Node.js 中有四种基本的流类型：Readable（可读流），Writable（可写流），Duplex（双向流），Transform（转换流）。
>
> 1. 可读流是数据可以被消费的源的抽象。一个例子就是 fs.createReadStream 方法。
> 2. 可读流是数据可以被写入目标的抽象。一个例子就是 fs.createWriteStream 方法。
> 3. 双向流即是可读的也是可写的。一个例子是 TCP socket。
> 4. 转换流是基于双向流的，可以在读或者写的时候被用来更改或者转换数据。一个例子是 zlib.createGzip 使用 gzip 算法压缩数据。你可以将转换流想象成一个函数，它的输入是可写流，输出是可读流。

##### 17.2 stream模块之pipe方法

> ```nginx
> readableSrc.pipe(writableDest)
> ```
>
> 在这一行简单的代码中，我们导入可读流的输出 -- 源数据，作为可写流的输入 -- 目标。源数据必须是一个可读流，目标数据必须是一个可写流。当然，他们也都可以是 双向流/转换流。
>
> 最经典的案例 : 实现流式的读取和写入文件
>
> ```js
> function copy(src,target){
> 	fs.createReadStream(src).pipe(fs.createWriteStream(target))
> }
> ```

##### 17.3 stream模块之事件

> 除了从一个可读源流读取和往一个目标流中写入数据之外，`pipe` 方式还可以自动管理一些事情。
> 例如，处理错误，文件末尾，或者当一个流比另一个快或者满的情形。这里有一个 `pipe` 方法读取数据等价的使用事件消费流的代码：
>
> ```nginx
> readable.pipe(writable)
> ```
>
> ```nginx
> readable.on("data",(chunk)=>{
> 	writable.write(chunk);
> });
> readable.on("end",()=>{
> 	writable.end();
> })
> ```
>
> 本质上讲 , 这两者的效果基本一致
>
> 常见事件 >>>
>
> 这里有一个被可读流和可写流使用的重要事件和函数列表：
>
> ![image-20200306141503035](..\images\image-20200306141503035.png)
>
> 可写入流事件 >>>
>
> 1. Close事件 >>> 当流或其底层资源（比如文件描述符）被关闭时触发。 表明不会再触发其他事件，也不会再发生操作。
>
> 2. Drain事件 >>> 当可以继续写入数据到流时会触发 'drain' 事件。
>
> 3. Finish事件 >>> 当所有的数据都写入到底层系统中时会触发
>
> 4. Pipe事件 >>> 当在可读流上调用 stream.pipe() 方法时会发出 'pipe' 事件，并将此可写流添加到其目标集。
> 5. Error事件>>>如果在写入或管道数据时发生错误，则会触发 'error' 事件。 当调用时，监听器回调会传入一个 Error 参数。
>
> 可读流事件 >>>
>
> 1. Close事件>>> 当流或其底层资源（比如文件描述符）被关闭时触发。 表明不会再触发其他事件，也不会再发生操作。
>
> 2. data事件 >>> 当流将数据块传送给消费者后触发。
>
> 3. readable事件 >>> 当有数据可从流中读取时，就会触发 'readable' 事件。 
>
> 4. end事件 >>> 'end' 事件只有在数据被完全消费掉后才会触发。
>
> 5. Error事件如果在读取或管道数据时发生错误，则会触发 'error' 事件。 当调用时，监听器回调会传入一个 Error 参数。

##### 17.4 stream模块之可读数据流的暂停和流动模式

> 可读流有两个主要模式影响到我们消费它们的方式：
>
> 1. 暂停模式（paused）
> 2. 流动（flowing）模式
>
> 所有的可读流默认都是以暂停模式开始的，但是它们很容易切换到流动模式，并且在需要的时候退回到暂停模式。有时候，这种切换是自动发生的。
>
> 三种方法可以让暂停态转为流动态 >>>
>
> 1. 添加data事件的监听函数
> 2. 调用resume方法
> 3. 调用pipe方法将数据送往一个可写数据流
>
> 也可以使用pause让流动态转为暂停态
>
> ![image-20200306150252270](..\images\image-20200306150252270.png)
>
> 注意 :在手动暂停或者手动恢复的时候一样要写在一个可控的函数里