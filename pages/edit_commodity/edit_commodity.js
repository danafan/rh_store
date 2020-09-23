// pages/edit_commodity/edit_commodity.js
Page({
  data: {
    sub_type: '1', //1:添加；2:修改
    commodity_id: "", //编辑的商品的id
    store_name:"",    //商品名称
  },
  onLoad(options) {
    // wx.setNavigationBarTitle({
    //   title: options.sub_type == 'add' ? '添加商品' : '编辑商品',
    // })
    // this.setData({
    //   sub_type: options.sub_type == 'add' ? '1' : '2',
    //   commodity_id: options.sub_type == 'add' ? '' : options.id
    // })
  },
  //修改商品名称
  changeName(e){
    this.setData({
      store_name:e.detail.value
    })
  }

})