var app = getApp();
// pages/compage/compage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:new Object(),
    compage:[
      {
        urlImg:'http://bangimg1.dahe.cn/forum/201508/19/225501jrc041acjg7g1qjh.jpg',
        types:1
      },
      {
        urlImg: '../../../img/7619f1fea1d779e9e58a47bfbbcf5021.mp4',
        types: 2
      }
    ],
    describe: '这是描述这是描述这是描述这是描述这是描述',
    indicatorDots: false,
    autoplay: false,
    interval: 500,
    duration: 200,
    switchs: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var data = JSON.parse(options.objj);
    var shop_id = options.shop_id;
    var group_id = options.group_id;
    var header_id = app.globalData.owner.header_id;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getGroupDetail',
      data: {
        "header_id": header_id,
        "group_id": shop_id
      },
      success: res => {
        var objj = res.data.data.product_list[group_id];
        thad.setData({
          shop: objj
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 滑动容器插件
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  switchsFalse: function () {
    // this.setData({
    //   switchs:false
    // })
  },
  switchsTrue: function () {
    // this.setData({
    //   switchs: true
    // })
  }
})