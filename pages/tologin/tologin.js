const app = getApp();
// pages/tologin/tologin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  },
  bindGetUserInfo: function(e) {
    var that = this;
    //此处授权得到userInfo
    var objj = e.detail.userInfo;
    //接下来写业务代码
    wx.request({
      url: app.globalData.networkAddress+'/wapp/Pub/loginByWapp',
      data: {
        open_id: app.globalData.openId,
        user_name: objj.nickName,
        avatar: objj.avatarUrl,
        gender: objj.gender,
        city: objj.city,
        province: objj.province,
        country: objj.country
      },
      success: function (res) {
        app.globalData.information=res.data.data;
      }
    })
    //最后，记得返回刚才的页面
    wx.redirectTo({
      url: '../index/index',
    })
  }
})