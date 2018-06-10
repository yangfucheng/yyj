
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
    url: '/app/user/walletList',
    method: 'get',
    params:params
  })
}

//充值
export function recharge(params) {
  return fetch({
    url: '/app/user/recharge',
    method: 'post',
    data:JSON.stringify(params)
  })
}

//钱包详情
export function walletDetail(params) {
  return fetch({
    url: '/app/user/walletDetail',
    method: 'get',
    params:params,
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

//排行榜
export function getRank(params) {
  return fetch({
    url: '/app/rank/income/'+params,
    method: 'get',
  })
}

// export function guafen(params) {
//   return fetch({
//     url: '/app/rank/income/'+params,
//     method: 'get',
//   })
// }

//个人收益及排名
export function getUserRank(params) {
  return fetch({
    url: '/app/user/userIncome/'+params,
    method: 'get',
  })
}

//修改昵称
export function changeName(params) {
  return fetch({
    url:'/app/user/updateUserName',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function inviteCode(params) {
  return fetch({
    url:'/app/invite/save',
    method: 'post',
    data:JSON.stringify(params)
  })
}


export function upload(params) {
  return fetch({
    url:'/app/user/update/photoe',
    method: 'post',
    data:params
  })
}

export function invite(params) {
  return fetch({
    url:'/app/invite/info',
    method: 'get',
    params:params
  })
}
