var app=getApp();
// pages/groupDetails/groupDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_id:'',
    userNmae: '',
    userImage: '',
    contents: 'file:///D:/zbw/2018-8-27/p1D6701192A1534724919345-1535426211/index.html#screen=sE3EDE298971534988187802',
    shopListL:new Object()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      group_id: options.id
    })
    var leader_id = app.globalData.information.id;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/groupDetail',
      data: {
        "leader_id": leader_id,
        "group_id": thad.data.group_id
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopListL: res.data.data,
            userNmae: app.globalData.information.user_name,
            userImage: app.globalData.information.avatar
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
  onReady: function () {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
    var shop_id = this.data.shopListL.group_id;
    return {
      title: '分享优鲜团',
      path: 'pages/members/membersDetails/membersDetails?id=' + shop_id
    }
  },
  navDetails: function (e) {
    var shop_id = this.data.shopListL.group_id;
    var group_id = e.currentTarget.dataset.hi;
    wx.navigateTo({
      url: '../compage/compage?shop_id=' + shop_id + '&group_id=' + group_id
    })
  },
  navEdit: function () {
    var shop_id = this.data.shopListL.group_id;
    wx.navigateTo({
      url: '../groupEdits/groupEdits?id=' + shop_id
    })
  },
  navShow:function(){
    wx.showActionSheet({
      itemList: ['查看订单','代下单'],
      success:res=>{
        if(res.tapIndex==0){
          var thad = this;
          wx.redirectTo({
            url: '../membersSeeOne/membersSeeOne?id=' + thad.data.group_id,
          })
        }
        if(res.tapIndex==1){
          var thad=this;
          wx.redirectTo({
            url: '../../members/membersDetails/membersDetails?id='+thad.data.group_id,
          })
        }
      }
    })
  },
  openGroup: function () {
    var leader_id = app.globalData.information.id;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/startGroup',
      data: {
        "leader_id": leader_id,
        "group_id": thad.data.group_id
      },
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
  noGroup: function () {
    var leader_id = app.globalData.information.id;
    var thad = this;
    wx.showModal({
      title: '结束团购',
      content: '是否确认结束团购',
      success:res=>{
        if(res.confirm){
          wx.request({
            url: app.globalData.networkAddress + '/wapp/Leader/closeGroup',
            method: 'get',
            data: {
              "leader_id": leader_id,
              "group_id": thad.data.group_id
            },
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
        }
        if(res.cancel){
          wx.showToast({
            title: '已取消操作',
            icon:'none'
          })
        }
      }
    })

  },

  wxEject: function (e) {
    let thas = this;
    wx.showModal({
      title: '下载数据',
      content: this.data.contents,
      success: function (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: thas.data.contents,
            success: function (res) {
              wx.getClipboardData({
                success: function (res) {
                  wx.showToast({
                    title: '已复制到剪切板',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '未复制',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  navDingdan:function(){
    var thad = this;
    wx.redirectTo({
      url: '../membersSeeOne/membersSeeOne?id=' + thad.data.group_id,
    })
  }
})