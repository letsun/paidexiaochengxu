//引入接口页面
var api = require("../../../utils/api.js");
// pages/siji/warehousing/warehousing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isShow: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取入库【或出库】排队单
    // wx.request({
    //   url: api.siji.getQuequeRecord,
    //   data: {
    //     codeType: 1,   //排队类型,1：入库 2：出库
    //     driverId: '5' //driverId,string	司机id
    //   },
    //   success: function (res) {

    //   }
    // })

  },
  // closeCover: function(){
  //   this.setData({
  //     isShow: false
  //   })
  // }

})