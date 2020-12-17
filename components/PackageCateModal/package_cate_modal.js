// components/PackageCateModal/package_cate_nodal.js
Component({
  properties: {
    edit_value: {
      type: String,
      value: ''
    }, //弹框内容
    is_checked:{
      type: Boolean,
      value: false
    },  //是否多选
    check_num:{
      type: String,
      value: ''
    },      //可选数量
  },
  data: {
    
  },
  methods: {
    //监听输入框
    changeValue(e) {
      let value = e.detail.value;
      let value_type = e.target.dataset.value_type;
      this.setData({
        [value_type]: value
      })
    },
    //取消
    closeModal() {
      this.triggerEvent('onClose');
    },
    //确认
    submitContent() {
      this.triggerEvent('submitContent', {
        edit_value: this.data.edit_value,
        is_checked:this.data.is_checked,
        check_num:this.data.check_num
      });
    },
  }
})
