var app = getApp();
// pages/purposeshare/purposeshare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: '201809291643494605971',
    shopData: new Object(),
    envelopes:'../../img/envelopes1.png',
    envelopesOff:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      order: options.order
    })
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getOrderDetail',
      method: "post",
      data: {
        "user_id": app.globalData.information.id,
        // "user_id": 221,
        "order_no": thad.data.order
      },
      success: res => {
        if (res.data.code == 1) {
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
  onReady: function() {
    wx.hideShareMenu();
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
  // onShareAppMessage: function() {
  //   var thad = this;
  //   var group_id = thad.data.shopData.group_id;
  //   return {
  //     title: '优鲜团-优先天下鲜，美味任你团',
  //     path: '/pages/members/membersDetails/membersDetails?id=' + group_id,
  //   }
  // },
  onShareAppMessage: function(options) {
    var that = this;
    var group_id = that.data.shopData.group_id;
    setTimeout(function(){
      that.setData({
        envelopesOff: false,
        envelopes: '../../img/envelopes1.png'
      })
    },1000)
    var shareObj = {
      title: "优鲜团-优先天下鲜，美味任你团",
      path: '/pages/members/membersDetails/membersDetails?id=' + group_id,
      success: function (res) {
        // console.log(res);
        // if (res.errMsg == 'shareAppMessage:ok') {
          // wx.redirectTo({
          //   url: '/pages/members/membersDetails/membersDetails?id=' + group_id,
          // })
        // }
      },
      fail: res => {
        console.log('222' +res);
      },
      complete:res=>{
        console.log('111'+res);
      }
    };
    // 来自页面内的按钮的转发
    if (options.from == 'button') {
      shareObj.path = '/pages/members/membersDetails/membersDetails?id=' + group_id;
    }
    return shareObj;
  },
  btnEnvelopeOff:function(){
    this.setData({
      envelopesOff: true
    })
  },
  btnEnvelope:function(){
    var thad = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getCoupon',
      method: "post",
      data: {
        "user_id": app.globalData.information.id,
        // "user_id": 221,
        "order_no": thad.data.order
      },
      success: res => {
        wx.hideLoading(); 
        if (res.data.code == 1) {
          thad.setData({
            envelopes:'../../img/envelopes2.png'
          })
          wx.showModal({
            title: '提示框',
            content: res.data.msg,
            showCancel:false,
            success:res=>{
              thad.setData({
                envelopesOff: true
              })
            }
          })
        } else {
          thad.setData({
            envelopes: '../../img/envelopes2.png'
          })
          wx.showModal({
            title: '提示框',
            content: res.data.msg,
            showCancel: false,
            success: res => {
              thad.setData({
                envelopesOff: true
              })
            }
          })
        }
      }
    })
  }
})