const axios = require('axios');

const config = require('../src/config'); // 配置文件

// 创建一个独立的axios实例
if(config.apiUrl.type == 'online'){
  baseURL = config.apiUrl.online
}else{
  baseURL = config.apiUrl.local
}
const service = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  timeout: 6000,
  withCredentials: true,
});

/**
 * 请求拦截
 */
service.interceptors.request.use((config) => {
  const headers = {
    // token: 'admin',
  };

  Object.assign(config.headers, headers);

  config.params = config.params || {};

  Object.assign(config.params, {
    t: Date.now(),
    // platform: 'pc', // 平台标识
  });
  return config;
});

/**
 * 返回拦截
 */
service.interceptors.response.use(
  (response) => {
    return Promise.resolve(JSON.parse(response.data));
  },
  (error) => {
    return Promise.reject(error);
  }
);
module.exports = service;