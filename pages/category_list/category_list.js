// pages/category_list/category_list.js
Page({
  data: {
    category_list: [{
        id: '1',
        name: '锅底',
        children_num: 3
      }, {
        id: '2',
        name: '涮菜',
        children_num: 3
      }, {
        id: '3',
        name: '主食',
        children_num: 3
      },
      {
        id: '4',
        name: '其他',
        children_num: 3
      }
    ], //分类列表
    showModal:false,      //默认弹框不限时
    title:'',             //弹框标题
    edit_value:'',        //弹框内容
  },
  //添加分类
  addCate() {
    this.setData({
      showModal: true,
      title: '添加分类',
      edit_value: ''
    })
  },
  //编辑分类
  editCate(e) {
    let cate_id = e.currentTarget.dataset.cate_id;
    this.setData({
      showModal: true,
      title: '编辑分类',
      edit_value:'这是后台获取的内容'
    })
  },
  //取消
  onClose() {
    this.setData({
      showModal: false
    })
  },
  //确认
  submitContent(e) {
    console.log(e)
  },
  //删除分类
  delCate(){
    wx.showModal({
      title: '提示',
      content: '确认删除分类？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})