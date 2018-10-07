var app = getApp();
// pages/ownerDetails/ownerDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    num: 10,
    pageLis: 0,
    group_id: 22, 
    shopData: new Object(),
    shopNum: [

    ],
    role_status:'',
    listData:{
      order_sum:0,
      record_list:new Array()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var group_id = options.id;
    this.setData({
      group_id: group_id
    })
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
        var developer = (wx.getStorageSync('openId') || []);
        if (typeof developer != 'string' || developer == '' || developer == null || developer == '[]') {
          wx.hideLoading();
          wx.showModal({
            title: '登录失败',
            content: '用户登录失败点击确定重新登录',
            success: res => {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../membersDetails/membersDetails',
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
              wx.hideLoading();
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
                    for (var i = 0; i < thad.data.shopData.product_list.length; i++) {
                      thad.data.shopNum[i] = 0;
                      thad.setData({
                        shopNum: thad.data.shopNum
                      })
                    }
                    wx.request({
                      url: app.globalData.networkAddress + '/wapp/User/getGroupRecord',
                      method:'post',
                      data:{
                        "user_id": app.globalData.information.id,
                        "group_id": thad.data.group_id,
                        "page": thad.data.page,
                        "page_num": thad.data.num
                      },
                      success:res=>{
                        if(res.data.code==1){
                          var nnmm = res.data.data.record_list.length;
                          if (nnmm < 10) {
                            thad.setData({
                              pageLis: 1
                            })
                          }
                          thad.setData({
                            listData:res.data.data,
                            role_status: app.globalData.information.role_status
                          })
                          // var mumms = thad.data.listData.order_sum+1;
                          // for (var i = 0; i < thad.data.listData.record_list.length; i++) {
                          //   --mumms;
                          //   var aaa = 'listData.record_list['+i+'].serial';
                          //   thad.setData({
                          //     [aaa]: mumms
                          //   })
                          // }
                        }else{
                          wx.showToast({
                            title: res.data.msg,
                            icon:'none'
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
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../../tologin/tologin',
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
    var thad = this;
    thad.setData({
      page: thad.data.page + 1
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getGroupRecord',
      method: 'post',
      data: {
        "user_id": app.globalData.information.id,
        "group_id": thad.data.group_id,
        "page": thad.data.page,
        "page_num": thad.data.num
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.record_list.length;
          if (nnmm < 10) {
            thad.setData({
              pageLis: 1
            })
          }
          var aaa = thad.data.listData.record_list.concat(res.data.data.record_list);
          thad.setData({
            ['listData.record_list']: aaa,
            role_status: app.globalData.information.role_status
          })
          // var mumms = thad.data.listData.order_sum + 1;
          // for (var i = 0; i < thad.data.listData.record_list.length; i++) {
          //   --mumms;
          //   var aaa = 'listData.record_list[' + i + '].serial';
          //   thad.setData({
          //     [aaa]: mumms
          //   })
          // }
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
  onShareAppMessage: function() {
    return {
      title: '分享本页面',
      path: '/pages/index/index'
    }
  },
  navDetails: function(e) {
    var indexs=e.currentTarget.dataset.hi;
    var thad=this;
    wx.navigateTo({
      url: '../compage/compage?group_id=' + indexs + '&shop_id=' + thad.data.group_id,
    })
  },
  shopReduce: function(e) {
    var indexss = e.currentTarget.dataset.hi;
    var Num = Number(this.data.shopNum[indexss]);
    var shop = 'shopNum[' + indexss + ']';
    if (Num > 0) {
      --Num;
      this.setData({
        [shop]: Num
      })
    } else if (Num == 0) {
      this.setData({
        [shop]: 0
      })
    }
  },
  shopPlus: function(e) {
    var indexss = e.currentTarget.dataset.hi;
    var thad = this;
    var Num = Number(thad.data.shopNum[indexss]);
    var shop = 'shopNum[' + indexss + ']';
    ++Num;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/checkProductRemain',
      method: 'post',
      data: {
        "user_id": app.globalData.information.id,
        "product_id": thad.data.shopData.product_list[indexss].id,
        "group_id": thad.data.group_id,
        "num": Num
      },
      success: res => {
        if (res.data.code == 1) {
          this.setData({
            [shop]: Num
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }

      }
    })
  },
  navMembersTobe: function() {
    var header_id = this.data.shopData.header_id;
    wx.navigateTo({
      url: '../membersTobe/membersTobe?id=' + header_id + '&num=' + 2,
    })
  },
  navMembersPurchase: function () {
    var thad = this;
    wx.navigateTo({
      url: '../membersPurchase/membersPurchase?group_id=' + thad.data.group_id + '&num=' + thad.data.shopNum,
    })
  },
  navgengduo: function () {
    // var thad = this;
    // thad.setData({
    //   page: thad.data.page + 1
    // })
    // wx.request({
    //   url: app.globalData.networkAddress + '/wapp/User/getGroupRecord',
    //   method: 'post',
    //   data: {
    //     "user_id": app.globalData.information.id,
    //     "group_id": thad.data.group_id,
    //     "page": thad.data.page,
    //     "page_num": thad.data.num
    //   },
    //   success: res => {
    //     if (res.data.code == 1) {
    //       var nnmm = res.data.data.length;
    //       if (nnmm < 10) {
    //         thad.setData({
    //           pageLis: 1
    //         })
    //       }
    //       var aaa = thad.data.listData.concat(res.data.data);
    //       thad.setData({
    //         listData: aaa,
    //         role_status: app.globalData.information.role_status
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })
  }
})