// pages/order/order.js
Page({
  data: {
    tab_index: '0', //默认选中全部
    order_list: [{
      order_id: "1",
      user_icon: '../../images/banner_01.png',
      user_name: "Ranbol",
      phone: "2143",
      package_icon: '../../images/banner_02.jpg',
      package_name: '沪小川双人套餐',
      order_status: '1', //1:待核销；2:已完成；3已退款；
      order_status_text: "待核销",
      pay_time: '2020-07-12 13:24:52', //付款时间
      consumption_time: '2020-07-12 13:24:52', //消费时间
      arrive_time: '2020-07-12 13:24:52', //退款时间
      end_time: '2020-08-12 13:24:52', //订单有效期
      number: '1', //商品数量
      total_money: '88' //总金额
    }, {
      order_id: "2",
      user_icon: '../../images/banner_03.jpg',
      user_name: "幸福满满",
      phone: "2143",
      package_icon: '../../images/banner_02.jpg',
      package_name: '渝上侬火锅2-4人套餐',
      order_status: '2', //1:待核销；2:已完成；3已退款；
      order_status_text: "已完成",
      pay_time: '2020-07-12 13:24:52', //付款时间
      consumption_time: '2020-07-12 13:24:52', //消费时间
      arrive_time: '2020-07-12 13:24:52', //退款时间
      end_time: '2020-08-12 13:24:52', //订单有效期
      number: '1', //商品数量
      total_money: '88' //总金额
    }, {
      order_id: "3",
      user_icon: '../../images/banner_01.png',
      user_name: "言午龙",
      phone: "2143",
      package_icon: '../../images/banner_01.png',
      package_name: '江巴人重庆市井火锅2人餐',
      order_status: '3', //1:待核销；2:已完成；3已退款；
      order_status_text: "已退款",
      pay_time: '2020-07-12 13:24:52', //付款时间
      consumption_time: '2020-07-12 13:24:52', //消费时间
      arrive_time: '2020-07-12 13:24:52', //退款时间
      end_time: '2020-08-12 13:24:52', //订单有效期
      number: '1', //商品数量
      total_money: '88' //总金额
    }]
  },
  onLoad: function(options) {
    // this.setData({
    //   tab_index: options.index
    // })
  },
  //切换顶部导航
  checkTab(e) {
    this.setData({
      tab_index: e.currentTarget.dataset.index
    })
  },

  //上拉加载
  onReachBottom() {
    console.log('上拉加载')
  },
  onShareAppMessage: function() {

  }
})