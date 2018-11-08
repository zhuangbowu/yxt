var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexDataL: new Object(),
    oof: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var thad = this;
    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: function(res) {
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
                  url: '../index/index',
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
          return;
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
          success: function(res) {
            if (res.data.code == 1) {
              app.globalData.information = res.data.data;
              thad.setData({
                indexDataL: res.data.data
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
      fail: function() {
        thad.setData({
          oof: false
        })
        // wx.showModal({
        //   title: '警告',
        //   content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
        //   success: function(res) {
        //     if (res.confirm) {
        //       wx.navigateTo({
        //         url: '../tologin/tologin',
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 用户点击跳转
  navOwner: function() {
    wx.navigateTo({
      url: '../owner/signIn/signIn',
    });
  },
  navGroup: function() {
    wx.navigateTo({
      url: '../group/group/group',
    });
  },
  navMembers: function() {
    wx.navigateTo({
      url: '../members/members/members',
    });
  },
  bindGetUserInfo: function(e) {
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
      success: function(res) {
        app.globalData.information = res.data.data;
        that.setData({
          oof: true
        })
      }
    })
    //最后，记得返回刚才的页面
    that.onLoad();
  },
  tables: function() {
    this.setData({
      oof: true
    })
  }
})