var app = getApp();
import Card from '../../../palette/card1';
// pages/group/groupfriends/groupfriends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: '',
    shopList: '',
    template: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var groupId = options.groupId;
    var thad = this;
    thad.setData({
      groupId: groupId
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/groupDetail',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "group_id": groupId
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopList: res.data.data,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getPickQrcode',
      method: "post",
      data: {
        "scene": groupId,
        "page": 'pages/members/membersDetails/membersDetails'
      },
      success: res => {
        if (res.data.code == 1) {
          wx.getImageInfo({
            src: res.data.data.data,
            success: function(res) {
              thad.setData({
                template: new Card().palette(res.path),
              })
            },
            fail: function(res) {
              wx.showToast({
                title: '生成失败，请重新进入',
                icon: 'none'
              })
            }
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
  onImgOK: function(e) {
    this.imagePath = e.detail.path;
    wx.hideLoading();
  },
  onImgErr(e) {
    console.log(e);
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
  navShares: function() {
    wx.showLoading({
      title: '图片保存中',
    })
    wx.saveImageToPhotosAlbum({
      filePath: this.imagePath,
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
        })
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
    });
  },
})