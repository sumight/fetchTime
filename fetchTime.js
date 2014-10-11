var SimpleDate = require('./SimpleDate')
	// 时间单位词
	var timeUnits = '年月日时分秒天号';
	// 时间段单位
	var timeBUnits = '(年|月|个月|天|日|小时|分钟|秒|)'
	// 数量词
	var numbers = '一二三四五六七八九十百零两1234567890两';
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
	var locatePrePre = "(前|上上个|大前)"
	// 定位之后 明天 下周 下个月 明年
	var locateNext = '(明|下|下个)';
	// 定位之后两 后天 后年 
	var locateNextNext = '(后|大后|下下个)'
	// 所有定位词
	var locate = '('+locateThis+'|'+locatePre+'|'+locatePrePre+'|'+locateNext+'|'+locateNextNext+')';
	// 时间位移词
	var offset = '(后|前)';
	// 一天的区块描述词 上午 下午 凌晨 晚上
	var dayBlock = '(上午|下午|凌晨|晚上|中午)'
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
	// 0.匹配"2001年2月二日三点十五分四秒"
	patts.push(new RegExp('(('+yearNumbers+'|'+locate+')年)?(('+otherNumbers+'|'+locate+')月)?(('+otherNumbers+'|'+locate+')[日号天])?('+dayBlock+')?(('+otherNumbers+')[时点])?(('+otherNumbers+')分)?(('+otherNumbers+')秒)?','g'));
	// 1.同上但是支持省略分单位 例如：三点四十
	patts.push(new RegExp('(('+yearNumbers+'|'+locate+')年)?(('+otherNumbers+'|'+locate+')月)?(('+otherNumbers+'|'+locate+')[日号天])?('+dayBlock+')?('+otherNumbers+')[时点]('+otherNumbers+')','g'));
	// 2,匹配一段之间以后”三天后“，一年零七个月后
	patts.push(new RegExp('(('+otherNumbers+')('+timeBUnits+'))?('+otherNumbers+')('+timeBUnits+')('+offset+')','g'));
	// 3,含有周的格式 周一周二 几点几分
	patts.push(new RegExp('('+locate+')?(周|星期)('+weekNumber+')('+dayBlock+')?(('+otherNumbers+')[时点])?(('+otherNumbers+')分)?(('+otherNumbers+')秒)?','g'));
	// 4,含有周的格式 周一周二 几点几
	patts.push(new RegExp('('+locate+')?(周|星期)('+weekNumber+')('+dayBlock+')?('+otherNumbers+')[时点]('+otherNumbers+')','g'));

	var result = '';
	var pn = -1;
	for(index in patts){
		if (nl.match(patts[index])){
			rs =  nl.match(patts[index]);
			for(var i in rs){
				if (rs[i].length>result.length){
					console.log(index);
					pn = index;
					result = rs[i];
				}
			}
		}
	}
	if(pn===-1){
		return null;
	}
	if(pn===2){
		return languageToDate0(result);
	}
	return languageToDate1(result);
}
// 将一到两位的中文数字转换成数字
var chineseStringToNumber = function(cns){
	var numbers = {'零':0 ,'一':1 ,'二':2 ,'三':3 ,'四':4 ,'五':5 ,'六':6 ,'七':7,'八':8 ,'九':9 ,'十':10,'半':30,'日':0};
	// 个位数
	var singleDigit = "一二三四五六七八九半日"
	if(new RegExp('^[1234567890]*$').test(cns)){
		return cns;
	}else if (new RegExp('^['+singleDigit+'零十'+']*$')) {
		// 判断第一个字符
		if(singleDigit.indexOf(cns.charAt(0))>=0){	// 如果中文描述中的第一个字符是非零个位数 例：三十一
			if(cns.length === 1){
				return numbers[cns];
			}else if(cns.length===2){
				if(cns.charAt(1)==='十'){
					return numbers[cns.charAt(0)]*10;
				}
			}else if(cns.length===3){
				return numbers[cns.charAt(0)]*10+numbers[cns.charAt(2)]
			}else{
				return null;
			}
		}else if (cns.charAt(0)==='零') {			// 如果是零 例：零一
			if(cns.length === 1){
				return numbers[cns];
			}else if(cns.length===2){
				return numbers[cns.charAt(1)]
			}else{
				return null
			}
		}else if(cns.charAt(0)==='十'){				// 如果是十 例：十三
			if(cns.length === 1){
				return numbers[cns];
			}else if(cns.length===2){
				return 10+numbers[cns.charAt(1)]
			}
		}
	}else{
		return null;
	}
}
var languageToDate0 = function(nlt){
	// 日期对象
	var date = new SimpleDate();
	// 最后一个位移修饰词
	var offset = nlt.slice(-1);
	var offsetDir = offset==='前'?-1:1;
	// 用来提取时间段的正则表达式
	var patts = {}
	patts.year = new RegExp('('+otherNumbers+')(?=年)')
	patts.month = new RegExp('('+otherNumbers+')(?=(月|个月))')
	patts.day = new RegExp('('+otherNumbers+')(?=(日|天))')
	patts.week = new RegExp('('+otherNumbers+')(?=(周|星期))')
	patts.hour = new RegExp('('+otherNumbers+')(?=(小时))')
	patts.munite = new RegExp('('+otherNumbers+')(?=(分钟))')
	patts.second = new RegExp('('+otherNumbers+')(?=秒)')
	// 用来存储时间段的对象
	var timeBNumbers = {}
	// 将时间段数字提取出来
	for(var name in patts){
		var str = patts[name].exec(nlt);
		if (str){
			timeBNumbers[name] = str[0];			
		}
	}
	// 将位移体现在date上
	for(var name in timeBNumbers){
		var n = chineseStringToNumber(timeBNumbers[name]);
		if(name==='year'){
			if(offset === "前"){
				for(var i=0; i<n; i++){
					date.setAsPreYear();	
				}
			}else{
				for(var i=0; i<n; i++){	
					date.setAsNextYear();
				}
			}
		}else if(name==='month'){
			if(offset === "前"){
				for(var i=0; i<n; i++){
					date.setAsPreMonth;	
				}
			}else{
				for(var i=0; i<n; i++){	
					date.setAsNextMonth();
				}
			}
		}else if(name==='week'){
			if(offset === "前"){
				for(var i=0; i<n; i++){
					date.setAsPreWeek();	
				}
			}else{
				for(var i=0; i<n; i++){	
					date.setAsNextWeek();
				}
			}
		}else if(name==='day'){
			if(offset === "前"){
				for(var i=0; i<n; i++){
					date.setAsPreDay();	
				}
			}else{
				for(var i=0; i<n; i++){	
					date.setAsNextDay();
				}
			}
		}else if(name==='hour'){
			date.setTime(date.getTime()+offsetDir*n*date.lHour)
		}else if(name==='minute'){
			date.setTime(date.getTime()+offsetDir*n*SimpleDate.date.lMinute)
		}else if(name==='second'){
			date.setTime(date.getTime()+offsetDir*n*SimpleDate.date.lSecond)
		}
	}
	return date.toSimpleString();
}
var languageToDate1 = function(nlt){
	// 用来提取年月数字字段的正则表达式
	var patts = {};
	// 存储提取出来的年月数字
	var dateNumbers = {};
	// 日期对象
	var date = new SimpleDate();

	patts.year = new RegExp('('+yearNumbers+'|'+locate+')(?=年)');
	patts.month = new RegExp('('+otherNumbers+'|'+locate+')(?=月)');
	patts.date = new RegExp('('+otherNumbers+'|'+locate+')(?=[日号天])');
	patts.hour = new RegExp('('+dayBlock+')?['+numbers+']{1,3}(?=[时点])');
	patts.minute = new RegExp('[时点](['+numbers+']{1,3}|半)');
	patts.second = new RegExp('['+numbers+']{1,3}(?=秒)');
	patts.day = new RegExp('('+locate+')?周('+weekNumber+')');
	// 将提取出来的日期数字存贮起来
	for(var name in patts){
		var str = patts[name].exec(nlt);
		if (str){
			dateNumbers[name] = str[0];			
		}
	}
	// 将日期数字装换成阿拉伯数字并且生成数字对象
	for(var name in dateNumbers){
		if(name==='year'){
			// 年份位移
			if(dateNumbers[name].match(new RegExp(locate))!==null){
				switch(dateNumbers[name]){
					case '去':
						date.setAsPreYear();
						break;
					case '前':
						date.setAsPreYear();
						date.setAsPreYear();
						break;
					case '大前':
						date.setAsPreYear();
						date.setAsPreYear();
						date.setAsPreYear();
						break;
					case '明':
						date.setAsNextYear();
						break;
					case '后':
						date.setAsNextYear();
						date.setAsNextYear();
						break;
					case '大后':
						date.setAsNextYear();
						date.setAsNextYear();
						date.setAsNextYear();
						break;
				}
			}else{
				// 日期数据字符串
				var numstr = dateNumbers[name]
				var num = "";
				// 遍历日期数据字符串中的每个数字转化成阿拉伯数字
				for(var i=0; i<numstr.length; i++){
					var n = chineseStringToNumber(numstr.charAt(i));
					num+=n;
				}
				// 判断年份格式 两位或者四位
				if(num.length === 2){
					// 现在的年份
					var nowYear = String(date.getYear());
					// 根据现在的年份后后两位生成新的年份
					num = nowYear.slice(0,2)+num;
					// 如果设置的年份大于现在年份，减去一个世纪
					if(Number(num)>Number(nowYear)){
						num = Number(num)-100;
					}
				}else if(num.length ===4){

				}else{
					throw new Error('-1','输入的年份字长为3，有误')
				}
				date.setYear(num);
			}
		}else if(name==='month'){
			if(dateNumbers[name].match(new RegExp(locate))!==null){
				switch(dateNumbers[name]){
					case '上个':
					case '上':
						date.setAsPreMonth();
						break;
					case '上上个':
						date.setAsPreMonth();
						date.setAsPreMonth();
						break;
					case '下个':
					case '下':
						date.setAsNextMonth();
					break;
					case '下下个':
						date.setAsNextMonth();
						date.setAsNextMonth();
					break;
				}
			}else{
				var n = chineseStringToNumber(dateNumbers[name]);
				date.setMonth(n);
			}
		}else if(name==='date'){
			if(dateNumbers[name].match(new RegExp(locate))!==null){
				switch(dateNumbers[name]){
					case '昨':
						date.setAsPreDay()
						break;
					case '前':
						date.setAsPreDay()
						date.setAsPreDay()
						break;
					case '大前':
						date.setAsPreDay()
						date.setAsPreDay()
						date.setAsPreDay()
						break;
					case '明':
						date.setAsNextDay();
						break;
					case '后':
						date.setAsNextDay();
						date.setAsNextDay();
						break;
					case '大后':
						date.setAsNextDay();
						date.setAsNextDay();
						date.setAsNextDay();
						break;
				}
			}else{
				var n = chineseStringToNumber(dateNumbers[name]);
				date.setDate(n)				
			}
		}else if(name==='day'){
			var n;
			if(dateNumbers[name].match(new RegExp(locate)) !== null){
				n = chineseStringToNumber(dateNumbers[name].slice(2));
				switch(dateNumbers[name].slice(0,1)){
					case '上':
						date.setAsPreWeek();
						break;
					case '上上':
						date.setAsPreWeek();
						date.setAsPreWeek();
						break;
					case '下':
						date.setAsNextWeek();
						break;
					case '下下':
						date.setAsNextWeek();
						date.setAsNextWeek();
						break;
				}
			}else{
				n = chineseStringToNumber(dateNumbers[name].slice(1));
			}
			date.setDay(n);
		}else if(name==='hour'){
			var n;
			if(dateNumbers[name].match(new RegExp(dayBlock)) !== null){
				n = chineseStringToNumber(dateNumbers[name].slice(2));
				if(dateNumbers[name].match(new RegExp('(下午|晚上)'))){
					n+=12;
				}
			}else{
				n = chineseStringToNumber(dateNumbers[name]);
			}
			date.setHour(n);
		}else if(name==='minute'){
			var n = chineseStringToNumber(dateNumbers[name].slice(1));
			date.setMinute(n);
		}else if(name==='second'){
			var n = chineseStringToNumber(dateNumbers[name]);
			date.setSecond(n);
		}
	}
	return date.toSimpleString();
}
module.exports = fetchTime;

