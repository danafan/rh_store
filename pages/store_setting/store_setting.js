// pages/store_setting/store_setting.js
const locationApi = require('../../utils/getLocation.js')
Page({
  data: {
    store_name: "鱼妹儿·酸菜鱼米饭", //店铺名称
    active_cate_name: '火锅', //经营品类名称
    store_img: '../../images/banner_01.png', //店铺主图
    business_name: "营业中", //营业状态文字
    business_status: "1", //营业状态id
    business_status_list: [{
      id: '1',
      name: '营业'
    }, {
      id: '2',
      name: '打烊',
    }, {
      id: '3',
      name: '停业',
    }], //营业状态列表
    location_address: "浙江省杭州市萧山区城厢街道104号", //店铺地址
    start_time: '07:00', //开张时间
    end_time: '21:00', //打烊时间
    start_timeStamp: 25200,
    end_timeStamp: 75600,
    concat_name: "彪子", //联系人
    concat_phone: "13067882143", //联系电话
    showModal: false, //默认修改内容的弹框不显示
    edit_type: '', //弹框类型
    title: "", //修改的弹框标题
    edit_value: "", //修改的内容
  },
  //更换店铺主图
  editStoreImg() {
    wx.showModal({
      title: '提示',
      content: "店铺主图每月允许修改一次，建议图片比例1:3",
      confirmText: "修改",
      success: (res) => {
        if (res.confirm) {
          //选择店铺主图
          this.chooseImage();
        }
      }
    })
  },
  //选择店铺主图
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let tempFilePath = res.tempFiles[0].tempFilePath;
        console.log(tempFilePath)
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success(res) {
        //     const data = res.data
        //     //do something
        //   }
        // })
      }
    })
  },
  //点击修改内容
  editFun(e) {
    let edit_type = e.currentTarget.dataset.edit_type;
    let edit_value = '';
    let title = '';
    if (edit_type == 'concat_name') {
      edit_value = this.data.concat_name;
      title = '联系人';
    } else if (edit_type == 'concat_phone') {
      edit_value = this.data.concat_phone;
      title = '联系电话';
    }
    this.setData({
      showModal: true,
      edit_type: edit_type,
      edit_value: edit_value,
      title: title
    })
  },
  //修改店铺地址
  chooseLocation() {
    locationApi.chooseLocation().then(res => {
      console.log(res)
    })
  },
  //取消修改
  onClose() {
    this.setData({
      showModal: false
    })
  },
  //确认修改
  submitContent(e) {
    let edit_value = e.detail.edit_value;
    this.setData({
      [this.data.edit_type]: edit_value,
      showModal: false
    })
  },
  //切换营业状态
  changeStatus(e) {
    let index = e.detail.value;
    let content = "";
    if (index == 0) {
      content = "营业后用户可到店用餐，确认营业？"
    } else if (index == 1) {
      content = "打烊后用户端将显示已打烊，用户将不会到店，确认打烊？"
    } else if (index == 2) {
      content = "停业后用户将看不到店铺套餐，无法下单，确认停业？"
    }
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        if (res.confirm) {
          this.setData({
            business_name: this.data.business_status_list[index].name,
            business_status: this.data.business_status_list[index].id
          })
        }
      }
    })
  },
  //切换时间
  changeTime(e) {
    let value = e.detail.value;
    let timeStamp = parseInt(value.split(':')[0]) * 3600 + parseInt(value.split(':')[1]) * 60;
    let type = e.target.dataset.type;
    if (type == 'start_time') {
      if (timeStamp > this.data.end_timeStamp) {
        wx.showToast({
          title: '开始时间不能大于结束时间',
          icon: "none",
          mask: true,
          duration: 1500
        })
      } else {
        this.setData({
          start_time: value,
          start_timeStamp: timeStamp
        })
      }
    } else {
      if (timeStamp < this.data.start_timeStamp) {
        wx.showToast({
          title: '结束时间不能小于开始时间',
          icon: "none",
          mask: true,
          duration: 1500
        })
      } else {
        this.setData({
          end_time: value,
          end_timeStamp: timeStamp
        })
      }
    }
  },
  //营业资质
  qualificationInfo() {
    wx.navigateTo({
      url: '/pages/qualification_info/qualification_info',
    });
  }

})