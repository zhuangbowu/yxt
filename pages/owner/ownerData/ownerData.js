var app=getApp();
// pages/owner/ownerData/ownerData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopData:new Array(),
    id:'',
    dataArray:'',
    items: [
      { name: '0', value: '全选' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var thad=this;
    thad.setData({
      id: id
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getGroupUser',
      method: 'post',
      data: {
        "header_id": app.globalData.owner.header_id,
        "group_id": id
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopData: res.data.data
          })
          for(var i=0;i<thad.data.shopData.length;i++){
            var aaa = 'shopData['+i+'].checked'
            thad.setData({
              [aaa]:false
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
  
  },
  checkboxChange: function (e) {
    if (e.detail.value.length>0){
      var thad = this;
      var indexArr = e.detail.value;
      var arr = [];
      for (var i = 0; i < thad.data.shopData.length; i++) {
        arr.push(thad.data.shopData[indexArr[i]].leader_id);
      }
      arr = arr.join(',');
      thad.setData({
        dataArray: arr
      })
    }
  },
  wholeGrant:function(){
    var thad = this;
    if (thad.data.dataArray== '') {
      wx.showToast({
        title: '请选择用户',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.showModal({
        title: '确定发放佣金',
        content: '是否确定发放佣金',
        success:function(res){
          if (res.confirm){
            wx.request({
              url: app.globalData.networkAddress + '/wapp/Header/deliveryCommission',
              method: 'post',
              data: {
                "header_id": app.globalData.owner.header_id,
                'leader_ids': thad.data.dataArray,
                "group_id": thad.data.id
              },
              success: res => {
                if (res.data.code == 1) {
                  wx.redirectTo({
                    url: '../ownerList/ownerList',
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
          if (res.cancel){
            wx.showToast({
              title: '取消发放',
              icon:'none',
              duration:2000
            })
          }
        }
      })
    }
  },
  checkboxChange2: function (e) {
    if (e.detail.value.length==1){
      var arr = [];
      for(var i=0;i<this.data.shopData.length;i++){
        var aaa = 'shopData[' + i + '].checked'
        arr.push(this.data.shopData[i].leader_id);
        this.setData({
          [aaa]: true
        })
      }
      arr = arr.join(',');
      this.setData({
        dataArray: arr
      })
    }else{
      for (var i = 0; i < this.data.shopData.length; i++) {
        var aaa = 'shopData[' + i + '].checked'
        this.setData({
          [aaa]: false
        })
      }
      this.setData({
        dataArray: ''
      })
    }
  }
})