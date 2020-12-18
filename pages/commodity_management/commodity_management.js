// pages/commodity_management/commodity_management.js
Page({
  data: {
    tab_index: '0', //默认中全部
    commodity_list: [{
      id: '1',
      commodity_img: '../../images/banner_02.jpg',
      commodity_name: '大众精选杭帮菜2人特惠套餐',
      sold_num: '32',
      now_project: '108',
      old_project: '198',
      discount: '7.8',
      shelves_time: '2020-09-28 14:42:35',
      status: '1', //1:已上架；2:已下架；3:待上架；4：未通过
    }, {
      id: '2',
      commodity_img: '../../images/banner_02.jpg',
      commodity_name: '大众精选杭帮菜2人特惠套餐',
      sold_num: '32',
      now_project: '108',
      old_project: '198',
      discount: '7.8',
      shelves_time: '2020-09-28 14:42:35',
      status: '2', //1:已上架；2:已下架；3:待上架；4：未通过
    },
    {
      id: '3',
      commodity_img: '../../images/banner_02.jpg',
      commodity_name: '大众精选杭帮菜2人特惠套餐',
      sold_num: '32',
      now_project: '108',
      old_project: '198',
      discount: '7.8',
      shelves_time: '2020-09-28 14:42:35',
      status: '3', //1:已上架；2:已下架；3:待上架；4：未通过
    },{
      id: '4',
      commodity_img: '../../images/banner_02.jpg',
      commodity_name: '大众精选杭帮菜2人特惠套餐',
      sold_num: '32',
      now_project: '108',
      old_project: '198',
      discount: '7.8',
      shelves_time: '2020-09-28 14:42:35',
      status: '4', //1:已上架；2:已下架；3:待上架；4：未通过
    }]
  },
  //切换顶部导航
  checkTab(e) {
    this.setData({
      tab_index: e.currentTarget.dataset.index
    })
  },
  //下架
  shelveDown(e){
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '下架后已售出的商品在有效期内继续支持到店到店核销，用户端将不再展示该商品，确认下架？',
      success:(res) => {
        if (res.confirm) {
          console.log("已下架")
        }
      }
    })
  },
  //上架
  shelveUp(e) {
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认上架？',
      success:(res) => {
        if (res.confirm) {
          console.log("已上架")
        }
      }
    })
  },
  //删除
  packageDelete(e) {
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success:(res) => {
        if (res.confirm) {
          console.log("已删除")
        }
      }
    })
  },
  // 查看拒绝原因
  whyFun(e){
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      showCancel:false,
      content: '审核拒绝的原因'
    })
    
  },
  //新建套餐
  addCommodity() {
    wx.navigateTo({
      url: '/pages/add_commodity/add_commodity',
    });
  },
  //套餐详情
  commodityDetail(e) {
    wx.navigateTo({
      url: '/pages/commodity_detail/commodity_detail',
    });
  },

})