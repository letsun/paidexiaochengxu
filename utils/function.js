var api = require("../utils/api.js");

/***
 * 
 * 获取oppenid
 */
function getopenid(callback) {
  wx.login({
    success: reg => {
      // getData(api.api.getOpenId, 'POST',{
      //   data:reg.code
      // },(res)=>{
      //   if (res.data.code == 200) {
      //     openid(res.data.result.openid)
      //   }else{
      //     showToast(res.data.message,'none',success=>{})
      //   }
      // })
      wx.request({
        url: api.api.getOpenId,
        method: 'POST',
        header: {
          'Accept': 'application/json',
          "content-type": "application/x-www-form-urlencoded"
        },

        data: {
          code: reg.code,
        },
        success: res => {
          callback(res.data.result.openid)
        },

        fail: res => {
          wx.hideLoading();
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 500,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
          })
        },

        complete: res => {
          wx.hideLoading();
        }

      })
    }
  })
}

/*
 * ajax请求方法
 * type   请求类型
 * url   接口url
 * data 数据
 * success  成功回调
 * */

function getData(url, type, data, success) {
  wx.request({
    url: url,
    method: type,
    header: {
      'Accept': 'application/json',
      "content-type": "application/x-www-form-urlencoded"
    },

    data: data,
    success: res => {
      success(res)
    },

    fail: res => {
      wx.showToast({
        title: '网络异常，请重新刷新页面',
        icon: 'none',
        duration: 500,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
      })
    },

    complete: res => {
      wx.hideLoading();
    }

  })
}


/***
 * 
 *模态框
 * content: 提示文字
 * confirm:点击确认的回调函数
 * cancel:点击取消的回调函数
 */

function showModal(title, content, confirm, cancel) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: true,
    confirmColor: '#fd7d00',
    success(res) {
      if (res.confirm) {
        confirm(confirm)
      } else if (res.cancel) {
        cancel(cancel)
      }
    },
  })
}



/***
 * 
 * 提示框
 * title: 提示文字
 * icon:提示图标
 * success:返回成功的回调函数
 */

function showToast(title, icon, success) {
  wx.showToast({
    title: title,
    icon: icon,
    duration: 2000,
    mask: true,
    success: function (res) {

      success(res)
    },
    fail: function (res) { },
  })
}

/***
 * 
 * 提示框
 * title: 提示文字
 * icon:提示图标
 * success:返回成功的回调函数
 */
function showLoading() {
  wx.showLoading({
    title: '加载中',
    mask: true,
    success: res => {

    },
    fail: res => {
      wx.hideLoading()
    }
  })
}





module.exports = {
  getData: getData,
  showModal: showModal,
  showToast: showToast,
  getopenid: getopenid,
  showLoading: showLoading
}