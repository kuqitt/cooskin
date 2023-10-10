module.exports = {
  // puppet_padplus Token
  
  token: "puppet_padlocal_**********************",
  // 你的机器人名字
  name: "PadLocalDemo",
  // 房间/群聊
  room: {
    // 管理群组列表
    roomList: {
    },
    // 加入房间回复
    roomJoinReply: `你好，欢迎加入`
  },
  // 私人
  personal: {
    // 好友验证自动通过关键字
    addFriendKeywords: ['cooskin'],
    // 是否开启加群
    addRoom: false
  },
  apiUrl:{
    //线上请求地址
    local:'http://localhost:8888',
    online:'http://***.***.***.***',
    type :'online' //local 本地  online 线上
  }
}