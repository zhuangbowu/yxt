var app=getApp();
// pages/group/membersSee/membersSee.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    num: 20,
    pageLis: 0,
    arrData:new Array(),
    groud:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var groud=options.id;
    var thad = this;
    thad.setData({
      groud: groud
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getGroupOrder',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "group_id": thad.data.groud,
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
            arrData: res.data.data
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
    var thad = this;
    thad.setData({
      page: thad.data.page + 1
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getGroupOrder',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "group_id": thad.data.groud,
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
          var aaa = thad.data.arrData.concat(res.data.data);
          thad.setData({
            arrData: aaa
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
  navgengduo: function () {
    // var thad = this;
    // thad.setData({
    //   page: thad.data.page + 1
    // })
    // wx.request({
    //   url: app.globalData.networkAddress + '/wapp/Leader/getGroupOrder',
    //   method: 'post',
    //   data: {
    //     "leader_id": app.globalData.information.id,
    //     "group_id": thad.data.groud,
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
    //       var aaa = thad.data.arrData.concat(res.data.data);
    //       thad.setData({
    //         arrData: aaa
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })
  },
})