// pages/menwei/record/record.js

const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')

var hasNext = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    pageNum: 1,
    pageSize: '10',
    queryKey: '',
    queueDate: '',
    childList:'',
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    that.setData({
      parkId: options.parkId,
      queueType: options.queueType,
    })
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    var that = this;
    that.getHistoryQueueRecord()
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
    var that = this;
    var pageNum = that.data.pageNum;

    that.setData({
      pageNum: pageNum + 1,
    })

    fun.showLoading()
    that.getHistoryQueueRecord()
  },





  /**
   * 获取时间
   */
  bindDateChange(e) {
    var that = this;
    var pageNum = that.data.pageNum;
    var childList = that.data.childList;  
    that.setData({
      pageNum: 1,
      data: e.detail.value,
      queueDate: e.detail.value,
      childList:'',
    })
    
    that.getHistoryQueueRecord();
  },

  /**
   * 点击搜索
   */
  search(e) {
    var that = this;
    var queryKey = e.detail.value;
    var childList = that.data.childList;
    that.setData({
      queryKey: queryKey,
      childList:'',
    })
    that.getHistoryQueueRecord();
  },

  /**
   * 
   * 获取园区排队纪录
   * 
   */
  getHistoryQueueRecord() {
    // debugger
    var that = this;
    fun.getData(api.api.menwei.getHistoryQueueRecord, 'GET', {

      // parkId: "b8897e9e7a8e4399bc3d5489960ad70f",
      parkId: that.data.parkId,  //that.data.parkId
      pageNum: that.data.pageNum,
      pageSize: that.data.pageSize,
      queryKey: that.data.queryKey,
      queueDate: that.data.queueDate,
      codeType: that.data.queueType,
    }, (res) => {
      if (res.data.code == 200) {
        var that = this;
        // var childList = res.data.result.childList;             
        var curQueueDate = res.data.result.curQueueDate;


        hasNext = res.data.result.hasNext;
        if (that.data.childList == '' || that.data.childList == null) {
          that.setData({
            curQueueDate: res.data.result.curQueueDate,
            childList: res.data.result.childList,
          })
        }else {
          if (hasNext != true) {
            fun.showToast('没有更多数据了', 'none', (success) => { })
          }else {
            that.setData({
              childList: childList.concat(res.data.result.childList),
            })  
          }
       
        }

        wx.hideLoading();
      } else {
        wx.hideLoading();
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },

})