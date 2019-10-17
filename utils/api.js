var dev  = "127.0.0.1:8080";
var test = "";
var ip =  dev;


var api = {
  getOpenId: ip + '/wap/wechat/getOpenId',  //公用获取openid

  siji: {
    submitPlateNo: ip + '/wap/driver/submitPlateNo',  //录入车牌
    getQuequeRecord: ip + '/wap/driver/getQuequeRecord',  //获取出库入库排队单 
  },

  menwei: {
    login: ip + '/wap/gatekeeper/login',  //登录
    getHistoryQueueRecord: ip + '/wap/gatekeeper/getHistoryQueueRecord',  //获取历史排队纪录
    getParkList: ip + '/wap/gatekeeper/getParkList',  //获取园区
    getQueueEvolutionList: ip + '/wap/gatekeeper/getQueueEvolutionList',  //获取园区排队纪录
    getCode: ip + '/wap/gatekeeper/getCode',  //获取二维码
  }
}

module.exports = {
  api: api,
}