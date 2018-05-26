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

export function getTextByName(obj,value){
  for(let i in obj){
    if(obj[i].name == value){
      return obj[i].text || ''
    }
  }
  return ''
}

export const recodeDec= {
  Buy:{id:0,name:'bet',text:'买入支付'},
  Award:{id:1,name:'award',text:'获胜奖励'},
  AirDrop:{id:2,name:'air_drop',text:'空投奖励'},
  Recharge:{id:3,name:'recharge',text:'充值'},
  TiXian:{id:4,name:'tixian',text:'提现'}
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

export function timestampTodate(timestamp) {
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
        return y + '-' + MM + '-' + d ; 
    }else{
      return ''
    }
}


export function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

export function numTampTofloat(value){
     
      parseFloat(value);
}





