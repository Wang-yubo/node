const fs = require("fs");
fs.rename(`${__dirname}/demo.txt`, `${__dirname}/demo1.txt`, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("改名成功");
    }
})
fs.rename(`${__dirname}/demo.js`, `${__dirname}/src/js/demo.js`, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("文件移动成功");
    }
})