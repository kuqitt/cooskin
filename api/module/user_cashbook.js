const instance = require("../request");
module.exports = {
   async addCashbook(data){
    return instance.post('/user/UserCashbook/addCashbook',data);
  },
  async getCashbook(data){
    return instance.post('/user/UserCashbook/getCashbook',data)
  },
  async deleteCashbook(data){
   return instance.post('/user/UserCashbook/deleteCashbook',data)
  },
  async getMonthCashbook(data){
    return instance.post('/user/UserCashbook/getMonthCashbook',data)
   }
}