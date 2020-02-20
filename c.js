let tool = require("./a")

console.log(tool.num); //=>1
console.log(tool.data.count); //=>1

tool.inc();

console.log(tool.num); //=>1
console.log(tool.data.count); //=>2