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

  onReady(){
    // fun.getopenidhd(res => {
    //   this.setData({
    //       openid: res.data.result.openid,
    //       unionid: res.data.result.unionid,
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {


  },


  onLoad(options) {

    // if (op)
    this.setData({
      openid: app.globalData.openid,
      unionid: app.globalData.unionid
    })
  },


  /**
   * 门卫登录
   */
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

    //userType 1：货主，2：销售科，3：储运科，4：司机，5：门卫
    fun.getData(api.api.menwei.login, 'POST', {
      openid: that.data.openid,
      username: username,
      password: password,
      unionid: that.data.unionid,
    }, (res) => {
      if (res.data.code == 200) {
        fun.showToast('登录成功', 'success', (success) => {
          app.globalData.accountId = res.data.result.accountId
          if (res.data.result.userType == 1) {
            wx.reLaunch({
              url: '../../huozhu/home/home?accountId=' + res.data.result.accountId,
            })
          } else if (res.data.result.userType == 2) {


          } else if (res.data.result.userType == 3) {
            wx.reLaunch({
              url: '../../chuyunke/home/home?companyId=' + res.data.result.companyId
            })

          } else if (res.data.result.userType == 4) {
            wx.reLaunch({
              url: '../../siji/outhousing/outhousing?driverId=' + res.data.result.driverId + '&queueType=' + 2,
            })

          } else if (res.data.result.userType == 5) {

            wx.reLaunch({
              url: '../../menwei/scancode/scancode?companyId=' + res.data.result.companyId + '&accountId=' + res.data.result.accountId,
            })
          }

        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }

    })
  },

  /**
   * 通过openId用户获取相关信息判断是否已绑定
   * 
   * 1：货主，2：销售科，3：储运科，4：司机，5：门卫
   */
  // getInfoByOpenId() {
  //   var that = this;
  //   fun.getData(api.api.menwei.getInfoByOpenId, 'POST', {
  //     openId: that.data.openid,
  //   }, (res) => {
  //     if (res.data.code == 200) {
  //       if (res.data.result.userType == 1) {
  //         wx.reLaunch({
  //           url: '../../huozhu/home/home?accountId=' + res.data.result.accountId,
  //         })
  //       } else if (res.data.result.userType == 2) {

  //       } else if (res.data.result.userType == 3) {
  //         wx.reLaunch({
  //           url: '../../chuyunke/home/home?companyId=' + res.data.result.companyId
  //         })
  //       }
  //       if (res.data.result.userType == 4) {
  //         wx.reLaunch({
  //           url: '../../siji/outhousing/outhousing?driverId=' + res.data.result.driverId + '&queueType=' + 2,
  //         })
  //       }
  //       if (res.data.result.userType == 5) {
  //         // if (res.data.result.accountId && res.data.result.accountId != '') {
  //           // wx.reLaunch({
  //           //   url: '../../menwei/scancode/scancode?companyId=' + res.data.result.companyId + '&accountId=' + res.data.result.accountId,
  //           // })
  //         // }

  //         wx.reLaunch({
  //           url: '../../menwei/scancode/scancode?companyId=' + res.data.result.companyId + '&accountId=' + res.data.result.accountId,
  //         })
  //       }

  //     } else {
  //       fun.showToast(res.data.message, 'none', (success) => {})
  //     }
  //   })
  // }
})