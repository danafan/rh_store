// pages/signing/signing.js
const app = getApp();
Page({
  data:{
    startBarHeight: app.globalData.startBarHeight,
    navgationHeight: app.globalData.navgationHeight
  },
  // 签约或登录
  next(e) {
    let type = e.target.dataset.type;
    wx.navigateTo({
      url: '/pages/registered/registered?type=' + type
    })
  }
})