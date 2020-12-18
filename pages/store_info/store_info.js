// pages/store_info/store_info.js
const app = getApp();
const locationApi = require('../../utils/getLocation.js')
Page({
  data: {
    store_name: "", //店铺名称
    showModal:false,    //选择品类弹框
    cate_id: "", //品类id集合
    cate_name: "", //品类名称
    store_address:"", //店铺地址
    contact_name: "", //联系人姓名
    contact_phone: "", //联系人电话
    store_face_img: "", //店铺门脸图
    category_list: [{
      id: '1',
      name: '火锅'
    }, {
      id: '2',
      name: '烧烤烤肉'
    }, {
      id: '3',
      name: '海鲜'
    }, {
      id: '4',
      name: '自助餐'
    }, {
      id: '5',
      name: '川湘菜'
    }, {
      id: '6',
      name: '日韩料理'
    }, {
      id: '7',
      name: '蛋糕甜点'
    }, {
      id: '8',
      name: '快餐西餐'
    }], //经营品类列表
    start_time: '', //开张时间
    end_time: '', //打烊时间
    start_timeStamp: 0,
    end_timeStamp: 0,
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
  //切换经营品类弹框
  changeModal() {
    this.setData({
      showModal: !this.data.showModal
    })
  },
  //确认经营品类
  submitContent(e) {
    let active_arr = e.detail.active_cate_ids;
    if(active_arr.length == 0){
      wx.showToast({
        title: '请选择经营品类',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }else{
      let names = [];
      let ids = [];
      active_arr.map(item => {
        names.push(item.name);
        ids.push(item.id);
      })
      this.setData({
        cate_id:ids.join('_'),
        cate_name:names.join('、'),
        showModal:false
      })
    }
  },
  //切换时间
  changeTime(e) {
    let value = e.detail.value;
    let timeStamp = parseInt(value.split(':')[0]) * 3600 + parseInt(value.split(':')[1]) * 60;
    console.log(e)
    let type = e.target.dataset.type;
    if (type == 'start_time') {
      if (this.data.end_timeStamp != 0 && timeStamp > this.data.end_timeStamp) {
        wx.showToast({
          title: '开始时间不能大于结束时间',
          icon: "none",
          mask: true,
          duration: 1500
        })
      } else {
        this.setData({
          start_time: value,
          start_timeStamp: timeStamp
        })
      }
    } else {
      if (this.data.start_timeStamp != 0 && timeStamp < this.data.start_timeStamp) {
        wx.showToast({
          title: '结束时间不能小于开始时间',
          icon: "none",
          mask: true,
          duration: 1500
        })
      } else {
        this.setData({
          end_time: value,
          end_timeStamp: timeStamp
        })
      }
    }
  },
  //修改店铺地址
  chooseLocation() {
    locationApi.chooseLocation().then(res => {
      console.log(res)
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
    } else if (this.data.store_address == '') {
      this.toastFun('请选择店铺地址');
    } else if (this.data.start_time == '' || this.data.end_time == '') {
      this.toastFun('请选择完善营业时间');
    } else if (this.data.store_face_img == '') {
      this.toastFun('请上传店铺主图');
    } else if (this.data.contact_name == '') {
      this.toastFun('请填写联系人姓名');
    } else if (this.data.contact_phone == '') {
      this.toastFun('请填写联系人手机号');
    } else {
      let req = {
        store_name: this.data.store_name,
        cate_name: this.data.cate_name,
        store_address: this.data.store_address,
        start_time: this.data.start_time, 
        end_time: this.data.end_time, 
        store_face_img: this.data.store_face_img,
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