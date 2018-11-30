//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text: "XXXX"
  },

  publish: function(e) {
    console.log(e.detail.value);
    wx.showToast({
      title: e.detail.value["titile"],
      icon: "success",
      duration: 2000
    });

    wx.navigateTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
      url: "/pages/notify/notify"
    })

  }
,

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindStartNameChange: function (e) {
    this.setData({
      startName: e.detail.value
    })
  },

  bindEndNameChange: function (e) {
    this.setData({
      endName: e.detail.value
    })
  }


})