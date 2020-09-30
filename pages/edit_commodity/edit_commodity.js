// pages/edit_commodity/edit_commodity.js
Page({
  data: {
    sub_type: '1', //1:添加；2:修改
    commodity_id: "", //编辑的商品的id
    package_name: "", //商品名称
    img_list: [], //已上传的图片列表
    startTime: 0, //点击时间
    endTime: 0, //抬起时间
    new_price: "", //折扣后价格
    is_default: true, //审核通过后直接上架
    cate_column_list: [],
    all_cate_list: [],
    cate_name_list: [],
    all_menu_list: [],
    menu_name_list: [],
    cate_menu_list: [],
    multiArray: [],
    default_cate_id: "",
    multiIndex: [0, 0],
    package_list: [], //已选套餐列表
    showModal: false, //添加分类名称弹框
    current_cate_index: 0, //点击的分类下标
    edit_value: "", //弹框内容
    total_price: 0, //合计金额
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.sub_type == 'add' ? '添加套餐' : '编辑套餐',
    })
    this.setData({
      sub_type: options.sub_type == 'add' ? '1' : '2',
      commodity_id: options.sub_type == 'add' ? '' : options.id
    })
    //获取类别列表
    this.getCateList();
  },
  // 修改内容
  changeVal(e) {
    let data_val = e.target.dataset.type;
    let val = e.detail.value;
    this.setData({
      [data_val]: val
    })
  },
  //点击选择图片
  chooseImg() {
    wx.chooseMedia({
      count: 5,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let tempFiles = res.tempFiles;
        if (this.data.img_list.length + tempFiles.length > 5) {
          wx.showToast({
            title: '图片不能超过5张',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        } else {
          let tempFilePaths = [];
          tempFiles.map(item => {
            tempFilePaths.push(item.tempFilePath);
          })
          this.setData({
            img_list: [...this.data.img_list, ...tempFilePaths]
          })
        }
        console.log(this.data.img_list)
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
  handleTouchStart(e) {
    this.setData({
      startTime: e.timeStamp
    })
  },
  handleTouchEnd(e) {
    this.setData({
      endTime: e.timeStamp
    })
  },
  //点击放大图片
  handleClick(e) {
    if (this.data.endTime - this.data.startTime < 350) {
      let index = e.currentTarget.dataset.index;
      wx.previewImage({
        current: this.data.img_list[index], // 当前显示图片的http链接
        urls: this.data.img_list // 需要预览的图片http链接列表
      })
    }
  },
  // 长按
  handleLongPress(e) {
    let index = e.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList: ['设为封面图', '删除'],
      success: (res) => {
        if (res.tapIndex == 0) { // 设置为封面
          let images = this.data.img_list;
          let current_img = this.data.img_list[index];
          images.splice(index, 1);
          images.unshift(current_img);
          this.setData({
            img_list: images
          })
        } else if (res.tapIndex == 1) { //删除图片
          var images = this.data.img_list;
          images.splice(index, 1);
          this.setData({
            img_list: images
          })
        }
      },
      fail: (res) => {
        console.log(res.errMsg)
      }
    })
  },
  //增加分类
  addPackItem() {
    let pack_item = {
      cate_name: "",
      menu_list: []
    }
    let arr = this.data.package_list;
    arr.push(pack_item)
    this.setData({
      package_list: arr
    })
    console.log(this.data.package_list)
  },
  //删除分类
  deleteCate(e) {
    let index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确认删除该分类以及所属的菜品？',
      success: (res) => {
        if (res.confirm) {
          let package_list = this.data.package_list;
          package_list.splice(index, 1);
          this.setData({
            package_list: package_list
          })
          //计算合计金额
          this.calculateTotal();
        }
      }
    })
  },
  //监听菜品的数量
  changeNumber(e) {
    let index = e.currentTarget.dataset.index;
    let i = e.currentTarget.dataset.i;
    let type = e.currentTarget.dataset.type;
    let current_number = this.data.package_list[index].menu_list[i].number;
    if (type == 'jia') {
      current_number += 1;
      var number = `package_list[${index}].menu_list[${i}].number`;
      this.setData({
        [number]: current_number
      })
    } else {
      if (current_number == 1) {
        let new_list = this.data.package_list[index].menu_list;
        new_list.splice(i, 1);
        var menu_list = `package_list[${index}].menu_list`;
        this.setData({
          [menu_list]: new_list
        })
      } else {
        current_number -= 1;
        var number = `package_list[${index}].menu_list[${i}].number`;
        this.setData({
          [number]: current_number
        })
      }
    }
    //计算合计金额
    this.calculateTotal();
  },
  //获取类别列表
  getCateList() {
    let all_cate_list = [{
      id: '1',
      name: '锅底'
    }, {
      id: '2',
      name: '涮菜'
    }, {
      id: '3',
      name: '主食'
    }, {
      id: '4',
      name: '其他'
    }];
    let cate_name_list = all_cate_list.map(item => {
      return item.name;
    })
    this.setData({
      cate_column_list: [cate_name_list, []],
      all_cate_list: all_cate_list,
      cate_name_list: cate_name_list
    })
    let default_cate_id = all_cate_list[0]['id'];
    //获取类别下的菜品列表
    this.getMenuList(default_cate_id);
  },
  //获取类别下的菜品列表
  getMenuList(default_cate_id) {
    this.setData({
      default_cate_id: default_cate_id
    })
    let all_menu_list = [{
      id: '1',
      name: '山城三味锅',
      price: '48',
      number: 1,
      p_id: '1'
    }, {
      id: '2',
      name: '哈哈香辣锅',
      price: '68',
      number: 1,
      p_id: '1'
    }, {
      id: '3',
      name: '腰不倒台',
      price: '32',
      number: 1,
      p_id: '2'
    }, {
      id: '4',
      name: '重庆山城毛肚',
      price: '38',
      number: 1,
      p_id: '2'
    }, {
      id: '5',
      name: '山城辣妹子肥牛',
      price: '48',
      number: 1,
      p_id: '2'
    }, {
      id: '6',
      name: '自制午餐肉',
      price: '22',
      number: 1,
      p_id: '2'
    }, {
      id: '7',
      name: '重庆油豆腐',
      price: '10',
      number: 1,
      p_id: '2'
    }, {
      id: '8',
      name: '金针菇',
      price: '12',
      number: 1,
      p_id: '2'
    }, {
      id: '9',
      name: '土豆片',
      price: '8',
      number: 1,
      p_id: '2'
    }, {
      id: '10',
      name: '油麦菜',
      price: '12',
      number: 1,
      p_id: '2'
    }, {
      id: '11',
      name: '米饭',
      price: '2',
      number: 1,
      p_id: '3'
    }, {
      id: '12',
      name: '龙须面',
      price: '3',
      number: 1,
      p_id: '3'
    }, {
      id: '13',
      name: '纸巾',
      price: '2',
      number: 1,
      p_id: '4'
    }, {
      id: '14',
      name: '自助调料',
      price: '6',
      number: 1,
      p_id: '4'
    }];
    let cate_menu_list = [];
    all_menu_list.map(item => {
      if (item.p_id == default_cate_id) {
        cate_menu_list.push(item)
      }
    })
    this.setData({
      cate_menu_list: cate_menu_list
    })
    let menu_name_list = cate_menu_list.map(item => {
      return item.name;
    })
    var cate_name_list = this.data.cate_name_list;
    this.setData({
      multiArray: [cate_name_list, menu_name_list],
      all_menu_list: all_menu_list,
      menu_name_list: menu_name_list
    })
  },
  //点击某一类别的标题
  editCateName(e) {
    let index = e.currentTarget.dataset.index;
    let cate_name = e.currentTarget.dataset.cate_name;
    this.setData({
      current_cate_index: index,
      edit_value: cate_name == '' ? '' : cate_name,
      showModal: true
    })
  },
  //关闭添加分类名称
  onClose() {
    this.setData({
      showModal: false
    })
  },
  //添加分类名称
  submitContent(e) {
    let edit_value = e.detail.edit_value;
    let current_cate_index = this.data.current_cate_index;
    var cate_name = `package_list[${current_cate_index}].cate_name`;
    this.setData({
      [cate_name]: edit_value,
      showModal: false
    })
  },
  //切换左侧类别
  bindMultiPickerColumnChange(e) {
    var column_index = e.detail.column;
    var column_val = e.detail.value;
    var multiIndex = this.data.multiIndex;
    multiIndex[column_index] = column_val;
    this.setData({
      multiIndex: multiIndex
    });
    switch (column_index) {
      case 0:
        let all_cate_list = this.data.all_cate_list;
        let cate_id = all_cate_list[column_val]['id'];
        this.getMenuList(cate_id);
        break;
    }
  },
  //确认选择菜品
  bindMultiPickerChange(e) {
    //分类下标
    let cate_index = e.currentTarget.dataset.index;
    //菜品对象
    let active_column_index = e.detail.value[1];
    let active_menu = this.data.cate_menu_list[active_column_index];
    //分类下的菜品列表
    let cate_menu_list = this.data.package_list[cate_index].menu_list;
    let isRepeat = false;
    cate_menu_list.map(item => {
      if (active_menu.id == item.id) {
        item.number += 1;
        isRepeat = true;
        return;
      }
    })
    if (!isRepeat) {
      cate_menu_list.push(active_menu);
    }
    var menu_list = `package_list[${cate_index}].menu_list`;
    this.setData({
      [menu_list]: cate_menu_list
    })
    //计算合计金额
    this.calculateTotal();
  },
  //计算合计金额
  calculateTotal() {
    let menu_list = [];
    this.data.package_list.map(item => {
      menu_list = [...menu_list, ...item.menu_list];
    })
    let total_price = 0;
    menu_list.map(item => {
      total_price += parseFloat(item.price) * item.number
    })
    this.setData({
      total_price: total_price
    })
  },
  //提交审核
  submitAudit() {
    if (this.data.package_name == '') {
      wx.showToast({
        title: '请输入套餐名称',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.img_list.length == 0) {
      wx.showToast({
        title: '请上传套餐图片',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.package_list.length == 0) {
      wx.showToast({
        title: '请上传套餐内容',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    } else if (this.data.package_list.length > 0) {
      let is_ok = true;
      this.data.package_list.map(item => {
        if (item.cate_name == '') {
          wx.showToast({
            title: '类别名称不能为空',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          is_ok = false;
          return;
        } else if (item.menu_list.length == 0) {
          wx.showToast({
            title: '类别下菜品不能为空',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          is_ok = false;
          return;
        }
      })
      if (is_ok) {
        if (this.data.new_price == '') {
          wx.showToast({
            title: '请输入用户购买价格',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        } else {
          let req = {
            package_name: this.data.package_name,
            img_list: this.data.img_list,
            package_list: this.data.package_list,
            new_price: this.data.new_price,
            is_default: this.data.is_default
          };
          console.log(req)
        }
      }
    }
  }
})