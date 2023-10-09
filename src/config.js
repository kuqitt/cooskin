module.exports = {
  // puppet_padplus Token
  token: "puppet_padlocal_0681c5c3c0234e89bb4fc9adb06dc913",
  // 你的机器人名字
  name: "PadLocalDemo",
  // 房间/群聊
  room: {
    // 管理群组列表
    roomList: {
      // 群名字(用于发送群名字加群):群id，后面会介绍到
      // Web圈: "*****@chatroom",
      // 男神群: "*****@chatroom"
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
    online:'http://localhost:8888',
  }
}