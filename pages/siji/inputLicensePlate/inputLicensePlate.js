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

    focus2: true,
    focus2: false,
    focus3: false,
    focus4: false,
    focus5: false,
    focus6: false,
    focus7: false,
    focus8: false,
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
    //console.log(this.data.plateNum1)
    var plateNum1 = this.data.plateNum1;
    if (plateNum1.length == 1) {
      this.setData({
        focus2: true
      })
    }
  },
  plateNum2: function (e) {
    this.setData({
      plateNum2: e.detail.value
    })
    //console.log(this.data.plateNum2)
    var plateNum2 = this.data.plateNum2;
    if (plateNum2.length == 1) {
      this.setData({
        focus3: true
      })
    }
  },
  plateNum3: function (e) {
    this.setData({
      plateNum3: e.detail.value
    })
    //console.log(this.data.plateNum3)
    var plateNum3 = this.data.plateNum3;
    if (plateNum3.length == 1) {
      this.setData({
        focus4: true
      })
    }
  },
  plateNum4: function (e) {
    this.setData({
      plateNum4: e.detail.value
    })
    //console.log(this.data.plateNum4)
    var plateNum4 = this.data.plateNum4;
    if (plateNum4.length == 1) {
      this.setData({
        focus5: true
      })
    }
  },
  plateNum5: function (e) {
    this.setData({
      plateNum5: e.detail.value
    })
    //console.log(this.data.plateNum5)
    var plateNum5 = this.data.plateNum5;
    if (plateNum5.length == 1) {
      this.setData({
        focus6: true
      })
    }
  },
  plateNum6: function (e) {
    this.setData({
      plateNum6: e.detail.value
    })
    //console.log(this.data.plateNum6)
    var plateNum6 = this.data.plateNum6;
    if (plateNum6.length == 1) {
      this.setData({
        focus7: true
      })
    }
  },
  plateNum7: function (e) {
    this.setData({
      plateNum7: e.detail.value
    })
    //console.log(this.data.plateNum7)
    var plateNum7 = this.data.plateNum7;
    if (plateNum7.length == 1) {
      this.setData({
        focus8: true
      })
    }
  },
  plateNum8: function (e) {
    this.setData({
      plateNum8: e.detail.value
    })
    //console.log(this.data.plateNum8)
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
      url: api.siji.submitPlateNo,
      data: {
        code: '1',   //司机扫描门卫出示的二维码code
        openid: '',  //司机的openid
        plateNo: this.data.carPlate  //司机输入的车牌号
      },
      success: function(res){
        
      }
    })

  }
})