const{m} = require("./tool")

const diaryApi = require("../api/module/user_diary")
const cashbookApi = require("../api/module/user_cashbook")
const sleepTaskApi = require("../api/module/user_sleepTask")
const weatherMsgApi = require("../api/module/user_weather")
const ticketApi = require("../api/module/ticket")
const user = require("./user")
const { head } = require("request")
const dayjs = require("dayjs")

module.exports = {
  async help(msg){
    //msg全匹配

    msgText = msg.text()
    // console.log("help",msg.text());
    switch(msgText){
      case "功能":
        Tarray = [
          "1.日记",
          "2.记账本",
          "3.定时通知",
          "4.天气播报",
          "5.车票查询"
        ]
       T =  m('功能列表',Tarray)
      break;
      case "日记":
        Tarray = [
          "1.写日记",
          "格式：写日记 日期 事件 内容",
          "2.查看日记",
          "格式：查看日记 日期",
          "3.删除日记",
          "格式：删除日记 日期",

        ]
        T = m('日记功能',Tarray)
      break;
      case "记账本":
        Tarray = [
          "1.添加记账",
          "格式：添加记账 日期 名称 项目 金额",
          "2.查看账单",
          "格式：查看账单 日期",
          "3.删除账单",
          "格式：删除账单 日期",
          "4.月统计",
          "格式：月统计 日期"
        ]
        T = m('记账本功能',Tarray)
      break;
      case "定时通知":
        Tarray = [
          "1.设置通知",
          "格式：设置通知 日期 时间 事件",
          "2.查看通知",
          "格式：查看通知 日期",
          "3.删除通知",
          "格式：删除通知 日期"
        ]
        T = m('定时通知功能',Tarray)
      break;
      case "天气播报":
        Tarray = [
          "1.绑定城市",
          "格式：绑定城市 城市名",
          "2.天气",
          "格式：天气 城市名",
        ]
        T = m('天气播报功能',Tarray)
      break;
      case "车票查询":
        Tarray = [
          "1.余票查询",
          "格式：余票 日期 城市名 城市名",
          "2.车次查询",
          "格式：车次查询 日期 车次",
          "3.站站查询",
          "格式：站站查询 日期 城市名 城市名"
        ]
        T = m('车票查询功能',Tarray)
      default:
        T = m('Cooskin',['系统提示：无效命令'])
        msg.say(T)
        return true;
    }
    
    msg.say(T)
    return true;
  },
  //具体功能
  //日记
  //1.1 日记
  //1.1.1 格式：/日记 日期|事件|内容
  //1.1.2 添加日记：/添加日记 2023/10/08|萌芽开发机器人|今天突然想开发一个微信机器人来帮助我日常记录，说干就干。
  //1.1.3 删除日记：/删除日记 日期
  //1.1.4 查看日记：/查看日记 日期
  //1.1.5 日期格式：2023/10/08
  async diary(msg){
    // console.log("日记",msg.text(),'用户编号',msg.id,'用户信息',msg.payload);
    var userid = msg.payload.talkerId
    //日记功能
    msgText = msg.text()

    //将msgText匹配所有空格,并且替换为一个空格
    msgText = msgText.replace(/\s+/g," ")
    //msgTextsolit第一个
    msgTextArray = msgText.split(" ")
    console.log("msgTextArray",msgTextArray);
    //header
    header = msgTextArray[0]
    console.log('头',header);
    msgTextArray.shift()
    switch(header){
      case "写日记":
        //diaryArray长度大于3提示错误
        console.log(msgTextArray);
        if(msgTextArray.length!==3){
          T = m("写日记功能",["系统提示：写日记格式错误","格式：写日记 日期 事件 内容"])
          msg.say(T)
          return true;
        }
        date = msgTextArray[0]
        event_text = msgTextArray[1]
        content = msgTextArray[2]
        //请求接口
        data ={
          'userid':userid,
          'date':date,
          'event_text':event_text,
          'content':content
        }
        var result = await diaryApi.addDiary(data);
        console.log('result',result);
          Tarray = [
            "日期："+date,
            "事件："+event_text,
            "内容："+content,
            "状态" + ""
          ]
          if(result.code!=1){
            Tarray[3] = "状态：失败"
          }else{
            Tarray[3] = "状态：成功"
          }
          T = m("添加日记",Tarray)
        break;
      case "删除日记":
        //判断长度
        if(msgTextArray.length!==1){
          T = m("删除日记功能",["系统提示:删除日记格式错误","格式:删除日记 日期"])
          break;
        }
         date = msgTextArray[0]
         data = { 
          'userid':userid,
          'date':date
        }
         var result = await diaryApi.deleteDiary(data);
          console.log('result',result);
          Tarray = [
            "日期："+date,
            "状态" + ""
          ]
          if(result.code!=1){
            Tarray[1] = "状态：失败"
          }else{
            Tarray[1] = "状态：成功"
          }
          T = m("删除日记",Tarray)
      break;
      case "查看日记":
        console.log("进入查看日记");
        if(msgTextArray.length<2){
          T = m("查看日记功能",["系统提示:查看日记格式错误",'格式:/查看日记 开始日期 结束日期 页码'])
          break;
        }
        date = msgTextArray[0]
        date2 = msgTextArray[1]
        page = msgTextArray[2]??1
        data = { 
          'userid':userid,
          'date':date,
          'date2':date2,
          'page' :page
        }
        var result = await diaryApi.getDiary(data);
        console.log('result',result);

        Tarray = [
          "日期："+date+' - '+date2,
          "状态" + ""
        ]
        if(result.code!=1){
          Tarray[1] = "状态：失败"
        }else{
          Tarray[1] = "状态：成功\n"
          content_text ='';
        
          if(result.data.total>=1){
              result.data.items.forEach(element => {
                content_text+='事件：'+element.event_text+'\n'
                content_text+='内容：'+element.content+'\n'
                content_text+='时间：'+element.date+'\n'
                content_text+='\n'
              });
          }
          Tarray[2] =content_text
          Tarray[3] = "共"+result.data.total+'条'
          Tarray[4] = "共"+result.data.totalPage+'页'
        }
        T = m("查看日记",Tarray)
      break;
        default:
          return false;
    }
    msg.say(T)
    return true;
  },
    // 1.2 记账本
  //  1.2.1 格式：/[操作]记账 日期|名称|项目|金额
  //  1.2.2 查询记账：/查询记账 2023/10  或者 2023/10/08
  //   ps:【2023/10|月账单 2023/10/08|日账单】
  //  1.2.3 添加记账：/添加记账 2023/10/08|购买|服务器|2000
  //  1.2.4 删除记账：/删除记账 日期
  //  1.2.5 月统计：/月统计 2023/10
  //  1.2.6 日期格式：2023/10/08
  async cashbook(msg){
    var userid = msg.payload.talkerId
   //将msgText匹配所有空格,并且替换为一个空格
   msgText = msgText.replace(/\s+/g," ")
   //msgTextsolit第一个
   msgTextArray = msgText.split(" ")
   console.log("msgTextArray",msgTextArray);
   //header
   header = msgTextArray[0]
   console.log('头',header);
   msgTextArray.shift()
   switch(header){
      case "添加记账":
        //判断长度
        if(msgTextArray.length!==4){
          T = m("添加记账功能",["系统提示:添加记账格式错误","格式:添加记账 日期 名称 项目 金额"])
          break;
        }
        console.log("进入添加记账",msg.text());
        date = msgTextArray[0]
        let name = msgTextArray[1]
        let project = msgTextArray[2]
        let money = msgTextArray[3]

        data = {
          'userid':userid,
          'date':date,
          'name':name,
          'project_name':project,
          'amount':money
        }
        Tarray = [
          "日期："+date,
          "名称："+name,
          "项目："+project,
          "金额："+money,
          "状态" + ""
        ]
        var result = await cashbookApi.addCashbook(data);
        console.log('result',result);
        if(result.code!=1){
          Tarray[4] = "状态："+result.msg
        }else{
          Tarray[4] = "状态："+result.msg
        }
        T = m("添加记账",Tarray)
        break;
      case "删除记账":
        //判断长度
        if(msgTextArray.length!==1){
          T = m("删除记账功能",["系统提示:删除记账格式错误","格式:删除记账 日期"])
          break;
        }
         date = msgTextArray[0]
          data = {
            'userid':userid,
            'date':date
          }
          var result = await cashbookApi.deleteCashbook(data);
          console.log('result',result);
          Tarray = [
            "日期："+date,
            "状态" + ""
          ]
          if(result.code!=1){
            Tarray[1] = "状态："+result.msg
          }else{
            Tarray[1] = "状态："+result.msg
          }

        T = m("删除记账",Tarray)
        break;
      case "查询记账":
        //判断长度
        if(msgTextArray.length<2){
          T = m("查询记账功能",["系统提示:查询记账格式错误","格式:查询记账 开始日期 结束日期 页码"])
          break;
        }

        start_date = msgTextArray[0]
        end_date = msgTextArray[1]
        page = msgTextArray[2]??1
        data = {
          'userid':userid,
          'start_date':start_date,
          'end_date':end_date,
          'page':page
        }
        var result = await cashbookApi.getCashbook(data);
        console.log('result',result);
        Tarray = [
          "日期："+start_date+' - '+end_date,
          "状态" + ""
        ]
        if(result.code!=1){
          Tarray[1] = "状态："+result.msg
        }else{
          Tarray[1] = "状态："+result.msg
          content_text ='';

          if(result.data.total>=1){
              result.data.items.forEach(element => {
                content_text+='名称：'+element.name+'\n'
                content_text+='项目：'+element.project_name+'\n'
                content_text+='金额：'+element.amount+'\n'
                content_text+='时间：'+element.date+'\n'
                content_text+='\n'
              }
              );
          }
          Tarray[2] =content_text
          Tarray[3] = "共"+result.data.total+'条'
          Tarray[4] = "共"+result.data.totalPage+'页'
        }
        T = m("查询记账",Tarray)
        break;
      case "月统计":
        //判断长度
        if(msgTextArray.length!==1){
          T = m("月统计功能",["系统提示:月统计格式错误","格式:月统计 日期[年-月]"])
          break;
        }
        date = msgTextArray[0]
        data = {
          'userid':userid,
          'date':date
        }
        var result = await cashbookApi.getMonthCashbook(data);
        console.log('result',result);
        Tarray = [
          "日期："+date,
          "状态" + ""
        ]
        if(result.code!=1){
          Tarray[1] = "状态："+result.msg
        }else{
          Tarray[1] = "状态："+result.msg
          Tarray[2] ='总金额：'+result.data.total+'\n'
        }
        T = m("月统计",Tarray)
        break
      default:
          return false;
    }
    msg.say(T)
    return true;
  },


// 1.3 定时通知
//  1.3.1 格式：/通知 日期|时间|事件
// 	如：2023/10/08|16:30|叫我准备吃饭
//  1.3.2 查询通知：/查询通知  2023/10  或者 2023/10/08
// 	ps:【2023/10|当月所有通知 2023/10/08|当日所有通知】
//  1.3.3 添加通知：/添加通知 2023/10/08|16:30|叫我准备吃饭
//  1.3.4 删除通知：/删除通知 日期【2023/10/08|13:30】
async sleepTask(msg){
  var userid = msg.payload.talkerId
    //将msgText匹配所有空格,并且替换为一个空格
    msgText = msgText.replace(/\s+/g," ")
    //msgTextsolit第一个
    msgTextArray = msgText.split(" ")
    console.log("msgTextArray",msgTextArray);
    //header
    header = msgTextArray[0]
    console.log('头',header);
    msgTextArray.shift()
    switch(header){
      case "添加通知":
        //判断长度
        if(msgTextArray.length!==3){
          T = m("添加通知功能",["系统提示:添加通知格式错误","格式:添加通知 日期 时间 事件"])
          break;
        }
        date = msgTextArray[0]
        let time = msgTextArray[1]
        let event = msgTextArray[2]
        //请求接口
        data ={
          'userid':userid,
          'date':date,
          'hour':time,
          'event_text':event
        }
        var result = await sleepTaskApi.addTask(data);
        console.log('result',result);

          Tarray = [
            "日期："+date,
            "时间："+time,
            "事件："+event,
            '执行时间：'+date+" "+time,
            "状态" + ""
          ]
          if(result.code!=1){
            Tarray[4] = "状态："+result.msg
          }else{
            Tarray[4] = "状态："+result.msg
          }
        T = m("添加通知",Tarray)
        break;
      case "删除通知":
        //判断长度
        if(msgTextArray.length!==1){
          T = m("删除通知功能",["系统提示:删除通知格式错误","格式:删除通知 日期"])
          break;
        }

        date = msgTextArray[0]
        data = {
          'userid':userid,
          'date':date
        }
        var result = await sleepTaskApi.deleteTask(data);
        console.log('result',result);
        Tarray = [
          "日期："+date,
          "状态" + ""
        ]
        if(result.code!=1){
          Tarray[1] = "状态："+result.msg
        }else{
          Tarray[1] = "状态："+result.msg
        }
        T = m("删除通知",Tarray)
      break;
      case "查询通知":
        //判断长度
        if(msgTextArray.length<1){
          T = m("查询通知功能",["系统提示:查询通知格式错误","格式:查询通知 日期"])
          break;
        }

        date = msgTextArray[0]
        data = {
          'userid':userid,
          'date':date
        }
        var result = await sleepTaskApi.getTask(data);
        console.log('result',result);
        Tarray = [
          "日期："+date,
          "状态" + ""
        ]
        if(result.code!=1){
          Tarray[1] = "状态："+result.msg
        }else{
           Tarray[1] = "状态："+result.msg
           content_text ='';
           if(result.data.total>=1){
               result.data.items.forEach(element => {
                //时间戳转换 element.exec_time

                 exec_time = dayjs(element.exec_time*1000).format('YYYY-MM-DD HH:mm:ss')
                 content_text+='名称：'+element.event_text+'\n'
                 content_text+='执行状态：'+element.status+'\n'
                 content_text+='执行时间：'+exec_time+'\n'
                 content_text+='时间：'+element.date+'\n'
                 content_text+='\n'
               }
               );
           }
           Tarray[2] =content_text
           Tarray[3] = "共"+result.data.total+'条'
           Tarray[4] = "共"+result.data.totalPage+'页'
        }
        T = m("查询通知",Tarray)
      break;
      default:
          return false;
    }
    msg.say(T)
    return true;
  },

// 1.4 天气播报(第一次需要绑定)
//  1.4.1 格式：/天气 重庆 
//  1.4.2 格式：/城市绑定 重庆  
async weatherMsg(msg){
  var userid = msg.payload.talkerId
 //将msgText匹配所有空格,并且替换为一个空格
 msgText = msgText.replace(/\s+/g," ")
 //msgTextsolit第一个
 msgTextArray = msgText.split(" ")
 console.log("msgTextArray",msgTextArray);
 //header
 header = msgTextArray[0]
 console.log('头',header);
 msgTextArray.shift()
 switch(header){
    case "天气":
      weatherMsg =''
      if(msgTextArray.length>0){
        weatherMsg = msgTextArray[0]
      }
      data = {
        'userid':userid,
        'address':weatherMsg
      }
      var result = await weatherMsgApi.getWeather(data);
      console.log('result',result);
      if(result.code!=1){
        Tarray = [
          "系统提示："+result.msg,
        ]
        T = m("天气播报",Tarray)
        msg.say(T)
        return true;
      } 
      Tarray = [
        "城市："+result.data.province+result.data.city,
         result.data.content
      ]
      T = m("天气播报",Tarray)
      break;
    case "城市绑定":
      //判断长度
      if(msgTextArray.length!==1){
        T = m("城市绑定功能",["系统提示:城市绑定格式错误","格式:城市绑定 城市名"])
        break;
      }
       date = msgTextArray[0]
        data = {
          'userid':userid,
          'address':date
        }
        var result = await weatherMsgApi.bindAddress(data);
        console.log('result',result);
        Tarray = [
          "城市："+date,
          "状态" + ""
        ]
        if(result.code!=1){
          Tarray[1] = "状态："+result.msg
        }else{
          Tarray[1] = "状态："+result.msg
        }

      T = m("城市绑定",Tarray)
    break;
    default:
        return false;
  }
  msg.say(T)
  return true;
},
//1.5 车票查询
//1.5.1 余票查询 格式：车票 重庆 北京 2023-10-08 高铁
//1.5.2 车次查询 格式：车次查询 2023-10-08 G123
//1.5.3 站站查询 格式：车站查询 重庆 北京 2023-10-08 高铁
async ticket(msg){
  msgText = msgText.replace(/\s+/g," ")
  //msgTextsolit第一个
  msgTextArray = msgText.split(" ")
  console.log("msgTextArray",msgTextArray);
  //header
  header = msgTextArray[0]
  console.log('头',header);
  msgTextArray.shift()
  switch(header){
    case "余票":
      //判断长度
      if(msgTextArray.length!==3){
        T = m("余票查询功能",["系统提示:余票查询格式错误","格式:余票查询 日期 城市名 城市名"])
        break;
      }
      date = msgTextArray[0]
      city = msgTextArray[1]
      city2 = msgTextArray[2]
      data = {
        'date':date,
        'start':city,
        'end':city2
      }
      var result = await ticketApi.ticket(data);
      console.log('result',result);
      Tarray = [
        "日期："+date,
      ]
      if(result.code!=1){
        Tarray[1] = "状态："+result.msg

      }else{
        Tarray[1] = "状态："+result.msg
        content_text ='';
        Tarray[2] = "城市："+city+'-'+city2

        if(result.data.list.length>=1){
            result.data.list.forEach(element => {
              content_text+='车次：'+element.trainno+'\n'
              content_text+="类型："+element.typename+'\n'
              //departuretime，arrivaltime，costtime
              content_text+="出发时间："+element.departuretime+'\n'
              content_text+="到达时间："+element.arrivaltime+'\n'
              content_text+="历时："+element.costtime+'\n'
             
             //priceed，numed，priceyd，numyd，pricesw，numsw
              content_text+="二等座："+element.priceed+'元 '+'余：'+element.numed+'张'+'\n'
              content_text+="一等座："+element.priceyd+'元 '+'余：'+element.numyd+'张'+'\n'
              content_text+="商务座："+element.pricesw+'元 '+'余：'+element.numsw+'张'+'\n'
              content_text+='\n'
            }
            );
        }
        Tarray[3] =content_text
      }

      break;
    case "车次查询":
      //判断长度
      if(msgTextArray.length!==2){
        T = m("车次查询功能",["系统提示:车次查询格式错误","格式:车次查询 日期 车次"])
        break;
      }
      date = msgTextArray[0]
      trainno = msgTextArray[1]
      data = {
        'date':date,
        'trainno':trainno
      }
      var result = await ticketApi.train(data);
      console.log('result',result);
      Tarray = [
        "日期："+date,
      ]
      if(result.code!=1){
        Tarray[1] = "状态："+result.msg
      }else{
        Tarray[1] = "状态："+result.msg
        content_text ='';
        Tarray[2] = "车次："+trainno
        Tarray[3] = result.data.startstation+'-'+result.data.endstation
        Tarray[4] = "类型："+result.data.typename
        Tarray[5] =content_text
      }
      break;
    case "站站查询":
      //判断长度
      if(msgTextArray.length!==3){
        T = m("站站查询功能",["系统提示:站站查询格式错误","格式:站站查询 日期 城市名 城市名"])
        break;
      }
      date = msgTextArray[0]
      city = msgTextArray[1]
      city2 = msgTextArray[2]
      data = {
        'date':date,
        'start':city,
        'end':city2
      }
      var result = await ticketApi.station(data);

      console.log('result',result);
      Tarray = [
        "日期："+date,
      ]
      if(result.code!=1){
        Tarray[1] = "状态："+result.msg
      }else{
        Tarray[1] = "状态："+result.msg
        content_text ='';
        Tarray[2] = "城市："+city+'-'+city2
        if(result.data.list.length>=1){
            result.data.list.forEach(element => {
              content_text+='车次：'+element.trainno+'\n'
              content_text+="类型："+element.typename+'\n'
              //station，endstation
              content_text+="出发站："+element.station+'\n'
              content_text+="到达站："+element.endstation+'\n'
              //departuretime，arrivaltime，costtime
              content_text+="出发时间："+element.departuretime+'\n'
              content_text+="到达时间："+element.arrivaltime+'\n'
              content_text+="历时："+element.costtime+'\n'
             
             //priceed，numed，priceyd，numyd，pricesw，numsw
              content_text+="二等座："+element.priceed+'元 '+'\n'
              content_text+="一等座："+element.priceyd+'元 '+'\n'
              content_text+="商务座："+element.pricesw+'元 '+'\n'
            }
            );
        }
        Tarray[3] =content_text
      }
        break;
        default:
          return false;
    }
    msg.say(T)
      return true;
  }


}