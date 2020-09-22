// pages/complaint/complaint.js
Page({
  data: {
    refund_list: [{
      id: '1',
      name: '同行恶意差评'
    }, {
      id: '2',
      name: '用户选错评分'
    }, {
      id: '3',
      name: '用户提出不合理要求'
    }, {
      id: '4',
      name: '用户以差评威胁商家'
    }, {
      id: '5',
      name: '广告或无意义评价'
    }, {
      id: '6',
      name: '其他'
    }],
    active_index: null, //默认选中的index
    active_content: "", //选中的文字
    reply_content:"",   //详细描述

  },
  onLoad(option) {
    let order_id = option.order_id;
    console.log(order_id)
  },
  //选择退款原因
  checkItem(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      active_index: index,
      active_content: e.currentTarget.dataset.content
    })
  },
  //监听详情描述
  changeInput(){
    this.setData({
      reply_content: e.detail.value
    })
  },
  //点击申请退款
  applyRefund() {
    var arr = [];
    this.data.refund_list.map(item => {
      if (item.checked) {
        arr.push(item.id);
      }
    })
    if (arr.length == 0) {
      wx.showToast({
        title: '最少选择一个退款原因',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else {
      console.log(arr)
    }
  }

})