// pages/bank_management/bank_management.js
Page({
  data: {
    bank_list: [{
      id: '1',
      bank_name: "中国工商银行",
      bank_code: '89273498123749182347',
      is_default: true
    }, {
      id: '2',
      bank_name: "中国建设银行",
      bank_code: '89273498123749182347',
      is_default: false
    }, {
      id: '3',
      bank_name: "中国农业银行",
      bank_code: '89273498123749182347',
      is_default: false
    }],
    type:'',        //my：我的；cash：提现
  },
  onLoad(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.type == 'my' ? '银行卡管理' : '选择提现卡',
    })
    this.setData({
      type: options.type 
    })
  },
  // 点击银行卡
  settingBank(e) {
    let bank_id = e.currentTarget.dataset.bank_id;
    wx.showActionSheet({
      itemList: ['设为默认提现卡', '删除'],
      success: (res) => {
        let tapIndex =  res.tapIndex;
        wx.showModal({
          title: '提示',
          content: tapIndex == 0?'设置为默认提现卡？':'确认删除该银行卡？',
          success:(res) => {
            if (res.confirm) {
              if (tapIndex == 0){
                console.log('设为默认提现卡')
              } else if (tapIndex == 1){
                console.log('删除银行卡')
              }
            }
          }
        })
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    })
  },
  //添加银行卡
  addBank(){
    wx.navigateTo({
      url: '/pages/add_bank/add_bank',
    });
  }
})