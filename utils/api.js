//var dev = 'http://192.168.1.77:8899';   
//var dev  = "http://192.168.1.41:8899";
//var dev  = "http://yecl.lxcyhd.com";
var dev = 'http://192.168.1.11:8899';          //本地*/
var test = 'https://wms.ebiaoji.com';
var pro = 'https://wms.pd-kj.com/';
var ip = test;

var api = {
  getOpenId: ip + '/wap/wechat/getOpenId',  //公用获取openid
  getImage: ip + '/wap/fileUpload/image',  //图片上传
  

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
    getDriverPickupCommission: ip + '/wap/driver/getDriverPickupCommission',  //司机获取提货委托书列表【泛糖排队小程序】
    getDallyCommissionPickup: ip + '/wap/driver/getDallyCommissionPickup',  //理货员获取提货委托书列表【泛糖排队小程序】
    submitQueueApply: ip + '/wap/driver/submitQueueApply',  //提交申请排队
     
    getDriverById: ip + '/wap/driver/getDriverById',  //获取司机信息  
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
    
  },

  huozhu: {
    accountInfoQuery: ip + '/api/pda/baseQueryController/accountInfoQuery', //个人中心信息
    customerHomePage: ip + '/api/pda/baseQueryController/customerHomePage', //货主信息首页
    findOutAllocationPage: ip + '/api/pda/outAllocationMain/findOutAllocationPage', //销售分配列表
    findOutAllocationDetail: ip + '/api/pda/outAllocationMain/findOutAllocationDetail', //销售分配详情
    addQueuePickupMain: ip + '/api/pda/queuePickupCommissionMain/addQueuePickupMain', //销售分配新增

    
    findPickupMainPage: ip + '/api/pda/queuePickupCommissionMain/findPickupMainPage', //提货委托列表、
    getPickupMainDetail: ip + '/api/pda/queuePickupCommissionMain/getPickupMainDetail', //提货委托详情
    updateQueuePickupMain: ip + '/api/pda/queuePickupCommissionMain/updateQueuePickupMain', //提货委托编辑
    getChangeList: ip + '/api/pda/queuePickupAdjust/getChangeList', //提货人变更记录 
   
     
    findPickupItemPage: ip + '/api/pda/queuePickupCommissionItem/findPickupItemPage', //信息调度列表
    getPickupItemDetail: ip + '/api/pda/queuePickupCommissionItem/getPickupItemDetail', //调度信息详情 
    addAdjust: ip + '/api/pda/queuePickupAdjust/addAdjust', //调度信息编辑  
     
  },

  chuyunke: {
    getPickupItemDetail: ip + '/api/queue/pickupDispatch/getPickupByTime', //储运科首页 
    addPickupTime: ip + '/api/queue/pickupDispatch/addPickupTime', //修改今日产量
    getPickupRecord: ip + '/api/queue/pickupDispatch/getPickupRecord', //调度申请列表  
    releaseSchedule: ip + '/api/queue/pickupDispatch/releaseSchedule', //调度发布  
     
    deleteSchedule: ip + '/api/queue/pickupDispatch/deleteSchedule', //删除调度信息
    getAdjustRecord: ip + '/api/queue/pickupTask/getAdjustRecord', //提货人变更审核列表  
    getAdjustDetail: ip + '/api/queue/pickupTask/getAdjustDetail', //提货人变更详情
    submitAdjustCheck: ip + '/api/queue/pickupTask/submitAdjustCheck', //提货人审核申请 
    pickupCommission: ip + '/api/pickupCommission', //提货人变更申请
    getDriverRecord: ip + '/api/queue/pickupTask/getDriverRecord', //司机审核列表
    getDriverRecordDetail: ip + '/api/queue/pickupTask/getDriverRecordDetail', //司机审核详情
    updateDriverRecordStatus: ip + '/api/queue/pickupTask/updateDriverRecordStatus', //司机申请审核
    control: ip + '/api/queue/queueControl/control', //暂停启动排队
    getControlHistory: ip + '/api/queue/queueControl/getControlHistory', //获取排队控制历史       
  }
}

module.exports = {
  api: api,
}