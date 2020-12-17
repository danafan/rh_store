// pages/commodity_detail.js
Page({
  data: {
    package_info: {
      package_name: "哈哈套餐",
      image_list: ['../../images/banner_01.png', '../../images/banner_02.jpg', '../../images/banner_01.png', '../../images/banner_03.jpg', '../../images/banner_01.png'],
      package_cate_list: [{
        cate_name: "主食2选1",
        menu_list: [{
          menu_name: '米饭',
          price: '2',
          num: '2',
          unit: '份'
        }, {
          menu_name: '面条',
          price: '2',
          num: '1',
          unit: '碗'
        }]
      }, {
        cate_name: "涮菜",
        menu_list: [{
          menu_name: '金针菇',
          price: '8',
          num: '1',
          unit: '盘'
        }, {
          menu_name: '茼蒿',
          price: '6',
          num: '1',
          unit: '份'
        }]
      }],
      total_price: '198',
      price: '98'
    }
  },
  //点击放大图片
  handleClick(e) {
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.package_info.image_list[index], // 当前显示图片的http链接
      urls: this.data.package_info.image_list // 需要预览的图片http链接列表
    })
  },
})
