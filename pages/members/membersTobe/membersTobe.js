var app = getApp();
// pages/members/membersTobe/membersTobe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header_id: 2,
    user_id: 123,
    hrader_num: 1,
    myLoadtion: '',
    userName: '',
    userContact: '',
    userResidential: "",
    userHouseholds: '',
    userOther: '',
    neighbors: {
      name: '1',
      value: '是',
      checked: true
    },
    Sales: {
      name: '1',
      value: '是',
      checked: true
    },
    timess: {
      name: '0',
      value: '每天',
      checked: true
    },
    neighbor: [{
        name: '1',
        value: '是',
        checked: true
      },
      {
        name: '0',
        value: '否',
        checked: false
      }
    ],
    Sale: [{
        name: '1',
        value: '是',
        checked: true
      },
      {
        name: '0',
        value: '否',
        checked: false
      }
    ],
    times: [{
        name: '0',
        value: '每天',
        checked: true
      },
      {
        name: '1',
        value: '周末',
        checked: false
      },
      {
        name: '2',
        value: '工作空余时间',
        checked: false
      }
    ],
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
                  url: '../membersTobe/membersTobe',
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
          success: function(res) {
            if (res.data.code == 1) {
              app.globalData.information = res.data.data;
              thad.setData({
                header_id: options.id,
                user_id: app.globalData.information.id,
                hrader_num: options.num
              })
              wx.hideLoading();
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: "none"
              })
            }
          }
        })
      },
      fail: function() {
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function(res) {
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
  getLoadtion: function() {
    var thad = this;
    wx.chooseLocation({
      success: function(res) {
        thad.setData({
          myLoadtion: res.address
        })
      },
    })
  },
  radioChange1: function(e) {
    var indexx = e.detail.value;
    this.setData({
      neighbors: this.data.neighbor[indexx]
    });
  },
  radioChange2: function(e) {
    var indexx = e.detail.value;
    this.setData({
      Sales: this.data.Sale[indexx]
    });
  },
  radioChange3: function(e) {
    var indexx = e.detail.value;
    this.setData({
      timess: this.data.times[indexx]
    });
  },
  username: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  usercntact: function(e) {
    this.setData({
      userContact: e.detail.value
    })
  },
  userresidential: function(e) {
    this.setData({
      userResidential: e.detail.value
    })
  },
  userhouseholds: function(e) {
    this.setData({
      userHouseholds: e.detail.value
    })
  },
  userother: function(e) {
    this.setData({
      userOther: e.detail.value
    })
  },
  userSubmission: function() {
    var objj = this.data;
    if (objj.userName == '') {
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'none'
      })
    } else if (objj.userContact == '') {
      wx.showToast({
        title: '请输入您的联系方式',
        icon: 'none'
      })
    } else if (!(/^1[34578]\d{9}$/.test(objj.userContact))) {
      wx.showToast({
        title: '请输入正确的联系方式',
        icon: 'none'
      })
    } else if (objj.myLoadtion == '') {
      wx.showToast({
        title: '请选择您的所在地区',
        icon: 'none'
      })
    } else if (objj.userResidential == '') {
      wx.showToast({
        title: '请输入您的所在小区',
        icon: 'none'
      })
    } else if (objj.userHouseholds == '') {
      wx.showToast({
        title: '请输入您的小区户数',
        icon: 'none'
      })
    } else if (isNaN(objj.userHouseholds)) {
      wx.showToast({
        title: '小区户数请输入数字',
        icon: 'none'
      })
    } else {
      var thad = this.data;
      wx.request({
        url: app.globalData.networkAddress + '/wapp/User/applyLeader',
        method: 'post',
        data: {
          "header_id": thad.header_id,
          "user_id": thad.user_id,
          "name": thad.userName,
          "telephone": thad.userContact,
          "address": thad.myLoadtion,
          "residential": thad.userResidential,
          "neighbours": thad.userHouseholds,
          "have_group": thad.Sales.name,
          "have_sale": thad.neighbors.name,
          "work_time": thad.timess.name,
          "other": thad.userOther
        },
        success: res => {
          if (res.data.code == 1) {
            wx.redirectTo({
              url: '../members/members',
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
  }
})