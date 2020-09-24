// pages/add_bank/add_bank.js
Page({
  data: {
    real_name: "", //真实姓名
    id_number: "", //身份证号
    bank_number: "", //银行卡号
    phone: "", //银行预留手机号
    code: "", //验证码
    codebutTxt: "发送验证码", //获取验证码提示文字
    notBut: true, //默认发送验证码按钮可点击
    time: 60, //倒计时时间
  },
  // 修改内容
  changeVal(e) {
    let data_val = e.target.dataset.type;
    let val = e.detail.value;
    this.setData({
      [data_val]: val
    })
  },
  //点击获取验证码
  getCode() {
    if (this.data.phone == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: "none",
        mask: true,
        duration: 2000
      })
    } else {
      if (this.data.notBut == true) { //如果按钮可以点击
        let req = {
          phone: this.data.phone
        }
        //倒计时
        this.timeDown();
        //请求发送短信接口
        // utils.get(api.getbankphonecode, req).then(res => {
        //   wx.showToast({
        //     title: res.msg,
        //     icon: "none",
        //     mask: true,
        //     duration: 2000
        //   })
        //   //倒计时
        //   this.timeDown();
        // })
      } else {
        wx.showToast({
          title: '操作频繁',
          icon: "none",
          mask: true,
          duration: 1500
        })
      }
    }
  },
  // 倒计时
  timeDown() {
    if (this.data.time > 0) {
      this.setData({
        notBut: false,
        time: this.data.time - 1,
        codebutTxt: this.data.time + "s"
      })
      setTimeout(this.timeDown, 1000);
    } else {
      this.setData({
        notBut: true,
        time: 60,
        codebutTxt: "获取验证码"
      })
    }
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
    } else if (this.data.phone == '') {
      wx.showToast({
        title: '请输入银行预留手机号',
        icon: "none",
        mask: true,
        duration: 1500
      })
    } else if (this.data.code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: "none",
        mask: true,
        duration: 1500
      })
    } else {
      let req = {
        real_name: this.data.real_name, //真实姓名
        id_number: this.data.id_number, //身份证号
        bank_number: this.data.bank_number, //银行卡号
        phone: this.data.phone, //银行预留手机号
        code: this.data.code, //验证码
      }
      console.log(req)
    }
  }
})