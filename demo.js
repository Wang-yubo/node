var Event = require("events");
let myEmitter = new Event();
myEmitter.on("removeListener", function(evname) {
    console.log(`删除了一个名叫${evname}的事件`);
})
myEmitter.on("someEvent", test1);
myEmitter.on("someEvent", test2);
myEmitter.on("someEvent", test3);

function test1() {
    console.log("事件1");
};

function test2() {
    throw Error("error!")
};

function test3() {
    console.log("事件3");
};
myEmitter.removeAllListeners()