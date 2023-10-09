const instance = require("../request");
module.exports = {
   async addDiary(data){
    return instance.post('/user/UserDiary/addDiary',data);
  },
  async getDiary(data){
    return instance.post('/user/UserDiary/getDiary',data)
  },
  async deleteDiary(data){
   return instance.post('/user/UserDiary/deleteDiary',data)
  }
}


//  * @param {Object} msg 消息对象
//  * @return {Boolean} 是否是加群指令
//  */
