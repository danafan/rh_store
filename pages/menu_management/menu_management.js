// pages/menu_management/menu_management.js
Page({
  data: {
    category_list: [{
        id: '1',
        name: '锅底'
      }, {
        id: '2',
        name: '涮菜'
      }, {
        id: '3',
        name: '主食'
      },
      {
        id: '4',
        name: '其他'
      }
    ], //分类列表
    active_cate_index: 0, //默认选中的分类下标
    menu_list: [{
        id: '1',
        img: '../../images/banner_01.png',
        name: '老坛酸菜鱼',
        price: '48'
      },
      {
        id: '2',
        img: '../../images/banner_02.jpg',
        name: '青椒肉丝',
        price: '32'
      },
      {
        id: '3',
        img: '../../images/banner_03.jpg',
        name: '小炒肉',
        price: '28'
      }
    ]
  },
  //切换左侧类别
  changeCate(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      active_cate_index: index
    })
  },
  //管理分类
  categorySetting() {
    wx.navigateTo({
      url: '/pages/category_list/category_list',
    });
  },
  //编辑或者新增菜品
  editMenu(e){
    let data = e.currentTarget.dataset;
    var query_arr = [];
    for (let key in data){
      let str = key + '=' + data[key];
      query_arr.push(str);
    }
    wx.navigateTo({
      url: `/pages/edit_menu/edit_menu?${query_arr.join('&')}`,
    });
  },
  //删除菜品
  delMenu(e){
    var menu_id = e.currentTarget.dataset.menu_id;
    wx.showModal({
      title: '提示',
      content: '确认删除该菜品？',
      success(res) {
        if (res.confirm) {
          console.log(menu_id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})