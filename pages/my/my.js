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
  //提现
  cashMoney() {
    wx.navigateTo({
      url: '/pages/cash/cash',
    });
  },
  //门店设置
  storeSetting() {
    wx.navigateTo({
      url: '/pages/store_setting/store_setting',
    });
  },
  //商品管理
  commodityManagement() {
    wx.navigateTo({
      url: '/pages/commodity_management/commodity_management',
    });
  },
  //银行卡管理
  bankManagement() {
    wx.navigateTo({
      url: '/pages/bank_management/bank_management',
    });
  },
  //分享自定义
  onShareAppMessage: function (res) {
    return app.globalData.shareObj
  }
})