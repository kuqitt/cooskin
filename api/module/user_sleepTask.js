const instance = require("../request");
module.exports = {
   async addTask(data){
    return instance.post('/user/UserTask/addTask',data);
  },

  async deleteTask(data){
   return instance.post('/user/UserTask/deleteTask',data)
  },
  async getTask(data){
    return instance.post('/user/UserTask/getTask',data)
   }
}