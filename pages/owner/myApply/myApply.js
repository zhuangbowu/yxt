var app=getApp();
// pages/owner/myApply/myApply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    id:'',
    inputdalput:'',
    dataApply:new Object()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ids=options.id;
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getMyLeaderDet',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "id": ids
      },
      success: res => {
        thad.setData({
          dataApply: res.data.data,
          idd: ids
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
  wxEject:function(){
    this.setData({
      hiddenmodalput: false
    })
  },
  inputdalput:function(e){
    this.setData({
      inputdalput:e.detail.value
    })
  },
  modalinput2: function () {
    this.setData({
      hiddenmodalput: true,
      inputdalput:''
    })
  },
  modalinput3: function () {
    var thad = this.data;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/refuseLeader',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "id": thad.idd,
        "reason": thad.inputdalput
      },
      success: res => {
        if (res.data.code == 1) {
          wx.redirectTo({
            url: '../myGroupList/myGroupList',
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
  navAgree:function(){
    var thad = this.data;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/agreeLeader',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "id": thad.idd,
      },
      success: res => {
        if (res.data.code == 1) {
          wx.redirectTo({
            url: '../myGroupList/myGroupList',
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
})