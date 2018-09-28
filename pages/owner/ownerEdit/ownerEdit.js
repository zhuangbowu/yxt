var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    userName:new Object(),
    userHiddenName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var header_id = app.globalData.owner.header_id;
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getHeaderInfo',
      method: 'post',
      data: {
        "header_id": header_id
      },
      success: res => {
        thad.setData({
          userName: res.data.data
        })
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
  changImage:function(){
    var thad=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        wx.uploadFile({
          url: app.globalData.networkAddress + '/wapp/Pub/uploadImg', //仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            var data = JSON.parse(res.data);
            if(data.code==1){
              thad.setData({
                ['userName.head_image']: data.data.img_url
              });
              wx.request({
                url: app.globalData.networkAddress + '/wapp/Header/modifyAvatar',
                method: 'post',
                data: {
                  "header_id": app.globalData.owner.header_id,
                  "avatar_url": data.data.img_url
                },
                success: res => {
                  if (res.data.code == 1) {
                    wx.redirectTo({
                      url: '../ownerUser/ownerUser',
                    })
                  } else if (res.data.code == -1) {
                    wx.showToast({
                      title: '操作失败',
                      icon: 'none'
                    })
                  }
                }
              })
            }else{
              wx.showToast({
                title: '操作失败',
                icon: 'none'
              })
            }

          }
        })
        
      }
    })
  },
  wxEject: function () {
    this.setData({
      hiddenmodalput: false
    })
  },
  modalinput2: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  modalinput:function(){
    // this.setData({
    //   hiddenmodalput: true,
    //   userName: this.data.userHiddenName
    // })
    var thad=this;
    wx.request({
      url: app.globalData.networkAddress +'/wapp/Header/modifyNickName',
      method:'post',
      data:{
        "header_id": app.globalData.owner.header_id,
        "nick_name": thad.data.userHiddenName
      },
      success:res=>{
        if(res.data.code==1){
          wx.redirectTo({
            url: '../ownerUser/ownerUser',
          })
        }else{
          wx.showToast({
            title: '操作失败',
            icon: 'none'
          })
        }
      }
    })
  },
  hiddenName:function(e){
    var aaa=e.detail.value;
    this.data.userHiddenName=aaa;
  }
})