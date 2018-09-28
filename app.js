//app.js
App({
  onLaunch: function() {
    var thad = this;
    wx.login({
      success: res => {
        thad.globalData.appCode = res.code
        wx.request({
          url: thad.globalData.networkAddress + '/wapp/Pub/getOpenId',
          data: {
            js_code: res.code,
          },
          success: function(res) {
            var openIdd = res.data.data.open_id;
            wx.setStorageSync('openId', openIdd);
            thad.globalData.openId = openIdd;
          }
        })
      }
    })
  },
  globalData: {
    appCode:null,
    networkAddress: 'https://www.ybt9.com',
    openId:null,
    information: new Object(),
    owner:new Object()
  }
})