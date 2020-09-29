// pages/qualification/qualification.js
const app = getApp();
Page({
  data: {
    business_license: "", //营业执照
    license_img:"",       //许可证
    startBarHeight: app.globalData.startBarHeight,
    navgationHeight: app.globalData.navgationHeight
  },
  //上传图片
  uploadImg(e) {
    let img_type = e.detail.img_type;
    let filePath = e.detail.filePath;
    this.setData({
      [img_type]: filePath
    })
  },
  //删除图片
  close(e) {
    let type = e.currentTarget.dataset.type;
    var req = {
      filename: type
    }
    this.setData({
      [type]: ""
    })
  },
  //提交
  submit() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
    if (this.data.business_license == '') {
      this.toastFun('请上传营业执照');
    } else if (this.data.license_img == '') {
      this.toastFun('请上传食品经营许可证');
    } else {
      let req = {
        business_license: this.data.business_license,
        license_img: this.data.license_img
      }
      console.log(req)
      // utils.post(api.idinfoauth, req).then(res => {
      //   if (res.code == 1) {
      //     wx.showToast({
      //       title: res.msg,
      //       icon: "none",
      //       mask: true,
      //       duration: 2000
      //     })
      //     wx.navigateTo({
      //       url: '/pages/identity_check/identity_check?show_back=1'
      //     })
      //   } else {
      //     wx.showToast({
      //       title: res.msg,
      //       icon: "none",
      //       mask: true,
      //       duration: 2000
      //     })
      //   }
      // })
    }
  },
  //提示
  toastFun(v) {
    wx.showToast({
      title: v,
      icon: "none",
      mask: true,
      duration: 1500
    })
  }

})