//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
,

getPhoneNumber: function (e) {

    console.log("getPhoneNumber==>" + e.detail.errMsg)
    console.log("getPhoneNumber==>" + e.detail.iv)
    console.log("getPhoneNumber==>" + e.detail.encryptedData)


    var param = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      code: this.data.code
    };


    wx.request({
      url: this.data.serverUri + "demoweb/wx/wxLogin.do",
      data: "p=" + param,
      method: "post",
      header: {
        "Content-Type":
        "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res != null) {
          wx.showModal({
            title: '友情提示',
            showCancel: false,
            content: res
          })
        } else {
          wx.showModal({
            title: '友情提示',
            showCancel: false,
            content: "接口错误",

          })
        }
      },
      fail: function (res) {
        console.log("getPhoneNumber==>fail" + res)
      },
      complete: function () {
        console.log("complete==>")
      }
    })



  }

})