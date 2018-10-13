var app = getApp();
// pages/owner/ownerForward/ownerForward.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wholeFprwar: false,
    wholeText: '啊啊啊啊',
    wholeMoney: 0,
    inputMoney: '',
    wholetrue: false,
    token: '',
    addressTextlput: true,
    bankArr: new Array(),
    bankArrs: new Array(),
    index:0,
    names:'',
    card:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var num = options.forward;
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
  userFprwar: function (e) {
    var wholeMoney = e.detail.value;
    if (wholeMoney < 1000) {
      var texts = '可提现金额最低额度为￥1000'
      this.setData({
        inputMoney: wholeMoney,
        wholeText: texts,
        wholeFprwar: true
      })
    } else {
      var numMoney = (Number(wholeMoney) * 0.1) / 100;
      var texts = '扣除￥' + numMoney.toFixed(2) + '手续费（费率0.1%）'
      this.setData({
        inputMoney: wholeMoney,
        wholeText: texts,
        wholeFprwar: true
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
    } else if (inputValue == '') {
      wx.showToast({
        title: '不能为空',
        icon: 'none'
      })
    } else if (inputValue > wholeMoney) {
      wx.showToast({
        title: '提现金额大于剩余金额',
        icon: 'none'
      })
    } else if (inputValue < 1000) {
      wx.showToast({
        title: '提现金额小于1000元',
        icon: 'none'
      })
    } else {
      var thad = this;
      thad.setData({
        wholetrue: true
      })
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Header/withdrawBank',
        method: 'post',
        data: {
          "header_id": app.globalData.owner.header_id,
          "money": inputValue,
          "token": thad.data.token
        },
        success: res => {
          if (res.data.code == 1) {
            wx.showToast({
              title: '提现成功',
            })
            wx.redirectTo({
              url: '../ownerUser/ownerUser',
            })
          } else if (res.data.code == 2) {
            wx.request({
              url: app.globalData.networkAddress + '/wapp/Pub/getBankList',
              method: 'post',
              data: {

              },
              success: res => {
                if (res.data.code == 1) {
                  thad.setData({
                    bankArr: res.data.data
                  })
                  var bankArrs = [];
                  for (var i = 0; i < thad.data.bankArr.length; i++) {
                    bankArrs.push(thad.data.bankArr[i].name);
                  }
                  thad.setData({
                    bankArrs: bankArrs
                  })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  })
                }
              }
            })
            thad.setData({
              addressTextlput:false
            })
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        }
      })
    }
  },
  fowarMoney: function () {
    this.setData({
      inputMoney: this.data.wholeMoney
    })
  },
  addressTextlputt2:function(){
    this.setData({
      addressTextlput:false
    })
  },
  addressCancel: function () {
    this.setData({
      addressTextlput: false
    })
  },
  addressIifting2:function(){
    var thad=this;
    wx.showActionSheet({
      itemList: thad.data.bankArrs,
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  addressIifting: function (e) {
    this.setData({
      names: e.detail.value
    })
  },
  addressIiftings: function (e) {
    this.setData({
      card: e.detail.value
    })
  },
  addressDetermine: function () {
    var thad = this.data;
    var that = this;
    if(thad.names==''){
      wx.showToast({
        title: '请输入名字',
        icon:'none'
      })
    } else if (thad.card == '' || !thad.card.match(/^([1-9]{1})(\d{14}|\d{18})$/)){
      wx.showToast({
        title: '请输入银行卡号',
        icon:'none'
      })
    }else{
      var bank_code = thad.bankArr[thad.index].code;
      wx.request({
        url: app.globalData.networkAddress + '/wapp/Header/setBankInfo',
        method: 'post',
        data: {
          "header_id": app.globalData.owner.header_id,
          "true_name": thad.names,
          "bank_code": bank_code,
          "bank_no": thad.card
        },
        success: res => {
          console.log(res);
          if (res.data.code == 1) {
            wx.showToast({
              title: '绑定成功',
            })
            that.setData({
              addressTextlput: true,
              wholetrue: false
            })
            // wx.redirectTo({
            //   url: '../ownerUser/ownerUser',
            // })
          } else {
            that.setData({
              addressTextlput: true
            })
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })
    }
  }
})