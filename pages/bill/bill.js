// pages/bill/bill.js
Page({
  data: {
    bill_list: [{
      id: '1',
      desc: "商户结算",
      check_money: "100",
      create_time: '2020-09-20 13:34:56',
      balance: "1034.48",
      type: '1',
    }, {
      id: '2',
      desc: "提现",
      check_money: "98",
      create_time: '2020-09-20 13:34:56',
      balance: "1034.48",
      type: '2',
    }],     //账单列表
    start_date:"",  //获取用户注册的当月
    end_date:"",
    current_date:"",    //显示的当前月
  },
  onLoad(){
    //获取当前月
    this.getCurrentMonth();
  },
  //获取当前月
  getCurrentMonth(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1; 
    this.setData({
      start_date: "2019-08",
      end_date: year + "-" + (parseInt(month) < 10 ? '0' + month : month),
      current_date: year + "-" + (parseInt(month) < 10 ? '0' + month : month)
    })
  },
  //切换筛选条件
  bindDateChange(e){
    this.setData({
      current_date:e.detail.value
    })
  }
})