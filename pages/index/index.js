//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    startBarHeight: 0,
    navgationHeight: 0,
    date_type_list: [{
      id: '1',
      name: '今日'
    }, {
      id: '2',
      name: '近7日'
    }, {
      id: '3',
      name: '近30日'
    }, {
      id: '4',
      name: '自定义'
    }], //时间范围
    active_type_id:'1', //默认选中的是马鞍范围
  },
  onLoad: function(options) {
    //获取顶部导航栏信息
    this.setNavigation();
  },
  //切换数据查看范围
  checkType(e){
    this.setData({
      active_type_id:e.currentTarget.dataset.id
    })
  },
  //获取顶部导航栏信息
  setNavigation() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.setData({
          startBarHeight: statusBarHeight,
          navgationHeight: navHeight - statusBarHeight
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  }

})