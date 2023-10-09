const instance = require("../request");
module.exports = {
   async station(data){ //获取车站
    return instance.post('/user/TrainTickets/station',data);
  },
  async train(data){ //获取车次
   return instance.post('/user/TrainTickets/train',data)
  },
  async ticket(data){ //获取车票
    return instance.post('/user/TrainTickets/ticket',data)
   }
}