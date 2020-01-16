// pages/huozhu/thfp/thfp.js
const app = getApp()
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //files: ['http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0'],
    pickupItemList: [],
    //accountId: '1',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    let that = this;
    that.setData({
      outAllocationId: options.outallocationid,
      accountId: options.accountId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that = this;
    that.findOutAllocationDetail();
  },

  /**
   * 
   * 提货分配详情
   */
  findOutAllocationDetail() {
    let that = this;
    fun.getData(api.api.huozhu.findOutAllocationDetail, "GET", {
      accountId: that.data.accountId,
      //outAllocationId: "a78afebd29fa4f9b9c634ecc264cc8f3",
      outAllocationId: that.data.outAllocationId,
    }, res => {
      if (res.data.code == 200) {
        that.setData({
          result: res.data.result
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },

  //选择图片
  chooseImage: function(e) {
    // debugger
    var that = this;

    fun.chooseImage(res => {
      that.setData({
        images: res
      })
    })

  },

  //预览图片
  previewImage: function(e) {
    let that = this;

    wx.previewImage({
      current: that.data.images, // 当前显示图片的http链接
      urls: that.data.images // 需要预览的图片http链接列表
    })
  },

  //清除图片
  removeimg() {
    let that = this;
    that.setData({
      images: ''
    });
  },




  //添加input
  addInput: function() {
    let pickupItemList = this.data.pickupItemList;
    var obj = {
      idCard: '',
      name: '',
      phone: '',
      plateNo: '',
      tallyFlag: '0',
      weight: '',
    }
    pickupItemList.push(obj);

    this.setData({
      pickupItemList: pickupItemList,
    })
  },


  //删除input
  delInput(e) {
    let that = this,
      index = e.currentTarget.dataset.index,
      pickupItemList = that.data.pickupItemList;
    pickupItemList.splice(index, 1);

    that.setData({
      pickupItemList: pickupItemList
    })

  },


  //获取是否为理货人
  tallyFlag(e) {
    let index = e.currentTarget.dataset.index,
      pickupItemList = this.data.pickupItemList,
      value = e.detail.value;


    if (value == false) {
      var tallyFlag = 0
    } else {
      var tallyFlag = 1
    }

    // for (var i = 0; i < pickupItemList.length; i++) {
    //   if (index == i) {
    pickupItemList[index].tallyFlag = tallyFlag;
    //   }
    // }

    this.setData({
      pickupItemList: pickupItemList
    })

  },

  //获取名字input的值
  getName(e) {
    let index = e.currentTarget.dataset.index,
      pickupItemList = this.data.pickupItemList,
      value = e.detail.value;
    pickupItemList[index].name = value;

    this.setData({
      pickupItemList: pickupItemList
    })
  },

  //获取身份证input的值
  getidCard(e) {
    let index = e.currentTarget.dataset.index,
      pickupItemList = this.data.pickupItemList,
      value = e.detail.value;

    pickupItemList[index].idCard = value;


    this.setData({
      pickupItemList: pickupItemList
    })
  },


  //获取身份证input的值
  getidCard(e) {
    let index = e.currentTarget.dataset.index,
      pickupItemList = this.data.pickupItemList,
      value = e.detail.value;

    pickupItemList[index].idCard = value;


    this.setData({
      pickupItemList: pickupItemList
    })
  },


  //获取车牌号input的值
  getplateNo(e) {
    let index = e.currentTarget.dataset.index,
      pickupItemList = this.data.pickupItemList,
      value = e.detail.value;

    pickupItemList[index].plateNo = value;


    this.setData({
      pickupItemList: pickupItemList
    })
  },

  //获取联系电话input的值
  getphone(e) {
    let index = e.currentTarget.dataset.index,
      pickupItemList = this.data.pickupItemList,
      value = e.detail.value;

    pickupItemList[index].phone = value;


    this.setData({
      pickupItemList: pickupItemList
    })
  },


  //获取提货数量input的值
  getweight(e) {
    let index = e.currentTarget.dataset.index,
      pickupItemList = this.data.pickupItemList,
      value = e.detail.value;

    pickupItemList[index].weight = value;

    this.setData({
      pickupItemList: pickupItemList
    })
  },

  //点击提交
  btn() {
    let that = this;
    // console.log(that.data.pickupItemList)

    if (that.data.images == '' || that.data.images == undefined) {
      fun.showToast('提货委托书不能为空', 'none', (success) => {})
      return false;
    }

    fun.getDataP(api.api.huozhu.addQueuePickupMain, "POST", {
      accountId: that.data.accountId,
      images: that.data.images[0],
      outAllocationMainId: that.data.outAllocationId,
      pickupNo: that.data.result.pickupNo,
      pickupItemList: JSON.stringify(that.data.pickupItemList)
    }, res => {
      if (res.data.code == 200) {
        fun.showToast("保存成功", 'success', (success) => {
          // wx.redirectTo({
          //   url: '../../huozhu/hzlist/hzlist?accountId=' + this.data.accountId +'&tabindex=' + 0,
          // })
          setTimeout(res=>{
            wx.navigateBack({
              delta: 1
            })

          },2000)

        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  }

})