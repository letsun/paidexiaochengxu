// pages/siji/lineup/lineup.js
const app = getApp()
var api = require("../../../utils/api.js");
var fun = require("../../../utils/function.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    index: 0,
    // name:'理货员A',
    // phone:'1214002',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var q = decodeURIComponent(options.q);

    if (q != 'undefined') {
      var urlList = q.split('=');
      var qrcode = urlList[urlList.length - 1];
      console.log(urlList)
      console.log(qrcode)
      that.setData({
        qrcode: qrcode,
      })

      fun.getopenidhd(res => {
        app.globalData.accountId = res.data.result.accountId;
        that.setData({
          uoid: res.data.result
        })
        that.getDriverByOpenId()
      })
    }
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

  },


  /**
   * 点击扫码
   * 
   */
  saoma() {
    var that = this;
    //扫描二维码
    wx.scanCode({
      // onlyFromCamera: true,
      // scanType:'qrCode',
      success: (res) => {
        var urlList = res.result.split('=');
        var qrcode = urlList[urlList.length - 1];
        that.setData({
          qrcode: qrcode,
        })
        fun.getopenidhd(res => {
          app.globalData.accountId = res.data.result.accountId;

          console.log(app.globalData.accountId)
          that.setData({
            uoid: res.data.result      
          })
          
          that.getDriverByOpenId()
        })

      }
    })
  },

  /**
   * 通过openId获取司机id                                                                                                 
   * 
   */

  getDriverByOpenId() {
    let that = this;
    fun.getData(api.api.siji.getDriverByOpenId, 'GET', {

      code: that.data.qrcode,
      openId: that.data.uoid.openid,

    }, (res) => {
      if (res.data.code == 200) {

        if (res.data.result.queueAuditFlag == 0) {
          wx.redirectTo({
            url: '../../siji/inputLicensePlate/inputLicensePlate?uoid=' + that.data.uoid + '&qrcode=' + that.data.qrcode + '&type=' + 1,
          })
        } else if (res.data.result.queueAuditFlag == 1) {

          that.setData({
            driverId: res.data.result.driverId
          })


          that.getDriverById();
        }
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },


  /**
   *  司机获取个人信息
   * 
   */

  getDriverById() {
    let that = this;
    fun.getData(api.api.siji.getDriverById, 'GET', {
      driverId: that.data.driverId,
    }, (res) => {

      
      if (res.data.code == 200) {
        var idcardImage = Array.of(res.data.result.idcardImage);
        var idcardImageUnder = Array.of(res.data.result.idcardUnderImage)
        var driverImage = Array.of(res.data.result.driverImage)
        var driverLicenseImage = Array.of(res.data.result.driverLicenseImage)


        that.setData({
          result: res.data.result,
          plateNo: res.data.result.plateNumber, //车牌号
          idcardImage: idcardImage, //身份证正面
          idcardImageUnder: idcardImageUnder, //身份证反面
          driverImage: driverImage, //驾驶证件
          driverLicenseImage: driverLicenseImage, //行驶证件
          // queueRecord: res.data.result.queueRecord, //排队纪录id
        })

        that.getDriverPickupCommission();
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },




  /**
   *  司机获取提货委托书列表【泛糖排队小程序】
   * 
   */

  getDriverPickupCommission() {
    let that = this;
    fun.getData(api.api.siji.getDriverPickupCommission, 'GET', {

      code: that.data.qrcode,
      //plateNo: '湘A.L8P60',
      plateNo: that.data.plateNo
    }, (res) => {
      if (res.data.code == 200) {
        
        var pickupNoLista = [];
        var pickupNoList = res.data.result.pickupVoList;

        for (var i in res.data.result.pickupVoList) {
          var obj = {}
          obj.key = pickupNoList[i].createTime + '    ' + pickupNoList[i].customerName + '    ' + pickupNoList[i].pickupWeight
          pickupNoLista.push(obj)
        }



        that.setData({
          pickupNoList: res.data.result.pickupVoList,
          pickupNoLista: pickupNoLista,

          driverId: res.data.result.driverId
        })

        // that.getDriverById();
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },

  /**
   *  理货员获取提货委托书列表【泛糖排队小程序】
   * 
   */

  getDallyCommissionPickup() {
    let that = this;
    fun.getData(api.api.siji.getDallyCommissionPickup, 'GET', {
      code: that.data.qrcode,
      name: that.data.tname,
      phone: that.data.tphone
    }, (res) => {
      if (res.data.code == 200) {
       
        
        var pickupNoLista=[];
        var pickupNoList = res.data.result.pickupVoList;

        for (var i in res.data.result.pickupVoList) {
          var obj = {}
          obj.key = pickupNoList[i].createTime + '    ' + pickupNoList[i].customerName + '    '+ pickupNoList[i].pickupWeight
          pickupNoLista.push(obj)
        }


    
        that.setData({
          pickupVoList: res.data.result,

          pickupNoList: res.data.result.pickupVoList,
          pickupNoLista: pickupNoLista,

          tidcardImage: res.data.result.idcardImage,
          tidcardUnderImage: res.data.result.idcardUnderImage,

        })


      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },






  // 提交申请排队

  submitQueueApply(e) {
    let that = this;
    let index = that.data.index;

    let commissionItemId = that.data.pickupNoList[index].commissionItemId;
    let commissionId = that.data.pickupNoList[index].id;
    let driverData = {};

    if (that.data.checked == false) {
      var pickupWeight = that.data.pickupNoList[index].pickupWeight;

    } else {
      var pickupWeight = e.detail.value.pickupWeight;

      if (pickupWeight > that.data.pickupVoList.pickupVoList[index].pickupWeight) {
        fun.showToast('填写的数量不能大于未提数量', 'none', (success) => { })
        return false
      }

      
      driverData.driverName = e.detail.value.driverName;
      driverData.plateNumber = e.detail.value.plateNumber;
    }

    if (that.data.driverImage[0] == '' || that.data.driverImage[0] == undefined){
      fun.showToast('驾驶证不能为空', 'none', (success) => { })
      return false
    }

    if (that.data.driverLicenseImage[0] == '' || that.data.driverLicenseImage[0] == undefined) {
      fun.showToast('行驶证不能为空', 'none', (success) => { })
      return false
    }

    if (that.data.idcardImage[0] == '' || that.data.idcardImage[0] == undefined) {
      fun.showToast('司机身份证正面不能为空', 'none', (success) => { })
      return false
    }

    if (that.data.idcardImageUnder[0] == '' || that.data.idcardImageUnder[0] == undefined) {
      fun.showToast('司机身份证反面不能为空', 'none', (success) => { })
      return false
    }




    // let queueRecordId = res.data.result.recordId;
    let tallyData = {};
    driverData.contactPhone = e.detail.value.contactPhone;
    driverData.driverImage = that.data.driverImage[0];
    driverData.driverLicense = e.detail.value.driverLicense;
    driverData.driverLicenseImage = that.data.driverLicenseImage[0];


    if (that.data.driverId != null || that.data.driverId != '') {
      driverData.id = that.data.driverId;
    }

    driverData.idCard = e.detail.value.idCard;
    driverData.idcardImage = that.data.idcardImage[0];
    driverData.idcardUnderImage = that.data.idcardImageUnder[0];



    if (that.data.checked != false) {
      if (that.data.tidcardImage[0] == '' || that.data.tidcardImage[0] == undefined) {
        fun.showToast('理货员身份证正面不能为空', 'none', (success) => { })
        return false
      }

      if (that.data.tidcardUnderImage[0] == '' || that.data.tidcardUnderImage[0] == undefined) {
        fun.showToast('理货员身份证反面不能为空', 'none', (success) => { })
        return false
      }

      tallyData.id = that.data.pickupVoList.id;
      tallyData.idCard = e.detail.value.tidCard;
      tallyData.idcardImage = that.data.tidcardImage[0];
      tallyData.idcardUnderImage = that.data.tidcardUnderImage[0];
      tallyData.name = e.detail.value.tname;
      tallyData.phone = e.detail.value.tphone;
    }



    fun.getDataP(api.api.siji.submitQueueApply, 'POST', {

      commissionItemId: commissionItemId,
      commissionId: commissionId,
      driverData: driverData,
      pickupWeight: pickupWeight,
      tallyData: tallyData,
      // queueRecordId: queueRecordId
    }, (res) => {
      if (res.data.code == 200) {
        that.setData({
          driverId: res.data.result.id,
          queueApplyId: res.data.result.queueApplyId,
        })

        that.createQqueueUpInfo()


      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })

  },




  /**
   * 创建排队信息
   * 
   */
  createQqueueUpInfo() {
    var that = this;
    fun.getData(api.api.siji.createQqueueUpInfo, 'GET', {
      //code: "XqAGW94CVT",  //rWo4aqRjAl
      code: that.data.qrcode, //rWo4aqRjAl
      driverId: that.data.driverId,
      queueAuditFlag: '1',
      queueApplyId: that.data.queueApplyId,
      openid: that.data.uoid.openid,
      unionid: that.data.uoid.unionid,
    }, (res) => {
      if (res.data.code == 200) {
        if (res.data.result.appAccountId!=null && res.data.result.undefined) {
          app.globalData.accountId = res.data.result.appAccountId;
        }
   
        wx.redirectTo({
          url: '../../siji/outhousing/outhousing?driverId=' + that.data.driverId + '&queueType=' + 2
        })
      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },
  /**
   * 获取车牌号
   * 
   */

  plateNo(e) {
    this.setData({
      plateNo: e.detail.value
    })
  },

  /**
   * 获取车牌号
   * 
   */
  name(e) {
    // console.log(e)
    this.setData({
      tname: e.detail.value
    })
  },


  /**
   * 获取车牌号
   * 
   */
  phone(e) {
    this.setData({
      tphone: e.detail.value
    })
  },


  /**
   * 司机选择委托单号
   * 
   */
  pickchang(e) {
    console.log(e)
    this.setData({
      index: e.detail.value
    })
  },


  //勾选理货人
  checkbtn(e) {
    let that = this,
      checked = e.detail.value;
    that.setData({
      checked: checked,
      // result: '',

    })


    if (checked == false) {
      that.setData({
        tidcardImage: '',
        tidcardUnderImage: '',
      })
    }
  },






  // wtList() {

  //     wx.navigateTo({
  //       url: '../../siji/wtList/wtList',
  //     })

  // }

  //上传图片
  chooseImage(e) {

    let that = this;

    let index = e.currentTarget.dataset.index;

    fun.chooseImage(res => {
      if (index == 1) {
        that.setData({
          idcardImage: res
        })
      } else if (index == 2) {
        that.setData({
          idcardImageUnder: res
        })
      } else if (index == 3) {
        that.setData({
          driverImage: res
        })
      } else if (index == 4) {
        that.setData({
          driverLicenseImage: res
        })
      } else if (index == 5) {
        that.setData({
          tidcardImage: res
        })
      } else if (index == 6) {
        that.setData({
          tidcardUnderImage: res
        })
      }

    })
  },



  //预览图片
  previewImage(e) {
    // debugger
    let that = this;
    let index = e.currentTarget.dataset.index;
    
    if (index == 1) {
      wx.previewImage({
        // current: Array.of(that.data.idcardImage), // 当前显示图片的http链接
        urls: that.data.idcardImage// 需要预览的图片http链接列表
      })
    } else if (index == 2) {
      wx.previewImage({
        // current: that.data.idcardImageUnder, // 当前显示图片的http链接
        urls: that.data.idcardImageUnder // 需要预览的图片http链接列表
      })

    } else if (index == 3) {
      wx.previewImage({
        // current: that.data.driverImage, // 当前显示图片的http链接
        urls: that.data.driverImage // 需要预览的图片http链接列表
      })

    } else if (index == 4) {
      wx.previewImage({
        // current:that.data.driverLicenseImage, // 当前显示图片的http链接
        urls: that.data.driverLicenseImage // 需要预览的图片http链接列表
      })

    } else if (index == 5) {
      wx.previewImage({
        // current: that.data.tidcardImage, // 当前显示图片的http链接
        urls:that.data.tidcardImage // 需要预览的图片http链接列表
      })

    } else if (index == 6) {
      wx.previewImage({
        //current: that.data.tidcardUnderImage, // 当前显示图片的http链接
        urls: that.data.tidcardUnderImage // 需要预览的图片http链接列表
      })

    }
  },

  //删除图片
  removeimg(e) {
    let that = this;

    let index = e.currentTarget.dataset.index;


    if (index == 1) {
      that.setData({
        idcardImage: ''
      })
    } else if (index == 2) {
      that.setData({
        idcardImageUnder: ''
      })
    } else if (index == 3) {
      that.setData({
        driverImage: ''
      })
    } else if (index == 4) {
      that.setData({
        driverLicenseImage: ''
      })
    } else if (index == 5) {
      that.setData({
        tidcardImage: ''
      })
    } else if (index == 6) {
      that.setData({
        tidcardUnderImage: ''
      })
    }
  },

})