var app = getApp();
import Card from '../../../palette/card';
// pages/group/groupgenerate/groupgenerate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupId: 41,
    shopList: new Object(),
    sharesList: new Array(),
    template: {},
    indexs: 0,
    imgUrl: '',
    userImgUrl: '',
    userName: '',
    title:'',
    off:true
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
    wx.getImageInfo({
      src: app.globalData.information.avatar,
      success: function(res) {
        thad.setData({
          userImgUrl: res.path,
          userName: app.globalData.information.user_name,
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '用户头像下载失败',
          icon: 'none'
        })
      }
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/User/getPickQrcode',
      method: "post",
      data: {
        "scene": thad.data.groupId,
        "page": 'pages/members/membersDetails/membersDetails'
      },
      success: res => {
        if (res.data.code == 1) {
          wx.getImageInfo({
            src: res.data.data.data,
            success: function(res) {
              thad.setData({
                imgUrl: res.path,
              })
            },
            fail: function (res) {
              wx.showToast({
                title: '生成失败，请重新进入',
                icon: 'none'
              })
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
            title: res.data.data.title
          })
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
    // this.setData({
    //   template: new Card().palette(),
    // });
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
  navquanxuan:function(){

  },
  checkboxChanges: function (e) {
    var thad = this;
    var off = e.detail.value[0];
    if (off){
      for (var i = 0; i < thad.data.shopList.product_list.length;i++){
        thad.data.shopList.product_list[i].checked=true;
      }
      thad.setData({
        ['shopList.product_list']:thad.data.shopList.product_list,
        sharesList:thad.data.shopList.product_list
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
    if (this.data.sharesList.length==0){
      wx.showToast({
        title: '请选择生成海报的商品',
      })
      return
    }
    wx.showLoading({
      mask: true,
      title: '海报生成中',
    });
    var thad = this;
    var index = thad.data.indexs;
    var maxindex = thad.data.sharesList.length-1;
    var aaa = thad.data.sharesList[index];
    if (index <= maxindex) {
      wx.getImageInfo({
        src: thad.data.sharesList[index].product_img[0].urlImg,
        success: function (res) {
          thad.setData({
            template: new Card().palette(thad.data.userName, res.path, thad.data.imgUrl, thad.data.userImgUrl, aaa, thad.data.title),
          });
          thad.data.indexs= thad.data.indexs + 1;
          setTimeout(function(){
            thad.navShares();
          },500);
        },
        fail: function (res) {
          wx.showToast({
            title: '商品图片下载失败',
            icon: 'none'
          })
        }
      })
    } else {
      thad.data.indexs = 0
    }
  },
  onImgOK:function(e) {
    this.imagePath = e.detail.path;
    wx.saveImageToPhotosAlbum({
      filePath: this.imagePath,
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功',
        })
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
    });
  },
  onImgErr(e){
    console.log(e);
  }
})