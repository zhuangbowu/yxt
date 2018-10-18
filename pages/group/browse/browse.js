var app = getApp();
// pages/group/browse/browse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    page: 0,
    num: 20,
    pageLis: 0,
    shopbrowse:new Object(),
    group_id:'',
    status:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var group_id = options.id;
    var thad=this;
    thad.setData({
      group_id: group_id
    })
    wx.request({
      url: app.globalData.networkAddress +  '/wapp/Leader/getGroupRecord',
      method:'post',
      data:{
        "leader_id": app.globalData.information.id,
        "status": thad.data.status,
        "group_id": thad.data.group_id,
        "page": thad.data.page,
        "page_num": thad.data.num
      },
      success:res=>{
        if (res.data.code == 1) {
          var nnmm = res.data.data.list.length;
          if (nnmm < 20) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            shopbrowse:res.data.data
          })
          console.log(thad.data.shopbrowse);
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
          })
        }
      }
    })
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
    wx.hideShareMenu();
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
    var thad=this;
    thad.setData({
      page: thad.data.page+1
    })
    console.log(thad.data.page);
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getGroupRecord',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "status": thad.data.status,
        "group_id": thad.data.group_id,
        "page": thad.data.page,
        "page_num": thad.data.num
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.list.length;
          if (nnmm < 20) {
            thad.setData({
              pageLis: 1
            })
          }
          var aaa = thad.data.shopbrowse.list.concat(res.data.data.list);
          thad.setData({
            ['shopbrowse.list']: aaa
          })
          console.log(thad.data.shopbrowse)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
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
  tabFun: function (e) {
    //获取触发事件组件的dataset属性
    var _datasetId = e.target.dataset.id;
    var thad = this;
    var _obj = {};
    thad.setData({
      _datasetId: _datasetId
    })
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    thad.setData({
      tabArr: _obj,
      status: _datasetId,
      page:0,
    });
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getGroupRecord',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "status": thad.data.status,
        "group_id": thad.data.group_id,
        "page": thad.data.page,
        "page_num": thad.data.num
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.list.length;
          if (nnmm < 20) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            shopbrowse: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      }
    })
  },
})