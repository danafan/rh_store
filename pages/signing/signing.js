// pages/signing/signing.js
const app = getApp();
Page({
  data:{
    startBarHeight: app.globalData.startBarHeight,
    navgationHeight: app.globalData.navgationHeight
  },
  // 立即签约
  signing() {
    wx.reLaunch({
      url: '/pages/registered/registered'
    })
  }
})