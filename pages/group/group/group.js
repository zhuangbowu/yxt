var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    num: 5,
    pageLis: 0,
    dataList: new Array(),
    userName:'' ,
    userImg: '',
    condition: true,
    hasgroupInfo: false,
    groupInfo: {},
    canIUse: wx.canIUse,
    searchData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thad=this;
    thad.setData({  
      userName: app.globalData.information.user_name,
      userImg: app.globalData.information.avatar
    })
    thad.navList();
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
  // 事件 修改搜索栏
  seachCondTrue: function () {
    this.setData({
      condition: false
    });
  },
  seachCondFalse: function () {
    this.setData({
      condition: true,
      searchData:''
    });
  },
  navLists:function () {
    wx.redirectTo({
      url: '../groupList/groupList'
    });
  },
  navgroup: function () {
    wx.redirectTo({
      url: '../groupUser/groupUser'
    });
  },
  navDetails: function (e) {
    var group_id=e.currentTarget.dataset.hi;
    wx.navigateTo({
      url: '../groupDetails/groupDetails?id='+group_id
    })
  },  
  navgengduo: function () {
    var leader_id = app.globalData.information.id;
    var thad=this;
    thad.setData({
      page: thad.data.page + 1
    })
    this.navList();
  },
  searchData:function(e){
    var values=e.detail.value;
    this.setData({
      searchData: values
    })
  },
  navSearch:function(){
    this.navList();
  },
  navList:function(){
    var leader_id = app.globalData.information.id;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getGroupList',
      method: 'post',
      data: {
        "leader_id": leader_id,
        "title": thad.data.searchData,
        "page": thad.data.page,
        "page_num": thad.data.num
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 5) {
            thad.setData({
              pageLis: 1
            })
          }
          var aaa = thad.data.dataList.concat(res.data.data);
          thad.setData({
            dataList: aaa
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