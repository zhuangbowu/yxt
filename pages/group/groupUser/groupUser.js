var app=getApp();
// pages/ownerUser/ownerUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: new Object(),
    userNmae: '',
    userImage: '',
    src: 'http://img3.imgtn.bdimg.com/it/u=3001501408,2505271413&fm=27&gp=0.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getLeaderInfo',
      method:'post',
      data:{
        "leader_id": app.globalData.information.id
      },
      success:res=>{
        if(res.data.code==1){
          thad.setData({
            userData: res.data.data,
            userNmae: app.globalData.information.user_name,
            userImage: app.globalData.information.avatar
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
      url: '../group/group',
    })
  },
  navList: function () {
    wx.redirectTo({
      url: '../groupList/groupList'
    })
  },
  navForward: function () {
    var day = this.data.userData.amount_able;
    wx.navigateTo({
      url: '../ownerForward/ownerForward?forward=' + day,
    })
  },
  uploadDetailed() {
    wx.navigateTo({
      url: '../ownerDetailed/ownerDetailed',
    })
  },
  navRefund: function () {
    wx.navigateTo({
      url: '../ownerRefund/ownerRefund',
    })
  }
})