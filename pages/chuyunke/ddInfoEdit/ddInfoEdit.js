// pages/huozhu/thfp/thfp.js
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //files: ['http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.setData({
      parkupadjustid: options.parkupadjustid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAdjustDetail()
  },




  //选择图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        console.log(res)
        that.setData({
          files: (res.tempFilePaths)
        });
      }
    })
  },

  //预览图片
  previewImage: function (e) {
    let that = this;
    
    let images = array.of(that.data.result.pickImage)


    wx.previewImage({
      current: images, // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    })


  },

  //清除图片
  removeimg() {
    let that = this;
    that.setData({
      files: ''
    });
  },

  //添加input
  addInput: function () {
    var old = this.data.array;
    old.push(1);//这里不管push什么，只要数组长度增加1就行
    this.setData({
      array: old
    })
  },

  //删除input
  delInput: function (e) {
    let index = e.currentTarget.dataset.index;//当前索引
    //var oldInputVal = this.data.inputVal;//所有的input值
    var oldarr = this.data.array;//循环内容
    oldarr.splice(index, 1);    //删除当前索引的内容，这样就能删除view了
    //oldInputVal.splice(nowidx, 1);//view删除了对应的input值也要删掉
    if (oldarr.length < 1) {
      oldarr = [0]  //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
    }
    this.setData({
      array: oldarr,
      //inputVal: oldInputVal
    })
  },


  //获取input的值
  getInputVal: function (e) {

    var index = e.currentTarget.dataset.index;//获取当前索引
    var val = e.detail.value;//获取输入的值

    var oldVal = this.data.inputVal;

    oldVal[index] = val;//修改对应索引值的内容

    console.log(val)

    
    this.setData({
      oldVal: oldVal
    })
  },




  /**
   * 调度信息详情
   */
  getAdjustDetail() {
    fun.getDataP(api.api.chuyunke.getAdjustDetail, "POST", {
      pickupAdjustId: this.data.parkupadjustid,
    }, res => {
      if (res.data.code == 200) {
        this.setData({
          result: res.data.result,
          images: res.data.pickImage
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },

  //审核
  submitAdjustCheck() {
    fun.getDataP(api.api.chuyunke.submitAdjustCheck, "POST", {
      pickupAdjustId: this.data.parkupadjustid,
    }, res => {
      if (res.data.code == 200) {
        fun.showToast("审核成功", 'none', (success) => {
          wx.navigateBack({})
         })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },
})