var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner: new Array(),
    page: 0,
    num: 5,
    pageLis: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getGroupList',
      data: {
        'user_id': app.globalData.information.id,
        "page": thad.data.page,
        "page_num": 5,
      },
      success:function(res){
        console.log(res);
        if (res.data.code==1) {
          var data = res.data.data;
          var nnmm = data.length;
          if (nnmm < 5) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.data.owner = data;
          thad.setData({
            owner: thad.data.owner
          })
          wx.hideLoading();
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
    // wx.showNavigationBarLoading() //在标题栏中显示加载

    // //模拟加载
    // setTimeout(function () {
    //   // complete
    //   wx.hideNavigationBarLoading() //完成停止加载
    //   wx.stopPullDownRefresh() //停止下拉刷新
    // }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var thad = this;
    thad.setData({
      page: thad.data.page + 1
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getGroupList',
      data: {
        'user_id': app.globalData.information.id,
        "page": thad.data.page,
        "page_num": 5,
      },
      success: function (res) {
        if (res.data.code == 1) {
          var data = res.data.data;
          var nnmm = data.length;
          if (nnmm < 5) {                            
            thad.setData({
              pageLis: 1
            })
          }
          var aaa = thad.data.owner.concat(res.data.data);
          thad.setData({
            owner: aaa
          })
          wx.hideLoading();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  navDetails: function(e) { 
    var indexss=e.currentTarget.dataset.hi;
    var thad=this;
    var group_id=thad.data.owner[indexss].group_id
    wx.navigateTo({
      url: '../membersDetails/membersDetails?id='+group_id
    })
  },
  navOrder: function() {
    wx.navigateTo({
      url: '../membersOrder/membersOrder'
    })
  },
  navgengduo: function () {
    // var thad = this;
    // thad.setData({
    //   page: thad.data.page + 1
    // })
    // wx.request({
    //   url: app.globalData.networkAddress + '/wapp/User/getGroupList',
    //   data: {
    //     'user_id': app.globalData.information.id,
    //     "page": thad.data.page,
    //     "page_num": 5,
    //   },
    //   success: function (res) {
    //     if (res.data.code == 1) {
    //       var data = res.data.data;
    //       var nnmm = data.length;
    //       if (nnmm < 5) {
    //         thad.setData({
    //           pageLis: 1
    //         })
    //       }
    //       var aaa = thad.data.owner.concat(res.data.data);
    //       thad.setData({
    //         owner: aaa
    //       })
    //       wx.hideLoading();
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none'
    //       })
    //     }

    //   }
    // })
  },
})