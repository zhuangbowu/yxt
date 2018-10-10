var app = getApp();
// pages/members/membersOrderDetails/membersOrderDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    template: {},
    shopData: new Object(),
    imageUrl: '',
    imageUrlCk: false,
    order: '',
    imagePath: '',
    imageUrls: '',
    mysrc:new Array()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var order = options.order;
    var thad = this;
    thad.setData({
      order: options.order
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getOrderDetail',
      method: "post",
      data: {
        "user_id": app.globalData.information.id,
        "order_no": thad.data.order
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
    var thad = this;
    var group_id = thad.data.shopData.group_id;
    return {
      title: '优鲜团-优先天下鲜，美味任你团',
      path: '/pages/members/membersDetails/membersDetails?id=' + group_id,
      imageUrl: thad.data.imageUrls,
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
      url: app.globalData.networkAddress + '/wapp/User/getPickQrcode',
      method: "post",
      data: {
        "scene": thad.data.order,
        "page": 'pages/group/membersDetailsTwo/membersDetailsTwo'
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            imageUrl: res.data.data.data,
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