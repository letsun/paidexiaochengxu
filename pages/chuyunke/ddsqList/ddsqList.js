// pages/chuyunke/ddsqList/ddsqList.js
const util = require('../../../utils/util.js')
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    swith:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId: options.companyId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getPickupRecord()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var time = util.formatTime(new Date());

    this.setData({

      curQueueDate: time,

    });
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },



  /**
    * 获取时间
    */
  bindDateChange(e) {
    var that = this;
    that.setData({
      curQueueDate: e.detail.value,
    })
  },

  /**
    * 点击审核
    */

  audit() {
    let str = [];
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].isChecked) {
        str.push(this.data.list[i].pickupItemId);
      }
    }

    let pickupItemId = str.join(',');

    if (pickupItemId=='') {

      fun.showToast("请选择调度申请单", 'none', (success) => { })
      

      return false;
    }
  
    fun.showModal('提示','是否确认发布调度表?',(confirm)=>{

      
      fun.getDataP(api.api.chuyunke.releaseSchedule, "POST", {
        pickupItemId: pickupItemId
      }, res => {
        if (res.data.code == 200) {
          fun.showToast('发布成功', 'success', (success) => { 
            setTimeout(res=>{
              wx.navigateBack({})
            },2000)       
          })
        } else {
          fun.showToast(res.data.message, 'none', (success) => { })
        }
      })
    
    },(cancel)=>{

    })

  },

  /**
    * 删除调度信息
    */

  delect(e) {
    console.log(e)
    let pickupItemId = e.currentTarget.dataset.pickupitemid,
        index = e.currentTarget.dataset.index

    fun.showModal('提示','是否删除当前信息?',(confirm)=>{
      // debugger
      fun.getDataP(api.api.chuyunke.deleteSchedule, "POST", {
        pickupItemId: pickupItemId
      }, res => {
        if (res.data.code == 200) {
          var list = this.data.list;
          list.splice(index, 1)
          this.setData({
            list:list
          })
          
          fun.showToast('删除成功', 'success', (success) => { }) 
        } else {
          fun.showToast(res.data.message, 'none', (success) => { })
        }
      })


    },(cancel)=>{})
  },

   /**
    * 调度申请列表
    */
  getPickupRecord() {
    fun.getDataP(api.api.chuyunke.getPickupRecord, "POST", {
      //companyId:'0d1c1f14b48d4bfda4da390a4c20c56a',
      companyId: this.data.companyId,
      pageNo:1,
      pageSize:100,
      parkId:'',
      produceTime:''
    }, res => {
      if (res.data.code == 200) {
        let list = res.data.result.datas;
        for (var i = 0; i < list.length; i++) {
            list[i].isChecked = false;
        }
        this.setData({
          list: list,
          result: res.data.result
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },

  //是否选中

  switchchang(e) {
    var obj = {};
    var pickupItemId = e.currentTarget.dataset.pickupitemid
    var value  = e.detail.value
    var index = e.currentTarget.dataset.index
    let list = this.data.list;
    list[index].isChecked = value;

    
    this.setData({
      list: list
    })
  }
})