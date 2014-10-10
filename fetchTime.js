var SimpleDate = require('./SimpleDate')
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
	patts.push(new RegExp('(('+yearNumbers+'|'+locate+')年)?(('+otherNumbers+'|'+locate+')月)?(('+otherNumbers+'|'+locate+')[日号天])?(('+otherNumbers+')[时点])?(('+otherNumbers+')分)?(('+otherNumbers+')秒)?'));
	// 1.同上但是支持省略分单位 例如：三点四十
	patts.push(new RegExp('(('+yearNumbers+'|'+locate+')年)?(('+otherNumbers+'|'+locate+')月)?(('+otherNumbers+'|'+locate+')[日号天])?('+otherNumbers+')[时点]('+otherNumbers+')'));
	// 2,匹配一段之间以后”三天后“，一年零七个月后
	patts.push(new RegExp('('+otherNumbers+')('+timeBUnits+')('+otherNumbers+')('+timeBUnits+')('+offset+')'));
	// 3,含有周的格式 周一周二 几点几分
	patts.push(new RegExp('('+locate+')?周('+weekNumber+')(('+otherNumbers+')[时点])?(('+otherNumbers+')分)?(('+otherNumbers+')秒)?'));
	// 4,含有周的格式 周一周二 几点几
	patts.push(new RegExp('('+locate+')?周('+weekNumber+')'+'('+otherNumbers+')[时点]('+otherNumbers+')'));

	var result = '';
	for(index in patts){
		if (nl.match(patts[index])){
			r =  nl.match(patts[index])[0];
			if(r>result){
				console.log(index);
				result = r;
			}
		}
	}
	return result;
}
// 将一到两位的中文数字转换成数字
var chineseStringToNumber = function(cns){
	var numbers = {'零':0 ,'一':1 ,'二':2 ,'三':3 ,'四':4 ,'五':5 ,'六':6 ,'七':7,'八':8 ,'九':9 ,'十':10,'半':30};
	// 个位数
	var singleDigit = "一二三四五六七八九半"
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
// // 将单个中文数字转化为数字
// var chineseCharToNumber = function(cn){
// 	var numbers = {'零':0 ,'一':1 ,'二':2 ,'三':3 ,'四':4 ,'五':5 ,'六':6 ,'七':7,'八':8 ,'九':9 ,'十':10};
// 	console.log(numbers[cn]);
// 	return numbers[cn];
// }
var languageToDate1 = function(nlt){
	// 用来提取年月数字字段的正则表达式
	var patts = {};
	// 存储提取出来的年月数字
	var dateNumbers = {};
	// 日期对象
	var date = new SimpleDate();

	patts.year = new RegExp('['+numbers+']{2,4}(?=年)');
	patts.month = new RegExp('['+numbers+']{1,3}(?=月)');
	patts.date = new RegExp('['+numbers+']{1,3}(?=[日号])');
	patts.hour = new RegExp('['+numbers+']{1,3}(?=[时点])');
	patts.minute = new RegExp('[时点](['+numbers+']{1,3}|半)');
	patts.second = new RegExp('['+numbers+']{1,3}(?=秒)');
	// 将提取出来的日期数字存贮起来
	for(var name in patts){
		var str = patts[name].exec(nlt);
		if (str){
			dateNumbers[name] = str[0];
			console.log(str);
		}
	}
	// 将日期数字装换成阿拉伯数字并且生成数字对象
	for(var name in dateNumbers){
		if(name==='year'){
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
			console.log(num+"年");
		}else if(name==='month'){
			var n = chineseStringToNumber(dateNumbers[name]);
			date.setMonth(n);
			console.log(n+"月");
		}else if(name==='date'){
			var n = chineseStringToNumber(dateNumbers[name]);
			date.setDate(n)
			console.log(n+"日");
		}else if(name==='hour'){
			var n = chineseStringToNumber(dateNumbers[name]);
			date.setHour(n);
			console.log(n+"点");
		}else if(name==='minute'){
			var n = chineseStringToNumber(dateNumbers[name].slice(1));
			date.setMinute(n);
			console.log(n+"分");
		}else if(name==='second'){
			var n = chineseStringToNumber(dateNumbers[name]);
			date.setSecond(n);
			console.log(n+"秒");
		}
	}
	return date;
}

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

