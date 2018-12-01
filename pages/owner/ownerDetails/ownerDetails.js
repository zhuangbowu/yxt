var app = getApp();
// pages/ownerDetails/ownerDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ownerNmae: '',
    ownerImage: '',
    shop: new Object(),
    contents:'http://group.com/wapp/Pub/getGroupData/group_id/129',
    group_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var group_id=options.id;
    this.setData({
      group_id: options.id,
      contents: app.globalData.networkAddress + '/wapp/Temp/getGroupData/group_id/' + group_id
    })
    var header_id = app.globalData.owner.header_id;
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress +'/wapp/Header/getGroupDetail',
      data:{
        "header_id": header_id,
        "group_id": group_id
      },
      success:res=>{
        if(res.data.code==1){
          thad.setData({
            shop: res.data.data,
            ownerNmae: app.globalData.owner.nick_name,
            ownerImage: app.globalData.owner.head_image
          })
          console.log(thad.data.shop);
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
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
    var group_id = this.data.group_id;
    return {
      title: '优鲜团',
      path: '/pages/group/groupEdit/groupEdit?group_id=' + group_id
    }
  },
  wxEject:function(e){
    let thas=this;
    wx.showModal({
      title: '下载数据',
      content: this.data.contents,
      success:function(res){
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
  navDetails: function (e) {
    var shop_id = this.data.shop.id;
    var group_id = e.currentTarget.dataset.hi;
    wx.navigateTo({
      url: '../compage/compage?shop_id=' + shop_id + '&group_id=' + group_id
    })
  },
  navEdit:function(){
    var shop_id = this.data.shop.id;
    wx.navigateTo({
      url: '../ownerIncreaseEdit/ownerIncreaseEdit?id=' + shop_id,
    })
  },
  navEdit2:function(){
    var shop_id = this.data.shop.id;
    wx.navigateTo({
      url: '../ownerIncreaseEditTwo/ownerIncreaseEditTwo?id=' + shop_id,
    })
  },
  dataDeta:function(){
    var header_id = app.globalData.owner.header_id;
    var thad = this;
    wx.showModal({
      title: '结束团购',
      content: '是否结束团购',
      success:res=>{
        if(res.confirm){
          wx.request({
            url: app.globalData.networkAddress + '/wapp/Header/closeGroup',
            data: {
              "header_id": header_id,
              "group_id": thad.data.group_id
            },
            success: res => {
              if (res.data.code == 1) {
                wx.redirectTo({
                  url: '../owner/owner'
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
  dataOpen:function(){
    var header_id = app.globalData.owner.header_id;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/startGroup',
      data: {
        "header_id": header_id,
        "group_id": thad.data.group_id
      },
      success: res => {
        if (res.data.code == 1) {
          wx.redirectTo({
            url: '../owner/owner'
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
})