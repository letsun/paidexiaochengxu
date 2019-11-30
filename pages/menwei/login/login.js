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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    //openid
    fun.getopenid(res => {
      that.setData({
        openid: res
      })
      that.getInfoByOpenId();
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


    fun.getData(api.api.menwei.login, 'POST', {
      openid: that.data.openid,
      username: username,
      password: password
    }, (res) => {
      if (res.data.code == 200) {
        fun.showToast('登录成功', 'success', (success) => {
          // 登录成功跳转到二维码页面
          wx.redirectTo({
            url: '../../menwei/scancode/scancode?companyId=' + res.data.result.companyId + '&accountId=' + res.data.result.accountId,
          })
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }

    })
  },

  /**
   * 通过openId用户获取相关信息判断是否已绑定
   * 
   * accountType 1 为门卫 2为司机
   */
  getInfoByOpenId() {
    var that = this;
    fun.getData(api.api.menwei.getInfoByOpenId, 'POST', {
      openId: that.data.openid,
    }, (res) => {
      if (res.data.code == 200) {
        if (res.data.result.accountType == 1) {
          if (res.data.result.accountId && res.data.result.accountId != '') {
              wx.redirectTo({
                url: '../../menwei/scancode/scancode?companyId=' + res.data.result.companyId + '&accountId=' + res.data.result.accountId ,
              })
          }
        } else {

          wx.redirectTo({
            url: '../../siji/inputLicensePlate/inputLicensePlate?openId=' + that.data.openid,
          })
        }
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  }
})