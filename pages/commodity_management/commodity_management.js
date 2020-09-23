// pages/commodity_management/commodity_management.js
Page({
  data: {
    tab_index: '0', //默认选中全部
    commodity_list:['1','2','3','4','5','6','7','8']
  },
  //切换顶部导航
  checkTab(e) {
    this.setData({
      tab_index: e.currentTarget.dataset.index
    })
  },
  //下架
  shelvesFun(){
    wx.showModal({
      title: '提示',
      content: '商品将在7日之后下架，下架之前已售出的商品可到店核销，确认下架？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //新建或编辑商品
  editCommodity(e) {
    let req = e.currentTarget.dataset;
    let req_arr = [];
    for (let key in req){
      let str = key + '=' + req[key];
      req_arr.push(str);
    }
    wx.navigateTo({
      url: `/pages/edit_commodity/edit_commodity?${req_arr.join('&')}`,
    });
  }
  
})