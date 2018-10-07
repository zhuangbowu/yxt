var app = getApp();
// pages/ownerIncrease/ownerIncrease.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_id: 0,
    shopNa: new Object(),
    shopregiment: 0,
    mainTitle: '这是城主标题',
    mainNotice: '这是城主公告这是城主公告这是城主公告这是城主公告这是城主公告这是城主公告',
    groupTitle: '',
    groupNotice: '',
    noticeNum: 0,
    modeDistribution: 0,
    modepayment: 0,
    addressSwitch: true,
    temporary1: '',
    temporary2: '',
    temporary3: '',
    pick_address: '',
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
        checked: false
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
      group_id: options.id
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/editGroup',
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
          var adds = thad.data.shopNa.leader_address;
          for (var i = 0; i < adds.length; i++) {
            if (adds[i].id == thad.data.shopNa.pick_address) {
              var aaa = 'shopNa.leader_address[' + i + '].checked';
              thad.setData({
                [aaa]: true
              })
            }
          }
          if (thad.data.shopNa.pay_type == 1) {
            var aaa = 'payment[' + 0 + '].checked';
            thad.setData({
              [aaa]: true
            })
          }
          if (thad.data.shopNa.pay_type == 2) {
            var aaa = 'payment[' + 1 + '].checked';
            thad.setData({
              [aaa]: true
            })
          }
          if (thad.data.shopNa.dispatch_type == 1) {
            var aaa = 'items[' + 0 + '].checked';
            thad.setData({
              [aaa]: true
            })
          }
          if (thad.data.shopNa.dispatch_type == 2) {
            var aaa = 'items[' + 1 + '].checked';
            thad.setData({
              [aaa]: true
            })
          }
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
                for (var i = 0; i < thad.data.addressText.length; i++) {
                  if (thad.data.addressText[i].id == thad.data.shopNa.dispatch_info) {
                    var aaa = 'addressText[' + i + '].checked';
                    thad.setData({
                      [aaa]: true
                    })
                  }
                }
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            }
          })
          if (thad.data.shopNa.pick_type==1){
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
                    ['shopNa.pick_address']: data.address
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
  noticeNum: function(event) {
      this.setData({
        noticeNum: event.detail.cursor,
        ['shopNa.notice']: event.detail.value
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
      ['shopNa.title']: e.detail.value
    })
  },
  radioChange: function(e) {
    if (e.detail.value == 2) {
      this.setData({
        ['shopNa.dispatch_type']: 2
      })
    } else if (e.detail.value == 1) {
      this.setData({
        ['shopNa.dispatch_type']: 1
      })
    }
  },
  radioChange2: function(e) {
    if (e.detail.value == 1) {
      this.setData({
        ['shopNa.pay_type']: 2
      })
    } else if (e.detail.value == 0) {
      this.setData({
        ['shopNa.pay_type']: 1
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
      ['shopNa.dispatch_info']: thad.data.addressText[indexs].id
    })
  },
  groupCopy: function() {
    this.setData({
      ['shopNa.title']: this.data.shopNa.header_group_title
    })
  },
  titleColle: function(e) {
    this.setData({
      ['shopNa.pick_address']: e.detail.value
    })
  },
  radioChange3: function(e) {
    var indess = e.detail.value;
    this.setData({
      ['shopNa.pick_address']: this.data.shopNa.leader_address[indess].id
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
        "group_id": thad.shopNa.group_id,
        "header_group_id": thad.shopNa.header_group_id,
        "leader_id": app.globalData.information.id,
        "header_id": thad.shopNa.header_id,
        "title": thad.shopNa.title,
        "notice": thad.shopNa.notice,
        "pay_type": thad.shopNa.pay_type,
        "dispatch_type": thad.shopNa.dispatch_type,
        "dispatch_info": thad.shopNa.dispatch_info,
        "pick_type": thad.shopNa.pick_type,
        "pick_address": thad.shopNa.pick_address,
        "status": thad.shopregiment,
        "product_list": thad.shopNa.product_list
      }
    }else {
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
          var id = thad.shopNa.group_id;
          wx.redirectTo({
            url: '../groupDetails/groupDetails?id=' + id,
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
        "group_id": thad.shopNa.group_id,
        "header_group_id": thad.shopNa.header_group_id,
        "leader_id": app.globalData.information.id,
        "header_id": thad.shopNa.header_id,
        "title": thad.shopNa.title,
        "notice": thad.shopNa.notice,
        "pay_type": thad.shopNa.pay_type,
        "dispatch_type": thad.shopNa.dispatch_type,
        "dispatch_info": thad.shopNa.dispatch_info,
        "pick_type": thad.shopNa.pick_type,
        "pick_address": thad.shopNa.pick_address,
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
          var id = thad.shopNa.group_id;
          wx.redirectTo({
            url: '../groupDetails/groupDetails?id=' + id,
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
    if (thad.shopNa.title == '') {
      return '请输入团长标题';
    }
    // if (thad.shopNa.notice == '') {
    //   return '请输入团长公告';
    // }
    if (thad.shopNa.pick_address == '') {
      return '请输入或选择取货地址';
    }
    if (thad.shopNa.dispatch_type == 2) {
      if (thad.shopNa.dispatch_info == '') {
        return '请选择取货地址';
      }
      for (var i = 0; i < thad.shopNa.product_list.length; i++) {
        if (thad.shopNa.product_list[i].product_desc == '') {
          return '请输入商品描述';
        }
      }
      return 1;
    }
    for (var i = 0; i < thad.shopNa.product_list.length; i++) {
      if (thad.shopNa.product_list[i].product_desc == '') {
        return '请输入商品描述';
      }
    }
    return 1;
  }
})