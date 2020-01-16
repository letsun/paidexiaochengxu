// pages/menwei/situation/situation.js
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerarray: ["等待进场", "等待出场", "排队等候"],

    tabindex: 0, //默认选中第一个；

    status: 0,

    actionType:'1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    that.setData({
      parkId: options.parkId,
      queueType: options.queueType, //1入库 2出库
    })


    if(options.queueType==1) {
      wx.setNavigationBarTitle({
        title: '入库排队',
      })
    }else {
      wx.setNavigationBarTitle({
        title: '出库排队',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.getQueueEvolutionList()
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
   * 
   * 获取园区排队情况
   * 
   * status: 0等待进场 2等待出场 0正在排队
   */
  getQueueEvolutionList() {
    fun.showLoading()
    var that = this;
    fun.getData(api.api.menwei.getQueueEvolutionList, 'GET', {
      parkId: that.data.parkId,
      queueType: that.data.queueType,
      status: that.data.status,
    }, (res) => {
      if (res.data.code == 200) {
        var QueueEvolutionList = res.data.result
        that.setData({
          QueueEvolutionList: QueueEvolutionList
        })

        wx.hideLoading();
      } else {

        wx.hideLoading();
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },



  /**
 * 点击选择进场状态
 */
  btnTab(e) {
    var that = this;
    // 点击切换下标
    that.setData({
      tabindex: e.currentTarget.dataset.index,
      getQueueEvolutionList:'',
    })

    if (e.currentTarget.dataset.index == 0) {
      that.setData({
        status: 0,
        actionType: 1
      })
    } else if (e.currentTarget.dataset.index == 1) {
      that.setData({
        status: 4,
        actionType: 3
      })
    } else {
      that.setData({
        status: 1,
      })
    }
    that.getQueueEvolutionList()
  },



  // 车辆放行
  release(e) {
    var that = this;
    var queueCodeRecordId = e.currentTarget.dataset.queuecoderecordid;
    that.setData({
      actionType: that.data.actionType,
      queueCodeRecordId:queueCodeRecordId
    })
    fun.showModal('放行提示', '即将向司机发送进场通知,确认此操作？', (confirm) => {
      
      that.letPass();

      console.log('点击确认')
    }, (cancel) => {
      console.log('点击取消')
    })
  },


  /**
    * 
    * 门卫放行操作
    * 
    * actionType 1: 放行入场 2：放行出场
    */
   letPass() {

    var that = this;
    fun.getData(api.api.menwei.letPass, 'GET', {
      parkId: that.data.parkId,
      actionType:that.data.actionType,
      queueCodeRecordId:that.data.queueCodeRecordId
    }, (res) => {
      if (res.data.code == 200) {
        that.getQueueEvolutionList()
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },
})