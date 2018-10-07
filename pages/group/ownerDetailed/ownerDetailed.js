var app = getApp();
// pages/owner/ownerDetailed/ownerDetailed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopData: new Array(),
    page: 0,
    num: 20,
    pageLis: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var header_id = app.globalData.information.id;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getMoneyLog',
      method: 'post',
      data: {
        "leader_id": header_id,
        "page": thad.data.page,
        "page_num": thad.data.num
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 20) {
            thad.setData({
              pageLis: 1
            })
          }
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
    var header_id = app.globalData.information.id;
    var thad = this;
    thad.setData({
      page: thad.data.page + 1
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getMoneyLog',
      method: 'post',
      data: {
        "leader_id": header_id,
        "page": thad.data.page,
        "page_num": thad.data.num
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 20) {
            thad.setData({
              pageLis: 1
            })
          }
          var aaa = thad.data.shopData.concat(res.data.data);
          thad.setData({
            shopData: aaa
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  navInvitation: function (e) {
    var indexs = e.currentTarget.dataset.hi;
    var thad = this;
    var aaa = thad.data.shopData[indexs].type;
    var bbb = thad.data.shopData[indexs].id;
    var ccc = thad.data.shopData[indexs].order_no;
    if (aaa == 2) {
      wx.navigateTo({
        url: '../ownerInvitation/ownerInvitation?id=' + ccc,
      })
    }
    if (aaa == 1) {
      wx.navigateTo({
        url: '../ownerInvitationTwo/ownerInvitationTwo?id=' + bbb,
      })
    }
  },
  navgengduo: function () {
    // var header_id = app.globalData.information.id;
    // var thad = this;
    // thad.setData({
    //   page: thad.data.page + 1
    // })
    // wx.request({
    //   url: app.globalData.networkAddress + '/wapp/Leader/getMoneyLog',
    //   method: 'post',
    //   data: {
    //     "leader_id": header_id,
    //     "page": thad.data.page,
    //     "page_num": thad.data.num
    //   },
    //   success: res => {
    //     if (res.data.code == 1) {
    //       var nnmm = res.data.data.length;
    //       if (nnmm < 20) {
    //         thad.setData({
    //           pageLis: 1
    //         })
    //       }
    //       var aaa = thad.data.shopData.concat(res.data.data);
    //       thad.setData({
    //         shopData: aaa
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })
  }
})