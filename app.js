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
        // console.log(options);
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
              // console.log(res);
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
    },1000);
    //检查是否存在新版本
    wx.getUpdateManager().onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("是否有新版本：" + res.hasUpdate);
      if (res.hasUpdate) {//如果有新版本

        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateReady(function () {//当新版本下载完成，会进行回调
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，单击确定重启应用',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                wx.getUpdateManager().applyUpdate();
              }
            }
          })

        })

        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateFailed(function () {//当新版本下载失败，会进行回调
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请检查网络设置',
            showCancel: false,
          })
        })
      }
    });
  },
  globalData: {
    appCode: null,
    networkAddress: 'https://www.ybt9.com',
    openId: null,
    information: new Object(),
    owner: new Object(),
    names:'',
  }
})