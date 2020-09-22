// pages/my/my.js
const app = getApp();
Page({
  data: {
    
  },
  onLoad: function (options) {
    
  },
  //账单
  billPage() {
    wx.navigateTo({
      url: '/pages/bill/bill',
    });
  },
  //分享自定义
  onShareAppMessage: function (res) {
    return app.globalData.shareObj
  }
})