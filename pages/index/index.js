//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    store_status: 1,   //1:营业中；2:已打烊；3:停业中
    startBarHeight: app.globalData.startBarHeight,
    navgationHeight: app.globalData.navgationHeight,
    date_type_list: [{
      id: '1',
      name: '今日'
    }, {
      id: '2',
      name: '近7日'
    }, {
      id: '3',
      name: '近30日'
    }, {
      id: '4',
      name: '自定义'
    }], //时间范围
    active_type_id: '1', //默认选中的是马鞍范围
    start_date: "", //自定义默认开始时间
    end_date: "", //自定义默认结束时间
    start_time: "", //可传递的开始时间
    end_time: "", //可传递的结束时间
    showModal:false,  //默认输码核销弹框不显示
    show_order_modal:false,   //订单核销详情
    order_info:{
      package_num:3
    },
    verify_num:1,       //默认核销数量
  },
  onLoad: function(options) {
    //自定义时间区间的开始结束范围
    this.setData({
      start_date: this.getLast3Month('4').last,
      end_date: this.getLast3Month('4').now
    })
    //获取今日数据
    let req = {
      start_time: this.getLast3Month('1').last,
      end_time: this.getLast3Month('1').now
    }
    this.getIndexInfo(req);
  },
  //输码核销
  inputCode(){
    this.setData({
      showModal: true
    })
  },
  //输码核销取消
  onClose() {
    this.setData({
      showModal: false
    })
  },
  //切换核销数量
  changeNumber(e){
    let type = e.target.dataset.type;
    if(type == 'jia'){
      if(this.data.verify_num == this.data.order_info.package_num){
        wx.showToast({
          title: '核销数量不能超过购买总数量',
          icon: 'none',
          duration: 1500
        })
      }else{
        this.setData({
          verify_num:this.data.verify_num + 1
        })
      }
    }else{
      if(this.data.verify_num == 1){
        wx.showToast({
          title: '核销数量不能少于1',
          icon: 'none',
          duration: 1500
        })
      }else{
        this.setData({
          verify_num:this.data.verify_num - 1
        })
      }
    }
  },
  //输码核销确认
  submitContent(e) {
    let edit_value = e.detail.edit_value;
    console.log(edit_value)
    this.setData({
      showModal: false
    })
  },
  //扫码核销
  scanCode(){
    this.setData({
      show_order_modal: true
    })
    // wx.scanCode({
    //   onlyFromCamera: true,
    //   success:(res) => {
    //     this.setData({
    //       show_order_modal:true
    //     })
    //     // wx.showModal({
    //     //   title: '提示',
    //     //   content: res.result
    //     // })
    //   }
    // })
  },
  //取消核销
  cancel(){
    this.setData({
      show_order_modal:false
    })
  },
  //确认核销
  confirm(){
    this.setData({
      show_order_modal:false
    })
  },
  //切换数据查看范围
  checkType(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      active_type_id: id
    })
    if (id == '1') {
      let req = {
        start_time: this.getLast3Month('1').last,
        end_time: this.getLast3Month('1').now
      }
      this.getIndexInfo(req);
    } else if (id == '2') {
      let req = {
        start_time: this.getLast3Month('2').last,
        end_time: this.getLast3Month('2').now
      }
      this.getIndexInfo(req);
    } else if (id == '3') {
      let req = {
        start_time: this.getLast3Month('3').last,
        end_time: this.getLast3Month('3').now
      }
      this.getIndexInfo(req);
    } else {
      this.setData({
        start_time: this.getLast3Month('4').last,
        end_time: this.getLast3Month('4').now
      })
    }
  },
  //切换自定义时间范围
  bindDateChange(e) {
    let date_type = e.currentTarget.dataset.date_type;
    let current_date = e.detail.value;
    let current_time = new Date(e.detail.value).getTime();
    let start_time = new Date(this.data.start_time).getTime();
    let end_time = new Date(this.data.end_time).getTime();
    if (date_type == 'start') {
      if (current_time > end_time) {
        wx.showToast({
          title: '开始时间能大于结束时间',
          icon: 'none',
          duration: 1500
        })
        return;
      } else {
        this.setData({
          start_time: current_date,
        })
      }
    } else if (date_type == 'end') {
      if (current_time < start_time) {
        wx.showToast({
          title: '结束时间不能小于开始时间',
          icon: 'none',
          duration: 1500
        })
        return;
      } else {
        this.setData({
          end_time: current_date,
        })
      }
    }
    let req = {
      start_time: this.data.start_time,
      end_time: this.data.end_time
    }
    this.getIndexInfo(req)
  },
  //接收开始和结束时间并请求
  getIndexInfo(req) {
    console.log(req);
  },
  //获取当前日期和三个月前的日期
  getLast3Month(date_type) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1; //0-11表示1-12月
    var day = now.getDate();
    var dateObj = {};
    //今天日期
    dateObj.now = year + '-' + this.filterMethod(month) + '-' + this.filterMethod(day);
    //动态日期
    if (date_type == '1') {
      dateObj.last = dateObj.now;
      return dateObj;
    } else if (date_type == '2') {
      let date1 = new Date();
      let date2 = new Date(date1);
      date2.setDate(date1.getDate() - 7);
      dateObj.last = date2.getFullYear() + "-" + (this.filterMethod(date2.getMonth() + 1)) + "-" + this.filterMethod(date2.getDate())
      return dateObj;
    } else if (date_type == '3') {
      let date1 = new Date();
      let date2 = new Date(date1);
      date2.setDate(date1.getDate() - 30);
      dateObj.last = date2.getFullYear() + "-" + (this.filterMethod(date2.getMonth() + 1)) + "-" + this.filterMethod(date2.getDate())
      return dateObj;
    } else if (date_type == '4') {
      let date1 = new Date();
      date1.setMonth(date1.getMonth() - 2);
      dateObj.last = date1.getFullYear() + "-" + this.filterMethod(date1.getMonth()) + "-" + this.filterMethod(date1.getDate())
      return dateObj;
    }
  },
  //处理小于0
  filterMethod(num) {
    if (parseInt(num) < 10) {
      return '0' + num;
    } else {
      return num;
    }
  },
  //公告列表
  announcementList(){
    wx.navigateTo({
      url: '/pages/announcement/announcement',
    });
  }

})