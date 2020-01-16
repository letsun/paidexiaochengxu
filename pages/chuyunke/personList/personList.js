// pages/chuyunke/personList/personList.js
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadText: false,
    pageNo: 1,
    pageSize: '10',
    //companyId: '0d1c1f14b48d4bfda4da390a4c20c56a',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId: options.companyId
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
    this.setData({
      list:'',
    })
    
    this.getAdjustRecord();
  },




  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var pageNo = that.data.pageNo;

    that.setData({
      pageNo: pageNo + 1,
    })
    fun.showLoading()

    that.getAdjustRecord()
  },


  /**
   * 提货人变更列表
   */
  getAdjustRecord() {
    let that = this

    fun.getDataP(api.api.chuyunke.getAdjustRecord, "POST", {

      companyId: this.data.companyId,
      pageNo: that.data.pageNo,
      pageSize: that.data.pageSize,
    }, res => {
      if (res.data.code == 200) {

        var list = that.data.list 
        if (that.data.list == '' || that.data.list == null) {
          that.setData({
            list:res.data.result.datas
          })

          if (res.data.result.pageNo == res.data.result.totalPage) {
            that.setData({
              loadText: true,
            })
          }
        }else{
          if (that.data.loadText == false) {
            that.setData({
              list: list.concat(res.data.result.datas),
            })
          }

          if (res.data.result.pageNo == res.data.result.totalPage) {
            that.setData({
              loadText: true,
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


  /**
    * 跳转到储运科提货人变更页面
    */
  ddInfoEdit(e) {

    let parkupadjustid = e.currentTarget.dataset.parkupadjustid

  
    wx.navigateTo({
      url: '../../chuyunke/ddInfoEdit/ddInfoEdit?parkupadjustid=' + parkupadjustid,
    })
  },
})