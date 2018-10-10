var app=getApp();
// pages/ownerUser/ownerUser.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    userName:new Object()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var header_id = app.globalData.owner.header_id;
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress+'/wapp/Header/getHeaderInfo',
      method:'post',
      data:{
        "header_id": header_id
      },
      success:res=>{
        if(res.data.code==1){
          thad.setData({
            userName: res.data.data
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
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
  navIndex: function () {
    wx.redirectTo({
      url: '../owner/owner',
    })
  },
  navList: function () {
    wx.redirectTo({
      url: '../ownerList/ownerList'
    })
  },
  navForward:function(){
    var objj = this.data.userName.amount_able;
    wx.showActionSheet({
      itemList: ['提现到微信余额','提现到银行卡'],
      success:res=>{
        if(res.tapIndex==0){
          wx.navigateTo({
            url: '../ownerForward/ownerForward?forward=' + objj,
          })
        }
        if (res.tapIndex == 1){
          wx.navigateTo({
            url: '../ownerForwards/ownerForwards?forward=' + objj,
          })
        }
      }
    })
  },
  uploadPhoto() {
    wx.navigateTo({
      url: '../ownerEdit/ownerEdit',
    })
  },
  uploadDetailed() {
    wx.navigateTo({
      url: '../ownerDetailed/ownerDetailed',
    })
  },
  uploadFriends: function () {
    wx.navigateTo({
      url: '../ownerFriends/ownerFriends',
    })
  },
  uploadmyGroupList: function () {
    wx.navigateTo({
      url: '../myGroupList/myGroupList',
    })
  },
  navRefund:function(){
    wx.navigateTo({
      url: '../ownerRefund/ownerRefund',
    })
  }
})