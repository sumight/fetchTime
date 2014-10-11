var fetchTime = require("./fetchTime").fetchTime;
var SimpleDate = require("./SimpleDate");
// var ltd = require("./fetchTime").languageToDate1;
var ltd0 = require("./fetchTime").languageToDate0

console.log(new SimpleDate().toSimpleString());
// console.log(ltd("三点"));
// console.log(ltd("明天"));
// console.log(ltd("昨天四点"));
// console.log(ltd("明年"));
// console.log(ltd("去年"));
// console.log(ltd("昨天下午四点"));
// console.log(ltd("昨天下午四点四十"));
// console.log(ltd("周五下午一点"));
// console.log(ltd("上周五下午一点"));
// console.log(ltd("周五下午三点半"));
// console.log(ltd("下周日下午三点半"));

console.log(ltd0("一周后"));
console.log(ltd0("一小时后"));
