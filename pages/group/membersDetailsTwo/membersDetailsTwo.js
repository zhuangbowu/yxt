var app = getApp();
// pages/group/membersDetails/membersDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkeds: false,
    shopData: new Object(),
    order:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order = decodeURIComponent(options.scene);
    console.log(order);
    this.setData({
      order: order
    })
    var thad = this;
    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: function (res) {
        wx.showLoading({
          title: '加载中',
        })
        //此处为获取微信信息后的业务方法
        var data = JSON.parse(res.rawData);
        var developer = (wx.getStorageSync('openId'));
        if (typeof developer != 'string' || developer == '' || developer == null || developer == '[]') {
          wx.hideLoading();
          wx.showModal({
            title: '登录失败',
            content: '用户登录失败点击确定重新登录',
            success: res => {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../membersDetailsTwo/membersDetailsTwo',
                })
              }
            }
          })
        }
        wx.request({
          url: app.globalData.networkAddress + '/wapp/Pub/loginByWapp',
          data: {
            open_id: developer,
            user_name: data.nickName,
            avatar: data.avatarUrl,
            gender: data.gender,
            city: data.city,
            province: data.province,
            country: data.country
          },
          success: function (res) {
            if (res.data.code == 1) {
              app.globalData.information = res.data.data;
              wx.request({
                url: app.globalData.networkAddress + '/wapp/Leader/getUserOrderDet',
                method: 'post',
                data: {
                  "leader_id": app.globalData.information.id,
                  "order_no": thad.data.order
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
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }

          }
        })
      },
      fail: function () {
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../tologin/tologin',
              })
            }
          }
        })
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
  switch1Change: function (e) {
    var thad = this;
    if (e.detail.value) {
      wx.showModal({
        title: '提示',
        content: '是否已经取货',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.networkAddress + '/wapp/Leader/operaUserOrder',
              method: 'post',
              data: {
                "leader_id": app.globalData.information.id,
                "order_no": thad.data.shopData.order_no
              },
              success: res => {
                if (res.data.code == 1) {
                  wx.redirectTo({
                    url: '../group/group',
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
          if (res.cancel) {
            thad.setData({
              checkeds: false
            })
            wx.showToast({
              title: '取消团员取货操作',
            })
          }
        }
      })

    }
  },
  navRefund: function (e) {
    var thad = this;
    wx.navigateTo({
      url: '../groupRefund/groupRefund?indexs=' + e.currentTarget.dataset.index + '&order=' + thad.data.shopData.order_no,
    })
  }
})