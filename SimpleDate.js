var SimpleDate = function(){
	SimpleDate.prototype.lSecond = 1000;
	SimpleDate.prototype.lMinute = 60000;
	SimpleDate.prototype.lHour = 3600000;
	SimpleDate.prototype.lDay = 86400000;
	SimpleDate.prototype.lWeek = 604800000;
	
	this.date = new Date()
	this.getYear = function(){return this.date.getFullYear();}
	this.setYear = function(year){return this.date.setFullYear(year)}
	this.getMonth = function(){return this.date.getMonth()+1}
	this.setMonth = function(month){return this.date.setMonth(month-1)}
	this.getTime = function(){return this.date.getTime()}
	this.setTime = function(time){return this.date.setTime(time)}
	this.getWeek = function(){
		var dateOfMonday = new SimpleDate();
		var delta = (this.date.getDay() - 1)
		if(delta==-1)
			delta+=7;
		dateOfMonday.setTime(this.date.getTime()-delta*this.lDay);
		return {
			year:dateOfMonday.getYear(),
			month:dateOfMonday.getMonth(),
			date:dateOfMonday.getDate()
		}
	}
	
	this.setWeek = function(year,month,date){this.date.setFullYear(year, (month-1), date)}
	this.getDate = function(){return this.date.getDate()}
	this.setDate = function(date){return this.date.setDate(date)}
	this.getDay = function(){return this.date.getDay()}
	this.getHour = function(){return this.date.getHours()}
	this.setHour = function(hour){return this.date.setHours(hour)}
	this.getMinute = function(){return this.date.getMinutes()}
	this.setMinute = function(minute){return this.date.setMinutes(minute)}
	this.getSecond = function(){return this.date.getSeconds()}
	this.setSecond = function(second){return this.date.setSeconds(minute)}
	this.setAsNextYear = function(){this.date.setFullYear(this.date.getFullYear()+1);}
	this.setAsPreYear = function(){this.date.setFullYear(this.date.getFullYear()-1);}
	this.setAsNextMonth = function(){
		var month = this.date.getMonth();
		month++;
		if(month>=12){
			this.setAsNextYear();
			month = 0;
		}
		this.date.setMonth(month);
	}
	this.setAsPreMonth = function(){
		var month = this.date.getMonth();
		month--;
		if(month<=-1){
			this.setAsPreYear();
			month = 11;
		}
		this.date.setMonth(month);
	}
	this.setAsNextWeek = function(){
		this.date.setTime(this.date.getTime()+this.lWeek);
	}
	this.setAsPreWeek = function(){
		this.date.setTime(this.date.getTime()-this.lWeek);
	}
	this.setAsNextDay = function(){
		this.date.setTime(this.date.getTime()+this.lDay);
	}
	this.setAsPreDay = function(){
		this.date.setTime(this.date.getTime()-this.lDay);
	}
	this.toString = function(){return ("year:"+this.getYear()+",month:"+this.getMonth()+",date:"+this.getDate())}
	this.toSimpleString = function(){return (+this.getYear()+"-"+this.getMonth()+"-"+this.getDate()+"-"+this.getHour()+"-"+this.getMinute()+"-"+this.getSecond())}
}
module.exports = SimpleDate;