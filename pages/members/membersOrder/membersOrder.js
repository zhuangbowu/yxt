var app=getApp();
// pages/members/membersOrder/membersOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:new Array()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getOrderList',
      method: "post", 
      data: {
        "user_id": app.globalData.information.id
      },
      success: res => {
        console.log(res);
        if (res.data.code == 1) {
          thad.setData({
            listData:res.data.data
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
  navOrderDetails:function(e){
    var order = this.data.listData[e.currentTarget.dataset.h1].order_no;
    wx.navigateTo({
      url: '../membersOrderDetails/membersOrderDetails?order='+order,
    })
  }
})