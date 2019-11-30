var dev = 'http://192.168.1.77:8899';   
//var dev  = "http://192.168.1.41:8899";
//var dev  = "http://yecl.lxcyhd.com";
//var dev = 'http://192.168.1.11:8899';          //本地*/
var pro = 'https://wms.ebiaoji.com';
var ip = pro;

var api = {
  getOpenId: ip + '/wap/wechat/getOpenId',  //公用获取openid

  siji: {
    loginByPlateNo: ip + '/wap/driver/loginByPlateNo',  //司机登录
    createQqueueUpInfo: ip + '/wap/driver/createQqueueUpInfo',  //创建排队纪录
    getQuequeRecord: ip + '/wap/driver/getQuequeRecord',  //获取出库入库排队单 
    getQueueList: ip + '/wap/driver/getQueueList',  //获取历史排队记录  
    getBillDetail: ip + '/wap/driver/getBillDetail',  //获取关联单据详情
    confirmAction: ip + '/wap/driver/confirmAction',  //司机确认操作【装车/送达】
    getBillItemLi: ip + '/wap/driver/getBillItemLi',  //获取单据Item列表
    getQueueDetailById: ip + '/wap/driver/getQueueDetailById',  //根据排队记录id，获取排队详情
    getDriverByOpenId: ip + '/wap/driver/getDriverByOpenId',  //通过openId获取司机信息
    
    validateCode: ip + '/wap/gatekeeper/validateCode',  //校验排队二维码
  },

  menwei: {
    login: ip + '/wap/gatekeeper/login',  //登录
    getHistoryQueueRecord: ip + '/wap/gatekeeper/getHistoryQueueRecord',  //获取历史排队纪录
    getParkList: ip + '/wap/gatekeeper/getParkList',  //获取园区
    getQueueEvolutionList: ip + '/wap/gatekeeper/getQueueEvolutionList',  //获取园区排队纪录
    getCode: ip + '/wap/gatekeeper/getCode',  //获取二维码
    letPass: ip + '/wap/gatekeeper/letPass',  //门卫放行操作
    getInfoByOpenId: ip + '/wap/gatekeeper/getInfoByOpenId',  //通过openId用户获取相关信息
    logout: ip + '/wap/gatekeeper/logout',  //退出登录
    
  }
}

module.exports = {
  api: api,
}