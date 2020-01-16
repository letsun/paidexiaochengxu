// pages/huozhu/hzlist/hzlist.js
const app = getApp()
const api = require('../../../utils/api.js')
const fun = require('../../../utils/function.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tabindex:0, //默认下标
    footer: ['销售分配列表', '提货委托', '调度信息表'],
    loadText: false,
    pageNo: 1,
    pageSize: '10',
    inputInfo:'',
    // accountId: '1',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      tabindex: options.tabindex,
      accountId: options.accountId,
    })

    // that.findPage();
    // that.findPickupMainPage();
    // that.findPickupItemPage();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    that.setData({
      findOutAllocationPageList: '',
      findPickupMainPageList: '',
      findPickupItemPageList: ''
    })

    
    if (that.data.tabindex == 0) {
      that.findPage()
    } else if (that.data.tabindex == 1) {
      that.findPickupMainPage()
    } if (that.data.tabindex == 2) {
      that.findPickupItemPage()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var pageNo = that.data.pageNo;

    that.setData({
      pageNo: pageNo + 1,
    })
    fun.showLoading()
    if (that.data.tabindex == 0) {
      that.findPage()
    } else if (that.data.tabindex == 1) {
      that.findPickupMainPage()
    } if (that.data.tabindex == 2) {
      that.findPickupItemPage()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取input的值
   */
  inputchang(e) {
    console.log(e)
    let that = this;


    that.setData({
      inputInfo:e.detail.value,
    })
  },

  /**
   * 点击搜索
   */

  search(){
    let that = this;

    that.setData({
      pageNo: 1,
      loadText: false,
      findOutAllocationPageList: '',
      findPickupMainPageList: '',
      findPickupItemPageList: '',

    })
    if (that.data.tabindex == 0) {
      fun.showLoading()
      that.findPage()
    } else if (that.data.tabindex == 1) {
      fun.showLoading()
      that.findPickupMainPage()
    } if (that.data.tabindex == 2) {
      fun.showLoading()
      that.findPickupItemPage()
    }
  },
  /**
   * 点击切换列表
   */
  footerbtn(e) {
    let that = this,
      index = e.currentTarget.dataset.index;
    that.setData({
      tabindex: index,
      pageNo: 1,
      loadText: false,
      findOutAllocationPageList: '',
      findPickupMainPageList: '',
      findPickupItemPageList: '',
      inputInfo:''
    })

    if (that.data.tabindex == 0) {
      fun.showLoading()
      that.findPage()
    } else if (that.data.tabindex == 1) {
      fun.showLoading()
      that.findPickupMainPage()
    } if (that.data.tabindex == 2) {
      fun.showLoading()
      that.findPickupItemPage()
    }
  },


  /**
   * 跳转到提货分配
   */
  thfp(e) {

    let outallocationid = e.currentTarget.dataset.outallocationid;
    wx.navigateTo({
      url: '../../huozhu/thfp/thfp?outallocationid=' + outallocationid + '&accountId=' + this.data.accountId ,
    })
  },

  /**
    * 委托详情
    */
  wtDetail(e) {    
    wx.navigateTo({
      url: '../../huozhu/wtDetail/wtDetail?mainid=' + e.currentTarget.dataset.mainid,
    })
  },
  /**
   * 委托编辑
   */
  wtEdit(e) {
    wx.navigateTo({
      url: '../../huozhu/wtEdit/wtEdit?mainid=' + e.currentTarget.dataset.mainid,
    })
  },

  /**
   * 调度信息修改
   */
  ddInfoEdit(e) {
    let pickupitemid = e.currentTarget.dataset.pickupitemid;
    wx.navigateTo({
      url: '../../huozhu/ddInfoEdit/ddInfoEdit?pickupitemid=' + pickupitemid,
    })
  },


  /**
   * 调度信息变更记录
   */
  ddEditList(e) {

    let pickupitemid = e.currentTarget.dataset.pickupitemid;
    wx.navigateTo({
      url: '../../huozhu/ddEditList/ddEditList?pickupitemid=' + pickupitemid,
    })
  },

  /**
   * 销售分配列表搜索
   */

  distribution(e) {
    let that = this;

    console.log(e)
  },
  /**
   * 销售分配列表
   */
  findPage() {
    let that = this;
    fun.getData(api.api.huozhu.findOutAllocationPage, "GET", {
      accountId: that.data.accountId,
      pageNo: that.data.pageNo,
      pageSize: that.data.pageSize,
      inputInfo: that.data.inputInfo
    }, res => {
      if (res.data.code == 200) {
        var findOutAllocationPageList = that.data.findOutAllocationPageList;
        if (that.data.findOutAllocationPageList == '' || that.data.findOutAllocationPageList == null) {
          that.setData({
            findOutAllocationPageList: res.data.result.list,
          })

          if (res.data.result.pageNo == res.data.result.totalPage) {
            that.setData({
              loadText: true,
            })
          }
        } else {

          if (that.data.loadText == false) {
            that.setData({
              findOutAllocationPageList: findOutAllocationPageList.concat(res.data.result.list),
            })
          }

          if (res.data.result.pageNo == res.data.result.totalPage) {
            that.setData({
              loadText: true,
            })
          }

        }


        wx.hideLoading();
      } else {
        wx.hideLoading();
        fun.showToast(res.data.message, 'none', (success) => { })
      }
    })
  },

  /**
   * 提货委托列表
   */
  findPickupMainPage() {
    let that = this;
    fun.getData(api.api.huozhu.findPickupMainPage, "GET", {
      accountId: that.data.accountId,
      pageNo: that.data.pageNo,
      pageSize: that.data.pageSize,
      inputInfo: that.data.inputInfo
    }, res => {
      if (res.data.code == 200) {
        var findPickupMainPageList = that.data.findPickupMainPageList;
        if (that.data.findPickupMainPageList == '' || that.data.findPickupMainPageList == null) {
          that.setData({
            findPickupMainPageList: res.data.result.list,
          })

          if (res.data.result.pageNo == res.data.result.totalPage) {
            that.setData({
              loadText: true,
            })
          }
        } else {
          if (that.data.loadText == false) {
            that.setData({
              findPickupMainPageList: findPickupMainPageList.concat(res.data.result.list),
            })
          }

          if (res.data.result.pageNo == res.data.result.totalPage) {
            that.setData({
              loadText: true,
            })
          }
        }
        wx.hideLoading();
      } else {
        wx.hideLoading();
        fun.showToast(res.data.message, 'none', (success) => { })
      }

    })
  },

  /**
 * 信息调度列表
 */
  findPickupItemPage() {
    let that = this;
    fun.getData(api.api.huozhu.findPickupItemPage, "GET", {
      accountId: that.data.accountId,
      pageNo: that.data.pageNo,
      pageSize: that.data.pageSize,
      inputInfo: that.data.inputInfo
    }, res => {
      if (res.data.code == 200) {
        var findPickupItemPageList = that.data.findPickupItemPageList;
        if (that.data.findPickupItemPageList == '' || that.data.findPickupItemPageList == null) {
          that.setData({
            findPickupItemPageList: res.data.result.list,
          })
          if (res.data.result.pageNo == res.data.result.totalPage) {
            that.setData({
              loadText: true,
            })
          }
        } else {

          if (that.data.loadText == false) {
            that.setData({
              findPickupItemPageList: findPickupItemPageList.concat(res.data.result.list),
            })
          }

          if (res.data.result.pageNo == res.data.result.totalPage) {
            that.setData({
              loadText: true,
            })
          }

        }
        wx.hideLoading();
      } else {
        wx.hideLoading();
        fun.showToast(res.data.message, 'none', (success) => { })
      }


    })
  }

})