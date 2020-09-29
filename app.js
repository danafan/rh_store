//app.js
App({
  onLaunch: function () {
    //获取顶部导航栏信息
    this.setNavigation();
  },
  //获取顶部导航栏信息
  setNavigation() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.startBarHeight = statusBarHeight,
        this.globalData.navgationHeight = navHeight - statusBarHeight
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    startBarHeight: "",
    navgationHeight: ""
  }
})