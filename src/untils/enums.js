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