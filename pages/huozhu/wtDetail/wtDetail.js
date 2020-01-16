// pages/huozhu/thfp/thfp.js
const app = getApp()
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =  this;
    that.setData({
      mainid:options.mainid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    that.getPickupMainDetail()
  },


  //预览图片
  previewImage: function (e) {
    let that = this;

    let images = Array.of(that.data.result.images)

    wx.previewImage({
      current: images, // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    })
  },

  /**
   * 提货委托书详情
   */
  getPickupMainDetail(){
    let that = this;
    fun.getData(api.api.huozhu.getPickupMainDetail, "GET", {  
      pickupMainId:that.data.mainid,
    }, res => {
      if (res.data.code == 200) {
        that.setData({
          result: res.data.result
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  }


})