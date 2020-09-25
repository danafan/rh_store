// pages/commodity_management/commodity_management.js
Page({
  data: {
    tab_index: '0', //默认选中全部
    commodity_list: [{
      id: '1',
      commodity_img: '../../images/banner_02.jpg',
      commodity_name: '大众精选杭帮菜2人特惠套餐',
      sold_num: '32',
      now_project: '108',
      old_project: '198',
      discount: '7.8',
      shelves_time: '2020-09-28 14:42:35',
      status: '1', //1:已上架；2:待下架；3:待上架
    }, {
      id: '2',
      commodity_img: '../../images/banner_02.jpg',
      commodity_name: '大众精选杭帮菜2人特惠套餐',
      sold_num: '32',
      now_project: '108',
      old_project: '198',
      discount: '7.8',
      shelves_time: '2020-09-28 14:42:35',
      status: '2', //1:已上架；2:待下架；3:待上架
    }, {
      id: '3',
      commodity_img: '../../images/banner_02.jpg',
      commodity_name: '大众精选杭帮菜2人特惠套餐',
      sold_num: '32',
      now_project: '108',
      old_project: '198',
      discount: '7.8',
      shelves_time: '2020-09-28 14:42:35',
      status: '3', //1:已上架；2:待下架；3:待上架
    }]
  },
  //切换顶部导航
  checkTab(e) {
    this.setData({
      tab_index: e.currentTarget.dataset.index
    })
  },
  //下架
  shelvesFun(e) {
    var status = e.currentTarget.dataset.status;
    wx.showModal({
      title: '提示',
      content: status == '1' ? '商品将在7日之后下架，下架之前已售出的商品可到店核销，确认下架？' : status == '2' ? '确认撤销？' : '确认上架？',
      success(res) {
        if (res.confirm) {
          if (status == '1') {
            console.log("下架")
          } else if (status == '2') {
            console.log("撤销")
          } else if (status == '3') {
            console.log("上架")
          }
        }
      }
    })
  },
  //新建或编辑商品
  editCommodity(e) {
    let req = e.currentTarget.dataset;
    let req_arr = [];
    for (let key in req) {
      let str = key + '=' + req[key];
      req_arr.push(str);
    }
    wx.navigateTo({
      url: `/pages/edit_commodity/edit_commodity?${req_arr.join('&')}`,
    });
  }

})