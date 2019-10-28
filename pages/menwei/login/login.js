// pages/menwei/index/index.js
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //openid
    fun.getopenid(res => {
      this.setData({
        openid: res
      })
    })
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

  login(e) {
    var that = this;

    let username = e.detail.value.username,
      password = e.detail.value.password

    if (username == '' || username == null) {

      fun.showToast("账号不能为空", 'none')

      return false;
    }

    if (password == '' || password == null) {

      fun.showToast("请输入密码", 'none')

      return false;
    }




    fun.getData(api.api.menwei.login, 'POST', {
      openid: that.data.openid,
      username: username,
      password: password
    }, (res) => {
      if (res.data.code == 200) {
        fun.showToast('登录成功', 'success', (success) => {
          // 登录成功跳转到二维码页面
          wx.redirectTo({
            url: '../../menwei/scancode/scancode?companyId='+ res.data.result.companyId,
          })
        })
      }else {
        fun.showToast(res.data.message,'none',(success)=>{})
      }
      
    })

  }


})