// pages/huozhu/thfp/thfp.js

const app = getApp()
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pickupItemId: options.pickupitemid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getPickupItemDetail()
  },

  /**
   * 调度信息详情
   */
  getPickupItemDetail() {

    let that = this
    fun.getData(api.api.huozhu.getPickupItemDetail, "GET", {
      pickupItemId: that.data.pickupItemId,

    }, res => {
      if (res.data.code == 200) {
        let images = Array.of(res.data.result.images);

        this.setData({
          result: res.data.result,
          images: images
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },

  //选择图片
  chooseImage: function (e) {
    // debugger
    var that = this;
    fun.chooseImage(res => {
      that.setData({
        images: res
      })
    })
  },

  //预览图片
  previewImage(e) {
    // debugger
    let that = this;

    let images = that.data.images;
    // let imagesa = [];
    // imagesa.push(images)

    // console.log(imagesa)

    // let images = Array.of(that.data.images)

    // console.log(imagesa)
    wx.previewImage({
      current: images, // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    })

  },

  removeimg() {
    this.setData({
      images:''

    })
  },



  //点击提交
  addAdjust(e) {
    let that = this,
      newDriverName = e.detail.value.newDriverName,
      newDriverPhone = e.detail.value.newDriverPhone,
      newIdCard = e.detail.value.newIdCard,
      newPlateNo = e.detail.value.newPlateNo,
      newPickupImage = that.data.images[0],
      pickupItemId = that.data.pickupItemId
    fun.getDataP(api.api.huozhu.addAdjust, "POST", {
      accountId: app.globalData.accountId,
      newDriverName: newDriverName,
      newDriverPhone: newDriverPhone,
      newIdCard: newIdCard,
      newPickupImage: newPickupImage,
      newPlateNo: newPlateNo,
      pickupItemId: pickupItemId,
    }, res => {
      if (res.data.code == 200) {
        fun.showToast("申请变更成功", 'none', (success) => {
          wx.navigateBack({
            delta: 1
          })
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  }

})