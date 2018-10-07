var app=getApp();
// pages/group/membersSee/membersSee.js
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    page: 0,
    num: 20,
    pageLis: 0,
    listData:new Array(),
    groud:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var groud=options.id;
    var thad = this;
    thad.setData({
      groud: groud
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getGroupOrderNew',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "group_id": thad.data.groud,
        "keywords":'',
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
      url: app.globalData.networkAddress + '/wapp/Leader/getGroupOrderNew',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "group_id": thad.data.groud,
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  navgengduo: function () {
    // var thad = this;
    // thad.setData({
    //   page: thad.data.page + 1
    // })
    // wx.request({
    //   url: app.globalData.networkAddress + '/wapp/Leader/getGroupOrder',
    //   method: 'post',
    //   data: {
    //     "leader_id": app.globalData.information.id,
    //     "group_id": thad.data.groud,
    //     "page": thad.data.page,
    //     "page_num": thad.data.num
    //   },
    //   success: res => {
    //     if (res.data.code == 1) {
    //       var nnmm = res.data.data.length;
    //       if (nnmm < 20) {
    //         thad.setData({
    //           pageLis: 1
    //         })
    //       }
    //       var aaa = thad.data.arrData.concat(res.data.data);
    //       thad.setData({
    //         arrData: aaa
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })
  },
  navDetails: function (e) {
    var indexs = e.currentTarget.dataset.hi;
    var order = this.data.listData[indexs].order_no;
    wx.navigateTo({
      url: '../membersDetails/membersDetails?order=' + order,
    })
  },outMessage: function(e) {
    var order = this.data.listData[e.currentTarget.dataset.hi].order_no;
    wx.showModal({
      title: '确认框',
      content: '是否确定发送按钮',
      success: function(res) {
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
            icon:'none'
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
})