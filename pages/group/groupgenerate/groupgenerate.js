var app = getApp();
// pages/group/groupgenerate/groupgenerate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: 41,
    shopList: new Object(),
    sharesList: new Array(),
    indexs: 0,
    imgUrl: '',
    userImgUrl: '',
    userName: '',
    off: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var groupId = options.groupId;
    var thad = this;
    thad.setData({
      groupId: groupId
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/groupDetail',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "group_id": groupId
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopList: res.data.data,
          })
          console.log(thad.data.shopList);
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
  navquanxuan: function() {

  },
  checkboxChanges: function(e) {
    var thad = this;
    var off = e.detail.value[0];
    if (off) {
      for (var i = 0; i < thad.data.shopList.product_list.length; i++) {
        thad.data.shopList.product_list[i].checked = true;
      }
      thad.setData({
        ['shopList.product_list']: thad.data.shopList.product_list,
        sharesList: thad.data.shopList.product_list
      });
    } else {
      for (var i = 0; i < thad.data.shopList.product_list.length; i++) {
        thad.data.shopList.product_list[i].checked = false;
      }
      thad.setData({
        ['shopList.product_list']: thad.data.shopList.product_list,
        sharesList: []
      });
    }
  },
  checkboxChange: function(e) {
    var thad = this;
    var aaa = e.detail.value;
    var sharesList = [];
    for (var i = 0; i < thad.data.shopList.product_list.length; i++) {
      for (var j = 0; j < aaa.length; j++) {
        if (aaa[j] == thad.data.shopList.product_list[i].id) {
          sharesList.push(thad.data.shopList.product_list[i]);
        }
      }
    }
    thad.setData({
      sharesList: sharesList
    });
  },
  navShares: function() {
    if (this.data.sharesList.length == 0) {
      wx.showToast({
        title: '请选择生成海报的商品',
      })
      return
    }
    var thad = this;
    var index = thad.data.indexs;
    var maxindex = thad.data.sharesList.length - 1;
    var aaa = thad.data.sharesList[index];
    if (index <= maxindex){
      wx.showLoading({
        mask: true,
        title: '生成第' + (index + 1) + '张海报',
      });
    }
    if (index <= maxindex) {
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Leader/drawImage',
        method: 'post',
        data: {
          "leader_id": app.globalData.information.id,
          "product_id": thad.data.sharesList[index].id,
          "group_id": thad.data.groupId
        },
        success: res => {
          console.log(res);
          thad.data.indexs = thad.data.indexs + 1;
          if (res.data.code == 1) {
            wx.hideLoading();
            console.log(2);
            wx.downloadFile({
              url: res.data.data.imgUrl,
              success: function(res) {
                console.log(res);
                if (res.statusCode === 200) {
                  wx.playVoice({
                    filePath: res.tempFilePath
                  })
                }
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function(data) {
                    console.log(data);
                    wx.showToast({
                      title: '保存成功',
                    })
                    thad.navShares();
                  },
                  fail:function(){
                    if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                      console.log("打开设置窗口");
                      wx.openSetting({
                        success(settingdata) {
                          console.log(settingdata)
                          if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                            console.log("获取权限成功，再次点击图片保存到相册")
                          } else {
                            console.log("获取权限失败")
                          }
                        }
                      })
                      thad.navShares();
                    }else{
                      wx.showToast({
                        title: '保存失败',
                      })
                      thad.navShares();
                    }
                  }
                })
              },
              fail:function(error){
                console.log(error);
              }
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            thad.navShares();
          }
        }
      })
    } else {
      wx.hideLoading();
      thad.data.indexs = 0;
    }
  }
})