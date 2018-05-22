export function getTextById(obj,value){
  if(value === undefined ||  value === null || value === '' || !/^-?\d+$/.test(value)){
    return ''
  }
  for(let i in obj){
    if(obj[i].id == value){
      return obj[i].text
    }
  }
  return ''
}


export function timestampToTime(timestamp) {
	if(timestamp){
        let date = new Date(timestamp);  
        let y = date.getFullYear();  
        let MM = date.getMonth() + 1;  
        MM = MM < 10 ? ('0' + MM) : MM;  
        let d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        let h = date.getHours();  
        h = h < 10 ? ('0' + h) : h;  
        let m = date.getMinutes();  
        m = m < 10 ? ('0' + m) : m;  
        let s = date.getSeconds();  
        s = s < 10 ? ('0' + s) : s;  
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s; 
    }else{
    	return ''
    }
}