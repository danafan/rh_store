// pages/edit_package/edit_package.js
Page({
  data: {
    cate_column_list: [],
    all_cate_list: [],
    cate_name_list: [],
    all_menu_list: [],
    menu_name_list: [],
    cate_menu_list:[],
    multiArray: [],
    default_cate_id: "",
    multiIndex: [0, 0],
  },
  onLoad() {
    //获取第一列表
    this.getCateList();
  },
  //获取类别列表
  getCateList() {
    let all_cate_list = [{
      id: '1',
      name: '无脊椎动物'
    }, {
      id: '2',
      name: '脊椎动物'
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
      name: '扁性动物',
      p_id: '1'
    }, {
      id: '2',
      name: '线形动物',
      p_id: '1'
    }, {
      id: '3',
      name: '环节动物',
      p_id: '1'
    }, {
      id: '4',
      name: '软体动物',
      p_id: '1'
    }, {
      id: '5',
      name: '节肢动物',
      p_id: '1'
    }, {
      id: '6',
      name: '猪肉绦虫',
      p_id: '2'
    }, {
      id: '7',
      name: '吸血虫',
      p_id: '2'
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
  bindMultiPickerChange(e) {
    let active_column_index = e.detail.value[1];
    let active_menu = this.data.cate_menu_list[active_column_index];
    console.log(active_menu)
  },
})