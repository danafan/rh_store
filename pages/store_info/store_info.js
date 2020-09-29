// pages/store_info/store_info.js
const app = getApp();
Page({
  data: {
    store_name: "", //店铺名称
    cate_id: "", //品类id
    cate_name: "", //品类名称
    contact_name: "", //联系人姓名
    contact_phone: "", //联系人电话
    store_face_img: "", //店铺门脸图
    store_internal_img: "", //店铺环境图
    category_list: [{
      id: '1',
      name: '火锅'
    }, {
      id: '2',
      name: '烧烤烤肉'
    }, {
      id: '3',
      name: '海鲜'
    }], //经营品类列表
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
  //切换经营品类
  changeCate(e) {
    let index = e.detail.value;
    console.log(index)
    this.setData({
      cate_name: this.data.category_list[index].name,
      cate_id: this.data.category_list[index].id
    })
  },
  //提交
  submit() {
    wx.reLaunch({
      url: '/pages/qualification/qualification'
    })
    if (this.data.store_name == '') {
      this.toastFun('请填写店铺名称');
    } else if (this.data.cate_name == '') {
      this.toastFun('请选择经营品类');
    } else if (this.data.store_face_img == '') {
      this.toastFun('请上传店铺门脸图');
    } else if (this.data.store_internal_img == '') {
      this.toastFun('请上传店内环境图');
    } else if (this.data.contact_name == '') {
      this.toastFun('请填写联系人姓名');
    } else if (this.data.contact_phone == '') {
      this.toastFun('请填写联系人手机号');
    } else {
      let req = {
        store_name: this.data.store_name,
        cate_name: this.data.cate_name,
        store_face_img: this.data.store_face_img,
        store_internal_img: this.data.store_internal_img,
        contact_name: this.data.contact_name,
        contact_phone: this.data.contact_phone,
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