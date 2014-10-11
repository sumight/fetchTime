fetchTime
=========
这是一个用来提取时间的函数
将一个语句中关于时间的描述提取出来

## fetchTime(language)
输入含有时间的自然语言语句 返回一个格式化的时间字符串

例：

var fetchTime = require("fetchTime");

var s = fetchTime('我在二零一一年十月二十三日五时四分五十七秒在家打游戏');
console.log(s);

结果：2011-10-23 5:4:57

var s = fetchTime('大后天下午五点十五给我完成家庭作业');
console.log(s);

结果：2014-10-14 17:15:34
ps：现在是2014-10-11 17:15:34
