var app=getApp();
// pages/owner/ownerRefundList/ownerRefundList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    userName:new Object(),
    inputEject:'',
    sId:'',
    oofs:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var thad = this;
    thad.setData({
      sId: id
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getRefundDetail',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "id": id
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            userName: res.data.data
          })
          wx.hideLoading();
        } else {
          wx.hideLoading();
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
  wxEject: function () {
    this.setData({
      hiddenmodalput: false
    })
  },
  modalinput2: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  modalinput3: function (e) {
    var status = e.currentTarget.dataset.hi;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/agreeRefund',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "refund_id": thad.data.sId,
        "status": status,
        "refuse_reason": thad.data.inputEject+""
      },
      success: res => {
        if (res.data.code == 1) {
          wx.redirectTo({
            url: '../ownerUser/ownerUser',
          })
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
    this.setData({
      hiddenmodalput: true
    })
  },
  wxAgree: function (e) {
    this.setData({
      oofs:true
    })
    var status = e.currentTarget.dataset.hi;
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/agreeRefund',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "refund_id": thad.data.sId,
        "status": status,
        "refuse_reason": thad.data.inputEject+''
      },
      success: res => {
        if (res.data.code == 1) {
          wx.redirectTo({
            url: '../ownerUser/ownerUser',
          })
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  inputEject:function(e){
    this.setData({
      inputEject: e.detail.value
    })
  }
})