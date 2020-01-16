// pages/chuyunke/pdsqEdit/pdsqEdit.js

const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],

    mask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      queueApplyId: options.queueapplyid
    })
    this.getDriverRecordDetail()
  },


 
  /**
 * 司机申请列表详情
 */
  getDriverRecordDetail() {
    fun.getDataP(api.api.chuyunke.getDriverRecordDetail, "POST", {
      queueApplyId: this.data.queueApplyId,
      // queueApplyId: "1",
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


  //预览图片
  previewImage(e) {
    // debugger
    let that = this;
    let index = e.currentTarget.dataset.index;
    
    let imgsrc = e.currentTarget.dataset.imgsrc



    wx.previewImage({
      urls: Array.of(imgsrc)// 需要预览的图片http链接列表
    })


  },

})