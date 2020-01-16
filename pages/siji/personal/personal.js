// pages/siji/personal/personal.js
const app = getApp()
var api = require("../../../utils/api.js");
var fun = require("../../../utils/function.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      driverId: options.driverId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getDriverById();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(app.globalData.accountId)
  },


  /**
   *  司机获取个人信息
   * 
   */

  getDriverById() {
    let that = this;
    fun.getData(api.api.siji.getDriverById, 'GET', {
      driverId: that.data.driverId
      //driverId: 'd00d42f1e7df41fbb37dcf956b103c01',
    }, (res) => {
      if (res.data.code == 200) {
        that.setData({
          result: res.data.result,
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },

  /**
   * 
   * 退出登录
   * 
   */
  logout() {
    var that = this;
    fun.showModal('温馨提示', '是否退出登录', (confirm) => {
      fun.getData(api.api.menwei.logout, 'GET', {
        accountId: app.globalData.accountId,
      }, (res) => {
        if (res.data.code == 200) {
          if (res.data.result.isLogout == 1) {
            wx.redirectTo({
              url: '../../menwei/login/login',
            })
          }
        } else {
          fun.showToast(res.data.message, 'none', (success) => {})
        }
      })
    }, (cnael) => {})

  },



  //预览图片
  previewImage(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;

    if (index == 1) {
      wx.previewImage({
        current: Array.of(that.data.result.idcardImage), // 当前显示图片的http链接
        urls: Array.of(that.data.result.idcardImage) // 需要预览的图片http链接列表
      })
    } else if (index == 2) {
      wx.previewImage({
        current: Array.of(that.data.result.idcardUnderImage), // 当前显示图片的http链接
        urls: Array.of(that.data.result.idcardUnderImage) // 需要预览的图片http链接列表
      })

    } else if (index == 3) {
      wx.previewImage({
        current: Array.of(that.data.result.driverImage), // 当前显示图片的http链接
        urls: Array.of(that.data.result.driverImage) // 需要预览的图片http链接列表
      })

    } else if (index == 4) {
      wx.previewImage({
        current: Array.of(that.data.result.driverLicenseImage), // 当前显示图片的http链接
        urls: Array.of(that.data.result.driverLicenseImage) // 需要预览的图片http链接列表
      })

    }
  },


})