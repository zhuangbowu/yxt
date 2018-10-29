var app = getApp();
// pages/ownerIncrease/ownerIncrease.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selsetData: new Array(),
    objects: new Array(),
    group_id: '',
    shopregiment: 0,
    mainTitle: '',
    dispatch_info2: '',
    mainNotice: '',
    noticeNum: 0,
    mainDetail: false,
    mainDetailNum: 0,
    modeDistribution: 1,
    modeDateTime: '',
    modeDate: '2016-09-01',
    modeTime: '12:01',
    myData: '',
    myTime: '',
    close_time: '',
    close_time2: '',
    addressSwitch: true,
    temporary1: '',
    temporary2: '',
    temporary3: '',
    addressTextlput: true,
    addressTextArr: [

    ],
    addressText: [

    ],
    addressEdit: {
      name: '',
      address: '',
      address_det: '',
      id: '',
      liftingIndess: 0
    },
    hiddenmodalput: true,
    items: [{
      name: 'peisong',
      value: '配送',
      judge: '(选择后团长开团必填收货地址)',
      checked: true
    },
    {
      name: 'ziqu',
      value: '自取',
      judge: '',
    }
    ],
    product_list: [{
      id: 0,
      base_id: 0,
      product_name: '',
      group_limit: 0,
      self_limit: 0,
      market_price: '',
      group_price: '',
      purchase_price: '',
      commission: '',
      remain: '',
      img_list: [],
      product_desc: '',
      modifyShop: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getAddressList',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id
      },
      success: function (res) {
        if (res.data.code == 1) {
          thad.data.addressText = res.data.data;
          for (var i in thad.data.addressText) {
            thad.data.addressText[i].checked = false
          }
          thad.setData({
            addressText: thad.data.addressText
          })
          wx.request({
            url: app.globalData.networkAddress + '/wapp/Header/editGroupGetDetail',
            method: 'post',
            data: {
              "header_id": app.globalData.owner.header_id,
              "group_id": options.id
            },
            success: function (res) {
              if (res.data.code == 1) {
                thad.setData({
                  group_id: options.id
                });
                thad.setData({
                  mainTitle: res.data.data.group_title,
                  mainNotice: res.data.data.group_notice,
                  modeDistribution: res.data.data.dispatch_type,
                  dispatch_info2: res.data.data.dispatch_info,
                  mainDetailNum: res.data.data.is_close,
                  modeDateTime: res.data.data.close_time,
                  product_list: res.data.data.product_list
                })
                thad.data.modeDate = thad.data.modeDateTime.substring(0, 10);
                thad.data.modeTime = thad.data.modeDateTime.substring(11, 15);
                thad.setData({
                  modeDate: thad.data.modeDate,
                  modeTime: thad.data.modeTime
                })
                if (res.data.data.dispatch_type == 1) {
                  thad.setData({
                    ['items[0].checked']: true,
                    ['items[1].checked']: false,
                  })
                } else {
                  thad.setData({
                    ['items[0].checked']: false,
                    ['items[1].checked']: true,
                  })
                  var thads = thad.data.dispatch_info2.split(',');
                  thad.setData({
                    addressTextArr: thads
                  })
                  for (var i = 0; i < thad.data.addressText.length; i++) {
                    if (thad.data.addressText[i].id == thads[i]) {
                      var objj = 'addressText[' + i + '].checked';
                      thad.setData({
                        [objj]: true
                      })
                    }
                  }
                }
                for (var i = 0; i < thad.data.product_list.length; i++) {
                  if (thad.data.product_list[i].tag_name == '') {
                    thad.data.product_list[i].tag_name = '请选择商品标签';
                  }
                }
                thad.setData({
                  product_list: thad.data.product_list
                })
                console.log(thad.data.product_list);
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
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getTagName',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id
      },
      success: function (res) {
        if (res.data.code == 1) {
          thad.data.selsetData = res.data.data;
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
    var date = new Date();
    var myDate2 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    var myTime3 = date.getHours();
    myTime3 = myTime3 > 9 ? myTime3 : "0" + myTime3;
    var myTime4 = date.getMinutes();
    myTime4 = myTime4 > 9 ? myTime4 : "0" + myTime4;
    var myTime2 = myTime3 + ':' + myTime4;
    this.setData({
      myData: myDate2,
      modeDate: myDate2,
      myTime: myTime2,
      modeTime: myTime2
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var objss = this.data.objects;
    var that = this;
    if (JSON.stringify(objss) == '{}') {
      // console.log('无数据不渲染');
    } else {
      for (var i = 0; i < objss.length; i++) {
        var obj = new Object();
        obj.id = 0,
        obj.base_id = objss[i].base_id,
        obj.product_name = objss[i].product_name;
        obj.group_limit = objss[i].group_limit;
        obj.self_limit = objss[i].self_limit;
        obj.market_price = objss[i].market_price;
        obj.purchase_price = objss[i].purchase_price;
        obj.group_price = objss[i].group_price;
        obj.commission = objss[i].commission;
        obj.remain = objss[i].remain;
        obj.img_list = objss[i].img_list;
        obj.product_desc = objss[i].product_desc;
        obj.modifyShop = true;
        obj.tag_name = '请选择商品标签';
        that.data.product_list.push(obj);
        that.setData({
          product_list: that.data.product_list
        });
      }
    }
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
    this.data.mainDetail = e.detail.value;
    this.setData({
      mainDetail: this.data.mainDetail
    })
    if (this.data.mainDetail == false) {
      this.setData({
        mainDetailNum: 0
      })
    } else {
      this.setData({
        mainDetailNum: 1
      })
    }
  },
  bindDateChange: function (e) {
    this.setData({
      modeDate: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    // var deta = Number(e.detail.value.substring(0, 2));
    // var deta2 = Number(e.detail.value.slice(-2));
    // var myTime = new Date();
    // var myTime1 = myTime.getHours();
    // var myTime2 = myTime.getMinutes();
    // var myTime3 = myTime1 + ':' + myTime2;
    // if (deta < myTime1) {
    //   wx.showToast({
    //     title: '时间选择错误',
    //     icon: 'success',
    //     duration: 2000
    //   });
    // } else if (deta > myTime1) {
      this.setData({
        modeTime: e.detail.value
      });
    // } else if (deta == myTime1) {
    //   if (deta2 > myTime2) {
    //     this.setData({
    //       modeTime: e.detail.value
    //     });
    //   } else {
    //     wx.showToast({
    //       title: '时间选择错误',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   }
    // }
  },
  showImgChoose: function (event) {
    var indexs = event.currentTarget.dataset.hi;
    var that = this;
    wx.showActionSheet({
      itemList: ['上传图片', '上传视频（20秒以内）'],
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              wx.uploadFile({
                url: app.globalData.networkAddress + '/wapp/Pub/uploadImg', //仅为示例，非真实的接口地址
                filePath: res.tempFilePaths[0],
                name: 'file',
                formData: {
                  'user': 'test'
                },
                success: function (res) {
                  var data = JSON.parse(res.data);
                  var obj = new Object();;
                  obj.types = 1;
                  obj.urlImg = data.data.img_url;
                  that.data.product_list[indexs].img_list.push(obj);
                  var dd = 'product_list[' + indexs + '].img_list';
                  if (that.data.product_list[indexs].img_list.length < 9) {
                    that.setData({
                      [dd]: that.data.product_list[indexs].img_list
                    });
                  } else {
                    wx.showToast({
                      title: '上传超过九张',
                      icon: 'success',
                      duration: 2000
                    });
                  }
                }
              })

            }
          })
        }
        if (res.tapIndex == 1) {
          wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 20,
            camera: 'back',
            success: function (res) {
              const uploadTask = wx.uploadFile({
                url: app.globalData.networkAddress + '/wapp/Pub/uploadImg', //仅为示例，非真实的接口地址
                filePath: res.tempFilePath,
                name: 'file',
                formData: {
                  'user': 'test'
                },
                success: function (res) {
                  var data = JSON.parse(res.data);
                  if (that.data.product_list[indexs].img_list.length < 9) {
                    var obj = new Object();
                    obj.types = 2;
                    obj.urlImg = data.data.img_url;
                    that.data.product_list[indexs].img_list.push(obj);
                    var dd = 'product_list[' + indexs + '].img_list';
                    that.setData({
                      [dd]: that.data.product_list[indexs].img_list
                    });
                  } else {
                    wx.showToast({
                      title: '上传超过九张',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                }
              })

            }
          })
        }
      },
      fail: function (res) {
        // console.log(res.errMsg);
      }
    })
  },
  showImgNone: function (event) {
    var indexs = event.currentTarget.dataset.hi;
    var indexNum = event.currentTarget.dataset.hii;
    var aaa = this.data.product_list[indexNum].img_list[indexNum].urlImg;
    var bbb = this.data.product_list[indexNum].img_list;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Pub/delImg?img_url=', //仅为示例，并非真实的接口地址
      data: {
        img_url: aaa
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        if (res.data.code == 1) {
          bbb.splice(indexs, 1);
          var dd = 'product_list[' + indexNum + '].img_list';
          thad.setData({
            [dd]: bbb
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
        } else if (res.data.code == -1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })

  },
  noticeNum: function (event) {
    if (event.detail.cursor < 100) {
      this.setData({
        noticeNum: event.detail.cursor,
        mainNotice: event.detail.value
      })
    } else {
      wx.showToast({
        title: '输入超出',
        icon: 'success',
        duration: 2000
      })
    }
  },
  addShop: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['新增商品', '从往期商品添加'],
      success: function (res) {
        if (res.tapIndex == 0) {
          var obj = new Object();
          obj.id = 0,
            obj.base_id = 0,
            obj.product_name = '';
          obj.group_limit = 0;
          obj.self_limit = 0;
          obj.market_price = '';
          obj.purchase_price = '';
          obj.group_price = '';
          obj.commission = '';
          obj.remain = '';
          obj.img_list = [];
          obj.product_desc = '';
          obj.modifyShop = true;
          obj.tag_name = '请选择商品标签';
          that.data.product_list.push(obj);
          that.setData({
            product_list: that.data.product_list
          });
        } else if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../ownerPeriod/ownerPeriod',
          })
        }
      }
    })

  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: false
    })
  },
  modalinput2: function () {
    this.setData({
      hiddenmodalput: true,
      lifting: '',
      liftingText: ''
    })
  },
  cancelInput: function (e) {
    this.setData({
      temporary1: e.detail.value
    })
  },
  cancelAddress: function (e) {
    this.setData({
      temporary2: e.detail.value
    })
  },
  confirmInput: function (e) {
    this.setData({
      temporary3: e.detail.value
    })
  },
  addressEdit: function (e) {
    var indess = e.currentTarget.dataset.hi;
    this.setData({
      addressTextlput: false,
      ['addressEdit.name']: this.data.addressText[indess].name,
      ['addressEdit.address']: this.data.addressText[indess].address,
      ['addressEdit.address_det']: this.data.addressText[indess].address_det,
      ['addressEdit.id']: this.data.addressText[indess].id,
      ['addressEdit.liftingIndess']: indess
    })
  },
  addressNo: function (e) {
    var indess = e.currentTarget.dataset.hi;
    var thad = this;
    wx.showModal({
      title: '删除',
      content: '是否确定删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.networkAddress + '/wapp/Header/delAddress',
            data: {
              "header_id": app.globalData.owner.header_id,
              "address_id": thad.data.addressText[indess].id
            },
            success: function (res) {
              var num = res.data.code;
              if (num == 1) {
                thad.data.addressText.splice(indess, 1);
                thad.setData({
                  addressText: thad.data.addressText
                });
                wx.showToast({
                  title: '删除成功',
                  icon: 'none'
                })
              } else if (num == -1) {
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
  addressTextlputt2: function () {
    this.setData({
      addressTextlput: true
    })
  },
  addressIifting: function (e) {
    var objj = e.detail.value;
    this.setData({
      ['addressEdit.name']: objj
    })
  },
  addressIifting2: function (e) {
    var objj = e.detail.value;
    this.setData({
      ['addressEdit.address']: objj
    })
  },
  addressIiftingText: function (e) {
    var objj = e.detail.value;
    this.setData({
      ['addressEdit.address_det']: objj
    })
  },
  addressCancel: function () {
    this.setData({
      addressTextlput: true
    })
  },
  addressDetermine: function () {
    var thad = this;
    var indess = thad.data.addressEdit.liftingIndess;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/editAddress',
      data: {
        "header_id": app.globalData.owner.header_id,
        "id": thad.data.addressEdit.id,
        "name": thad.data.addressEdit.name,
        "address": thad.data.addressEdit.address,
        "address_det": thad.data.addressEdit.address_det
      },
      success: function (res) {
        var aaa = 'addressText[' + indess + '].name';
        var bbb = 'addressText[' + indess + '].address';
        var ccc = 'addressText[' + indess + '].address_det';
        var eee = 'addressText[' + indess + '].id';
        thad.setData({
          addressTextlput: true,
          [aaa]: res.data.data.name,
          [bbb]: res.data.data.address,
          [ccc]: res.data.data.address_det,
          [eee]: res.data.data.id
        })
      }
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
      temporary1: '',
      temporary2: '',
      temporary3: ''
    });
  },
  //确认  
  confirm: function () {
    var thad = this;
    if (thad.data.temporary1 == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    } else if (thad.data.temporary2 == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    } else if (thad.data.temporary3 == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    } else {
      var obj = new Object();
      var temporary1 = thad.data.temporary1;
      var temporary2 = thad.data.temporary2;
      var temporary3 = thad.data.temporary3;
      obj.name = temporary1;
      obj.address = temporary2;
      obj.address_det = temporary3;
      obj.checked = true;
      thad.setData({
        temporary1: '',
        temporary2: '',
        temporary3: ''
      });
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Header/addAddress',
        data: {
          "header_id": app.globalData.owner.header_id,
          "name": obj.name,
          "address": obj.address,
          "address_det": obj.address_det
        },
        success: function (res) {
          var objj = res.data.data;
          thad.data.addressText.push(objj);
          thad.setData({
            hiddenmodalput: true,
            addressText: thad.data.addressText
          })
        }
      })
    }
  },
  titleInput: function (e) {
    this.setData({
      mainTitle: e.detail.value
    })
  },
  radioChange: function (e) {
    if (e.detail.value == 2) {
      this.setData({
        addressSwitch: false,
        modeDistribution: 2
      })
    } else if (e.detail.value == 1) {
      this.setData({
        addressSwitch: true,
        modeDistribution: 1
      })
    }
  },
  bindShopName: function (e) {
    var indexs = e.currentTarget.dataset.hi;
    var up = 'product_list[' + indexs + '].product_name';
    this.setData({
      [up]: e.detail.value
    })
  },
  bindshopGroup: function (e) {
    if (isNaN(e.detail.value)) {
      wx.showToast({
        title: '格式输入错误请重新输入',
        icon: 'none',
        duration: 2000
      })
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].group_limit';
      this.setData({
        [up]: 1
      })
    } else {
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].group_limit';
      this.setData({
        [up]: e.detail.value
      })
    }
  },
  bindshopGroupMember: function (e) {
    if (isNaN(e.detail.value)) {
      wx.showToast({
        title: '格式输入错误请重新输入',
        icon: 'none',
        duration: 2000
      })
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].self_limit';
      this.setData({
        [up]: 1
      })
    } else {
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].self_limit';
      this.setData({
        [up]: e.detail.value
      })
    }
  },
  bindshopMarket: function (e) {
    if (isNaN(e.detail.value)) {
      wx.showToast({
        title: '格式输入错误请重新输入',
        icon: 'none',
        duration: 2000
      })
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].market_price';
      this.setData({
        [up]: 1
      })
    } else {
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].market_price';
      this.setData({
        [up]: e.detail.value
      })
    }
  },
  bindshopGroupMarket: function (e) {
    if (isNaN(e.detail.value)) {
      wx.showToast({
        title: '格式输入错误请重新输入',
        icon: 'none',
        duration: 2000
      })
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].group_price';
      this.setData({
        [up]: 1
      })
    } else {
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].group_price';
      this.setData({
        [up]: e.detail.value
      })
    }
  },
  bindshoppurchase: function (e) {
    if (isNaN(e.detail.value)) {
      wx.showToast({
        title: '格式输入错误请重新输入',
        icon: 'none',
        duration: 2000
      })
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].purchase_price';
      this.setData({
        [up]: 1
      })
    } else {
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].purchase_price';
      this.setData({
        [up]: e.detail.value
      })
    }
  },
  bindshopDescribe: function (e) {
    var indexs = e.currentTarget.dataset.hi;
    var up = 'product_list[' + indexs + '].product_desc';
    this.setData({
      [up]: e.detail.value
    })
  },
  bindshopCommission: function (e) {
    if (isNaN(e.detail.value)) {
      wx.showToast({
        title: '格式输入错误请重新输入',
        icon: 'none',
        duration: 2000
      })
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].commission';
      this.setData({
        [up]: 1
      })
    } else if (e.detail.value > 100) {
      wx.showToast({
        title: '佣金比例不能超过100',
        icon: 'none',
        duration: 2000
      })
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].commission';
      this.setData({
        [up]: 1
      })
    } else {
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].commission';
      this.setData({
        [up]: e.detail.value
      })
    }
  },
  bindshopStock: function (e) {
    if (isNaN(e.detail.value)) {
      wx.showToast({
        title: '格式输入错误请重新输入',
        icon: 'none',
        duration: 2000
      })
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].remain';
      this.setData({
        [up]: 1
      })
    } else {
      var indexs = e.currentTarget.dataset.hi;
      var up = 'product_list[' + indexs + '].remain';
      this.setData({
        [up]: e.detail.value
      })
    }
  },
  Preservation: function (event) {
    var indexNum = Number(event.currentTarget.dataset.hi);
    this.setData({
      shopregiment: indexNum,
      close_time: this.data.modeDate + ' ' + this.data.modeTime,
      close_time2: this.data.myData + ' ' + this.data.myTime
    });
    var thad = this.data;
    var oObjj = this.Verification();
    if (oObjj == 1) {
      for (var i = 0; i < thad.product_list.length; i++) {
        if (thad.product_list[i].tag_name == '请选择商品标签') {
          thad.product_list[i].tag_name = ''
        }
      }
      var objj = new Object();
      objj = {
        "group_id": thad.group_id,
        "group_title": thad.mainTitle,
        "header_id": app.globalData.owner.header_id,
        "group_notice": thad.mainNotice,
        "dispatch_type": thad.modeDistribution,
        "dispatch_info": "",
        "is_close": thad.mainDetailNum,
        "close_time": thad.close_time,
        "status": thad.shopregiment,
        "product_list": thad.product_list
      }
    } else if (oObjj == 2) {
      for (var i = 0; i < thad.product_list.length; i++) {
        if (thad.product_list[i].tag_name == '请选择商品标签') {
          thad.product_list[i].tag_name = ''
        }
      }
      var addressTextArrs = thad.addressTextArr.join(',');
      var objj = new Object();
      objj = {
        "group_id": thad.group_id,
        "group_title": thad.mainTitle,
        "header_id": app.globalData.owner.header_id,
        "group_notice": thad.mainNotice,
        "dispatch_type": thad.modeDistribution,
        "dispatch_info": addressTextArrs,
        "is_close": thad.mainDetailNum,
        "close_time": thad.close_time,
        "status": thad.shopregiment,
        "product_list": thad.product_list
      }
    } else {
      wx.showToast({
        title: oObjj,
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/applyGroup',
      method: 'post',
      data: objj,
      success: function (res) {
        if (res.data.code == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '保存团购成功',
            icon: 'success'
          })
          wx.redirectTo({
            url: '../owner/owner',
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
  immediately: function (event) {
    var indexNum = Number(event.currentTarget.dataset.hi);
    this.setData({
      shopregiment: indexNum,
      close_time: this.data.modeDate + ' ' + this.data.modeTime,
      close_time2: this.data.myData + ' ' + this.data.myTime
    });
    var thad = this.data;
    var oObjj = this.Verification();
    if (oObjj == 1) {
      for (var i = 0; i < thad.product_list.length; i++) {
        if (thad.product_list[i].tag_name == '请选择商品标签') {
          thad.product_list[i].tag_name = ''
        }
      }
      var objj = new Object();
      objj = {
        "group_id": thad.group_id,
        "group_title": thad.mainTitle,
        "header_id": app.globalData.owner.header_id,
        "group_notice": thad.mainNotice,
        "dispatch_type": thad.modeDistribution,
        "dispatch_info": "",
        "is_close": thad.mainDetailNum,
        "close_time": thad.close_time,
        "status": thad.shopregiment,
        "product_list": thad.product_list
      }
    } else if (oObjj == 2) {
      for (var i = 0; i < thad.product_list.length; i++) {
        if (thad.product_list[i].tag_name == '请选择商品标签') {
          thad.product_list[i].tag_name = ''
        }
      }
      var addressTextArrs = thad.addressTextArr.join(',');
      var objj = new Object();
      objj = {
        "group_id": thad.group_id,
        "group_title": thad.mainTitle,
        "header_id": app.globalData.owner.header_id,
        "group_notice": thad.mainNotice,
        "dispatch_type": thad.modeDistribution,
        "dispatch_info": addressTextArrs,
        "is_close": thad.mainDetailNum,
        "close_time": thad.close_time,
        "status": thad.shopregiment,
        "product_list": thad.product_list
      }
    } else {
      wx.showToast({
        title: oObjj,
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/applyGroup',
      method: 'post',
      data: objj,
      success: function (res) {
        if (res.data.code == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '开启团购成功',
            icon: 'success'
          })
          wx.redirectTo({
            url: '../owner/owner',
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
  modifyShop: function (e) {
    var idnexs = e.currentTarget.dataset.hi;
    var up = 'product_list[' + idnexs + '].modifyShop';
    var sss = this.data.product_list[idnexs].modifyShop;
    this.setData({
      [up]: !sss
    })
  },
  deleteShop: function (e) {
    var idnexs = e.currentTarget.dataset.hi;
    this.data.product_list.splice(idnexs, 1);
    this.setData({
      product_list: this.data.product_list
    })
  },
  upperSort: function (e) {
    var idnexs = e.currentTarget.dataset.hi;
    var arr = this.data.product_list;
    var swapItems = function (arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    };
    arr = swapItems(arr, idnexs, idnexs - 1);
    var up = 'product_list[' + (idnexs - 1) + '].modifyShop';
    this.setData({
      product_list: arr,
      [up]: true
    })
  },
  lowerSort: function (e) {
    var idnexs = e.currentTarget.dataset.hi;
    var arr = this.data.product_list;
    var swapItems = function (arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    };
    arr = swapItems(arr, idnexs, idnexs + 1);
    var up = 'product_list[' + (idnexs + 1) + '].modifyShop';
    this.setData({
      product_list: arr,
      [up]: true
    })
  },
  checkboxChange: function (e) {
    var thad = this;
    var indexs = e.detail.value;
    thad.data.addressTextArr = [];
    for (var i = 0; i < thad.data.addressText.length; i++) {
      thad.data.addressTextArr.push(thad.data.addressText[i].id)
    }
    thad.setData({
      addressTextArr: thad.data.addressTextArr
    })
  },
  Verification: function () {
    var thad = this.data;
    var startTime = new Date(Date.parse(thad.close_time));
    var endTime = new Date(Date.parse(thad.close_time2));
    if (thad.mainTitle == '') {
      return '城主标题不能为空';
    }
    // if (thad.mainNotice == '') {
    //   return '城主公告不能为空';
    // }
    if (thad.modeDistribution == 2) {
      if (thad.addressTextArr.length == 0) {
        return '请选择自提点';
      } else if (thad.addressTextArr.length !== 0) {
        if (startTime <= endTime) {
          return '请选择自动截团时间';
        }
        for (var i = 0; i < thad.product_list.length; i++) {
          if (thad.product_list[i].product_name == '') {
            return '请输入商品名称';
          }
          // if (thad.product_list[i].remain == '') {
          //   return '请输入商品库存';
          // }
          if (thad.product_list[i].commission == '') {
            return '请输入佣金比例';
          }
          if (thad.product_list[i].purchase_price == '') {
            return '请输入商品进价';
          }
          if (thad.product_list[i].market_price == '') {
            return '请输入市场价';
          }
          if (thad.product_list[i].group_price == '') {
            return '请输入团购价';
          }
          // if (thad.product_list[i].group_limit == '') {
          //   return '请输入团限购数量';
          // }
          // if (thad.product_list[i].self_limit == '') {
          //   return '请输入团员限购';
          // }
          // if (thad.product_list[i].remain < 1) {
          //   return '商品库存不能小于1';
          // }
          if (Number(thad.product_list[i].commission) < 0) {
            return '佣金比例不能小于0';
          }
          if (thad.product_list[i].purchase_price < 0) {
            return '商品进价不能小于0';
          }
          if (thad.product_list[i].market_price < 0) {
            return '市场价不能小于0';
          }
          if (thad.product_list[i].group_price == 0) {
            return '团购价不能等于0';
          }
          if (thad.product_list[i].product_desc == '') {
            return '请输入商品描述';
          }
          if (thad.product_list[i].img_list.length == 0) {
            return '请上传图片';
          }
        }
        return '2';
      }
    }
    if (startTime <= endTime) {
      return '请选择自动截团时间';
    }
    for (var i = 0; i < thad.product_list.length; i++) {
      if (thad.product_list[i].product_name == '') {
        return '请输入商品名称';
      }
      // if (thad.product_list[i].remain == '') {
      //   return '请输入商品库存';
      // }
      if (thad.product_list[i].commission == '') {
        return '请输入佣金比例';
      }
      if (thad.product_list[i].purchase_price == '') {
        return '请输入商品进价';
      }
      if (thad.product_list[i].market_price == '') {
        return '请输入市场价';
      }
      if (thad.product_list[i].group_price == '') {
        return '请输入团购价';
      }
      // if (thad.product_list[i].group_limit == '') {
      //   return '请输入团限购数量';
      // }
      // if (thad.product_list[i].self_limit == '') {
      //   return '请输入团员限购';
      // }
      // if (thad.product_list[i].remain < 1) {
      //   return '商品库存不能小于1';
      // }
      if (Number(thad.product_list[i].commission) < 0) {
        return '佣金比例不能小于0';
      }
      if (thad.product_list[i].purchase_price < 0) {
        return '商品进价不能小于0';
      }
      if (thad.product_list[i].market_price < 0) {
        return '市场价不能小于0';
      }
      if (thad.product_list[i].group_price == 0) {
        return '团购价不能等于0';
      }
      if (thad.product_list[i].product_desc == '') {
        return '请输入商品描述';
      }
      if (thad.product_list[i].img_list.length == 0) {
        return '请上传图片';
      }
    }
    return 1;
  },
  selset: function (e) {
    var thad = this;
    wx.showActionSheet({
      itemList: thad.data.selsetData,
      success: res => {
        if (res.tapIndex == 0) {
          var indexs = e.currentTarget.dataset.hi;
          var up = 'product_list[' + indexs + '].tag_name';
          thad.setData({
            [up]: thad.data.selsetData[res.tapIndex]
          })
        } else {
          var indexs = e.currentTarget.dataset.hi;
          var up = 'product_list[' + indexs + '].tag_name';
          thad.setData({
            [up]: thad.data.selsetData[res.tapIndex]
          })
        }
      }
    })
  },
})