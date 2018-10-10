var app=getApp();
// pages/owner/ownerForward/ownerForward.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wholeFprwar:false,
    wholeText:'啊啊啊啊',
    wholeMoney:0,
    inputMoney:'',
    wholetrue:false,
    token:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var num=options.forward;
    this.setData({
      wholeMoney: num
    });
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Pub/getToken',
      method: 'post',
      data: {
        "user_id": app.globalData.owner.header_id,
        "type": 1
      },
      success: res => {
        if (res.data.code == 1) {
          thad.setData({
            token: res.data.data
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
  userFprwar:function(e){
    var wholeMoney =e.detail.value;
    if(wholeMoney < 10 ) {
      var texts = '可提现金额最低额度为￥10.00'
      this.setData({
        inputMoney: wholeMoney,
        wholeText: texts,
        wholeFprwar: true
      })
    } else {
      var numMoney = (Number(wholeMoney) * 0.6)/100;
      var texts = '扣除￥' + numMoney.toFixed(2) +'手续费（费率0.6%）'
      this.setData({
        inputMoney: wholeMoney,
        wholeText: texts,
        wholeFprwar:true
      })
    }
  },
  formMoney: function () {
    var inputValue = Number(this.data.inputMoney);
    var wholeMoney = Number(this.data.wholeMoney);
    if (isNaN(inputValue)) {
      wx.showToast({
        title: '输入必须为数字',
        icon: 'none'
      })
    }else if (inputValue==''){
      wx.showToast({
        title: '不能为空',
        icon:'none'
      })
    } else if (inputValue > wholeMoney){
      wx.showToast({
        title: '提现金额大于剩余金额',
        icon: 'none'
      })
    } else if (inputValue < 10){
      wx.showToast({
        title: '提现金额小于10元',
        icon: 'none'
      })
    }else{
      var thad=this;
      thad.setData({
        wholetrue: true
      })
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Header/withDraw',
        method: 'post',
        data: {
          "header_id": app.globalData.owner.header_id,
          "money": inputValue,
          "token": thad.data.token
        },
        success: res => {
          console.log(res);
          if (res.data.code == 1) {
            wx.showToast({
              title: '提现成功',
            })
            wx.redirectTo({
              url: '../ownerUser/ownerUser',
            })
          } else if (res.data.code == 2) {
            wx.showModal({
              title: '绑定微信',
              content: '确认绑定微信号',
              success: res => {
                if (res.confirm) {
                  var developer = (wx.getStorageSync('openId') || []);
                  wx.request({
                    url: app.globalData.networkAddress + '/wapp/Header/setOpenId',
                    method: 'post',
                    data: {
                      "header_id": app.globalData.owner.header_id,
                      "open_id": developer
                    },
                    success: res => {
                      if (res.data.code == 1) {
                        thad.setData({
                          wholetrue: false
                        })
                        wx.showToast({
                          title: '绑定成功',
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
                  thad.setData({
                    wholetrue: false
                  })
                  wx.showToast({
                    title: '取消绑定微信号',
                    icon: 'none'
                  })
                }
              }
            })
          } else {
            thad.setData({
              wholetrue: false
            })
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }
  },
  fowarMoney:function(){
    this.setData({
      inputMoney: this.data.wholeMoney
    })
  }
})