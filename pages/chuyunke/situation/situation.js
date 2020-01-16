// pages/menwei/situation/situation.js
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerarray: ["等待进场", "等待出场", "排队等候"],
    // tabindex: 0, //默认选中第一个； 
    // companyId:"0d1c1f14b48d4bfda4da390a4c20c56a",  
    // queueType:'2',
    // status:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let that = this;
    if (options.tabindex == 0) {
      var status = 0
    } else if (options.tabindex == 2) {
      var status = 1
    }

    that.setData({
      tabindex: options.tabindex,
      //queueType: options.queueType, //1入库 2出库
      status: status,
      companyId: options.companyId,
      queueType: options.queueType
    })

    that.getQueueEvolutionList()

  },


  getQueueEvolutionList() {
    fun.showLoading()
    var that = this;
    fun.getData(api.api.menwei.getQueueEvolutionList, 'GET', {

      companyId: that.data.companyId,
      queueType: that.data.queueType,
      status: that.data.status,
      flag: 1
    }, (res) => {
      if (res.data.code == 200) {
        var QueueEvolutionList = res.data.result

        for (var i in QueueEvolutionList) {

          QueueEvolutionList[i].isChecked = false;
        }
        that.setData({
          QueueEvolutionList: QueueEvolutionList
        })

        wx.hideLoading();
      } else {

        wx.hideLoading();
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },

  /**
   * 点击选择进场状态
   */
  btnTab(e) {
    var that = this;
    var tabindex = e.currentTarget.dataset.index;
    if (tabindex == 0) {
      var status = 0
    } else if (tabindex == 1) {
      var status = 4
    } else {
      var status = 1
    }

    // 点击切换下标
    that.setData({
      tabindex: tabindex,
      status: status
    })
    that.getQueueEvolutionList()
  },

  //单选

  switchchang(e) {
    console.log(e)
    let that = this;
    let index = e.currentTarget.dataset.index;
    let QueueEvolutionList = that.data.QueueEvolutionList;
    let value = e.detail.value;
    QueueEvolutionList[index].isChecked = value;

    that.setData({
      QueueEvolutionList: QueueEvolutionList
    })
  },

  //全选
  selectall() {

    let that = this;
    let QueueEvolutionList = that.data.QueueEvolutionList

    // QueueEvolutionList.forEach((item,index) => {
    //   console.log(item)
    //   var isChecked = "QueueEvolutionList["+index+"].isChecked";
    //   that.setData({
    //     [isChecked]: true
    //   })
    // })
    // for (var i in QueueEvolutionList) {

    //   var isChecked = "QueueEvolutionList[" + i + "].isChecked";
    //   that.setData({
    //     [isChecked]: true
    //   })
    // }

    for (var i in QueueEvolutionList) {

      if (QueueEvolutionList[i].isChecked != true) {
        QueueEvolutionList[i].isChecked = true;
      } else {
        QueueEvolutionList[i].isChecked = false;
      }
    }

    that.setData({
      QueueEvolutionList: QueueEvolutionList
    })


  },



  //删除
  deletes(e) {
    var index = e.currentTarget.dataset.index;

    var ids = e.currentTarget.dataset.queuecoderecordid;
    console.log(e)

    fun.showModal('删除排队', '是否删除当前排队?', confirm => {
      this.control(index, 3, ids)
    }, cancel => {})

  },

  /**
   * 启动排队
   */

  startup() {

    let that = this;
    let str = [];
    let QueueEvolutionList = that.data.QueueEvolutionList;
    for (var i in QueueEvolutionList) {
      if (this.data.QueueEvolutionList[i].isChecked) {
        str.push(this.data.QueueEvolutionList[i].queueCodeRecordId);
      }
    }

    let ids = str.join(',');
    console.log(ids)

    fun.showModal('启动排队', '确认要启动当前排队吗?', confirm => {
      that.control(0, 1, ids)
    }, cancel => {})
  },

  /**
   * 暂停排队
   */
  suspends() {

    let that = this;
    let str = [];
    let QueueEvolutionList = that.data.QueueEvolutionList;
    for (var i in QueueEvolutionList) {
      if (this.data.QueueEvolutionList[i].isChecked) {
        str.push(this.data.QueueEvolutionList[i].queueCodeRecordId);
      }
    }

    let ids = str.join(',');

    that.control(0, 2, ids)
  },

  /***
   * 
   * 1：启动，2：暂停，3：删除
   * 
   */
  control(index, controlType, ids) {
    let that = this;

    wx.request({
      url: api.api.chuyunke.control,
      data: {
        companyId: that.data.companyId,
        controlType: controlType,
        ids: ids,
        remarks: that.data.remarks,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {

        if (res.data.code == 200) {
          if (controlType == 3) {
            var QueueEvolutionList = that.data.QueueEvolutionList;
            QueueEvolutionList.splice(index, 1);
            that.setData({
              QueueEvolutionList: QueueEvolutionList
            })
          } else {
            that.setData({
              remarks: '',
              mask:false,
            })
            that.getQueueEvolutionList()
          }

          
        } else {
          fun.showToast(res.data.result, 'none', (success) => { })
        }
        
       },
      fail: function (res) { },
      complete: function (res) { },
    })



    // fun.getDataP(api.api.chuyunke.control, 'POST', {
    //   companyId: that.data.companyId,
    //   controlType: controlType,
    //   ids: ids,
    //   remarks: that.data.remarks,
    // }, (res) => {
    //   if (res.data.code == 200) {
    //     if (controlType == 3) {
    //       var QueueEvolutionList = that.data.QueueEvolutionList;

    //       QueueEvolutionList.splice(index, 1);

    //       that.setData({
    //         QueueEvolutionList: QueueEvolutionList
    //       })
    //     }else {
    //       that.setData({
    //         remarks: '',
    //       })
          
    //     }
    //   } else {
    //     fun.showToast(res.data.message, 'none', (success) => {})
    //   }
    // })
  },

//
  textchang(e) {
    this.setData({
      remarks:e.detail.value
    })  
  },
  /**
   * 跳转历史通知情况
   */
  startupList() {
    wx.navigateTo({
      url: '../../chuyunke/startupList/startupList?companyId=' + this.data.companyId,
    })
  },

  /**
   * 点击暂停显示编辑弹框
   */

  suspend() {
    var that = this;
    that.setData({
      mask: true,
    })
  },

  /**
   * 点击关闭编辑
   */
  cancel() {
    var that = this;
    that.setData({
      mask: false,
      remarks:'',
    })
  },




  //预览图片
  previewImage(e) {
    // debugger
    let that = this;
    let index = e.currentTarget.dataset.index;

    let pickupimage = e.currentTarget.dataset.pickupimage



    wx.previewImage({
      urls: Array.of(pickupimage)// 需要预览的图片http链接列表
    })


  },

})