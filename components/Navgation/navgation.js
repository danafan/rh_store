// components/Navgation.js
const app = getApp()
Component({
  properties: {
    title:{
      type: String,
      value: ""
    },
    show_back:{
      type:String,
      value:0
    }
  },
  data: {
    startBarHeight: app.globalData.startBarHeight,
    navgationHeight: app.globalData.navgationHeight
  },
  methods: {
    goBack(){
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
