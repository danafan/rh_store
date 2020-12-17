// pages/edit_menu/edit_menu.js
Page({
  data: {
    sub_type: '1', //1:新增；2:编辑
    menu_img: '', //上传的图片
    menu_name: "", //菜品名称
    menu_price: "", //菜品价格
    menu_unit:"",   //单位（默认份）
    startTime: 0,
    endTime: 0
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.sub_type == 'add' ? '添加菜品' : '编辑菜品',
    })
    this.setData({
      sub_type: options.sub_type == 'add' ? '1' : '2',
      menu_id: options.sub_type == 'add' ? '' : options.id
    })
  },
  // 修改内容
  changeVal(e) {
    let data_val = e.target.dataset.type;
    let val = e.detail.value;
    this.setData({
      [data_val]: val
    })
  },
  //点击选择图片
  chooseImg() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({
          menu_img: res.tempFilePaths[0]
        })
      }
    })
  },
  handleTouchStart(e) {
    this.setData({
      startTime: e.timeStamp
    })
  },
  handleTouchEnd(e) {
    this.setData({
      endTime: e.timeStamp
    })
  },
  //点击放大图片
  handleClick(e) {
    if (this.data.endTime - this.data.startTime < 350) {
      let arr = [];
      arr.push(this.data.menu_img)
      wx.previewImage({
        urls: arr // 需要预览的图片http链接列表
      })
    }
  },
  // 长按
  handleLongPress() {
    wx.showActionSheet({
      itemList: ['删除'],
      success: (res) => {
        console.log(this.data.menu_img)
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    })
  },
  //提交
  submit() {
    if (this.data.menu_img == '') {
      wx.showToast({
        title: '请上传次菜品图片',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.menu_name == '') {
      wx.showToast({
        title: '请输入菜品名称',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.menu_price == '') {
      wx.showToast({
        title: '请输入菜品价格',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      let req = {
        menu_img: this.data.menu_img, //上传的图片
        menu_name: this.data.menu_name, //菜品名称
        menu_price: this.data.menu_price //菜品价格
      }
      console.log(req)
    }
  }
})