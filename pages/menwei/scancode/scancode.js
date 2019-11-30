// pages/menwei/scancode/scancode.js
const QRCode = require('../../../utils/qrcode.js');
const api = require('../../../utils/api.js');
const fun = require('../../../utils/function.js');
// var adminUrl = 'http://yecl.lxcyhd.com/wap/driver';
var adminUrl = 'https://wms.ebiaoji.com/wap/driver';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    flag:true,

    // tabarray: [

    //   {
    //     index: "出库排队",
        
    //   },
    //   { index: "入库排队",}
    //   ],
    index: 0,  //默认选中第一个园区下标

    tabindex: 0, //默认选中第一个

    codeType: 2,  //默认选中出库排队二维码

    timeOut: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

    var that = this;
    that.setData({
      companyId: options.companyId,
      accountId: options.accountId
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //openid
    fun.getopenid(res => {
      that.setData({
        openid: res
      })
      that.getParkList();
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that =this;
    var timeOut = that.data.timeOut
    clearTimeout(timeOut);

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  //点击刷新二维码
  refresh() {
    var that = this;
    that.getCode();
  },

  //点击选择园区
  bindDateChange(e) {

    var that = this;
    that.getParkList()

    that.setData({
      index: e.detail.value,
      codeType: 2,
      tabindex: 0
    })
  },

  /**
   * 
   * 获取出入库排队
   * 
   */
  bindTab(e) {
    // 修改tab选中状态
    var that = this;
    that.setData({
      tabindex: e.currentTarget.dataset.index
    })

    if (e.currentTarget.dataset.index == 0) {
      that.setData({
        codeType: 2
      })
    } else {
      that.setData({
        codeType: 1
      })
    }

    var timeOut = that.data.timeOut
    clearTimeout(timeOut)
    that.getCode()
  },

  /**
   * 
   * 获取园区
   */
  getParkList() {
    // debugger
    var that = this;
    fun.getData(api.api.menwei.getParkList, 'GET', {
      companyId: that.data.companyId,
    }, (res) => {
      if (res.data.code == 200) {
        var index = that.data.index;
        that.setData({
          ParkList: res.data.result,
          parkId: res.data.result[index].parkId,
          isOut: res.data.result[index].isOut,
          isIn: res.data.result[index].isIn,
        })

        

        // 获取二维码
        that.getCode();
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },

  /**
   * 
   * 获取排队二维码
   * 
   */
  getCode() {
    var that = this;
    fun.showLoading();
    fun.getData(api.api.menwei.getCode, 'GET', {
      codeType: that.data.codeType,
      openid: that.data.openid,
      parkId: that.data.parkId
    }, (res) => {
      if (res.data.code == 200) {
        that.setData({
          flag: true,
        }, ()=> {
          qrcode: new QRCode('canvas', {
            text: adminUrl + '?queueCode=' + res.data.result.code,
            width: 230,
            height: 230,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
          })

          console.log(111)
          var timeOut = setTimeout(()=> {
            that.onShow();
          }, 1000 * 60 * res.data.result.validityPeriod)

          wx.hideLoading();
        })
        
      } else {
        that.setData({
          flag: false,
        })
        wx.hideLoading();
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },


  //查看排队情况
  situation() {

    var that = this;
    wx.navigateTo({
      url: '../../menwei/situation/situation?parkId=' + that.data.parkId + '&queueType=' + that.data.codeType,
    })
  },

  //查看排队纪录
  record() {
    var that = this

    wx.navigateTo({
      url: '../../menwei/record/record?parkId=' + that.data.parkId + '&queueType=' + that.data.codeType,
    })
  },

  /**
   * 
   * 退出登录
   * 
   */
  logout () {
    var that = this;
    fun.showModal('温馨提示', '是否退出登录', (confirm) => {
      fun.getData(api.api.menwei.logout, 'GET', {
        accountId: that.data.accountId,
      }, (res) => {
        if (res.data.code == 200) {
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