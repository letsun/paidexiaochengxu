//引入接口页面
var api = require("../../../utils/api.js");

// pages/siji/inputLicensePlate/inputLicensePlate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plateNum1: '',
    plateNum2: '',
    plateNum3: '',
    plateNum4: '',
    plateNum5: '',
    plateNum6: '',
    plateNum7: '',
    plateNum8: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //输入的每格车牌号
  plateNum1: function(e){
    this.setData({
      plateNum1: e.detail.value
    })
    console.log(this.data.plateNum1)
  },
  plateNum2: function (e) {
    this.setData({
      plateNum2: e.detail.value
    })
    console.log(this.data.plateNum2)
  },
  plateNum3: function (e) {
    this.setData({
      plateNum3: e.detail.value
    })
    console.log(this.data.plateNum3)
  },
  plateNum4: function (e) {
    this.setData({
      plateNum4: e.detail.value
    })
    console.log(this.data.plateNum4)
  },
  plateNum5: function (e) {
    this.setData({
      plateNum5: e.detail.value
    })
    console.log(this.data.plateNum5)
  },
  plateNum6: function (e) {
    this.setData({
      plateNum6: e.detail.value
    })
    console.log(this.data.plateNum6)
  },
  plateNum7: function (e) {
    this.setData({
      plateNum7: e.detail.value
    })
    console.log(this.data.plateNum7)
  },
  plateNum8: function (e) {
    this.setData({
      plateNum8: e.detail.value
    })
    console.log(this.data.plateNum8)
  },
  //点击开始排队按钮
  beginRank: function(){
    this.setData({
      carPlate: this.data.plateNum1 + this.data.plateNum2 + this.data.plateNum3 + this.data.plateNum4 + this.data.plateNum5 + this.data.plateNum6 + this.data.plateNum7 + this.data.plateNum8
    })
    console.log(this.data.carPlate)
    if (this.data.carPlate == ""){
      wx.showToast({
        icon: 'none',
        title: '请输入车牌号'
      })
      return false;
    }

    wx.request({
      url: api.api.getOpenId,
      success: function(res){
        
      }
    })

  }
})