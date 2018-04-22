import axios from 'axios'

const service = axios.create({
  withCredentials: true,
  headers:{'content-type':'application/json'},
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000                  // 请求超时时间
})