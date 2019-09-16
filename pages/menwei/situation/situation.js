// pages/menwei/situation/situation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerarray: ["等待进场", "等待出场", "排队等候"],

    tabindex:0  //默认选中第一个
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  btnTab(e){
    var that = this;
    // 点击切换下标
    that.setData ({
      tabindex: e.currentTarget.dataset.index
    })
  },

  // 车辆放行
  clfx(){
    wx.showModal({
      title: '放行提示',
      content: '即将向司机发送进场通知,确认此操作？',
      confirmColor:'#fd7d00'
    })
  }
})