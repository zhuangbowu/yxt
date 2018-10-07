var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition:true,
    ownerNmae:'',
    ownerImage:'',
    dataList: new Array(),
    page: 0,
    num: 5,
    pageLis:0,
    keywords:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = app.globalData.owner.header_id;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getRecordList',
      method: 'post',
      data: {
        "header_id": id,
        "page": thad.data.page,
        "page_num": 5,
        'keywords': thad.data.keywords
      },
      success: res => {
        if(res.data.code==1){
          var data = res.data.data;
          var nnmm = data.length;
          if (nnmm < 5) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            dataList: data,
            ownerNmae: app.globalData.owner.nick_name,
            ownerImage: app.globalData.owner.head_image
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
    var id = app.globalData.owner.header_id;
    var thad = this;
    thad.setData({
      page: thad.data.page + 1
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getRecordList',
      method: 'post',
      data: {
        "header_id": id,
        "page": thad.data.page,
        "page_num": 5,
        'keywords': thad.data.keywords
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
          var aaa = thad.data.dataList.concat(data);
          thad.setData({
            dataList: aaa,
            ownerNmae: app.globalData.owner.nick_name,
            ownerImage: app.globalData.owner.head_image
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
      condition: true
    });
  },
  navPage:function(){
    wx.navigateTo({
      url: '../ownerIncrease/ownerIncrease',
    });
  },
  navList: function () {
    wx.redirectTo({
      url: '../ownerList/ownerList'
    })
  },
  navgroup: function () {
    wx.redirectTo({
      url: '../ownerUser/ownerUser'
    })
  },
  navDetails: function (e) {
    var indexss = e.currentTarget.dataset.hi;
    var objj=this.data.dataList[indexss].id;
    wx.navigateTo({
      url: '../ownerDetails/ownerDetails?id='+objj
    })
  },
  navgengduo:function(){
    // var id = app.globalData.owner.header_id;
    // var thad = this;
    // thad.setData({
    //   page: thad.data.page+1
    // })
    // wx.request({
    //   url: app.globalData.networkAddress + '/wapp/Header/getRecordList',
    //   method: 'post',
    //   data: {
    //     "header_id": id,
    //     "page": thad.data.page,
    //     "page_num": 5,
    //     'keywords': thad.data.keywords
    //   },
    //   success: res => {
    //     if(res.data.code==1){
    //       var data = res.data.data;
    //       var nnmm = data.length;
    //       if (nnmm<5){
    //         thad.setData({
    //           pageLis:1
    //         })
    //       }
    //       var aaa = thad.data.dataList.concat(data);
    //       thad.setData({
    //         dataList: aaa,
    //         ownerNmae: app.globalData.owner.nick_name,
    //         ownerImage: app.globalData.owner.head_image
    //       })
    //     }else{
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon:'none'
    //       })
    //     }
    //   }
    // })
  },
  navSearch: function () {
    var id = app.globalData.owner.header_id;
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getRecordList',
      method: 'post',
      data: {
        "header_id": id,
        "page": thad.data.page,
        "page_num": 5,
        'keywords': thad.data.keywords
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
          thad.setData({
            dataList: data,
            ownerNmae: app.globalData.owner.nick_name,
            ownerImage: app.globalData.owner.head_image
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
  searchData:function(e){
    var values = e.detail.value;
    this.setData({
      keywords: values
    })
  }
})