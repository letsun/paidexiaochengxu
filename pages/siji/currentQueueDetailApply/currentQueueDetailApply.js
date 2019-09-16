// pages/siji/currentQueueDetailApply/currentQueueDetailApply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  showModal:function(){
    wx.showModal({
      title: '温馨提示',
      content: '车辆已完成装车',
      confirmText: '确认',
      confirmColor: '#ff8500',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})