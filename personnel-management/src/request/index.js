import axios from 'axios'

const serve = axios.create({
  baseURL:'https://mock.apifox.cn/m1/2436386-0-default',
  timeout:50000,
})

// 添加请求拦截器
serve.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
serve.interceptors.response.use(function (response) {
  if(response.data.code===200){
    return response.data;
  }
  console.error(response);
}, function (error) {

  return Promise.reject(error);
});
export default serve