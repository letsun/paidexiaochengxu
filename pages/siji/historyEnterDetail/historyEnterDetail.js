// pages/siji/historyEnterDetail/historyEnterDetail.js

//引入接口页面
var api = require("../../../utils/api.js");
var fun = require("../../../utils/function.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      queueCodeRecordId:options.queueCodeRecordId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.getQueueDetailById()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },



  /**
   * 根据排队记录id，获取排队详情
   */

    getQueueDetailById(){
      var that = this;
      fun.getData(api.api.siji.getQueueDetailById, 'GET', {
        queueCodeRdId:that.data.queueCodeRecordId,
      }, (res) => {
        if (res.data.code == 200) {
          var result = res.data.result;
          that.setData({
            result:result
          })
        } else {
          fun.showToast(res.data.message, 'none', (success) => { })
        }
      })
  
    }
})