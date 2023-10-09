//引入axios,方法getUser,请求接口/user/user/getUser
// const axios = require('axios')
// const config = require("../../src/config") // 配置文件
const instance = require("../request");

module.exports = {
   async getUser(id){
    console.log('进入请求用户信息',id);
    return instance.post('/user/user/getUser',{
      userid:id
    });
  }
}


//  * @param {Object} msg 消息对象
//  * @return {Boolean} 是否是加群指令
//  */
