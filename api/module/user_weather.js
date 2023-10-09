const instance = require("../request");
module.exports = {
   async getWeather(data){
    return instance.post('/user/UserWeather/getWeather',data);
  },

  async bindAddress(data){
   return instance.post('/user/UserWeather/bindAddress',data)
  }
}