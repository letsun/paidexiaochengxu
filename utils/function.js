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
            success: function(res) {},
            fail: function(res) {},
          })
        },

        complete: res => {
          wx.hideLoading();
        }

      })
    }
  })
}

/***
 * 
 * 获取oppenid
 */
function getopenidhd(callback) {
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
          callback(res)
        },

        fail: res => {
          wx.hideLoading();
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 500,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
          })
        },

        complete: res => {
          // wx.hideLoading();
        }

      })
    }
  })
}



function chooseImage(success) {
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'], //'original', 'compressed' 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

      const tempFilePaths = res.tempFilePaths;

      console.log(res)
      wx.uploadFile({
        url: api.api.getImage, //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        // formData: {},
        header: {
          "Content-Type": "multipart/form-data"
        },
        success: res => {
          var resObj = JSON.parse(res.data);
          if (resObj.CODE == 0) {
            // that.setData({
            //   images: resObj.RESULT
            // })
            success(resObj.RESULT)
          } else {
            fun.showToast(resObj.MESSAGE, 'none', (success) => {})
          }
        }
      })
    }
  })
}



// function getUserInfo() {

//   wx.getUserInfo({
//     success: function(res) {
//       var userInfo = res.userInfo
//       var nickName = userInfo.nickName
//       var avatarUrl = userInfo.avatarUrl
//       var gender = userInfo.gender //性别 0：未知、1：男、2：女
//       var province = userInfo.province
//       var city = userInfo.city
//       var country = userInfo.country
//     }
//   })
// }

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
        success: function(res) {},
        fail: function(res) {},
      })
    },

    complete: res => {
      // wx.hideLoading();
    }

  })
}


function getDataP(url, type, data, success) {
  wx.request({
    url: url,
    method: type,
    header: {
      'Content-Type': 'application/json'
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
        success: function(res) {},
        fail: function(res) {},
      })
    },

    complete: res => {
      // wx.hideLoading();
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
    success: function(res) {

      success(res)
    },
    fail: function(res) {},
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
  getDataP: getDataP,
  showModal: showModal,
  showToast: showToast,
  getopenid: getopenid,
  showLoading: showLoading,
  getopenidhd: getopenidhd,
  chooseImage: chooseImage
}