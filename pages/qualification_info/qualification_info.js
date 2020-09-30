// pages/qualification_info/qualification_info.js
Page({
  data: {
    id_card_front: "../../images/banner_01.png", //身份证正面
    id_card_back: "../../images/banner_02.jpg",    //身份证反面
    business_license: '../../images/banner_03.jpg',  //营业执照
    license_img:'../../images/banner_02.jpg',       //食品经营许可证
  },
  //查看图片
  previewImg(e){
    let urls = [];
    let img_url = e.currentTarget.dataset.img_url;
    urls.push(img_url)
    console.log(urls)
    wx.previewImage({
      urls: urls
    })
  }
  

})