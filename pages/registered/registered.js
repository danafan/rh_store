// pages/registered/registered.js
const app = getApp();
Page({
  data: {
    page_type:"",
    navgation_title:"",   //页面标题文字
    button_text:"",       //按钮文字
    isClick: false, //默认登录按钮不高亮
    phone: "", //手机号
    code: "", //验证码
    notBut: true, //默认获取验证码可点击
    time: 60, //倒计时时间
    codebutTxt: "获取验证码", //获取验证码文字
  },
  onLoad(e){
    wx.setNavigationBarTitle({
      title: e.type == 'sign' ? '新商户签约' : '商户登录'
    })
    this.setData({
      page_type:e.type,
      navgation_title:e.type == 'sign' ? '新商户签约' : '商户登录',
      button_text:e.type == 'sign' ? '提交' : '登录'
    })
  },
  //监听输入的手机号
  changePhone(v) {
    let phone = v.detail.value;
    this.setData({
      phone: phone
    })
    this.watchPC();
  },
  //监听输入的验证码
  changeCode(v) {
    let code = v.detail.value;
    this.setData({
      code: code
    })
    this.watchPC();
  },
  //监听手机号和验证码不为空
  watchPC() {
    if (this.data.phone !== "" && this.data.code !== "") {
      this.setData({
        isClick: true
      })
    } else {
      this.setData({
        isClick: false
      })
    }
  },
  //提交或登录
  login() {
    if(this.data.page_type == 'sign'){
      wx.reLaunch({
        url: '/pages/user_info/user_info'
      })
    }else{
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
    
    if (this.data.phone == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: "none",
        mask: true,
        duration: 1500
      })
    } else if (this.data.code == "") {
      wx.showToast({
        title: '请输入验证码',
        icon: "none",
        mask: true,
        duration: 1500
      })
    } else {
      let req = {
        phone: this.data.phone,
        sms_code: this.data.code,
        type:this.data.page_type
      }
      console.log(req)
    }

  },
  //点击获取验证码
  getCode() {
    if (this.data.phone == "") {
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
})