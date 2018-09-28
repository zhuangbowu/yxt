var app=getApp();
// pages/group/groupRefund/groupRefund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts:'',
    Nums:'',
    shopPrice:15,
    shopNum:10,
    shopText: '请输入退款金额',
    shopData: new Object(),
    shopContrast:new Object()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var indexs=options.indexs;
    var order = options.order;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getUserOrderDet',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "order_no": order
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            shopData: res.data.data,
            shopContrast: res.data.data.product_list[indexs]
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
    
  },
  refundTexts:function(e){
    var texts=e.detail.value;
    this.setData({
      texts: texts
    })
  },
  refundNums: function (e){
    var thad=this;
    var texts = e.detail.value;
    var tt = /^\d+$/g;
    if (isNaN(texts)){
      thad.setData({
        shopText: '请输入数字'
      })
    } else if (!tt.test(texts) || texts==0){
      thad.setData({
        shopText: '请输入正整数字'
      })
    }else{
      thad.setData({
        Nums: texts
      })
    }
  },
  refundSubmission:function(){
    var thad=this;
    if (thad.data.Nums==''){
      wx.showToast({
        title: '请输入数量',
        icon:'none'
      });
    } else if (thad.data.Nums > thad.data.shopContrast.num){
      wx.showToast({
        title: '输入数量超出购买数量',
        icon: 'none'
      });
    }else{
      wx.showModal({
        title: '退款',
        content: '是否确定退款',
        success:function(res){
          if(res.confirm){
            wx.request({
              url: app.globalData.networkAddress + '/wapp/Leader/applyRefund',
              method: 'post',
              data: {
                "leader_id": app.globalData.information.id,
                "order_no": thad.data.shopData.order_no,
                "product_id": thad.data.shopContrast.product_id,
                "reason": thad.data.texts,
                "num": thad.data.Nums
              },
              success: res => {
                if (res.data.code == 1) {
                  wx.showToast({
                    title: '微信提交退款成功',
                  })
                  wx.redirectTo({
                    url: '../groupList/groupList',
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
          if (res.cancel) {
            wx.showToast({
              title: '操作取消',
              icon:'none'
            })
          }
        }
      })
    }
  }
})