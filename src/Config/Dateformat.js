export  function dateFormat(date,date_format='yyyy-mm-dd',time_want=false){

	if(!date){
		return "";
	}
	
	var value_date,hour,min,sec,month,fulltime;
		value_date = new Date(date);
		if(value_date.getDate() < 10 ){
			date = '0' + value_date.getDate();
		}else{
			date = value_date.getDate();
		}
		 month = parseInt(value_date.getMonth()) + 1;
		if(month < 10 ){
			month = '0' + month;
		}else{
			month = value_date.getMonth();
			month = parseInt(month)+1;
		}
		if(time_want){
			if(value_date.getHours() < 10 ){
				hour = '0' + value_date.getHours();
			}else{
				hour = value_date.getHours();
			}

			if(value_date.getMinutes() < 10 ){
				min = '0' + value_date.getMinutes();
			}else{
				min = value_date.getMinutes();
			}

			if(value_date.getSeconds() < 10 ){
				sec = '0' + value_date.getSeconds();
			}else{
				sec = value_date.getSeconds();
			}
			fulltime = hour + ":" + min + ":" + sec;
			if(date_format=='yyyy-mm-dd'){
				value_date = value_date.getFullYear() + "-" + month + "-" + date +  " "  + fulltime;
			}else if(date_format =='yyyy/mm/dd'){
				value_date = value_date.getFullYear() + "/" + month + "/" + date +  " "  + fulltime;
			}else if(date_format =='dd/mm/yyyy'){
				value_date = date + "/" + month + "/" +  value_date.getFullYear()  +  " "  + fulltime ;
			}
			
			
		}else{
			if(date_format=='yyyy-mm-dd'){
				value_date = value_date.getFullYear() + "-" + month + "-" + date;	
			}else if(date_format=='yyyy/mm/dd'){
				value_date = value_date.getFullYear() + "/" + month + "/" + date;	
			}else if(date_format=='dd/mm/yyyy'){
				value_date =  date + "/" + month + "/" + value_date.getFullYear();	
			}
			
		}
		
	return value_date;
}

export function date_diff_indays(date1, date2) {
	let dt1 = new Date(date1);
	let dt2 = new Date(date2);
	return Math.floor(
			(
				Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) 
					- 
				Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())
			)
			/
			(1000 * 60 * 60 * 24)
	);
}

export function back_to_month(month,first_date = true){
	let dateM = new Date()
	dateM.setMonth(dateM.getMonth()-month)
	if(first_date){
		dateM.setDate(1);
	}
	return dateM
}

export function dateFormatToString(date){
	let date_format ='yyyy-mm-dd',time_want=true;
	return dateFormat(date,date_format,time_want).split(' ').join('-');
}