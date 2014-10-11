var fetchTime = require("./fetchTime");
var assert = require("assert");

var testcases = {
	"我在二零一一年十月二十三日五时四分五十七秒在家打游戏":"二零一一年十月二十三日五时四分五十七秒"
	,"今年三月四日我要去打篮球":"今年三月四日"
	,"这周日三点十五我要去滚雪球":"这周日三点十五"
	,"八月十五日去看月亮":"八月十五日"
	,"五天后在我家门口见":"五天后"
	,"后天五点十五给我完成家庭作业":"后天五点十五"
	,"大后天五点十五给我完成家庭作业":"大后天五点十五"
	,"大后天下午五点十五给我完成家庭作业":"大后天下午五点十五"
	,"周一晚上八点看电视":"周一晚上八点"
}

// for(var name in testcases){
// 	assert.equal(fetchTime(name),testcases[name],name);
// }


var s = fetchTime('我在二零一一年十月二十三日五时四分五十七秒在家打游戏');
console.log(s);

	// 时间单位词
	var timeUnits = '年月日时分秒天号天';
	// 时间段单位
	var timeBUnits = '(年|月|个月|天|日|小时|分钟|秒|)'
	// 数量词
	var numbers = '一二三四五六七八九十百零两1234567890';
	// 周量词
	var weekNumber = '[一二三四五六日]'
	// 时间数量词
	var yearNumbers = '(['+numbers+']{2}'+'|'+'['+numbers+']{4})';
	// 其他时间量词
	var otherNumbers = '(['+numbers+']{1,3})';
	// console.log(new RegExp(otherNumbers).exec("三月去打球"))
	// 时间定位词
	// 定位当前	这周 这个月 本周 今天
	var locateThis = '(这|本|今|这个)'
	// 定位之前 上周 上一周 上个月 上一个月 去年 昨天
	var locatePre = "(上|昨|去)"
	// 定位之前两 前天 前年
	var locatePrePre = "(前|上上个)"
	// 定位之后 明天 下周 下个月 明年
	var locateNext = '(明|下|下个)';
	// 定位之后两 后天 后年 
	var locateNextNext = '(后)'
	// 所有定位词
	var locate = '('+locateThis+'|'+locatePre+'|'+locatePrePre+'|'+locateNext+'|'+locateNextNext+')';
	// 时间位移词
	var offset = '(后|前)';
	// 0.匹配"2001年2月二日三点十五分四秒"
	patt0=new RegExp('(('+yearNumbers+'|'+locate+')年)?(('+otherNumbers+'|'+locate+')月)?(('+otherNumbers+'|'+locate+')[日号天])?(('+otherNumbers+')[时点])?(('+otherNumbers+')分)?(('+otherNumbers+')秒)?','g');
	// 1.同上但是支持省略分单位 例如：三点四十
	patt1=new RegExp('(('+yearNumbers+'|'+locate+')年)?(('+otherNumbers+'|'+locate+')月)?(('+otherNumbers+'|'+locate+')[日号天])?('+otherNumbers+')[时点]('+otherNumbers+')','g');
	// 2,匹配一段之间以后”三天后“，一年零七个月后
	patt2=new RegExp('('+otherNumbers+')('+timeBUnits+')('+otherNumbers+')('+timeBUnits+')('+offset+')','g');
	// 3,含有周的格式 周一周二 几点几分
	patt3=new RegExp('('+locate+')?周('+weekNumber+')(('+otherNumbers+')[时点])?(('+otherNumbers+')分)?(('+otherNumbers+')秒)?','g');
	// 4,含有周的格式 周一周二 几点几
	patt4=new RegExp('('+locate+')?周('+weekNumber+')'+'('+otherNumbers+')[时点]('+otherNumbers+')','g');

	// console.log(fetchTime('后天五点十五给我完成家庭作业'))
	// console.log(fetchTime('三个月零三天后在我家门口见'))



// console.log(fetchTime("11年三月打羽毛球"));
// console.log(fetchTime("2012年三月打羽毛球"));
// console.log(fetchTime("今年三月打羽毛球"));
// console.log(fetchTime("明年十月十五日三点四十打羽毛球"));
// console.log(fetchTime("今天三点五十六分四秒"));
// console.log(fetchTime("明天三点二十五打羽毛球"));
// console.log(fetchTime("五天后打球"));
// console.log(fetchTime("七日后打羽毛球"));
// console.log(fetchTime("一年零七个月后打羽毛球"));
// console.log(fetchTime("周一打球"));
// console.log(fetchTime("周一四点五十二分打球"));
// console.log(fetchTime("周六五点四十打飞机"));
// console.log(fetchTime("我要在本周六五点四十打飞机"));


// console.log(fetchTime("四小时后写作业"));
// console.log(fetchTime("一分钟前打酱油"));
// console.log(fetchTime("五月一日去看海"));
// console.log(fetchTime("四点去看海"));
// console.log(fetchTime("周一打酱油"));
// console.log(fetchTime("本周一打酱油"));
// console.log(fetchTime("我在上周一打酱油"));
// console.log(fetchTime("五点二十打酱油"));
// console.log(fetchTime("五点二十分打酱油"));
// console.log(fetchTime("周五五点二十打酱油"));

// chineseCharToNumber("二")
// chineseCharToNumber("零")
// chineseCharToNumber("四")
// chineseCharToNumber("六")

 // console.log(chineseStringToNumber("三十"));
// console.log(chineseStringToNumber("十五"));
// console.log(chineseStringToNumber("五十七"));
// console.log(chineseStringToNumber("零四"));
// console.log(chineseStringToNumber("一十五"));
// console.log(chineseStringToNumber("1223121"));
// languageToDate1("十点十五分");
// var d = languageToDate1("二零一一年五月十五日三点十五分");
// var d = languageToDate1("五点二十二");

// var d = languageToDate1("五点半");
// var s = d.toSimpleString();
// console.log(s);
