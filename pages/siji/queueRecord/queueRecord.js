// pages/siji/queueRecord/queueRecord.js

//引入接口页面
var api = require("../../../utils/api.js");
var fun = require("../../../utils/function.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabarray: ["出库记录", "入库记录"],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      codeType: options.codeType,
      driverId: options.driverId,
      parkId: options.parkId,
    })

    if (options.codeType==2) {
      that.setData({
        tabindex: 0,
      })
    }else{
      that.setData({
        tabindex: 1,
      })
    } 
  
  },


    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 
    var that = this;
    that.getQueueList()

  },

  //点击切换出库入库记录
  checkCurrent(e) {
    var that = this;
    that.setData({
      tabindex: e.currentTarget.dataset.index
    })

    if (e.currentTarget.dataset.index==0) {
      that.setData({
        codeType: "2",
      })
    }else {
      that.setData({
        codeType: "1",
      })
    }

    that.getQueueList()
  },

  /**
   * 获取历史排队记录
   */
  getQueueList(){

    var that = this;
    fun.getData(api.api.siji.getQueueList, 'GET', {
      parkId: that.data.parkId,
      codeType: that.data.codeType, //that.data.codeType
      driverId: that.data.driverId, //that.data.driverId
      // codeType: that.data.codeType, //that.data.codeType
      // driverId: "d00d42f1e7df41fbb37dcf956b103c01", //that.data.driverId
    }, (res) => {
      if (res.data.code == 200) {
        var result = res.data.result;
        that.setData({
          result:result
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },


  //跳转到出入库详情

  getBillDetail(e){
    var that = this;
    let billId = e.currentTarget.dataset.billid,
        billType = e.currentTarget.dataset.billtype,
        queueCodeRecordId = e.currentTarget.dataset.queuecoderecordid,
        relatebillnum = e.currentTarget.dataset.relatebillnum
    if(that.data.tabindex ==0){

      if (relatebillnum != 0) {
        wx.navigateTo({
          url: '../../siji/historyOutDetail/historyOutDetail?billId=' + billId + '&billType=' + billType + '&type=' + 0,
        })
      }

    }else{
      wx.navigateTo({
        url: '../../siji/historyEnterDetail/historyEnterDetail?queueCodeRecordId='+ queueCodeRecordId ,
      })
    }

  }

})