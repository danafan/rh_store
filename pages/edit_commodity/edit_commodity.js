// pages/edit_commodity/edit_commodity.js
Page({
  data: {
    sub_type: '1', //1:添加；2:修改
    commodity_id: "", //编辑的商品的id
    store_name: "", //商品名称
    img_list: [], //已上传的图片列表
    startTime: 0, //点击时间
    endTime: 0, //抬起时间
    new_price:"", //折扣后价格
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.sub_type == 'add' ? '添加商品' : '编辑商品',
    })
    this.setData({
      sub_type: options.sub_type == 'add' ? '1' : '2',
      commodity_id: options.sub_type == 'add' ? '' : options.id
    })
  },
  // 修改内容
  changeVal(e){
    let data_val = e.target.dataset.type;
    let val = e.detail.value;
    this.setData({
      [data_val]: val
    })
  },
  //点击选择图片
  chooseImg() {
    wx.chooseImage({
      count: 5,
      success: (res) => {
        if (this.data.img_list.length + res.tempFilePaths.length > 5) {
          wx.showToast({
            title: '图片不能超过5张',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        } else {
          this.setData({
            img_list: [...this.data.img_list, ...res.tempFilePaths]
          })
        }
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
      let index = e.currentTarget.dataset.index;
      wx.previewImage({
        current: this.data.img_list[index], // 当前显示图片的http链接
        urls: this.data.img_list // 需要预览的图片http链接列表
      })
    }
  },
  // 长按
  handleLongPress(e) {
    let index = e.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList: ['设为封面图', '删除'],
      success:(res) => {
        if (res.tapIndex == 0) { // 设置为封面
          let images = this.data.img_list;
          let current_img = this.data.img_list[index];
          images.splice(index, 1);
          images.unshift(current_img);
          this.setData({
            img_list: images
          })
        } else if (res.tapIndex == 1) { //删除图片
          var images = this.data.img_list;
          images.splice(index, 1);
          this.setData({
            img_list: images
          })
        }
      },
      fail:(res) => {
        console.log(res.errMsg)
      }
    })
  },
  //提交审核
  submitAudit(){

  }
})