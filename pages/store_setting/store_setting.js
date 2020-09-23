// pages/store_setting/store_setting.js
const locationApi = require('../../utils/getLocation.js')
Page({
  data: {
    store_name:"鱼妹儿·酸菜鱼米饭", //店铺名称
    business_status: "1",     //营业状态id
    business_name: "营业中",   //营业状态文字
    business_status_list: [{
      id: '1',
      name: '营业中'
    }, {
      id: '2',
      name: '已停业'
    }],                       //营业状态列表
    category_list: [{
      id: '1',
      name: '火锅'
    }, {
      id: '2',
      name: '烧烤烤肉'
    }, {
      id: '3',
      name: '海鲜'
    }],                       //经营品类列表
    phone:"13067882143",      //店铺电话
    business_hours:"9:30 - 21:30",//营业时间
    active_cate_name: '火锅',  //选中的品类名称
    active_cate_id: '1',      //选中的品类id
    location_address:"浙江省杭州市萧山区城厢街道104号",    //店铺地址
    showModal:false,          //默认修改内容的弹框不显示
    edit_id:"",               //1:店铺名称；2:店铺电弧；3:营业时间
    edit_value:"",            //弹框要修改的内容
    title:"",                 //修改的弹框标题
  },
  //更换店铺主图
  editStoreImg() {
    wx.chooseImage({
      count:1,
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
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
  editFun(e){
    let edit_id = e.currentTarget.dataset.edit_id;
    let edit_value = '';
    let title = '';
    if (edit_id == '1'){
      edit_value = this.data.store_name;
      title = '店铺名称';
    } else if (edit_id == '2') {
      edit_value = this.data.phone;
      title = '店铺电话';
    } else if (edit_id == '3') {
      edit_value = this.data.business_hours;
      title = '营业时间';
    }
    this.setData({
      showModal:true,
      edit_id: edit_id,
      edit_value: edit_value,
      title: title
    })
  },
  //监听修改的内容
  changeValue(e){
    let value = e.detail.value;
    this.setData({
      edit_value: value
    })
  },
  //修改店铺地址
  chooseLocation() {
    locationApi.chooseLocation().then(res => {
      console.log(res)
    })
  },
  //取消
  closeModal(){
    this.setData({
      showModal: false
    })
  },
  //提交审核
  submitAudit() {
    if (this.data.edit_id == '1') { //店铺名称
      let req = {
        store_name: this.data.edit_value
      }
      console.log(req)
    } else if (this.data.edit_id == '2') {  //店铺电话
      let req = {
        phone: this.data.edit_value
      }
      console.log(req)
    } else if (this.data.edit_id == '3') {  //营业时间
      let req = {
        business_hours: this.data.edit_value
      }
      console.log(req)
    }
  },
  //切换经营品类
  changeCate(e) {
    let index = e.detail.value;
    this.setData({
      active_cate_name: this.data.category_list[index].name,
      active_cate_id: this.data.category_list[index].id
    })
  },
  //切换营业状态
  changeStatus(e) {
    let index = e.detail.value;
    this.setData({
      business_name: this.data.business_status_list[index].name,
      business_status: this.data.business_status_list[index].id
    })
  },
})