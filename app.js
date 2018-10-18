//app.js
App({
  onLaunch: function () {
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
  onShow: function (options) {
    var options = options;
    var thad = this;
    setTimeout(function(){
      if (options.path == 'pages/members/membersDetails/membersDetails') {
        console.log(options);
        if (options.scene == 1044) {
          wx.getShareInfo({
            shareTicket: options.shareTicket,
            success(res) {
              wx.request({
                url: thad.globalData.networkAddress + '/wapp/Pub/getOpenGid',
                method: 'post',
                data: {
                  'open_id': thad.globalData.openId,
                  'vi': res.iv,
                  'encry_data': res.encryptedData,
                  'group_id': options.query.id,
                  'src_id': 0,
                },
                success: res => {
                  console.log(res);
                }
              })
            }
          })
        }
        if (options.scene == 1007) {
          wx.request({
            url: thad.globalData.networkAddress + '/wapp/Pub/getOpenGid',
            method: 'post',
            data: {
              'open_id': thad.globalData.openId,
              'vi': '',
              'encry_data': '',
              'group_id': options.query.id,
              'src_id': 1,
            },
            success: res => {
              console.log(res);
            }
          })
          console.log('好友分享进入1');
        }
        if (options.scene == 1011 || options.scene == 1012 || options.scene == 1013) {
          wx.request({
            url: thad.globalData.networkAddress + '/wapp/Pub/getOpenGid',
            method: 'post',
            data: {
              'open_id': thad.globalData.openId,
              'vi': '',
              'encry_data': '',
              'group_id': options.query.id,
              'src_id': 2,
            },
            success: res => {
              console.log(res);
            }
          })
          console.log('扫描二维码2');
        }
      }
    },1000)
  },
  globalData: {
    appCode: null,
    networkAddress: 'http://192.168.3.64',
    openId: null,
    information: new Object(),
    owner: new Object(),
    names:'',
  }
})