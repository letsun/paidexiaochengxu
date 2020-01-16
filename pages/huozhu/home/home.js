// pages/huozhu/home/home.js
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 

  },

  //
  onLoad(options) {

    this.setData({
      accountId: options.accountId,
    })
  },

  onShow() {

    let that = this;

    that.customerHomePage()
  },


  /**
   * 跳转到个人中心
   */
  personal(){
    wx.navigateTo({
      url: '../../huozhu/personal/personal?accountId=' +this.data.accountId,
    })
  },


  /**
   * 跳转到货主列表
   */
  listbtn(e){
    let tabindex = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../huozhu/hzlist/hzlist?tabindex=' + tabindex + '&accountId=' + this.data.accountId,
    })
  },


  /**
   * 货主首页信息
   */
  customerHomePage () {
    let that = this ;
    fun.getData(api.api.huozhu.customerHomePage,"GET",{
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
  }
  
})