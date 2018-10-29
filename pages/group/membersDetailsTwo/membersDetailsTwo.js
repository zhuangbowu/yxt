var app = getApp();
// pages/group/membersDetails/membersDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oof: true,
    checkeds: false,
    shopData: new Object(),
    order:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order = decodeURIComponent(options.scene);
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
              if (res.cancel) {
                wx.showToast({
                  title: '登陆失败',
                  icon: 'none'
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
                    wx.hideLoading();
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
        wx.hideLoading();
        thad.setData({
          oof: false
        })
        // wx.showModal({
        //   title: '警告',
        //   content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
        //   success: function (res) {
        //     if (res.confirm) {
        //       wx.navigateTo({
        //         url: '../../tologin/tologin',
        //       })
        //     }
        //     if (res.cancel) {
        //       // thad.onLoad();
        //       wx.showModal({
        //         title: '提示框',
        //         content: '对不起您已取消授权登录信息，无法进行下一步操作',
        //         showCancel: false
        //       })
        //     }
        //   }
        // })
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
  },
  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    var objj = e.detail.userInfo;
    //接下来写业务代码
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Pub/loginByWapp',
      data: {
        open_id: app.globalData.openId,
        user_name: objj.nickName,
        avatar: objj.avatarUrl,
        gender: objj.gender,
        city: objj.city,
        province: objj.province,
        country: objj.country
      },
      success: function (res) {
        app.globalData.information = res.data.data;
        that.setData({
          oof: true
        })
      }
    })
    var options = new Object();
    options.scene = that.data.order;
    //最后，记得返回刚才的页面
    that.onLoad(options);
  },
  tables: function () {
    this.setData({
      oof: true
    })
  }
})