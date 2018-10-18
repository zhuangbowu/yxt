var app=getApp();
// pages/group/groupshares/groupshares.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:new Object(),
    userImg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var groupId = options.groupId;
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/groupDetail',
      method:'post',
      data: {
        "leader_id": app.globalData.information.id,
        "group_id": groupId
      },
      success:res=>{
        if(res.data.code==1){
          thad.setData({
            shop:res.data.data,
            userImg: app.globalData.information.avatar
          })
        }else{
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.hideShareMenu();
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
    wx.showShareMenu({
      withShareTicket: true
    })
    var shop_id = this.data.shop.group_id;
    return {
      title: '分享优鲜团',
      path: 'pages/members/membersDetails/membersDetails?id=' + shop_id,
      success:function(res){
        console.log(res);
      }
    } 
  }
})