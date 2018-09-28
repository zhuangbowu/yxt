var app=getApp();
// pages/owner/orderList/orderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopData:new Array(),
    numArr:new Array(),
    id:'',
    keywords:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    var thad = this;
    thad.setData({
      id:id
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getGroupList',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "group_id": thad.data.id,
        'keywords': thad.data.keywords
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopData: res.data.data
          })
          for (var i = 0; i < thad.data.shopData.length;i++){
            var aaa=0;
            for (var j = 0; j < thad.data.shopData[i].product_list.length;j++){
              aaa += thad.data.shopData[i].product_list[j].sell_num;
            }
            var bbb = 'numArr[' + i+']';
            thad.setData({
              [bbb]:aaa
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
  navDetailed:function(e){
    var id=this.data.shopData[e.currentTarget.dataset.hi].id;
    var leader_id = this.data.shopData[e.currentTarget.dataset.hi].leader_id;
    wx.navigateTo({
      url: '../orderListDetailed/orderListDetailed?id=' + id + "&leader_id=" + leader_id,
    })
  },
  navPage: function () {
    var id=this.data.id;
    wx.navigateTo({
      url: '../ownerData/ownerData?id=' + id,
    })
  },
  keywordsS:function(e){
    var values=e.detail.value;
    this.setData({
      keywords:values
    })
  },
  seniorSwitchNo:function(){
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getGroupList',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "group_id": thad.data.id,
        'keywords': thad.data.keywords
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopData: res.data.data
          })
          for (var i = 0; i < thad.data.shopData.length; i++) {
            var aaa = 0;
            for (var j = 0; j < thad.data.shopData[i].product_list.length; j++) {
              aaa += thad.data.shopData[i].product_list[j].sell_num;
            }
            var bbb = 'numArr[' + i + ']';
            thad.setData({
              [bbb]: aaa
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
  }
})