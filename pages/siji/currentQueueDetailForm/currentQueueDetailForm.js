// pages/siji/currentQueueDetailForm/currentQueueDetailForm.js

const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // billType: 3,//that.data.billType
    // billId: "7db6cd002e1b43fb96ec60cd76ed0824",//that.data.result.billId
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      billId: options.billId,
      billType: options.billType
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.getBillItemLi()
  },



  /**
    * 出入库明细
    */
  getBillItemLi() {
    var that = this
    fun.getData(api.api.siji.getBillItemLi, 'GET', {
      billType: that.data.billType,//that.data.billType
      billId: that.data.billId,//that.data.result.billId
    }, (res) => {
      if (res.data.code == 200) {
        var list= res.data.result;
        that.setData({
          list:list
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  }

})