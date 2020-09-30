// pages/announcement/announcement.js
Page({
  data: {

  },
  //点击消息
  readContent() {
    let content = '这一条是未读的公告，要返回是否已读的参数，点击查看详情之后标记为已读，颜色变为黑色';
    wx.showModal({
      title:'公告内容',
      content: content,
      showCancel:false,
      success:(res) => {
        console.log(res)
        // if (res.confirm) {
        //   console.log('用户点击确定')
        // } else if (res.cancel) {
        //   console.log('用户点击取消')
        // }
      }
    })
  }
})