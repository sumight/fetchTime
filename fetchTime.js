	// 时间单位词
	var timeUnits = '年月日时分秒天号天';
	// 数量词
	var numbers = '一二三四五六七八九十百零1234567890';
	// 时间定位词
	var location = '这本下上';
	// 时间位移词
	var offset = '后前';
// var fetchTime = function(nl){

// 	// 表示时间描述的结尾
// 	var timeDescriptionEnding = timeUnits+offset;
// 	// 补充
// 	var adding = '亮全光'
// 	var patt = new RegExp("^.*["+timeDescriptionEnding+numbers+"](?=[^"+timeDescriptionEnding+adding+"])");
// 	return patt.exec(nl);
// }

var fetchTime = function(nl){
	var patts = [];
	// 匹配"2001年2月二日三点十五分四秒"
	patts.push(new RegExp('(['+numbers+']{2,4}年)?(['+numbers+']{1,2}月)?(['+numbers+']{1,2}[日号])?(['+numbers+']{1,2}时)?(['+numbers+']{1,2}分)?(['+numbers+']{1,2}秒)?'));
	// 匹配"一年后"，"两小时前"这样的格式
	patts.push(new RegExp('['+numbers+']{1,5}(['+timeUnits+']|小时|分钟|个月)[后前]'));
	// 匹配"下周一"这样的格式
	patts.push(new RegExp('['+location+']?周['+numbers+']'));
	var result;
	for(index in patts){
		//console.log(index);
		if (nl.match(patts[index]))
			result =  nl.match(patts[index])[0];
	}
	return result;
}

console.log(fetchTime("一天后打羽毛球"));
console.log(fetchTime("四小时后写作业"));
console.log(fetchTime("一分钟前打酱油"));
console.log(fetchTime("五月一日去看海"));
console.log(fetchTime("周一打酱油"));
console.log(fetchTime("本周一打酱油"));
console.log(fetchTime("我在上周一打酱油"));