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
    console.log(fun.getData)
    console.log(api.api.menwei.login)

    console.log(fun.getopenid(res=>{res}))
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

  login(e){
    var that = this;

    let username = e.detail.value.username,
        password = e.detail.value.password


    var pattern = /^1[12345789]\d{9}$/;
    if(username == ''|| username == null){

      fun.showToast("账号不能为空",'none')

      return false;
    }

    if (!pattern.test(username)){

      fun.showToast("请输入正确的账号", 'none')

      return false;
    }


    if (password == '' || password == null) {

      fun.showToast("请输入密码", 'none')

      return false;
    }


    var data = {
      openid: that.data.openid,
      username:username,
      password: password
    }

    console.log(data)

    // fun.showLoading()
    // fun.getData(api.api.menwei.login,'POST',data,(res)=>{


      
    // })

    // 登录成功跳转到二维码页面
    // wx.redirectTo({
    //   url: '../../menwei/scancode/scancode',
    // })
  }
  

})