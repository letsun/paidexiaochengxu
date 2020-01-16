// pages/menwei/record/record.js

const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')



Page({

  /**
   * 页面的初始数据
   */
  data: {
    //companyId: '0d1c1f14b48d4bfda4da390a4c20c56a',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      companyId: options.companyId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getDriverRecord()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 司机申请列表
   */
  getDriverRecord() {
    fun.getDataP(api.api.chuyunke.getDriverRecord, "POST", {
      companyId: this.data.companyId,
      pageNo: 1,
      pageSize: 50,
    }, res => {
      if (res.data.code == 200) {
        this.setData({
          list: res.data.result.datas,
          result: res.data.result
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },


  /**
   * 点击搜索
   */
  // search() {
  //   this.getDriverRecord()
  // },




  /**
   * 获取时间
   */
  bindDateChange(e) {

    that.setData({

      data: e.detail.value,

    })


  },

  //获取input值
  inputchang(e) {
    console.log(e.detail.value)

    
  },




  /**
   * 跳转到司机审核修改页面
   */
  pdsqEdit(e) {
    let queueapplyid = e.currentTarget.dataset.queueapplyid
        stat

  },

  /**
   * 跳转到司机审核详情页面
   */

  pdsqDetail(e) {
    let queueapplyid = e.currentTarget.dataset.queueapplyid,
      status = e.currentTarget.dataset.status

    if (status ==0) {
      wx.navigateTo({
        url: '../../chuyunke/pdsqEdit/pdsqEdit?queueapplyid=' + queueapplyid,
      })
    }else if (status == 1) {
      wx.navigateTo({
        url: '../../chuyunke/pdsqDetail/pdsqDetail?queueapplyid=' + queueapplyid,
      })

    }


  }

})