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
      wx.chooseImage({
        count: 1,
        success: (res) => {
          let filePath = res.tempFilePaths[0];
          let req = {
            img_type: this.data.img_type,
            filePath: filePath
          }
          this.triggerEvent('onEmit', req);
          // wx.uploadFile({
          //   url: api.imgupload, //上传图片
          //   filePath: e.detail.path,
          //   name: 'file',
          //   formData: {
          //     _3rd_session: wx.getStorageSync('3rd_session')
          //   },
          //   success: (res) => {
          //     if (JSON.parse(res.data).code == 1) {
          //       if (e.detail.card_type == 'front') {
          //         this.setData({
          //           show_card_front: e.detail.path,
          //           id_card_front: JSON.parse(res.data).data
          //         })
          //       } else {
          //         this.setData({
          //           show_card_back: e.detail.path,
          //           id_card_back: JSON.parse(res.data).data
          //         })
          //       };
          //     }
          //   }
          // })
        }
      })
    }
  }
})