var app = getApp();
// pages/groupList/groupList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    num: 5,
    pageLis: 0,
    selected: true,
    selected1: false,
    listData: new Array(),
    goodsData: new Array(),
    navSeace: '',
    navDingdan: 0,
    navSeaceTwo: '',
    navDingdanTwo: 1,
    LeagueMembers: {
      wonerSwitch: true,
      controlSwitchSrc: true,
      orderText: '未取货',
      seniorSwitch: true,
      choiceOrderText: [
        '全部订单',
        '未取货',
        '已取货'
      ]
    },
    PickUpGoods: {
      wonerSwitch: true,
      controlSwitchSrc: true,
      orderText: '未取货',
      seniorSwitch: true,
      choiceOrderText: [
        '全部订单',
        '未取货',
        '已取货'
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getUserOrderList',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "page": thad.data.page,
        "page_num": thad.data.num,
        "pick_status": thad.data.navDingdan,
        "keywords": thad.data.navSeace
      },
      success: res => {
        console.log(res);
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 5) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            listData:res.data.data
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
    if (this.data.selected){
      var leader_id = app.globalData.information.id;
      var thad = this;
      thad.setData({
        page: thad.data.page + 1
      })
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Leader/getUserOrderList',
        method: 'post',
        data: {
          "leader_id": app.globalData.information.id,
          "page": thad.data.page,
          "page_num": thad.data.num,
          "pick_status": thad.data.navDingdan,
          "keywords": thad.data.navSeace
        },
        success: res => {
          if (res.data.code == 1) {
            var nnmm = res.data.data.length;
            if (nnmm < 5) {
              thad.setData({
                pageLis: 1
              })
            }
            var aaa = thad.data.listData.concat(res.data.data);
            thad.setData({
              listData: aaa,
              selected1: false,
              selected: true
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }else{
      var leader_id = app.globalData.information.id;
      var thad = this;
      thad.setData({
        page: thad.data.page + 1
      })
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Leader/getMyOrderList',
        method: 'post',
        data: {
          "leader_id": app.globalData.information.id,
          "title": thad.data.navSeaceTwo,
          "pick_status": thad.data.navDingdanTwo,
          "page": thad.data.page,
          "page_num": thad.data.num
        },
        success: res => {
          if (res.data.code == 1) {
            var nnmm = res.data.data.length;
            if (nnmm < 5) {
              thad.setData({
                pageLis: 1
              })
            }
            var aaa = thad.data.goodsData.concat(res.data.data);
            thad.setData({
              goodsData: aaa,
              selected: false,
              selected1: true
            })
            for (var i = 0; i < thad.data.goodsData.length; i++) {
              var commissions = 0;
              var Numss = new Number();
              for (var j = 0; j < thad.data.goodsData[i].product_list.length; j++) {
                var aaa = thad.data.goodsData[i].product_list[j].sum_num;
                var bbb = thad.data.goodsData[i].product_list[j].group_price;
                var ccc = thad.data.goodsData[i].product_list[j].commission;
                var Objs = thad.data.goodsData[i].product_list[j].sum_num;
                commissions += (aaa * bbb * ccc) / 100;
                Objs = Number(Objs);
                Numss += Objs;
              }
              commissions = commissions.toFixed(2);
              var ddd = 'goodsData[' + i + '].commissions';
              var eee = 'goodsData[' + i + '].Numss';
              thad.setData({
                [ddd]: commissions,
                [eee]: Numss
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
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  controlSwitch: function() {
    var wonerSwitch = 'LeagueMembers.wonerSwitch';
    var controlSwitchSrc = 'LeagueMembers.controlSwitchSrc';
    this.setData({
      [wonerSwitch]: !this.data.LeagueMembers.wonerSwitch,
      [controlSwitchSrc]: !this.data.LeagueMembers.controlSwitchSrc
    })
  },
  controlSwitchNo: function(e) {
    if (e.target.dataset.hi || e.target.dataset.hi==0) {
      var aaa = this.data.LeagueMembers.choiceOrderText[e.target.dataset.hi];
      var wonerSwitch = 'LeagueMembers.wonerSwitch';
      var controlSwitchSrc = 'LeagueMembers.controlSwitchSrc';
      var orderText = 'LeagueMembers.orderText';
      this.setData({
        [wonerSwitch]: true,
        [controlSwitchSrc]: true,
        [orderText]: aaa
      })
      var thad = this;
      if (e.target.dataset.hi == 0) {
        thad.setData({
          navDingdan: '',
          page: 0
        })
      }
      if (e.target.dataset.hi == 1) {
        thad.setData({
          navDingdan: 0,
          page: 0
        })
      }
      if (e.target.dataset.hi == 2) {
        thad.setData({
          navDingdan: 1,
          page:0
        })
      }
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Leader/getUserOrderList',
        method: 'post',
        data: {
          "leader_id": app.globalData.information.id,
          "page": thad.data.page,
          "page_num": thad.data.num,
          "pick_status": thad.data.navDingdan,
          "keywords": thad.data.navSeace
        },
        success: res => {
          if (res.data.code == 1) {
            var nnmm = res.data.data.length;
            if (nnmm < 5) {
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
    } else {
      var wonerSwitch = 'LeagueMembers.wonerSwitch';
      var controlSwitchSrc = 'LeagueMembers.controlSwitchSrc';
      this.setData({
        [wonerSwitch]: true,
        [controlSwitchSrc]: true
      })
    }
  },
  seniorSwit: function() {
    var seniorSwitch = 'LeagueMembers.seniorSwitch';
    this.setData({
      [seniorSwitch]: !this.data.LeagueMembers.seniorSwitch
    })
  },
  seniorSwitchNo: function() {
    var seniorSwitch = 'LeagueMembers.seniorSwitch';
    this.setData({
      [seniorSwitch]: true
    })
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getUserOrderList',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "page": thad.data.page,
        "page_num": thad.data.num,
        "pick_status": thad.data.navDingdan,
        "keywords": thad.data.navSeace
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 5) {
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
  navSeace:function(e){
    var values=e.detail.value;
    this.setData({
      navSeace: values
    })
  },
  navTwo:function(e){
    var values = e.detail.value;
    this.setData({
      navSeaceTwo: values
    })
  },
  controlSwitch2: function() {
    var wonerSwitch = 'PickUpGoods.wonerSwitch';
    var controlSwitchSrc = 'PickUpGoods.controlSwitchSrc';
    this.setData({
      [wonerSwitch]: !this.data.PickUpGoods.wonerSwitch,
      [controlSwitchSrc]: !this.data.PickUpGoods.controlSwitchSrc
    })
  },
  controlSwitchNo2: function(e) {
    if (e.target.dataset.hi || e.target.dataset.hi==0) {
      var aaa = this.data.PickUpGoods.choiceOrderText[e.target.dataset.hi];
      var wonerSwitch = 'PickUpGoods.wonerSwitch';
      var controlSwitchSrc = 'PickUpGoods.controlSwitchSrc';
      var orderText = 'PickUpGoods.orderText';
      this.setData({
        [wonerSwitch]: true,
        [controlSwitchSrc]: true,
        [orderText]: aaa
      })
      var thad = this;
      if (e.target.dataset.hi == 0) {
        thad.setData({
          navDingdanTwo: '',
          page:0
        })
      }
      if (e.target.dataset.hi == 1) {
        thad.setData({
          navDingdanTwo: 1,
          page: 0
        })
      }
      if (e.target.dataset.hi == 2) {
        thad.setData({
          navDingdanTwo: 2,
          page: 0
        })
      }
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Leader/getMyOrderList',
        method: 'post',
        data: {
          "leader_id": app.globalData.information.id,
          "title": thad.data.navSeaceTwo,
          "pick_status": thad.data.navDingdanTwo,
          "page": thad.data.page,
          "page_num": thad.data.num
        },
        success: res => {
          if (res.data.code == 1) {
            var nnmm = res.data.data.length;
            if (nnmm < 5) {
              thad.setData({
                pageLis: 1
              })
            }
            thad.setData({
              goodsData: res.data.data,
              selected: false,
              selected1: true
            })
            for (var i = 0; i < thad.data.goodsData.length; i++) {
              var commissions = 0;
              var Numss = new Number();
              for (var j = 0; j < thad.data.goodsData[i].product_list.length; j++) {
                var aaa = thad.data.goodsData[i].product_list[j].sum_num;
                var bbb = thad.data.goodsData[i].product_list[j].group_price;
                var ccc = thad.data.goodsData[i].product_list[j].commission;
                var Objs = thad.data.goodsData[i].product_list[j].sum_num;
                commissions += (aaa * bbb * ccc) / 100;
                Objs = Number(Objs);
                Numss += Objs;
              }
              commissions = commissions.toFixed(2);
              var ddd = 'goodsData[' + i + '].commissions';
              var eee = 'goodsData[' + i + '].Numss';
              thad.setData({
                [ddd]: commissions,
                [eee]: Numss
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
    } else {
      var wonerSwitch = 'PickUpGoods.wonerSwitch';
      var controlSwitchSrc = 'PickUpGoods.controlSwitchSrc';
      this.setData({
        [wonerSwitch]: true,
        [controlSwitchSrc]: true
      })
    }
  },
  seniorSwit2: function() {
    var seniorSwitch = 'PickUpGoods.seniorSwitch';
    this.setData({
      [seniorSwitch]: !this.data.PickUpGoods.seniorSwitch
    })
  },
  seniorSwitchNo2: function() {
    var seniorSwitch = 'PickUpGoods.seniorSwitch';
    this.setData({
      [seniorSwitch]: true
    })
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getMyOrderList',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "title": thad.data.navSeaceTwo,
        "pick_status": thad.data.navDingdanTwo,
        "page": thad.data.page,
        "page_num": thad.data.num
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 5) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            goodsData: res.data.data,
            selected: false,
            selected1: true
          })
          for (var i = 0; i < thad.data.goodsData.length; i++) {
            var commissions = 0;
            var Numss = new Number();
            for (var j = 0; j < thad.data.goodsData[i].product_list.length; j++) {
              var aaa = thad.data.goodsData[i].product_list[j].sum_num;
              var bbb = thad.data.goodsData[i].product_list[j].group_price;
              var ccc = thad.data.goodsData[i].product_list[j].commission;
              var Objs = thad.data.goodsData[i].product_list[j].sum_num;
              commissions += (aaa * bbb * ccc) / 100;
              Objs = Number(Objs);
              Numss += Objs;
            }
            commissions = commissions.toFixed(2);
            var ddd = 'goodsData[' + i + '].commissions';
            var eee = 'goodsData[' + i + '].Numss';
            thad.setData({
              [ddd]: commissions,
              [eee]: Numss
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
  navDetails: function(e) {
    var indexs=e.currentTarget.dataset.hi;
    var order=this.data.listData[indexs].order_no;
    wx.navigateTo({
      url: '../membersDetails/membersDetails?order='+order,
    })
  },
  dialTelephone: function(e) {
    var Numbers = e.currentTarget.dataset.hi;
    wx.makePhoneCall({
      phoneNumber: Numbers 
    })
  },
  outMessage: function(e) {
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
  navIndex: function() {
    wx.redirectTo({
      url: '../group/group'
    });
  },
  navgroup: function() {
    wx.redirectTo({
      url: '../groupUser/groupUser'
    });
  },
  selected: function(e) {
    var thad = this;
    thad.setData({
      page: 0
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getUserOrderList',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "page": thad.data.page,
        "page_num": thad.data.num,
        "pick_status": thad.data.navDingdan,
        "keywords": thad.data.navSeace
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 5) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            listData: res.data.data,
            selected1: false,
            selected: true
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
  selected1: function(e) {
    var thad = this;
    thad.setData({
      page:0
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getMyOrderList',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "title": thad.data.navSeaceTwo,
        "pick_status": thad.data.navDingdanTwo,
        "page": thad.data.page,
        "page_num": thad.data.num
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 5) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            goodsData: res.data.data,
            selected: false,
            selected1: true
          })
          for (var i = 0; i < thad.data.goodsData.length;i++) {
            var commissions=0;
            var Numss=new Number();
            for (var j = 0; j < thad.data.goodsData[i].product_list.length;j++){
              var aaa = thad.data.goodsData[i].product_list[j].sum_num;
              var bbb = thad.data.goodsData[i].product_list[j].group_price;
              var ccc = thad.data.goodsData[i].product_list[j].commission;
              var Objs = thad.data.goodsData[i].product_list[j].sum_num;
              commissions += (aaa * bbb * ccc) / 100;
              Objs = Number(Objs);
              Numss += Objs;
            }
            commissions = commissions.toFixed(2);
            var ddd = 'goodsData[' + i + '].commissions';
            var eee = 'goodsData[' + i + '].Numss';
            thad.setData({
              [ddd]: commissions,
              [eee]: Numss
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
  navgengduo: function () {
    // var leader_id = app.globalData.information.id;
    // var thad = this;
    // thad.setData({
    //   page: thad.data.page + 1
    // })
    // wx.request({
    //   url: app.globalData.networkAddress + '/wapp/Leader/getUserOrderList',
    //   method: 'post',
    //   data: {
    //     "leader_id": app.globalData.information.id,
    //     "page": thad.data.page,
    //     "page_num": thad.data.num,
    //     "pick_status": thad.data.navDingdan,
    //     "keywords": thad.data.navSeace
    //   },
    //   success: res => {
    //     if (res.data.code == 1) {
    //       var nnmm = res.data.data.length;
    //       if (nnmm < 5) {
    //         thad.setData({
    //           pageLis: 1
    //         })
    //       }
    //       thad.setData({
    //         listData: res.data.data,
    //         selected1: false,
    //         selected: true
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
  navgengduo1: function () {
    // var leader_id = app.globalData.information.id;
    // var thad = this;
    // thad.setData({
    //   page: thad.data.page + 1
    // })
    // wx.request({
    //   url: app.globalData.networkAddress + '/wapp/Leader/getMyOrderList',
    //   method: 'post',
    //   data: {
    //     "leader_id": app.globalData.information.id,
    //     "title": thad.data.navSeaceTwo,
    //     "pick_status": thad.data.navDingdanTwo,
    //     "page": thad.data.page,
    //     "page_num": thad.data.num
    //   },
    //   success: res => {
    //     if (res.data.code == 1) {
    //       var nnmm = res.data.data.length;
    //       if (nnmm < 5) {
    //         thad.setData({
    //           pageLis: 1
    //         })
    //       }
    //       thad.setData({
    //         goodsData: res.data.data,
    //         selected: false,
    //         selected1: true
    //       })
    //       for (var i = 0; i < thad.data.goodsData.length; i++) {
    //         var commissions = 0;
    //         var Numss = new Number();
    //         for (var j = 0; j < thad.data.goodsData[i].product_list.length; j++) {
    //           var aaa = thad.data.goodsData[i].product_list[j].sum_num;
    //           var bbb = thad.data.goodsData[i].product_list[j].group_price;
    //           var ccc = thad.data.goodsData[i].product_list[j].commission;
    //           var Objs = thad.data.goodsData[i].product_list[j].sum_num;
    //           commissions += (aaa * bbb * ccc) / 100;
    //           Objs = Number(Objs);
    //           Numss += Objs;
    //         }
    //         commissions = commissions.toFixed(2);
    //         var ddd = 'goodsData[' + i + '].commissions';
    //         var eee = 'goodsData[' + i + '].Numss';
    //         thad.setData({
    //           [ddd]: commissions,
    //           [eee]: Numss
    //         })
    //       }
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })
  },
  navOne:function(e){
    var indexs = e.currentTarget.dataset.hi;
    var id = this.data.goodsData[indexs].id;
    wx.navigateTo({
      url: '../membersDetailsOne/membersDetailsOne?id=' + id,
    })
  }
})