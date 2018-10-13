var app = getApp();
// pages/group/membersDetails/membersDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkeds: false,
    shopData: new Object()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order = options.order;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getUserOrderDet',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "order_no": order
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopData: res.data.data
          })
          if (thad.data.shopData.pick_status == 1) {
            thad.setData({
              checkeds: true
            })
          }
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
  switch1Change: function (e) {
    var thad = this;
    if (e.detail.value) {
      wx.showModal({
        title: '提示',
        content: '是否已经取货',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.networkAddress + '/wapp/Leader/operaUserOrder',
              method: 'post',
              data: {
                "leader_id": app.globalData.information.id,
                "order_no": thad.data.shopData.order_no
              },
              success: res => {
                if (res.data.code == 1) {
                  wx.redirectTo({
                    url: '../groupList/groupList',
                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  })
                }
              }
            })
          }
          if (res.cancel) {
            thad.setData({
              checkeds: false
            })
            wx.showToast({
              title: '取消团员取货操作',
            })
          }
        }
      })

    } else {
      thad.setData({
        checkeds: true
      })
      wx.showToast({
        title: '已取货！请勿重复点击',
        icon: 'none'
      })
    }
  },
  navRefund: function (e) {
    var thad = this;
    wx.navigateTo({
      url: '../groupRefund/groupRefund?indexs=' + e.currentTarget.dataset.index + '&order=' + thad.data.shopData.order_no,
    })
  }
})