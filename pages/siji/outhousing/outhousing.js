// pages/siji/outhousing/outhousing.js

//引入接口页面
var api = require("../../../utils/api.js");
var fun = require("../../../utils/function.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfalg:true
    // codeType: '2',
    // driverId: 'd00d42f1e7df41fbb37dcf956b103c01',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this;

    that.setData({
      codeType: options.queueType,
      driverId: options.driverId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },


  onShow() {
    //获取排队单号
    var that = this;
    fun.getData(api.api.siji.getQuequeRecord, 'GET', {
      codeType: that.data.codeType, //that.data.code
      driverId: that.data.driverId,


    }, (res) => {
      if (res.data.code == 200) {

        var result = res.data.result;

        //var billId = res.data.billId.substring(0,1);
        //console.log(billId)
        that.setData({
          result: result,
          parkId: result.parkId
        })

        // var showmodal = function(){
        var showmodal = content => {
          wx.showModal({
            title: '放行提示',
            content: content, //'仓库已放行，请及时联系门卫放行'
            confirmColor: '#fd7d00',
            showCancel: false,
            confirmText: '我知道了'
          })
        }


        if(result.status == 0) {
          that.setData({
            status:"已排队"
          })
        } else if (result.status == 1){
          that.setData({
            status: "仓管已放行,待进场"
          })
        } else if (result.status == 2) {
          that.setData({
            status: "已进场"
          })
        } else if (result.status == 3) {
          that.setData({
            status: "已过空磅/已过重磅"
          })
        } else if (result.status == 4) {
          that.setData({
            status: "已作业"
          })
        } else if (result.status == 5) {
          that.setData({
            status: "已过重磅/已过空磅"
          })
        } else if (result.status == 6) {
          that.setData({
            status: "门卫放行"
          })
        }

        // if (result.status == 6) {
        //   showmodal('仓库已放行，请及时联系门卫放行');
        // }
      } else {

        if (res.data.message !="暂无入库排队单") {
          fun.showToast(res.data.message, 'none', (success) => { })
        }
        
      }

      if(res.data.code== 500) {

        that.setData({
          isfalg:false
        })
      }
    })
  },

  /**
   *点击刷新排队单号
   */
  refresh() {
    this.onShow();
  },


  /**
   *跳转到历史排队记录
   */
  getQueueList() {
    var that = this;
    wx.navigateTo({
      url: '../../siji/queueRecord/queueRecord?codeType=' + that.data.codeType + '&driverId=' + that.data.driverId + '&parkId=' + that.data.parkId,

    })
  },


  /**
   *跳转到单据详情
   */
  getBillDetail() {
    var that = this;
    wx.navigateTo({
      url: '../../siji/historyOutDetail/historyOutDetail?billId=' + that.data.result.billId + '&billType=' + that.data.result.billType + '&type=' + 1,
    })
  },

  /**
   *跳转到个人中心
   */

  personal() {
    let that = this;
    wx.navigateTo({
      url: '../../siji/personal/personal?driverId=' + that.data.driverId
    })
  }




})