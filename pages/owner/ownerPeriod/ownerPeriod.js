var app=getApp();
// pages/owner/ownerPeriod/ownerPeriod.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: true,
    creat:new Object(),
    items: new Array(),
    page: 0,
    num: 5,
    pageLis: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thad=this;
    thad.setData({
      page: thad.data.page + 1
    })
    wx.request({
      url: app.globalData.networkAddress +'/wapp/Header/getStockProduct',
      data:{
        "header_id": app.globalData.owner.header_id,
        "page": 0,
        "page_num": 6
      },
      success:function(res){
        if(res.data.code==1){
          var nnmm = res.data.data.length;
          if (nnmm < 5) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            creat: res.data.data
          })
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].shopSelect = true;
            res.data.data[i].disabled = false;
            var aaa = 'creat[' + i + ']';
            for (var j = 0; j < res.data.data[i].record_list.length; j++) {
              res.data.data[i].record_list[j].disabled = false;
            }
            thad.setData({
              creat: res.data.data
            })
          }
        }else{
          wx.showToast({
            title:res.data.msg,
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
    var thad = this;
    thad.setData({
      page: thad.data.page + 1
    })
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Header/getStockProduct',
      data: {
        "header_id": app.globalData.owner.header_id,
        "page": thad.data.page,
        "page_num": 5
      },
      success: function (res) {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 5) {
            thad.setData({
              pageLis: 1
            })
          }
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].shopSelect = true;
            res.data.data[i].disabled = false;
            for (var j = 0; j < res.data.data[i].record_list.length; j++) {
              res.data.data[i].record_list[j].disabled = false;
            }
          }
          var aaa = thad.data.creat.concat(res.data.data);
          thad.setData({
            creat: aaa
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 事件 修改搜索栏
  seachCondTrue: function () {
    this.setData({
      condition: false
    });
  },
  seachCondFalse: function () {
    this.setData({
      condition: true
    });
  },
  checkboxChange: function (e) {
    var aaa=[];
    aaa = e.detail.value.split(',');
    this.data.creat[aaa[0]].disabled=true;
    for (var i = 0; i < this.data.creat[aaa[0]].record_list.length; i++) {
      this.data.creat[aaa[0]].record_list[i].disabled=true;
    }
    this.setData({
      creat: this.data.creat
    })
    if(aaa.length==1){
      this.data.items.push(this.data.creat[aaa[0]]);
      this.setData({  
        items: this.data.items
      })
    } else if (aaa.length == 2) {
      this.data.items.push(this.data.creat[aaa[0]].record_list[aaa[1]]);
      this.setData({
        items: this.data.items
      })
    }
  },
  periodListList:function(e){
    var indexs=e.currentTarget.dataset.hi;
    var dataIndex = 'creat[' + indexs +'].shopSelect';
    var dataIndexs = this.data.creat[indexs].shopSelect;
    this.setData({
      [dataIndex]: !dataIndexs
    })
  },
  navBtnsetStorage: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 1]  //当前界面
    var prevPage = pages[pages.length - 2]  //上一个页面
    var that = this
    prevPage.setData({
      objects: that.data.items
    });
    wx.navigateBack({
      delta:1
    });
  },
  navgengduo:function(){
    // var thad = this;
    // thad.setData({
    //   page: thad.data.page + 1
    // })
    // wx.request({
    //   url: app.globalData.networkAddress + '/wapp/Header/getStockProduct',
    //   data: {
    //     "header_id": app.globalData.owner.header_id,
    //     "page": thad.data.page,
    //     "page_num": 5
    //   },
    //   success: function (res) {
    //     if (res.data.code == 1) {
    //       var nnmm = res.data.data.length;
    //       if (nnmm < 5) {
    //         thad.setData({
    //           pageLis: 1
    //         })
    //       }
    //       thad.setData({
    //         creat: res.data.data
    //       })
    //       for (var i = 0; i < thad.data.creat.length; i++) {
    //         thad.data.creat[i].shopSelect = true;
    //         var objj = 'creat[' + i + '].shopSelect'
    //         thad.setData({
    //           [objj]: thad.data.creat[i].shopSelect
    //         })
    //       }
    //     } else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })
  }
})