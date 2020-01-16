// pages/huozhu/thfp/thfp.js

const app = getApp()
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //files: ['https://qdwzvue-1254182596.cos.ap-guangzhou.myqcloud.com/qdwzAct/paide/1_2.png'],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      pickupItemId: options.pickupitemid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.getChangeList();
  },

  /**
   * 提货人变更记录
   */
  getChangeList() {
    let that = this;
    fun.getData(api.api.huozhu.getChangeList, "GET", {
      pickupItemId: that.data.pickupItemId,
    }, res => {
      if (res.data.code == 200) {
        that.setData({
          result: res.data.result
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },


  //预览图片
  previewImage: function (e) {
    let that = this;

    let index = e.currentTarget.dataset.index;

    let images = Array.of(that.data.result.adjustList[index].images)

    wx.previewImage({
      current: images, // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    })

    that.setData({
      mask: true
    })
  },



})