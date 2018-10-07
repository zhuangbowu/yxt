var app=getApp();
// pages/owner/myGroupList/myGroupList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    pages:0,
    dataApply: [],
    page: 0,
    num: 20,
    pageLis:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress+'/wapp/Header/getMyLeader',
      method:'post',
      data:{
        "header_id": app.globalData.owner.header_id,
        "page": 0,
        "page_num": thad.data.num,
        "status": thad.data.pages
      },
      success:res=>{
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 20) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            dataApply: res.data.data
          })
          wx.hideLoading();
        } else {
          wx.hideLoading();
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
    var thad = this;
    thad.setData({
      page: thad.data.page + 1
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getMyLeader',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "page": thad.data.page,
        "page_num": thad.data.num,
        "status": thad.data.pages
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 20) {
            thad.setData({
              pageLis: 1
            })
          } 
          var aaa = thad.data.dataApply.concat(res.data.data);
          thad.setData({
            dataApply: aaa
          })
          wx.hideLoading();
        } else {
          wx.hideLoading();
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
  navApply:function(e){
    var objj = this.data.dataApply[e.currentTarget.dataset.hi].id;
    wx.navigateTo({
      url: '../myApply/myApply?id='+objj,
    })
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性
    var thad = this;
    var _datasetId = e.target.dataset.id;
    this.setData({
      pages: _datasetId
    })
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getMyLeader',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "page": 0,
        "page_num": thad.data.num,
        "status": thad.data.pages
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 20) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            dataApply: res.data.data
          })
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  // navgengduo:function(){
  //   var thad=this;
  //   thad.setData({
  //     page: thad.data.page + 1
  //   })
  //   wx.request({
  //     url: app.globalData.networkAddress + '/wapp/Header/getMyLeader',
  //     method: 'post',
  //     data: {
  //       "header_id": app.globalData.owner.header_id,
  //       "page": thad.data.page,
  //       "page_num": thad.data.num,
  //       "status": thad.data.pages
  //     },
  //     success: res => {
  //       if(res.data.code==1){
  //         var nnmm = res.data.data.length;
  //         if (nnmm < 20) {
  //           thad.setData({
  //             pageLis: 1
  //           })
  //         }
  //         thad.setData({
  //           dataApply: res.data.data
  //         })
  //         wx.hideLoading();
  //       } else {
  //         wx.hideLoading();
  //         wx.showToast({
  //           title:res.data.msg,
  //           icon:'none'
  //         })
  //       }
  //     }
  //   })
  // }
})