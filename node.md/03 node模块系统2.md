### 03 node模块系统2

##### 3.1 模块的补充信息

> 模块的缓存 >>>
> 第一次加载某个模块时 , node会缓存该模块 , 以后再加载该模块 , 就直接从缓存去除该模块的module.exports
>
> ![image-20200220161608043](..\images\image-20200220161608043.png)
>
> ![image-20200220161635767](..\images\image-20200220161635767.png)
>
> 上面代码中，连续三次使用`require`命令，加载同一个模块。第二次加载的时候，为输出的对象添加了一个msg属性。但是第三次加载的时候，这个msg属性依然存在，这就证明`require`命令并没有重新加载模块文件，而是输出了缓存。
>
> 如果想要多次执行某个模块，可以让该模块输出一个函数，然后每次`require`这个模块的时候，重新执行一下输出的函数。
>
> 所有缓存的模块保存在require.cache之中 , 如果想要删除模块的缓存 , 可以像下面这样写 >>>
>
> ```js
> //删除指定模块的缓存
> delete require.cache[moduleName];
> //删除所有模块的缓存
> object.keys(requier.cache).forEach(function(key){
> 	delete require.cache[key];
> })
> ```
>
> 注意 , 缓存是根据绝对路径识别模块的 , 如果同样的模块名 , 但是保存在不同的路径下 ,`require`命令还是会重新加载该模块
>
> 
>
> 循环加载问题 >>>
>
> 如果发生模块的循环加载 , 即A加载B , B又加载A , 则B将加载A的不完整版本
>
> ![image-20200220172706208](..\images\image-20200220172706208.png)
>
> ```js
> //a.js
> exports.x = "a1";
> console.log("a.js", require("./b.js").x);
> exports.x = "a2";
> 
> //b.js
> exports.x = "b1";
> console.log("b.js", require("./a.js").x);
> exports.x = "b2";
> 
> //c.js
> console.log("c.js", require("./a.js").x)
> console.log("c.js", require("./b.js").x)
> ```
>
> 输出结果 >>>  b2有两个 , 没有b1被输出
>
> ![image-20200220172848819](..\images\image-20200220172848819.png)
>
> 加载顺序解析 >>>
>
> ![image-20200220191702196](..\images\image-20200220191702196.png)
>
> ![image-20200220191727274](..\images\image-20200220191727274.png)
>
> ![image-20200220191747842](..\images\image-20200220191747842.png)
>
> 整个过程中输出的顺序是在第三步中输出a1 , 第四步中输出b2 , 在第五步中输出a2 , 在第六步中输出b2
>
> 在A和B的循环加载中 , 体现B将加载A的不完整版本的是在第三步 , 从a.js请求出发到了b.js里 , b.js又请求到a.js中 , 在b.js回到a.js的时候并没有把a.js走完 , 而是在拿到了第一个x的值后就返回了b.js
>
> 
>
> `require.main` >>>
>
> `require`方法有一个`main`属性 , 可以用来判断模块时直接执行还是被调用执行 , 判断方法 >>>
>
> ```js
> require.main === module
> ```
>
> 代码准备 >>>
>
> ```js
> // a.js
> console.log("a.js", require.main === module);
> 
> //b.js
> console.log("b.js", require.main === module);
> 
> //c.js
> let a = require("./a")
> let b = require("./b")
> console.log("c.js", require.main === module)
> ```
>
> 执行结果 >>> `fasle`为被调用执行 , `true`为直接执行
>
> ![image-20200220195153126](..\images\image-20200220195153126.png)

##### 3.2 模块的运行机制

> 模块的加载机制 >>>
>
> `CommonJS`模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值(记住仅仅只是普通的值, 要是引用类型的值的话,还是受影响的)
>
> 举个栗子 >>>
>
> ![image-20200220201121802](..\images\image-20200220201121802.png)
>
> 输出结果 >>>
>
> ![image-20200220201145652](..\images\image-20200220201145652.png)
>
> 结果分析 >>>
>
> 在经过inc函数的改变后 , num仍然输出原始值 , data输出了改变后的值 , 这是因为 , num是基本的数字类型的值 , data是引用类型的对象 , 在`CommonJS`的模块加载机制下 , 模块内部的变化不会影响到基本类型的值 , 但是会影响引用类型的值