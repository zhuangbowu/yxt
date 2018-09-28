var app = getApp();
// pages/members/membersOrderDetails/membersOrderDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopData: new Object(),
    imageUrl: '',
    imageUrlCk: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var order = options.order;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getOrderDetail',
      method: "post",
      data: {
        "user_id": app.globalData.information.id,
        "order_no": order
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopData: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }

      }
    })
  },

  /** 
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideShareMenu();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // var thad = this;
    // setTimeout(function() {
    //   var aaa = thad.data.shopData.product_list;
    //   const ctx = wx.createCanvasContext('ttcanvas'); 
    //   var Top = 10;
    //   var Left = 80; 
    //   // canvas 背景颜色设置不成功，只好用白色背景图
    //   ctx.drawImage('../../../img/WechatIMG92.jpeg', 0, 0, 400, 800);
    //   for (var i = 0; i < aaa.length;i++){
    //     // ctx.drawImage(aaa[i].product_swiper[0].urlImg, 10, Top, 160, 160);
    //     ctx.drawImage('http://www.ybt9.com/upload/20180926/ea281900a8203beae726fb0144266cc7.jpg', 10, Top, 160, 160);
    //     ctx.save()
    //     ctx.setFontSize(32)
    //     ctx.setFillStyle("#000")
    //     ctx.fillText(aaa[i].product_name, 200, Left);
    //     ctx.setFillStyle("red")
    //     ctx.fillText(aaa[i].group_price, 200, (Left+60));
    //     ctx.setFillStyle("red")
    //     ctx.fillText('x' + aaa[i].num, 280, (Left + 60));
    //     Top = Top+180;
    //     Left = Left + 160;
    //   };
    //   setTimeout(function () {
    //     ctx.draw()
    //     wx.canvasToTempFilePath({
    //       canvasId: 'ttcanvas',
    //       success: function (res) {
    //         console.log(res.tempFilePath);
    //         thad.setData({
    //           locolurl: res.tempFilePath
    //         })
    //       }
    //     })
    //   }, 1000);
    // }, 500)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    // var aaa = this.data.locolurl;
    var group_id = this.data.shopData.group_id;
    return {
      title: '优鲜团-优先天下鲜，美味任你团',
      path: '/pages/members/membersDetails/membersDetails?id=' + group_id
    }
  },
  navIndex: function() {
    wx.redirectTo({
      url: '../members/members'
    });
  },
  navCode: function() {
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getOrderDetail',
      method: "post",
      data: {
        "scene": thad.data.order_no,
        "page": 'pages/members/membersDetailsTwo/membersDetailsTwo'
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            imageUrl: res.data.data,
            imageUrlCk: true
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  navckkk: function() {
    this.setData({
      imageUrlCk: false
    })
  }
})