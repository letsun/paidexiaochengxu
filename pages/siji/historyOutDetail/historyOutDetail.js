// pages/siji/historyOutDetail/historyOutDetail.js

//引入接口页面
var api = require("../../../utils/api.js");
var fun = require("../../../utils/function.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // billId: "e15dacd05f954d42adae389627370304",
    // billType: "3",
    // billId: "fa2a19906205487698e74d584dba2243",
    // billType: "2",
    // type: '1'  //判断哪个页面跳转过来
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;

    that.setData({
      billId:options.billId,
      billType:options.billType,
      type: options.type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.getBillDetail();


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  /**
    * 获取单据纪录记录
    */
  getBillDetail() {
    var that = this;
    fun.getData(api.api.siji.getBillDetail, 'GET', {
      billId: that.data.billId,
      billType: that.data.billType,
    }, (res) => {
      if (res.data.code == 200) {
        var that = this;
        that.setData({
          result: res.data.result
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },

  /**
    * 点击确认装车
    */

  btn1() {
    var that = this;
    that.setData({
      actionType: 3,
    })
    fun.showModal('温馨提示', '车辆已完成装车!', (confirm) => {
      that.confirmAction()
    }, (cnael) => { })
  },


  /**
    * 点击确认送达
    */

  btn2() {
    var that = this;
    that.setData({
      actionType: 5,
    })

    fun.showModal('温馨提示', '货物已顺利送达!', (confirm) => {
      that.confirmAction()
    }, (cnael) => { })
  },

  /**
  * 司机确认操作【装车/送达】
  */
  confirmAction() {
    var that = this;

    fun.getData(api.api.siji.confirmAction, 'GET', {
      actionType: that.data.actionType,
      outBillWayId: that.data.result.billId,
    }, (res) => {
      if (res.data.code == 200) {

      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },


  /**
  * 出入库明细
  */
  getBillItemLi(e){

    var that = this;
    wx.navigateTo({
      url: '../../siji/currentQueueDetailForm/currentQueueDetailForm?billId=' + e.currentTarget.dataset.billid + '&billType='+that.data.billType,
    })
  }

})