var app=getApp();
// pages/group/membersSeeOne/membersSeeOne.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopData:new Object(),
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    var thad=this;
    thad.setData({
      id:id
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getGroupTotal',
      data: {
        "leader_id": app.globalData.information.id,
        "group_id": thad.data.id
      },
      success: res => {
        if (res.data.code == 1) {
          console.log(res);
          thad.setData({
            shopData:res.data.data
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
  navDdelallsda:function(){
    var id=this.data.id;
    wx.redirectTo({
      url: '../membersSee/membersSee?id='+id,
    })
  }
})