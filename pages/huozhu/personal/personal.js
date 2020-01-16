// pages/huozhu/personal/personal.js
const app = getApp()
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // accountId: '1',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      accountId: options.accountId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that =  this;

    that.accountInfoQuery();
  },

  /**
   * 货主个人中心
   */
  accountInfoQuery(){
    let that =  this;

    fun.getData(api.api.huozhu.accountInfoQuery,"GET",{
 
      accountId: that.data.accountId,
    },res=>{
      if(res.data.code== 200) {
          that.setData({
            result:res.data.result
          })
      }else {
        fun.showToast(res.data.message, 'none', (success) => { })
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
          // debugger
          if (res.data.result.isLogout == 1) {
            wx.redirectTo({
              url: '../../menwei/login/login',
            })
          }
        } else {
          fun.showToast(res.data.message, 'none', (success) => { })
        }
      })
    }, (cnael) => { })

  }


})