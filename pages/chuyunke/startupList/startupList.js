// pages/chuyunke/startupList/startupList.js

const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')



Page({

  /**
   * 页面的初始数据
   */
  data: {
    // companyId:'114d6c3d2e4a4434b16d7f29a50a7368',
    pageSize:'10',
    pageNo:1,
    list:'',
    loadtext:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId: options.companyId,
    })
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
    this.getControlHistory()
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;

    let pageNo = that.data.pageNo
    that.setData({
      pageNo: pageNo + 1
    })

    fun.showLoading()

    that.getControlHistory()
  },


  //排队历史通知
  getControlHistory() {
    let that = this;

    fun.getData(api.api.chuyunke.getControlHistory, 'GET', {
      companyId: that.data.companyId,
      pageSize: that.data.pageSize,
      pageNo: that.data.pageNo,
    }, (res) => {
      if (res.data.code == 200) {

        var list = that.data.list; 
        if (that.data.list=='') {
          that.setData({
            result: res.data.result,
            list: res.data.result.list
          })   
          
        }else {
          if (that.data.loadtext == true) {
            that.setData({
              list: list.concat(res.data.result.list)
            })
          }


          if (res.data.result.pageNo == res.data.result.totalPage) {

            that.setData({
              loadtext:false
            })
          }         
        }

        wx.hideLoading();
      } else {

        wx.hideLoading();
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  }

})