const fs = require("fs");
const request = require("request")
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// request({
//     //* 基本的请求信息
//     method: "GET",
//     url: "https://www.bilibili.com/bangumi/play/ss28770/?from=search&seid=14387394881589677829",
//     //* 伪装成浏览器
//     headers: {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36",
//         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
//     }

// }, (err, res, body) => {
//     fs.createReadStream()

// })

request("https://www.bilibili.com/bangumi/play/ss28770/?from=search&seid=14387394881589677829").pipe(fs.createWriteStream("./src/image/2.mp4"))