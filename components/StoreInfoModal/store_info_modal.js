// components/StoreInfoModal/store_info_modal.js
Component({
  properties: {
    category_list: {
      type: Array,
      value: []
    }, //经营品类列表
  },
  data: {
    active_cate_ids: [], //已选品类列表
  },
  methods: {
    //监听切换选项
    checkItem(e) {
      let id = e.target.dataset.cate_id;
      this.data.category_list.map(item => {
        if (item.id == id) {
          if(!item.is_default){
            if(this.data.active_cate_ids.length == 3){
              wx.showToast({
                title: '不能选择超过三个品类',
                icon: 'none',
                duration: 1500,
                mask: true
              })
            }else{
              item.is_default = true;
              let ids_arr = this.data.active_cate_ids;
              ids_arr.push(item);
              this.setData({
                active_cate_ids:ids_arr
              })
            }
          }else{
            item.is_default = false;
            this.data.active_cate_ids.map((i,ii) => {
              if(item.id == i.id){
                this.data.active_cate_ids.splice(ii,1);
              }
            })
          }
        }
      })
      this.setData({
        category_list:this.data.category_list
      })
    },
    //取消
    closeModal() {
      this.triggerEvent('changeModal');
    },
    //确认
    submitContent() {
      this.triggerEvent('submitContent', {
        active_cate_ids: this.data.active_cate_ids
      });
    },
  }
})
