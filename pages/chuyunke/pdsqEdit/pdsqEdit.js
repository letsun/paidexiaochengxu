// pages/chuyunke/pdsqEdit/pdsqEdit.js

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
  onLoad: function(options) {
    this.setData({
      queueApplyId: options.queueapplyid
    })
    this.getDriverRecordDetail()
  },

  //选择图片
  chooseImage(e) {
    // debugger
    var that = this;
    fun.chooseImage(res => {
      that.setData({
        images: res
      })
    })
  },

  //删除图片
  removeimg(e) {
    let that = this;

    let index = e.currentTarget.dataset.index;
    that.setData({
      images: ''
    })

  },


  //预览图片
  previewImage(e) {
    let that = this;
    let imgsrc = e.currentTarget.dataset.imgsrc;
    let index = e.currentTarget.dataset.index;

    if (index ==1) {
      wx.previewImage({

        urls: imgsrc // 需要预览的图片http链接列表
      })

    }else {

      wx.previewImage({

        urls: Array.of(imgsrc) // 需要预览的图片http链接列表
      })
    }

    // debugger;


  },

  /**
   * 点击显示编辑弹框
   */

  footerbtn(e) {
    var that = this;
    that.setData({
      mask: true,
      status: e.currentTarget.dataset.status
    })
  },

  /**
   * 点击关闭编辑
   */
  cancel() {
    var that = this;
    that.setData({
      mask: false,

    })
  },
  //获取审核意见信息
  textchang(e) {
    console.log(e.detail.value)

    this.setData({
      auditIdea: e.detail.value
    })
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
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },

  /**
   * 司机排队申请审核
   */
  updateDriverRecordStatus() {

    if (this.data.images == undefined || this.data.images==''){

      fun.showToast("提货单未上传", 'none', (success) => { })
      return false; 
    }

    fun.getDataP(api.api.chuyunke.updateDriverRecordStatus, "POST", {
      queueApplyId: this.data.queueApplyId,
      // queueApplyId: "1",
      status: this.data.status,
      auditIdea: this.data.auditIdea,
      pickupNoImage: this.data.images[0]
    }, res => {
      if (res.data.code == 200) {
        this.setData({
          mask: false
        })

        wx.navigateBack({
          delta: 1
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },
})