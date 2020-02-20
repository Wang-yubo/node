### 02 node模块系统1

##### 2.1 基本指令和变量

> 模块的导入和导出 >>>
>
> 导出 >>>
>
> ![image-20200219161343764](..\images\image-20200219161343764.png)
>
> 导入 >>>
>
> ![image-20200219161408935](..\images\image-20200219161408935.png)
>
> 文件结构 >>>
>
> ![image-20200219161435703](..\images\image-20200219161435703.png)
>
> 执行结果 >>>
>
> ![image-20200219161512575](..\images\image-20200219161512575.png)
>
> 注意点 >>>
>
> 1. `node`采用的`commonjs`的模块系统, 导入模块用的是`require`这个全局函数,导出模块用的是`module.exports`的方式
> 2. `require`方法导入本地的某个文件组件的话, 一定要加上盘符前缀(即便是在同一目录下)
>
> 导出方式也可以使用结构赋值的方式 >>>
>
> ![image-20200220133024808](..\images\image-20200220133024808.png)
>
> 执行结果 >>>
>
> ![image-20200220133106761](..\images\image-20200220133106761.png)
>
> `module` 对象 >>>
>
> `Node`内部提供一个`Module`构造函数 , 所有模块都是`Module`的实例
>
> ![image-20200219163257878](..\images\image-20200219163257878.png)
>
> ![image-20200219163321596](..\images\image-20200219163321596.png)
>
> 每个模块内部，都有一个module对象，代表当前模块。它有以下属性 >>>
>
> 1. module.id 模块的识别符，通常是带有绝对路径的模块文件名。
> 2. module.filename 模块的文件名，带有绝对路径。
> 3. module.loaded 返回一个布尔值，表示模块是否已经完成加载。
> 4. module.parent 返回一个对象，表示调用该模块的模块。
> 5. module.children 返回一个数组，表示该模块要用到的其他模块。
> 6. module.exports 表示模块对外输出的值。
>
> 
>
> `exports` 变量 >>>
>
> 为了方便 , Node为每个模块提供一个`exports`变量 , 指向`module.exports` , 这等同于(只是等同于 , 并不是真的有这行代码)在每个模块头部 , 有一行这样的命令 >>>
>
> ```js
> var exports = module.exports;
> ```
>
> 造成的结果是 , 在对外输出模块接口时 , 可以向`exports`对象添加方法 >>>
>
> ![image-20200220142345147](..\images\image-20200220142345147.png)
>
> 注意 : 不能直接将`exports`变量指向一个值 , 因为这样等于切断了`exports`于`module.exports`的联系
>
> 
>
> `require`指令 >>>
>
> `require`命令的基本功能是 , 读入并执行一个`JavaScript`文件 , 然后返回该模块的`exports`对象 , 如果没有发现指定模块 , 则会得到一个空对象
>
> ![image-20200220133024808](..\images\image-20200220133024808.png)
>
> `require`命令用于加载文件 , 后缀名默认为`.js` , 也就是引入js文件时可以不写后缀名
>
> ```js
> var foo = require("foo");
> // 等价于
> var foo = require("foo.js");
> ```
>
> 根据参数的不同 , require命令去不同路径寻找模块文件 :
>
> 如果参数字符串以`"/"`开头 , 则便是加载的是一个位于绝对路径的模块文件 , 比如 >>>
>
> ```js
> require("/home/src/foo.js") //将加载/home/src/foo.js
> ```
>
> 如果参数字符串以`"./"`开头 , 则表示加载的是一个位于相对路径(跟当前执行脚本的位置相比)的模块文件 , 比如 >>>
>
> ```js
> require("./circle") //将加载当前脚本同一目录的circle.js
> ```
>
> 如果参数字符串不以 `"./"`或是`"/"`开头 , 则表示加载的是一个默认提供的核心模块(位于Node的系统安装目录中) , 或者是一个位于各级node_modules目录的已安装模块(全局安装或是局部安装) , 比如 >>>
>
> ```js
> require("path") //将引入node中的path模块
> ```
>
> 如果参数字符串不以`"./"`或是`"/"`开头 , 而且是一个路径 , 比如 >>>
>
> ```js
> require("example-module/path/to/file") //则将先找到example-module的位置 , 然后再以他为参数 ,找到后续路径
> ```
>
> 如果指定的模块文件没有发现，Node会尝试为文件名添加.js、.json、.node后，再去搜索。.js文件会以文本格式的JavaScript脚本文件解析，.json文件会以JSON格式的文本文件解析，.node文件会以编译后的二进制文件解析。
>
> 如果想要得到require命令加载的确切文件名 , 使用`require.resolve()`方法
>
> 通常 , 我们会把相关的文件放在一个目录里面 , 以便于组织, 这时 , 最好为该目录设置一个入口文件 , 让require方法可以通过这个入口文件 , 加载整个目录
>
> 例子 >>> require里面的路径指向一个目录
>
> ![image-20200220155519143](..\images\image-20200220155519143.png)
>
> 在src目录下初始化package.json文件 >>> package.json中指定`"./main.js"`为入口文件
>
> ![image-20200220155746076](..\images\image-20200220155746076.png)
>
> main.js文件本身 >>> 
>
> ![image-20200220155550340](..\images\image-20200220155550340.png)
>
> 执行结果 >>>
>
> ![image-20200220160018957](F:\前端开发\learn node.js\images\image-20200220160018957.png)
>
> 如果package.json文件没有main字段 , 或者根本就没有package.json文件 ,则会加载该目录下的index.js文件或者index.node文件 , 如果一个都没有 , 那就玩球了

