
import fetch from '../untils/fetch.js'

// export const getMsgCode= function(params){ return instance.get('/sms/send',{params:params});};//用款列表

export function getList(params) {
  return fetch({
    url: '/app/project/page',
    method: 'get',
    params:params
	})
}


export function login(params) {
  return fetch({
    url: '/app/user/login',
    method: 'post',
    data:params
  })
}
//项目详情
export function getDetial(params) {
  return fetch({
    url: '/app/project/detail',
    method: 'get',
    params:params
  })
}

export function getImage() {
  return fetch({
    url: '/backend/captcha/image',
    method: 'get',
  })
}

//项目下注
export function bet(params) {
  return fetch({
    url: '/app/project/bet',
    method: 'post',
    data:JSON.stringify(params)
  })
}

//流水
export function record(params) {
  return fetch({
    url: '/app/user/record',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function getMsgCode(params) {
  return fetch({
    url: '/sms/send',
    method: 'get',
    params:params
  })
}

export function refresh(params) {
  return fetch({
    url: '/app/project/Odds',
    method: 'get',
    params:params
  })
}
