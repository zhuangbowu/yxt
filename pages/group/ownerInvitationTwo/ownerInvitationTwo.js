var app = getApp();
// pages/owner/ownerInvitation/ownerInvitation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopData: new Object()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getMoneyLogDetail',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "id": id
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopData: res.data.data
          })
          for(var i=0;i<thad.data.shopData.length;i++){
            thad.data.shopData[i].numPrice = (thad.data.shopData[i].group_price * thad.data.shopData[i].sell_num).toFixed(2);
            thad.data.shopData[i].numMission = ((thad.data.shopData[i].numPrice * thad.data.shopData[i].commission) / 100).toFixed(2);
          }
          thad.setData({
            shopData: thad.data.shopData
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

  }
})