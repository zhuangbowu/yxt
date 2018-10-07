var app=getApp();
// pages/owner/orderListDetailed/orderListDetailed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkeds:false,
    shopData:new Object(),
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var leader_id = options.leader_id;
    var thad = this;
    thad.setData({
      id: id
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getMyOrderDetail',
      method: 'post',
      data: {
        "leader_id": leader_id,
        "group_id": thad.data.id
      },
      success: res => {
        console.log(res);
        if (res.data.code == 1) {
          thad.setData({
            shopData: res.data.data
          })
          console.log(thad.data.shopData);
          if (thad.data.shopData.pick_status==1){
            thad.setData({
              checkeds:true
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
  switch1Change: function (e) {
    var thad=this;
    if(e.detail.value){
      wx.showModal({
        title: '提示',
        content: '团长是否已经取货',
        success:function(res){
          if (res.confirm){
            wx.request({
              url: app.globalData.networkAddress + '/wapp/Header/solveGroup',
              method: 'post',
              data: {
                "header_id": app.globalData.owner.header_id,
                "group_id": thad.data.id
              },
              success: res => {
                if (res.data.code == 1) {
                  wx.redirectTo({
                    url: '../ownerList/ownerList',
                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  })
                }
              }
            })
            // wx.redirectTo({
            //   url: '../ownerList/ownerList',
            // })
          }
          if (res.cancel) {
            thad.setData({
              checkeds:false
            })
            wx.showToast({
              title: '取消取货处理',
              icon: 'none'
            })
          }
        }
      })
    }else{
      thad.setData({
        checkeds: true
      })
      wx.showToast({
        title: '已取货！请勿重复点击',
        icon: 'none'
      })
    }
  }
})