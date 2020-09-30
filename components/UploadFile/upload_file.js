// components/UploadFile/upload_file.js
Component({
  properties: {
    img_type: {
      type: String,
      value: ""
    }
  },
  methods: {
    //点击选择图片
    chooseImg() {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          let tempFilePath = res.tempFiles[0].tempFilePath;
          let req = {
            img_type: this.data.img_type,
            filePath: tempFilePath
          }
          this.triggerEvent('onEmit', req);
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
    }
  }
})