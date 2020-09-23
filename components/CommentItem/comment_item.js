// components/CommentItem/comment_item.js
Component({
  properties: {
    page_type:{
      type:String,
      value:""
    }
  },
  data: {
    comment_info:{
      id:'1',
      user_img:'../../images/banner_02.jpg',
      user_name:'伪装的幸福',
      star_num:3,
      create_time:'2020-07-08',
      content:"天启年间，北京城里流传着一句歌谣：“委鬼当头立，茄花满地红。”这个“委鬼”合起来写就是“魏”，暗指专权太监魏忠贤；“茄花”暗指朱由校的乳母客氏，因为在北京话里面，“客”这个字便读作“茄”音，意思是这两人相互勾结，把皇宫内外搞得昏天黑地。",
      imgs: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1942169203,2282777752&fm=26&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2608571146,3647468270&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2213243739,2879070233&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2505490283,1352053537&fm=26&gp=0.jpg','https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3112784576,2002302097&fm=26&gp=0.jpg']
    },
    show_input:false, //默认回复弹框不显示
    reply_content:"", //商家的回复内容
  },
  methods: {
    //点击放大图片
    openBigImg(e){
      let index = e.currentTarget.dataset.index;
      wx.previewImage({
        current: this.data.comment_info.imgs[index], // 当前显示图片的http链接
        urls: this.data.comment_info.imgs // 需要预览的图片http链接列表
      })
    },
    //点击发起回复
    openReply(){
      this.setData({
        reply_content:"",
        show_input:true
      })
    },
    //关闭回复
    closeBack(){
      this.setData({
        show_input:false
      })
    },
    //监听商家回复
    changeInput(e){
      this.setData({
        reply_content:e.detail.value
      })
    },
    //申诉
    complaint(){
      wx.navigateTo({
        url: '/pages/complaint/complaint'
      });
    },
    //提交回复
    submitReply(){
      this.setData({
        show_input: false
      })
      console.log(this.data.reply_content)
    }

  }
})
