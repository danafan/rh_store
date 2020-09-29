// pages/user_info/user_info.js
const app = getApp();
Page({
  data: {
    admin_name: "", //法人姓名
    id_number: "", //法人身份证号
    id_card_front: "", //身份证正面
    id_card_back:"",    //身份证反面
    startBarHeight: app.globalData.startBarHeight,
    navgationHeight: app.globalData.navgationHeight
  },
  //监听输入框
  changeValue(e) {
    let data_val = e.target.dataset.type;
    let val = e.detail.value;
    this.setData({
      [data_val]: val
    })
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
      url: '/pages/store_info/store_info'
    })
    if (this.data.admin_name == '') {
      this.toastFun('请填写法人姓名');
    } else if (this.data.id_number == '') {
      this.toastFun('请填写身份证号');
    } else if (this.data.id_card_front == '') {
      this.toastFun('请上传身份证正面');
    } else if (this.data.id_card_back == '') {
      this.toastFun('请上传身份证反面');
    } else {
      let req = {
        admin_name: this.data.admin_name,
        id_number: this.data.id_number,
        id_card_front: this.data.id_card_front,
        id_card_back: this.data.id_card_back
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