// pages/add_bank/add_bank.js
Page({
  data: {
    real_name: "", //真实姓名
    id_number: "", //身份证号
    bank_number: "", //银行卡号
    is_default:true, //设置默认提现卡
  },
  // 修改内容
  changeVal(e) {
    let data_val = e.target.dataset.type;
    let val = e.detail.value;
    this.setData({
      [data_val]: val
    })
    console.log(this.data.is_default)
  },
  //点击提交银行卡信息
  submitFun() {
    if (this.data.real_name == '') {
      wx.showToast({
        title: '请输入真实姓名',
        icon: "none",
        mask: true,
        duration: 1500
      })
    } else if (this.data.id_number == '') {
      wx.showToast({
        title: '请输入身份证号',
        icon: "none",
        mask: true,
        duration: 1500
      })
    } else if (this.data.bank_number == '') {
      wx.showToast({
        title: '请输入银行卡号',
        icon: "none",
        mask: true,
        duration: 1500
      })
    } else {
      let req = {
        real_name: this.data.real_name, //真实姓名
        id_number: this.data.id_number, //身份证号
        bank_number: this.data.bank_number, //银行卡号
        is_default: this.data.is_default
      }
      console.log(req)
    }
  }
})