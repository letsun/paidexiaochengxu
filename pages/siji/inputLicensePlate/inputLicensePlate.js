//引入接口页面
var api = require("../../../utils/api.js");
var fun = require("../../../utils/function.js");
Page({
  data: {
    qrcode:'',
    isKeyboard: !1,
    isNumberKB: !1,
    tapNum: !1,
    disableKey: "1234567890港澳学",
    keyboardNumber: "1234567890ABCDEFGHJKLMNPQRSTUVWXYZ港澳学",
    keyboard1: "京沪粤津冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘桂琼渝川贵云藏陕甘青宁新",
    inputPlates: {
      index0: "",
      index1: "",
      index2: "",
      index3: "",
      index4: "",
      index5: "",
      index6: "",
      index7: ""
    },
    inputOnFocusIndex: "",
    flag: true,

    flaga: true
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
    var q = decodeURIComponent(options.q);
    that.setData({
      openid: options.openId
    })
    if (q != 'undefined') {
      var urlList = q.split('=');
      var qrcode = urlList[urlList.length - 1];
      console.log(urlList)
      console.log(qrcode)
      that.setData({
        qrcode: qrcode,
      })


      fun.getopenid(res => {
        that.setData({
          openid: res
        })

        that.validateCode()//校验排队二维码
        //that.getDriverByOpenId()
      })
    }

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    var that = this;
    if(that.data.qrcode==''){
      that.validateCode()//校验排队二维码
    }
   
    //openid
    // fun.getopenid(res => {
    //   that.setData({
    //     openid: res
    //   })

    //   that.validateCode()//校验排队二维码
    //   //that.getDriverByOpenId()
    // })
  },

  //切换车牌
  changeplate: function() {
    var that = this;
    that.setData({
      flag: false,
      inputPlates: {
        index0: "",
        index1: "",
        index2: "",
        index3: "",
        index4: "",
        index5: "",
        index6: "",
        index7: ""
      },
    })
  },
  //切换车牌
  changeplate1: function() {
    var that = this;
    that.setData({
      flag: true,
      inputPlates: {
        index0: "",
        index1: "",
        index2: "",
        index3: "",
        index4: "",
        index5: "",
        index6: "",
        index7: ""
      },
    })
  },

  inputClick: function(t) {
    var that = this;
    console.log('输入框:', t)
    that.setData({
      inputOnFocusIndex: t.target.dataset.id,
      isKeyboard: !0
    })
    "0" == this.data.inputOnFocusIndex ? that.setData({
      tapNum: !1,
      isNumberKB: !1
    }) : "1" == this.data.inputOnFocusIndex ? that.setData({
      tapNum: !1,
      isNumberKB: !0
    }) : that.setData({
      tapNum: !0,
      isNumberKB: !0
    });

  },

  //键盘点击事件
  tapKeyboard: function(t) {
    t.target.dataset.index;
    var a = t.target.dataset.val;
    console.log('键盘:', a)
    switch (this.data.inputOnFocusIndex) {
      case "0":
        this.setData({
          "inputPlates.index0": a,
          inputOnFocusIndex: "1"
        });
        break;

      case "1":
        this.setData({
          "inputPlates.index1": a,
          inputOnFocusIndex: "2"
        });
        break;

      case "2":
        this.setData({
          "inputPlates.index2": a,
          inputOnFocusIndex: "3"
        });
        break;

      case "3":
        this.setData({
          "inputPlates.index3": a,
          inputOnFocusIndex: "4"
        });
        break;

      case "4":
        this.setData({
          "inputPlates.index4": a,
          inputOnFocusIndex: "5"
        });
        break;

      case "5":
        this.setData({
          "inputPlates.index5": a,
          inputOnFocusIndex: "6"
        });
        break;

      case "6":
        this.setData({
          "inputPlates.index6": a,
          inputOnFocusIndex: "7"
        });
        break;

      case "7":
        this.setData({
          "inputPlates.index7": a,
          inputOnFocusIndex: "7"
        });

    }
    var n = this.data.inputPlates.index0 + this.data.inputPlates.index1 + this.data.inputPlates.index2 + this.data.inputPlates.index3 + this.data.inputPlates.index4 + this.data.inputPlates.index5 + this.data.inputPlates.index6 + this.data.inputPlates.index7


    this.setData({
      plateNo: n
    })

    this.checkedSubmitButtonEnabled();
  },
  //键盘关闭按钮点击事件
  tapSpecBtn: function(t) {
    var a = this,
      e = t.target.dataset.index;
    if (0 == e) {
      switch (parseInt(this.data.inputOnFocusIndex)) {
        case 0:
          this.setData({
            "inputPlates.index0": "",
            inputOnFocusIndex: "0"
          });
          break;

        case 1:
          this.setData({
            "inputPlates.index1": "",
            inputOnFocusIndex: "0"
          });
          break;

        case 2:
          this.setData({
            "inputPlates.index2": "",
            inputOnFocusIndex: "1"
          });
          break;

        case 3:
          this.setData({
            "inputPlates.index3": "",
            inputOnFocusIndex: "2"
          });
          break;

        case 4:
          this.setData({
            "inputPlates.index4": "",
            inputOnFocusIndex: "3"
          });
          break;

        case 5:
          this.setData({
            "inputPlates.index5": "",
            inputOnFocusIndex: "4"
          });
          break;

        case 6:
          this.setData({
            "inputPlates.index6": "",
            inputOnFocusIndex: "5"
          });
          break;

        case 7:
          this.setData({
            "inputPlates.index7": "",
            inputOnFocusIndex: "6"
          });
      }
      this.checkedSubmitButtonEnabled();
    } else 1 == e && a.setData({
      isKeyboard: !1,
      isNumberKB: !1,
      inputOnFocusIndex: ""
    });
  },
  //键盘切换
  checkedKeyboard: function() {
    var t = this;
    "0" == this.data.inputOnFocusIndex ? t.setData({
      tapNum: !1,
      isNumberKB: !1
    }) : "1" == this.data.inputOnFocusIndex ? t.setData({
      tapNum: !1,
      isNumberKB: !0
    }) : this.data.inputOnFocusIndex.length > 0 && t.setData({
      tapNum: !0,
      isNumberKB: !0
    });
  },

  checkedSubmitButtonEnabled: function() {

    this.checkedKeyboard();
    var t = !0;
    for (var a in this.data.inputPlates)
      if ("index7" != a && this.data.inputPlates[a].length < 1) {
        t = !1;
        break;
      }
  },

  /**
   * 通过openId获取司机信息是否已登录
   * 
   */
  // getDriverByOpenId() {
  //   var that = this;

  //   fun.getData(api.api.siji.getDriverByOpenId, 'GET', {
  //     openId: that.data.openid,

  //   }, (res) => {
  //     if (res.data.code == 200) {
  //       if (res.data.result.driverId != "") {
  //         that.setData({
  //           driverId : res.data.result.driverId,
  //         })

  //         // that.createQqueueUpInfo();
  //       }
  //     } else {
  //       fun.showToast(res.data.message, 'none', (success) => { })
  //     }
  //   })
  // },


  /**
   * 司机登录（录入车牌号登录）
   * 
   */
  loginByPlateNo() {


    var that = this;
    if (that.data.checkResult == 1) {
      fun.showToast(that.data.checkMsg, 'none', (success) => { })
      return false;
      
    } else if (that.data.checkResult == 2) {
      fun.showToast(that.data.checkMsg, 'none', (success) => { })
      return false;
    } else if (that.data.checkResult == 3) {
      fun.showToast(that.data.checkMsg, 'none', (success) => { })
      return false;
    } else if (that.data.checkResult == 4) {
      wx.redirectTo({
        url: '../../siji/outhousing/outhousing?queueType=' + res.data.result.codeType + '&driverId=' + res.data.result.driverId,
      })
    } else if (that.data.checkResult == 5) {
      fun.getData(api.api.siji.loginByPlateNo, 'GET', {
        //code: 'XqAGW94CVT',
        code: that.data.qrcode,
        openId: that.data.openid,
        plateNo: that.data.plateNo, //that.data.plateNo
      }, (res) => {
        if (res.data.code == 200) {
          that.setData({
            driverId: res.data.result.driverId
          });
          that.createQqueueUpInfo()
        } else {
          fun.showToast(res.data.message, 'none', (success) => { })
        }
      })
    }



  },


  /**
   * 
   * 校验排队二维码 1:二维码不存在 2：二维码已失效 3：码已被扫 4：已经在排队中 5：正常： 6:排队完进入司机历史记录页面 7第二次扫码进来创建排队单号
   * 
   */

  validateCode() {
    var that = this;
    fun.getData(api.api.siji.validateCode,'GET',{
      openId: that.data.openid,
      ecode: that.data.qrcode,
    },(res)=>{     
      that.setData({
        checkResult: res.data.result.checkResult,
        checkMsg: res.data.result.checkMsg
      })
      
      if (res.data.result.checkResult ==1) {
        fun.showToast(res.data.result.checkMsg, 'none', (success) => {})
      } else if (res.data.result.checkResult == 2) {
        fun.showToast(res.data.result.checkMsg, 'none', (success) => {})
      } else if ( res.data.result.checkResult ==3) {
        fun.showToast(res.data.result.checkMsg,'none',(success)=>{})
      } else if (res.data.result.checkResult==4){
        wx.redirectTo({
          url: '../../siji/outhousing/outhousing?queueType=' + res.data.result.codeType + '&driverId=' + res.data.result.driverId,
        })
      } else if (res.data.result.checkResult == 6) {
        wx.redirectTo({
          url: '../../siji/outhousing/outhousing?queueType=' + res.data.result.codeType + '&driverId=' + res.data.result.driverId,
        })
      } else if ( res.data.result.checkResult == 7) {
        that.setData({
          driverId: res.data.result.driverId,
        })
        that.createQqueueUpInfo();
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
    }, (res) => {


      if (res.data.code == 200 ) {
        if (res.data.message != '') {
          fun.showToast(res.data.message, 'none', (success) => {})
        }
        wx.redirectTo({
          url: '../../siji/outhousing/outhousing?queueType=' + res.data.result.queueType + '&driverId=' + res.data.result.driverId,
        })

      } else {
        fun.showToast(res.data.message, 'none', (success) => {})
      }
    })
  },

  /**
   * 点击开始排队
   * 
   */
  beginRank() {
    var that = this;
    that.loginByPlateNo()
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
        fun.getopenid(res => {
          that.setData({
            openid: res
          })

          that.validateCode()//校验排队二维码
          //that.getDriverByOpenId()
        })
        
      }
    })
  }


})