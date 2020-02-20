let num = 1;
let data = {
    count: 1
}

function inc() {
    data.count++;
    num++;
}
module.exports = {
    num,
    inc,
    data
}