// pages/cash/cash.js
Page({
  data: {
    total_money:"99.873",  //总金额
    cash_money:"",      //输入的提现金额
    bank_name:"中国工商银行",         //选中的银行名称
    bank_id:"1",
    bank_list: [{
      id: '1',
      name: '中国工商银行(3053)'
    }, {
      id: '2',
      name: '中国农业银行(5826)'
    }, {
      id: '3',
      name: '中国建设银行(7017)'
    }],           //银行列表
  },
  onLoad: function (options) {

  },
  //切换银行
  changeBank(e){
    let pickIndex = e.detail.value;
    this.setData({
      bank_name: this.data.bank_list[pickIndex].name,
      bank_id: this.data.bank_list[pickIndex].id,
    })
  },
  //监听提现金额
  changeMoney(e){ 
    this.setData({
      cash_money: e.detail.value
    })
  },
  //点击全部金额
  allCash(){
    this.setData({
      cash_money: this.data.total_money
    })
  },
  //确认提现
  replyCash(){
    if (!(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(this.data.cash_money))){
      wx.showToast({
        title: '请输入正确的提现金额',
        icon: 'none',
        duration: 1500
      })
    }else{
      let req = {
        bank_id: this.data.bank_id,
        cash_money: this.data.cash_money
      }
      console.log(req)
    }
  }

})