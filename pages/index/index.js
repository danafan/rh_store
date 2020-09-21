//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    startBarHeight: 0,
    navgationHeight: 0,
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
  },
  onLoad: function(options) {
    //获取顶部导航栏信息
    this.setNavigation();
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
  //获取顶部导航栏信息
  setNavigation() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.setData({
          startBarHeight: statusBarHeight,
          navgationHeight: navHeight - statusBarHeight
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  }

})