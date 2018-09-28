var app=getApp();
// pages/owner/signIn/signIn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'yxt',
    password:'123456'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  name: function (e) {
    var objj=e.detail.value;
    this.setData({
      name: objj
    })
  },
  password: function (e) {
    var objj = e.detail.value;
    this.setData({
      password: objj
    })
  },
  sign:function(){
    var objj=this.data;
    // if (objj.name==''){
    //   wx.showToast({
    //     title: '请输入您的账户名称',
    //     icon:'none'
    //   })
    // } else if (objj.password == ''){
    //   wx.showToast({
    //     title: '请输入您的密码',
    //     icon: 'none'
    //   })
    // } else {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.networkAddress+'/wapp/Pub/headerLogin',
        data:{
          name: objj.name,
          password: objj.password
        },
        success:function(res){
          var objs = res.data;
          wx.hideLoading();
          if (objs.code==1){
            wx.showToast({
              title: '登陆成功'
            })
            app.globalData.owner = objs.data
            wx.redirectTo({
              url: '../owner/owner',
            })
          }else{
            wx.showToast({
              title: objs.msg,
              icon: 'none'
            })
          }
        }
      })
    // }
  }
})