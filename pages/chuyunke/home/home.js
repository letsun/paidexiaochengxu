// pages/chuyunke/home/home.js
const app = getApp()
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
// companyId: "0d1c1f14b48d4bfda4da390a4c20c56a",
  },

  onReady() {
    this.getPickupItemDetail();
  },

  onShow(){
    const pages = getCurrentPages();    //获取当前页面信息栈
    const prevPage = pages[pages.length - 1]     //获取当前页面信息
    console.log(pages);
    console.log(prevPage)
  },

  onLoad(options) { 
    this.setData({
      companyId: options.companyId,
    })
  },

  /**
   * 查找当日调度统计（页面首页）
   */
  getPickupItemDetail() {
    fun.getDataP(api.api.chuyunke.getPickupItemDetail, "POST", {
      companyId: this.data.companyId,
      pickupTime: ''
    }, res => {
      if (res.data.code == 200) {
        this.setData({
          result: res.data.result
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },

  /**
   * 修改产量
   */
  inputchang(e) {
    console.log(e.detail.value)
    fun.getDataP(api.api.chuyunke.addPickupTime, "POST", {
      companyId: this.data.companyId,
      parkId: '',
      realProduceWeight: e.detail.value,
    }, res => {
      if (res.data.code == 200) {
        fun.showToast("修改产量成功", 'none', (success) => { })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })    
  },




  /**
 * 跳转到调度申请报列表
 */
  ddsqList() {
    wx.navigateTo({
      url: '../../chuyunke/ddsqList/ddsqList?companyId=' + this.data.companyId,
    })
  },

  /**
   * 跳转到当前排队
   */
  situation(e) {
    let that = this;
    let tabindex = e.currentTarget.dataset.tabindex;
    wx.navigateTo({
      url: '../../chuyunke/situation/situation?tabindex=' + tabindex + '&companyId=' + that.data.result.companyId + '&queueType=' + 2
    })
  },

  /**
   * 跳转到司机申请页面
   */
  pdsqList() {
    wx.navigateTo({
      url: '../../chuyunke/pdsqList/pdsqList?companyId=' + this.data.companyId,
    })
  },


  /**
   * 跳转到储运科历史排队页面
   */
  pdHistory() {
    wx.navigateTo({
      url: '../../chuyunke/pdHistory/pdHistory?companyId=' + this.data.companyId,
    })
  },


  /**
   * 跳转到储运科提货人变更列表页面
   */
  personList() {
    wx.navigateTo({
      url: '../../chuyunke/personList/personList?companyId=' + this.data.companyId,
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
          fun.showToast(res.data.message, 'none', (success) => { })
        }
      })
    }, (cnael) => { })

  }

})