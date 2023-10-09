const {WechatyBuilder} = require("wechaty") // Wechaty核心包
const {PuppetPadlocal} = require('wechaty-puppet-padlocal')
const config = require("./config") // 配置文件
const onScan = require("./onScan")
const onRoomJoin = require("./onRoomJoin")
const onMessage = require("./onMessage")
const onFriendShip = require("./onFriendShip")
const user = require('./user')
// 初始化
const puppet = new PuppetPadlocal({ 
  token: "puppet_padlocal_0681c5c3c0234e89bb4fc9adb06dc913" 
}) 
const bot = WechatyBuilder.build({
  puppet:puppet,
  name: config.name,
})

bot
  .on("scan", onScan) // 机器人需要扫描二维码时监听
  .on("room-join", onRoomJoin) // 加入房间监听
  .on("message", onMessage(bot)) // 消息监听
  .on('login', user)
  .on("friendship", onFriendShip) // 好友添加监听

bot.start().catch(reason => {
  console.log(reason);
})