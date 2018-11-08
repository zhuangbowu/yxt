var app=getApp();
// pages/group/membersSeeOne/membersSeeOne.js
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
    shopData:new Object(),
    id:'',
    _datasetId:0,
    listData: new Array(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    var thad=this;
    thad.setData({
      id:id
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getGroupTotal',
      data: {
        "leader_id": app.globalData.information.id,
        "group_id": thad.data.id
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopData:res.data.data
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
    if (this.data._datasetId==0){
      console.log('无触发事件');
    }
    if (this.data._datasetId == 1){
      var thad = this;
      thad.setData({
        page: thad.data.page + 1
      })
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Leader/getGroupOrderNew',
        method: 'post',
        data: {
          "leader_id": app.globalData.information.id,
          "group_id": thad.data.id,
          "page": thad.data.page,
          "page_num": thad.data.num
        },
        success: res => {
          if (res.data.code == 1) {
            var nnmm = res.data.data.length;
            if (nnmm < 20) {
              thad.setData({
                pageLis: 1
              })
            }
            var aaa = thad.data.listData.concat(res.data.data);
            thad.setData({
              listData: aaa
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // navDdelallsda:function(){
  //   var id=this.data.id;
  //   wx.redirectTo({
  //     url: '../membersSee/membersSee?id='+id,
  //   })
  // },
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
      tabArr: _obj
    });
    console.log(_datasetId);
    if (_datasetId==0){
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Leader/getGroupTotal',
        data: {
          "leader_id": app.globalData.information.id,
          "group_id": thad.data.id
        },
        success: res => {
          if (res.data.code == 1) {
            thad.setData({
              shopData: res.data.data
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
    if (_datasetId==1){
      thad.setData({
        page: 0
      })
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Leader/getGroupOrderNew',
        method: 'post',
        data: {
          "leader_id": app.globalData.information.id,
          "group_id": thad.data.id,
          "keywords": '',
          "page": thad.data.page,
          "page_num": thad.data.num
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
              listData: res.data.data
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
  },
  navDetails: function (e) {
    var indexs = e.currentTarget.dataset.hi;
    var order = this.data.listData[indexs].order_no;
    wx.navigateTo({
      url: '../membersDetails/membersDetails?order=' + order,
    })
  }, 
  outMessage: function (e) {
    var order = this.data.listData[e.currentTarget.dataset.hi].order_no;
    wx.showModal({
      title: '确认框',
      content: '是否确定发送按钮',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.networkAddress + '/wapp/Leader/sendSms',
            method: 'post',
            data: {
              "leader_id": app.globalData.information.id,
              "order_no": order
            },
            success: res => {
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            }
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '已取消发送短信',
            icon: 'none'
          })
        }
      }
    })
  },
  outMessage: function (e) {
    var order = this.data.listData[e.currentTarget.dataset.hi].order_no;
    wx.showModal({
      title: '确认框',
      content: '是否确定发送按钮',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.networkAddress + '/wapp/Leader/sendSms',
            method: 'post',
            data: {
              "leader_id": app.globalData.information.id,
              "order_no": order
            },
            success: res => {
              if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            }
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '已取消发送短信',
            icon: 'none'
          })
        }
      }
    })
  },
  dialTelephone: function (e) {
    var Numbers = e.currentTarget.dataset.hi;
    wx.makePhoneCall({
      phoneNumber: Numbers
    })
  },
  Printing:function(){
    wx.navigateTo({
      url: '../../Printing/index?id='+this.data.id,
    })
  },
})