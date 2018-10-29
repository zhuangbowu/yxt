var app=getApp();
// pages/ownerList/ownerList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wonerSwitch:true,
    controlSwitchSrc:true,
    orderText:'全部订单',
    seniorSwitch:true,
    keywords:'',
    status:0,
    choiceOrderText:[
      '全部订单',
      '进行中',
      '已完成'
    ],
    shopData:new Array(),
    shopNum:[

    ],
    page: 0,
    num: 5,
    pageLis: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thad=this;
    thad.dataList();
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
    var thad = this;
    thad.setData({
      page: thad.data.page + 1
    })
    thad.dataList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  controlSwitch: function () {
    this.setData({
      wonerSwitch: !this.data.wonerSwitch,
      controlSwitchSrc: !this.data.controlSwitchSrc
    })
  },
  controlSwitchNo: function (e) {
    if (e.target.dataset.hi || e.target.dataset.hi==0){
      var aaa = this.data.choiceOrderText[e.target.dataset.hi];
      this.setData({
        wonerSwitch: true,
        controlSwitchSrc: true,
        orderText: aaa
      })
      var thad=this;
      thad.setData({
        status: e.target.dataset.hi
      })
      thad.dataList();
    }else{
      this.setData({
        wonerSwitch: true,
        controlSwitchSrc: true
      })
    }
  },
  navIndex: function () {
    wx.redirectTo({
      url: '../owner/owner',
    })
  },
  navgroup: function () {
    wx.redirectTo({
      url: '../ownerUser/ownerUser',
    })
  },
  seniorSwit:function(){
    this.setData({
      seniorSwitch: !this.data.seniorSwitch
    })
  },
  seniorSwitchNo:function(){
    var thad=this;
    thad.setData({
      seniorSwitch: true
    })
    thad.dataList();
  },
  navListDetailed:function(e){
    var group_id=this.data.shopData[e.currentTarget.dataset.hi].id;
    wx.navigateTo({
      url: '../orderList/orderList?id='+group_id,
    })
  },
  navgengduo: function (e) {
    // var thad = this;
    // thad.setData({
    //   page: thad.data.page + 1
    // })
    // thad.dataList();
  },
  keywordsData:function(e){
    var values = e.detail.value;
    this.setData({
      keywords: values
    })
  },
  dataList: function () {
    var id = app.globalData.owner.header_id;
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getOrderList',
      method: 'post',
      data: {
        "header_id": id,
        "page": thad.data.page,
        "page_num": 5,
        'keywords': thad.data.keywords,
        'status': thad.data.status
      },
      success: res => {
        if (res.data.code == 1) {
          var data = res.data.data;
          var nnmm = data.length;
          if (nnmm < 5) {
            thad.setData({
              pageLis: 1
            })
          }
          var aaa = thad.data.shopData.concat(res.data.data);
          thad.setData({
            shopData: aaa
          })
          console.log(thad.data.shopData);
          thad.setData({
            shopNum: []
          })
          for (var i = 0; i < thad.data.shopData.length; i++) {
            var numm = 0;
            for (var j = 0; j < thad.data.shopData[i].product_list.length; j++) {
              var aaa = thad.data.shopData[i].product_list[j].sell_num;
              numm += aaa;
            }
            var bbb = 'shopNum[' + i + ']';
            thad.setData({
              [bbb]: numm
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