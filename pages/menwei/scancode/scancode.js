// pages/menwei/scancode/scancode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ["A园区", "B园区", "C园区"],

    tabarray: ["出库排队", "入库排队"],

    tabindex: 0 //默认选中第一个
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindTab(e){

    // 修改tab选中状态
    var that = this;
    that.setData({
      tabindex: e.currentTarget.dataset.index
    })
  },

  //查看排队情况
  situation(){
    wx.navigateTo({
      url: '../../menwei/situation/situation',
    })
  },

  //查看排队纪录
  record() {
    wx.navigateTo({
      url: '../../menwei/record/record',
    })
  }
})