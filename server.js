const request = require("request")
const { JSDOM } = require("jsdom");
const readline = require("readline");
const fs = require("fs");
const Events = require("events");

//* 得到一个事件的实例部分
let myEvents = new Events();

//*存储待搜索美少女的名字
let searchStr = "";

//* 存储所有搜索结果
let imgSrcList = [];

//* 处理命令行输入和输出信息
let rl = readline.createInterface({ //* 创建交互
    input: process.stdin,
    output: process.stdout
})

rl.question("你喜欢的美少女是:", function(answer) {
    searchStr = answer;
    rl.close();
})

//* 监听命令行关闭时,发起请求
rl.on("close", function() {
    request({
        method: "GET",
        url: `https://www.meitulu.com/search/${encodeURIComponent(searchStr)}`,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36"
        }
    }, function(err, res, body) {
        console.log(body);

        let dom = new JSDOM(body);
        let searchResult = dom.window.document.querySelectorAll("ul.img>li")
        console.log(searchResult);

        let targetUrl = [];
        searchResult.forEach(function(item) {
                targetUrl.push({
                    url: item.querySelector("a").href,
                    title: item.querySelector("p.p_title").textContent,
                    num: item.querySelector("p").textContent
                })
            })
            // console.log(targetUrl);
        myEvents.emit("getDetailMsg", targetUrl)
    })
})

myEvents.on("getDetailMsg", function(target) {
    let prolist = [];
    target.forEach(function(item) {
        let { url, title } = item;
        prolist.push(new Promise((resolve) => getImgSrc(url, title, resolve)).then((data) => {
            let isExists = fs.existsSync(`${__dirname}/download/${title}`);
            if (!isExists) {
                fs.mkdirSync(`${__dirname}/download/${title},0777`)
            }
        }))
        Promise.all(prolist).then(() => {
            imgSrcList.forEach((item) => {
                request(item.imgSrc).on("error", (err) => {
                    console.log(err);
                }).pipe(fs.createWriteStream(`${__dirname}/download/${item.title}/${item.name}`))
            })
        })
    })
});
//* 获取数据
function getImgSrc(url, title, resolve) {
    request({
        url: url,
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36"
        }
    }, function(err, res, body) {
        let dom = new JSDOM(body);
        let searchImgResult = dom.window.document.querySelectorAll("div.content>center>img")
        searchImgResult.forEach((item) => {
            imgSrcList.push({
                imgSrc: item.scr,
                name: item.src.toString().substring(item.src.toString().lastIndexof("/"), +1),
                title: title
            })
        })
        let nowPos = dom.window.document.querySelector("#pages>span");
        let nextPos = dom.window.document.querySelector("pages>span+a");
        if (nextPos.textContent === "下一页") {
            resolve();
            return;
        } else {
            getImgSrc(`https://www.meitulu.com${nextPos.href}`, title, resolve)
        }
    })
}