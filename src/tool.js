module.exports = {
  m(head,msg){
    T = "====="+head+"=====\n"
    //检测msg是否为数组
    if(msg instanceof Array){
      msg.forEach(function(value){
        T+= value+"\n"
      })
    }else{
        T+= msg
    }
    T+="=====公益工具 功能====="

    return T;
  }
}