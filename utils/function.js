/*
 *ajax请求方法
 * type   类型
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
      'content-type': 'application/json',
    },

    data: data,
    success: res => {
      success(res)
    },

    fail: res => {
      wx.showLoading({
        title: res.msg,
        icon: 'none'
      })
    },

    complete: res => {

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

function showModal(title,content, confirm, cancel) {
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

function showToast(title, icon) {
  wx.showToast({
    title: title,
    icon: icon,
    duration: 500,
    mask: true,
    success: function(res) {},
    fail: function(res) {},

  })
}

/***
 * 
 * 获取oppenid
 */
function getopenid(openid) {
  wx.login({
    success: res => {
      openid(res.code)
    }
  })
}

module.exports = {
  getData: getData,
  showModal: showModal,
  showToast: showToast,
  getopenid: getopenid,
}