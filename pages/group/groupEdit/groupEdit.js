var app = getApp();
// pages/ownerIncrease/ownerIncrease.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_id: 32,
    shopNa: new Object(),
    shopregiment: 0,
    mainTitle: '这是城主标题',
    mainNotice: '这是城主公告这是城主公告这是城主公告这是城主公告这是城主公告这是城主公告',
    groupTitle: '',
    groupNotice: '',
    noticeNum: 1,
    modeDistribution: 1,
    modepayment: 1,
    addressSwitch: true,
    temporary1: '',
    temporary2: '',
    temporary3: '',
    pick_address: {
      id: ''
    },
    dispatch_info: '',
    groupCollect: 1,
    groupCollectText: '',
    addressEdit: {
      id: '',
      name: '',
      address: '',
      address_det: '',
      liftingIndess: 0
    },
    addressText: [

    ],
    hiddenmodalput: true,
    addressTextlput: true,
    payment: [{
        name: 'peisong',
        value: '在线支付',
        judge: '(团员需在线支付才能参团)',
        checked: true
      },
      {
        name: 'peisong',
        value: '货到付款',
        judge: '(团员无需支付，线上报名方式参团)',
        checked: false
      }
    ],
    items: [{
        name: 'peisong',
        value: '配送',
        judge: '(选择后团员购买必填收货地址)',
        checked: true
      },
      {
        name: 'ziqu',
        value: '自提',
        judge: '',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var thad = this;
    thad.setData({
      group_id: options.group_id
    });
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
                  url: '../groupEdit/groupEdit',
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
          success: function(res) {
            if (res.data.code == 1) {
              app.globalData.information = res.data.data;
              wx.request({
                url: app.globalData.networkAddress + '/wapp/Leader/checkIsGroup',
                method: 'post',
                data: {
                  "leader_id": app.globalData.information.id,
                  "group_id": thad.data.group_id
                },
                success: res => {
                  if (res.data.code == 1) {
                    if (res.data.data.group_id == 0) {
                      wx.request({
                        url: app.globalData.networkAddress + '/wapp/Leader/getGroupDetail',
                        method: 'post',
                        data: {
                          "leader_id": app.globalData.information.id,
                          "group_id": thad.data.group_id
                        },
                        success: res => {
                          if (res.data.code == 1) {
                            var data = res.data.data;
                            thad.setData({
                              shopNa: data
                            })
                            if (thad.data.shopNa.dispatch_type == 1) {
                              wx.request({
                                url: app.globalData.networkAddress + '/wapp/Leader/getLastAddress',
                                method: 'post',
                                data: {
                                  "leader_id": app.globalData.information.id
                                },
                                success: res => {
                                  if (res.data.code == 1) {
                                    var data = res.data.data;
                                    thad.setData({
                                      ['pick_address.id']: data.address
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
                      wx.request({
                        url: app.globalData.networkAddress + '/wapp/Leader/getAddressList',
                        method: 'post',
                        data: {
                          "leader_id": app.globalData.information.id
                        },
                        success: res => {
                          if (res.data.code == 1) {
                            var data = res.data.data;
                            thad.setData({
                              addressText: data
                            })
                          } else {
                            wx.showToast({
                              title: res.data.msg,
                              icon: 'none'
                            })
                          }
                        }
                      })
                      wx.hideLoading();
                    } else {
                      wx.hideLoading();
                      wx.redirectTo({
                        url: '../group/group'
                      })
                    }
                  } else {
                    wx.hideLoading();
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
      fail: function() {
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../../tologin/tologin',
              })
            }
            if (res.cancel) {
              // thad.onLoad();
              wx.showModal({
                title: '提示框',
                content: '对不起您已取消授权登录信息，无法进行下一步操作',
                showCancel: false
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
  noticeNum: function(event) {

    this.setData({
      noticeNum: event.detail.cursor,
      groupNotice: event.detail.value
    })
  },
  modalinput: function() {
    this.setData({
      hiddenmodalput: false
    })
  },
  modalinput2: function() {
    this.setData({
      hiddenmodalput: true,
      name: '',
      address: '',
      address_det: ''
    })
  },
  cancelInput: function(e) {
    this.setData({
      temporary1: e.detail.value
    })
  },
  cancelInput2: function(e) {
    this.setData({
      temporary2: e.detail.value
    })
  },
  confirmInput: function(e) {
    this.setData({
      temporary3: e.detail.value
    })
  },
  //取消按钮  
  cancel: function() {
    this.setData({
      hiddenmodalput: true,
      temporary1: '',
      temporary2: '',
      temporary3: ''
    });
  },
  //确认  
  confirm: function() {
    var thad = this;
    if (this.data.temporary1 == '' || this.data.temporary2 == '' || this.data.temporary3 == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    } else {
      var obj = new Object();
      var temporary1 = this.data.temporary1;
      var temporary2 = this.data.temporary2;
      var temporary3 = this.data.temporary3;
      obj.name = temporary1;
      obj.address = temporary2;
      obj.address_det = temporary3;
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Leader/addAddress',
        method: 'post',
        data: {
          "leader_id": app.globalData.information.id,
          "name": obj.name,
          "address": obj.address,
          "address_det": obj.address_det
        },
        success: res => {
          if (res.data.code == 1) {
            var objj = res.data.data;
            thad.data.addressText.push(objj);
            thad.setData({
              hiddenmodalput: true,
              addressText: thad.data.addressText
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
  titleInput: function(e) {
    this.setData({
      groupTitle: e.detail.value
    })
  },
  radioChange: function(e) {
    if (e.detail.value == 2) {
      this.setData({
        addressSwitch: false,
        modeDistribution: e.detail.value
      })
    } else if (e.detail.value == 1) {
      this.setData({
        addressSwitch: true,
        modeDistribution: e.detail.value
      })
    }
  },
  radioChange2: function(e) {
    if (e.detail.value == 2) {
      this.setData({
        modepayment: e.detail.value
      })
    } else if (e.detail.value == 1) {
      this.setData({
        modepayment: e.detail.value
      })
    }
  },
  bindshopDescribe: function(e) {
    var indexs = e.currentTarget.dataset.hi;
    var up = 'shopNa.product_list[' + indexs + '].product_desc';
    this.setData({
      [up]: e.detail.value
    })
  },
  checkboxChange: function(e) {
    var thad = this;
    var indexs = e.detail.value;
    thad.setData({
      dispatch_info: thad.data.addressText[indexs]
    })
  },
  groupCopy: function() {
    this.setData({
      groupTitle: this.data.shopNa.group_title
    })
  },
  titleColle: function(e) {
    this.setData({
      ['pick_address.id']: e.detail.value
    })
  },
  radioChange3: function(e) {
    var indess = e.detail.value;
    this.setData({
      ['pick_address.id']: this.data.shopNa.leader_address[indess]
    })
  },
  addressEdit: function(e) {
    var indess = e.currentTarget.dataset.hi;
    this.setData({
      addressTextlput: false,
      ['addressEdit.id']: this.data.addressText[indess].id,
      ['addressEdit.name']: this.data.addressText[indess].name,
      ['addressEdit.address']: this.data.addressText[indess].address,
      ['addressEdit.address_det']: this.data.addressText[indess].address_det,
      ['addressEdit.liftingIndess']: indess
    })
  },
  addressNo: function(e) {
    var indess = e.currentTarget.dataset.hi;
    var thad = this;
    wx.showModal({
      title: '删除',
      content: '是否确定删除',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.networkAddress + '/wapp/Leader/delAddress',
            method: 'post',
            data: {
              "leader_id": app.globalData.information.id,
              "address_id": thad.data.addressText[indess].id
            },
            success: res => {
              if (res.data.code == 1) {
                thad.data.addressText.splice(indess, 1);
                thad.setData({
                  addressText: thad.data.addressText
                });
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

        }
      }
    })
  },
  addressTextlputt2: function() {
    this.setData({
      addressTextlput: true
    })
  },
  addressIifting: function(e) {
    var objj = e.detail.value;
    this.setData({
      ['addressEdit.name']: objj
    })
  },
  addressIifting2: function(e) {
    var objj = e.detail.value;
    this.setData({
      ['addressEdit.address']: objj
    })
  },
  addressIiftingText: function(e) {
    var objj = e.detail.value;
    this.setData({
      ['addressEdit.address_det']: objj
    })
  },
  addressCancel: function() {
    this.setData({
      addressTextlput: true
    })
  },
  addressDetermine: function() {
    var indess = this.data.addressEdit.liftingIndess;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/editAddress',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "id": thad.data.addressEdit.id,
        "name": thad.data.addressEdit.name,
        "address": thad.data.addressEdit.address,
        "address_det": thad.data.addressEdit.address_det
      },
      success: res => {
        if (res.data.code == 1) {
          var eee = 'addressText[' + indess + '].id';
          var bbb = 'addressText[' + indess + '].name';
          var ccc = 'addressText[' + indess + '].address';
          var aaa = 'addressText[' + indess + '].address_det';
          this.setData({
            addressTextlput: true,
            [eee]: thad.data.addressEdit.id,
            [bbb]: thad.data.addressEdit.name,
            [ccc]: thad.data.addressEdit.address,
            [aaa]: thad.data.addressEdit.address_det
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
  Preservation: function(event) {
    var indexNum = Number(event.currentTarget.dataset.hi);
    this.setData({
      shopregiment: indexNum
    });
    var thad = this.data;
    var oObjj = this.Verification();
    if (oObjj == 1) {
      var datas = new Object();
      datas = {
        "group_id": 0,
        "header_group_id": thad.group_id,
        "leader_id": app.globalData.information.id,
        "header_id": thad.shopNa.header_id,
        "title": thad.groupTitle,
        "notice": thad.groupNotice,
        "pay_type": thad.modepayment,
        "dispatch_type": thad.modeDistribution,
        "dispatch_info": '',
        "pick_type": thad.shopNa.dispatch_type,
        "pick_address": thad.pick_address.id,
        "status": thad.shopregiment,
        "product_list": thad.shopNa.product_list
      }
    } else if (oObjj == 2) {
      var datas = new Object();
      datas = {
        "group_id": 0,
        "header_group_id": thad.group_id,
        "leader_id": app.globalData.information.id,
        "header_id": thad.shopNa.header_id,
        "title": thad.groupTitle,
        "notice": thad.groupNotice,
        "pay_type": thad.modepayment,
        "dispatch_type": thad.modeDistribution,
        "dispatch_info": thad.dispatch_info.id,
        "pick_type": thad.shopNa.dispatch_type,
        "pick_address": thad.pick_address.id,
        "status": thad.shopregiment,
        "product_list": thad.shopNa.product_list
      }
    } else {
      wx.showToast({
        title: oObjj,
        icon: 'none'
      })
      return;
    }
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/saveGroup',
      method: 'post',
      data: datas,
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
  },
  immediately: function(event) {
    var indexNum = Number(event.currentTarget.dataset.hi);
    this.setData({
      shopregiment: indexNum
    });
    var thad = this.data;
    var oObjj = this.Verification();
    if (oObjj == 1) {
      var datas = new Object();
      datas = {
        "group_id": 0,
        "header_group_id": thad.group_id,
        "leader_id": app.globalData.information.id,
        "header_id": thad.shopNa.header_id,
        "title": thad.groupTitle,
        "notice": thad.groupNotice,
        "pay_type": thad.modepayment,
        "dispatch_type": thad.modeDistribution,
        "dispatch_info": '',
        "pick_type": thad.shopNa.dispatch_type,
        "pick_address": thad.pick_address.id,
        "status": thad.shopregiment,
        "product_list": thad.shopNa.product_list
      }
    } else if (oObjj == 2) {
      var datas = new Object();
      datas = {
        "group_id": 0,
        "header_group_id": thad.group_id,
        "leader_id": app.globalData.information.id,
        "header_id": thad.shopNa.header_id,
        "title": thad.groupTitle,
        "notice": thad.groupNotice,
        "pay_type": thad.modepayment,
        "dispatch_type": thad.modeDistribution,
        "dispatch_info": thad.dispatch_info.id,
        "pick_type": thad.shopNa.dispatch_type,
        "pick_address": thad.pick_address.id,
        "status": thad.shopregiment,
        "product_list": thad.shopNa.product_list
      }
    } else {
      wx.showToast({
        title: oObjj,
        icon: 'none'
      })
      return;
    }
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/saveGroup',
      method: 'post',
      data: datas,
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
  },
  Verification: function() {
    var thad = this.data;
    if (thad.groupTitle == '') {
      return '请输入团长标题';
    }
    // if (thad.groupNotice == ''){
    //   return '请输入团长公告';
    // }
    if (thad.pick_address.id == '') {
      return '请输入或选择取货地址';
    }
    if (thad.modeDistribution == 2) {
      if (thad.dispatch_info == '') {
        return '请选择取货地址';
      }
      for (var i = 0; i < thad.shopNa.product_list.length; i++) {
        if (thad.shopNa.product_list[i].product_desc == '') {
          return '请输入商品描述';
        }
      }
      return 2;
    }
    for (var i = 0; i < thad.shopNa.product_list.length; i++) {
      if (thad.shopNa.product_list[i].product_desc == '') {
        return '请输入商品描述';
      }
    }
    return 1;
  }
})