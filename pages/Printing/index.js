// pages/blueToothlist/index.js
const {
  connectBluetooth,
  getAllservice,
  printTemplate
} = require('./blue.js');
var app = getApp();
var temp = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devices: [],
    loading: false,
    listData: new Array(),
    id: '',
    offs: true,
    arrData: '',
    deviceId: '',
    serviceId: '',
    characteristicId: '',
    eachs:'搜索打印机'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    var thad = this;
    wx.request({
      url: app.globalData.networkAddress + '/wapp/Leader/getGroupOrderNew',
      method: 'post',
      data: {
        "leader_id": app.globalData.information.id,
        "group_id": thad.data.id,
        "keywords": '',
        "page": 0,
        "page_num": 100
      },
      success: res => {
        if (res.data.code == 1) {
          var nnmm = res.data.data.length;
          if (nnmm < 20) {
            thad.setData({
              pageLis: 1
            })
          }
          thad.setData({
            listData: res.data.data
          })
          console.log(thad.data.listData);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  toConnectoff: function() {
    this.setData({
      offs: true,
      devices: []
    })
  },
  /**
   * 初始化 - - 搜索蓝牙
   */
  initBlueTooth: function() {
    var that = this;
    wx.openBluetoothAdapter({
      success: function(res) {
        console.log("-------初始化蓝牙成功----------");
        console.log(res)
        //errmsg:"功能已启用"

        wx.onBluetoothAdapterStateChange(function(res) {
          console.log("蓝牙适配器状态变化", res);
          if (!res.available) {
            that.setData({
              loading: false
            })
            wx.showModal({
              title: '提示',
              content: '连接失败：手机蓝牙未打开',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  that.setData({
                    offs: true,
                    devices: []
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          if (!res.discovering) {
            //选中某个蓝牙后关闭搜索
            //关闭搜索提示
            that.setData({
              loading: false
            })
          }
        })
        wx.startBluetoothDevicesDiscovery({
          success: function(res) {
            console.log("开始搜索附近蓝牙设备")
            console.log(res)
            that.setData({
              loading: true
            })
          }
        })

        wx.onBluetoothDeviceFound(function(devices) {
          console.log("-----发现新设备--------" + devices.devices[0].name)
          console.log(devices)
          if (devices.devices[0].name) {
            that.data.devices.push(devices)
            that.setData({
              devices: that.data.devices
            })
            console.log(that.data.devices);
          }
        })
      },
      fail: function(res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '连接失败：手机蓝牙未打开',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              that.setData({
                offs: true,
                devices: []
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },

  /**
   * 点击链接到蓝牙的时候停止搜索
   */
  stopsearch: function() {
    wx.stopBluetoothDevicesDiscovery({
      success: function(res) {
        console.log("停止蓝牙搜索")
        console.log(res)
      }
    })
  },
  // 点击打印
  toConnect: function(event) {
    var that = this;
    that.stopsearch();
    wx.showLoading({
      title: '连接打印机',
      mask: true
    })
    var deviceid = event.currentTarget.dataset.device;
    console.log(111);
    console.log(deviceid);
    connectBluetooth(deviceid, function(data) {
      console.log("回调成功");
      console.log(data);
      //获取设备service和特征值查看是否支持write,支持写入就返回  //deviceId    //serviceId     //characteristicId
      getAllservice(deviceid, function(data) {
        console.log("获取成功============");
        console.log(data);
        if (data) {
          that.setData({
            eachs:'打印',
            offs:true
          })
          that.data.deviceId = data.deviceId;
          that.data.serviceId = data.serviceId;
          that.data.characteristicId = data.characteristicId;
          // printTemplate(that.data.deviceId, that.data.serviceId, that.data.characteristicId, that.data.arrData);
        } else {
          wx.showModal({
            title: '提示',
            content: '目标设备可能不是打印机:请确认后重试',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                that.setData({
                  offs: true,
                  devices: []
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      });
      wx.hideLoading();
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId,
      success: function(res) {
        console.log('断开已连接设备');
      },
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  toSearch: function() {
    var that=this;
    if (that.data.characteristicId !== '') {
      if (this.data.arrData.length == 0) {
        wx.showToast({
          title: '打印内容不能为空',
        })
      } else {
        printTemplate(that.data.deviceId, that.data.serviceId, that.data.characteristicId, that.data.arrData);
        wx.hideLoading();
      }
    } else {
      this.setData({
        offs: false,
        devices: [],
      })
      this.initBlueTooth();
    }
  },
  checkboxChange: function(e) {
    var arrOrder = e.detail.value;
    var arrData = [];
    for (var i = 0; i < this.data.listData.length; i++) {
      this.data.listData[i].order_no == arrOrder
      for (var j = 0; j < arrOrder.length; j++) {
        if (this.data.listData[i].order_no == arrOrder[j]) {
          arrData.push(this.data.listData[i]);
        }
      }
    }
    this.data.arrData = arrData;
    console.log(this.data.arrData);
  },
})
//通过uuid获取特征值并返回支持写入的
const getCharacteristic = (deviceId, services, num, fun) => {
  if (num < 0) {
    fun(false)
  }
  wx.getBLEDeviceCharacteristics({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    deviceId: deviceId,
    // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
    serviceId: services[num].uuid,
    success: function(res) {
      console.log('device getBLEDeviceCharacteristics:', res.characteristics);
      for (var j = 0, leng = res.characteristics.length; j < leng; j++) {
        console.log(res.characteristics[j].properties.write);
        if (res.characteristics[j].properties.write) { //支持写入的特征值
          //deviceId    //serviceId     //characteristicId
          fun({
            deviceId: deviceId,
            serviceId: services[num].uuid,
            characteristicId: res.characteristics[j].uuid
          })
          return
        }
      }
      num -= 1;
      getCharacteristic(deviceId, services, num, fun);
    },
    fail: function() {
      num -= 1;
      getCharacteristic(deviceId, services, num, fun);
    }
  })

}