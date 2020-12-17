// pages/add_bank/add_bank.js
Page({
  data: {
    real_name: "", //真实姓名
    id_number: "", //身份证号
    bank_number: "", //银行卡号
    admin_phone:"13067882143", //管理员手机号
    code: "", //验证码
    notBut: true, //默认获取验证码可点击
    time: 60, //倒计时时间
    codebutTxt: "获取验证码", //获取验证码文字
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
  //点击获取验证码
  getCode() {
    if (this.data.admin_phone == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: "none",
        mask: true,
        duration: 1500
      })
    } else {
      if (this.data.notBut == true) { //如果按钮可以点击
        //请求发送短信接口
        let req = {
          phone: this.data.phone
        }
        //倒计时
        this.timeDown();
          wx.showToast({
            title: '验证码发送成功，请向系统管理员所要验证码！',
            icon: "none",
            mask: true, 
            duration: 3000
          })
        // utils.get(api.getregistercode, req).then(res => {
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
    }else if (this.data.admin_phone == '') {
      wx.showToast({
        title: '请输入管理员手机号',
        icon: "none",
        mask: true,
        duration: 1500
      })
    }else if (this.data.code == '') {
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
        phone:this.data.admin_phone,
        code:this.data.code,
        is_default: this.data.is_default
      }
      console.log(req)
    }
  }
})