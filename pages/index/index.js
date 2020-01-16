const fun = require('../../utils/function.js');
const api = require('../../utils/api.js')
const RdWXBizDataCrypt = require('../../utils/WXBizDataCrypt.js')

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShow() {
    var that = this
    //openid
    fun.getopenidhd(res => {

      if (res.data.code == 200) {
        // that.setData({
        //   openid: res.data.result.openid,
        //   unionid: res.data.result.unionid,
        // })

        app.globalData.accountId = res.data.result.accountId;
        app.globalData.openid = res.data.result.openid;
        app.globalData.unionid = res.data.result.unionid;
        
        if (res.data.result.userType == 1) {
          wx.redirectTo({
            url: '../huozhu/home/home?accountId=' + res.data.result.accountId,
          })
        } else if (res.data.result.userType == 2) {

        } else if (res.data.result.userType == 3) {
          wx.redirectTo({
            url: '../chuyunke/home/home?companyId=' + res.data.result.companyId
          })
        }
        if (res.data.result.userType == 4) {
          wx.redirectTo({
            url: '../siji/outhousing/outhousing?driverId=' + res.data.result.driverId + '&queueType=' + 2,
          })
        }
        if (res.data.result.userType == 5) {

          wx.redirectTo({
            url: '../menwei/scancode/scancode?companyId=' + res.data.result.companyId + '&accountId=' + res.data.result.accountId,
          })
        } else {
          wx.redirectTo({
            url: '../menwei/login/login?openid=' + res.data.result.openid + '&unionid=' + res.data.result.unionid,
          })

        }

      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
      // that.getInfoByOpenId();
    })

  },
  // onLoad: function () {
  //   wx.login({
  //     success: reg => {
  //       wx.request({
  //         url: api.api.getOpenId,
  //         method: 'POST',
  //         header: {
  //           'Accept': 'application/json',
  //           "content-type": "application/x-www-form-urlencoded"
  //         },
  //         data: {
  //           code: reg.code,
  //         },
  //         success: function(res) {
  //           var sessionKey = res.data.result.session_key;
  //           wx.getUserInfo({
  //             success: function (res2) {
  //               var appId = 'wx92ddcbce04fc34b6'
  //               var encryptedData = res2.encryptedData;
  //               var iv = res2.iv;
  //               var pc = new RdWXBizDataCrypt(appId, sessionKey)
  //               var data = pc.decryptData(encryptedData, iv);
  //               console.log('data', data);
  //             }
  //           })
  //         },

  //         fail: res => {
  //           wx.hideLoading();
  //           wx.showToast({
  //             title: res.data.message,
  //             icon: 'none',
  //             duration: 500,
  //             mask: true,
  //             success: function (res) { },
  //             fail: function (res) { },
  //           })
  //         },

  //         complete: res => {
  //           wx.hideLoading();
  //         }

  //       })
  //     }
  //   })




  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         console.log(res)
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // }, 
  // getUserInfo: function(e) {
  //   // console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
})