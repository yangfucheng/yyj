
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
    method: 'get',
    params:params
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
//钱包
export function wallet(params) {
  return fetch({
    url: '/app/user/wallet',
    method: 'get',
    params:params
  })
}

//充值
export function recharge(params) {
  return fetch({
    url: '/app/user/gxsRecharge',
    method: 'post',
    data:JSON.stringify(params)
  })
}

//个人信息
export function info(params) {
  return fetch({
    url: '/app/user/info',
    method: 'get',
    params:params
  })
}

//获取用户自己的收益及排行
export function list_self(params) {
  return fetch({
    url: '/app/user/userIncome',
    method: 'get',
    params:params
  })
}

//获取所有用户的收益排行前10
export function list_all(params) {
  return fetch({
    url: '/app/rank/income',
    method: 'get',
    params:params
  })
}



