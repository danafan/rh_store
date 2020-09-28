// components/Modal/modal.js
Component({
  properties: {
    title: {
      type:String,
      value:''
    },             //弹框标题
    placeholder:{
      type: String,
      value: ''
    },
    edit_value: {
      type: String,
      value: ''
    },        //弹框内容
  },
  data: {

  },
  methods: {
    //监听输入框
    changeValue(e) {
      let value = e.detail.value;
      this.setData({
        edit_value: value
      })
    },
    //取消
    closeModal() {
      this.triggerEvent('onClose');
    },
    //确认
    submitContent() {
      this.triggerEvent('submitContent', { edit_value: this.data.edit_value});
    },
  }
})
