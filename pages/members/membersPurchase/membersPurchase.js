var app = getApp();
// pages/members/membersPurchase/membersPurchase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataTotal: '',
    userstate: 1,
    group_id: 0,
    shopData: new Object(),
    pick_address: '',
    userDistribution: {
      myLoadtion: '',
      userContact: '',
      userHouseholds: '',
      userName: '',
      userOther: ''
    },
    userSelflifting: {
      myLoadtion: '橘子自提点',
      userContact: '',
      userHouseholds: '',
      userName: '',
      userOther: ''
    },
    Nums: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var group_id = options.group_id;
    var num = options.num.split(',');
    var thad = this;
    thad.setData({
      group_id: group_id
    });
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getGroupDetail',
      method: "post",
      data: {
        "user_id": app.globalData.information.id,
        "group_id": thad.data.group_id
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopData: res.data.data
          })
          var dataTotal = 0;
          for (var i = 0; i < num.length; i++) {
            var aaa = 'shopData.product_list[' + i + '].num';
            thad.setData({
              [aaa]: num[i]
            })
            var bbb = thad.data.shopData.product_list[i].num;
            var ccc = thad.data.shopData.product_list[i].group_price;
            dataTotal += bbb * ccc;
          }
          dataTotal=dataTotal.toFixed(2);
          thad.setData({
            dataTotal: dataTotal
          })
          var arrList = [];
          for (var i = 0; i < thad.data.shopData.product_list.length; i++) {
            var aaa = Number(thad.data.shopData.product_list[i].num);
            if (aaa > 0) {
              arrList.push(thad.data.shopData.product_list[i]);
            }
          }
          thad.setData({
            ['shopData.product_list']: arrList
          })
          if (thad.data.shopData.dispatch_type == 2) {
            wx.request({
              url: app.globalData.networkAddress + '/wapp/User/getDispatchSites',
              method: 'post',
              data: {
                "user_id": app.globalData.information.id,
                "dispatch_info": thad.data.shopData.dispatch_info
              },
              success: res => {
                if (res.data.code == 1) {
                  var aaa = res.data.data[0].address + ' ' + res.data.data[0].address_det;
                  thad.setData({
                    pick_address: aaa
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
          ['userDistribution.myLoadtion']: res.address
        })
      },
    })
  },
  username: function(e) {
    this.setData({
      ['userDistribution.userName']: e.detail.value
    })
  },
  usercntact: function(e) {
    this.setData({
      ['userDistribution.userContact']: e.detail.value
    })
  },
  userhouseholds: function(e) {
    this.setData({
      ['userDistribution.userHouseholds']: e.detail.value
    })
  },
  userother: function(e) {
    this.setData({
      ['userDistribution.userOther']: e.detail.value
    })
  },
  username2: function(e) {
    this.setData({
      ['userSelflifting.userName']: e.detail.value
    })
  },
  usercntact2: function(e) {
    this.setData({
      ['userSelflifting.userContact']: e.detail.value
    })
  },
  userhouseholds2: function(e) {
    this.setData({
      ['userSelflifting.userHouseholds']: e.detail.value
    })
  },
  userother2: function(e) {
    this.setData({
      ['userSelflifting.userOther']: e.detail.value
    })
  },
  userSubmission: function() {
    this.setData({
      Nums: true
    })

    var objj = this.data.userDistribution;
    if (this.data.dataTotal <= 0) {
      wx.showToast({
        title: '商品数量不能为空',
        icon: 'none'
      })
    } else if (objj.userName == '') {
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
    } else if (objj.userHouseholds == '') {
      wx.showToast({
        title: '请输入您的详细地址',
        icon: 'none'
      })
    } else {
      var thad = this.data;
      var tad = this;
      var objjs = new Object();
      objjs = {
        "user_id": app.globalData.information.id,
        "header_id": thad.shopData.header_id,
        "leader_id": thad.shopData.leader_id,
        "header_group_id": thad.shopData.header_group_id,
        "group_id": thad.group_id,
        "pick_type": thad.shopData.dispatch_type,
        "pick_address": objj.myLoadtion + ' ' + objj.userHouseholds,
        "pay_type": 1,
        "user_name": objj.userName,
        "user_telephone": objj.userContact,
        "remarks": objj.userOther,
        "product_list": thad.shopData.product_list
      }
      wx.request({
        url: app.globalData.networkAddress + '/wapp/User/makeOrder',
        method: 'post',
        data: objjs,
        success: res => {
          if (res.data.code == 1) {
            var appid = res.data.data.appId;
            var nonceStr = res.data.data.nonceStr;
            var packages = res.data.data.package;
            var sign = res.data.data.sign;
            var signType = res.data.data.signType;
            var timeStamp = res.data.data.timeStamp;
            var bbb = res.data.data.order_no;
            wx.requestPayment({
              'timeStamp': timeStamp + '',
              'nonceStr': nonceStr,
              'package': packages,
              'signType': signType,
              'paySign': sign,
              'success': function(res) {
                wx.showToast({
                  title: '支付成功',
                })
                var aaa = app.globalData.information.role_status;
                if (aaa == 1) {
                  wx.redirectTo({
                    url: '../../group/membersOrderDetails/membersOrderDetails?order=' + bbb,
                  })
                } else if (aaa == 2) {
                  wx.redirectTo({
                    url: '../membersOrderDetails/membersOrderDetails?order=' + bbb,
                  })
                }
              },
              'fail': function(res) {
                tad.setData({
                  Nums: false
                })
                if (res.requestPayment == 'fail cancel') {
                  wx.showToast({
                    title: res.errMsg,
                    icon: 'none'
                  })
                } else {
                  wx.showToast({
                    title: res.errMsg,
                    icon: 'none'
                  })
                }
              },
              'complete': function(res) {

              }
            })
          } else {
            tad.setData({
              Nums: false
            })
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }
  },
  userSubmission2: function() {
    this.setData({
      Nums: true
    })
    var objj = this.data.userSelflifting;
    if (this.data.dataTotal <= 0) {
      wx.showToast({
        title: '商品数量不能为空',
        icon: 'none'
      })
    } else if (objj.userName == '') {
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
    } else {
      var thad = this.data;
      var tad = this;
      var objjs = new Object();
      objjs = {
        "user_id": app.globalData.information.id,
        "header_id": thad.shopData.header_id,
        "leader_id": thad.shopData.leader_id,
        "header_group_id": thad.shopData.header_group_id,
        "group_id": thad.group_id,
        "pick_type": thad.shopData.dispatch_type,
        "pick_address": thad.pick_address,
        "pay_type": 1,
        "user_name": objj.userName,
        "user_telephone": objj.userContact,
        "remarks": objj.userOther,
        "product_list": thad.shopData.product_list
      }
      wx.request({
        url: app.globalData.networkAddress + '/wapp/User/makeOrder',
        method: 'post',
        data: objjs,
        success: res => {
          if (res.data.code == 1) {
            var appid = res.data.data.appId;
            var nonceStr = res.data.data.nonceStr;
            var packages = res.data.data.package;
            var sign = res.data.data.sign;
            var signType = res.data.data.signType;
            var timeStamp = res.data.data.timeStamp;
            var bbb = res.data.data.order_no;
            wx.requestPayment({
              'timeStamp': timeStamp + '',
              'nonceStr': nonceStr,
              'package': packages,
              'signType': signType,
              'paySign': sign,
              'success': function(res) {
                wx.showToast({
                  title: '支付成功',
                })
                var aaa = app.globalData.information.role_status;
                if (aaa == 1) {
                  wx.redirectTo({
                    url: '../../group/membersOrderDetails/membersOrderDetails?order=' + bbb,
                  })
                } else if (aaa == 2) {
                  wx.redirectTo({
                    url: '../membersOrderDetails/membersOrderDetails?order=' + bbb,
                  })
                }

              },
              'fail': function(res) {
                tad.setData({
                  Nums: false
                })
                if (res.requestPayment == 'fail cancel') {
                  wx.showToast({
                    title: res.errMsg,
                    icon: 'none'
                  })
                } else {
                  wx.showToast({
                    title: res.errMsg,
                    icon: 'none'
                  })
                }
              },
              'complete': function(res) {

              }
            })
          } else {
            tad.setData({
              Nums: false
            })
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