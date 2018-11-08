import util from './util.js'


//设置打印字符大小
var GS_exclamationmark_n = new Uint8Array([29, 33, 0]);
//设置取消打印字体是否加粗,n 最低位有效,等于 0 时取消字体加粗,非 0 时设置字体加粗
var GS_E_n = new Uint8Array([27, 69, 0]);
//设置输出对齐方式 缺省：左对齐 左对齐：n=0,48  居中对齐：n=1,49 右对齐 ：n=2,50
var ESC_a_n = new Uint8Array([27, 97, 0]);
//设置行间距为 n 点行
var ESC_3_n = new Uint8Array([27, 51, 0]);
//打印并换行
var LF = new Uint8Array([10]);
var LFsf = new Uint8Array([27, 83]);
// 设置打印区域
var ESC_quyu = new Uint8Array([29, 87, 0, 0]);


// 连接蓝牙设备
const connectBluetooth = (deviceid, fun) => {
  console.log("连接设备：" + deviceid);
  wx.createBLEConnection({
    deviceId: deviceid,
    success: function(res) {
      console.log("连接设备成功，获取deviceId");
      console.log(res);
      fun(res);
      return;
    },
    fail: function(res) {
      console.log("连接设备失败")
      wx.hideLoading();
      console.log(res)
      var str = "连接失败:蓝牙未打开";
      if (res.errCode == 10006) {
        str = "连接失败:当前连接已断开";
      }
      wx.showModal({
        title: '提示',
        content: '连接失败',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
  })
};
//获取蓝牙设备service信息
const getAllservice = (deviceId, fun) => {
  var that = this
  wx.getBLEDeviceServices({
    // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
    deviceId: deviceId,
    success: function(res) {
      console.log('serviceId获取成功：')
      console.log('device services:', res.services)
      console.log(res);
      let num = res.services.length - 1;
      getCharacteristic(deviceId, res.services, num, fun)
    }
  })
};

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


const printTemplate = (deviceId, serviceId, characteristicId, arrData) => {
  function Hex2Arry(str) {
    var sa = str.split("%");
    var b = new Uint8Array(sa.length - 1);
    for (var i = 1; i < sa.length; i++) {
      b[i - 1] = parseInt(sa[i], 16);
    }
    return b;
  }

  function Arry2Arry(arry1, arry2) {
    var b = new Uint8Array(arry1.length + arry2.length);
    b.set(arry1, 0);
    b.set(arry2, arry1.length);
    return b
  }

  function AddLongBuffer(writeBf) {
    var maxlen = 500;
    var count = Math.ceil(writeBf.length / maxlen);
    console.log("count222222", count);
    for (var i = 0; i < count; i++) {
      var _lenStart = i * maxlen;
      var _lenEnd = _lenStart + maxlen;
      if (_lenStart >= writeBf.length) {
        break;
      }
      if (_lenEnd > writeBf.length) {
        _lenEnd = writeBf.length;
      }
      var tempBf = writeBf.slice(i * maxlen, _lenEnd);
      console.log("tempBf", tempBf);
      //QueueWrite.push(tempBf);
      return tempBf
    }
  }
  //字体加粗
  GS_E_n[2] = 0;
  var $npECOS26 = GS_E_n.slice(0);
  for (var i = 0; i < arrData.length; i++) {
    paintingTitles('第' + arrData[i].num+'单');
    painting('商品名称        ', '        商品数量');
    for (var j = 0; j < arrData[i].product_list.length; j++) {
      var widthLength = arrData[i].product_list[j].product_name;
      console.log(2222222);
      console.log(widthLength.length);
      if (widthLength.length>18){
        var objsss = '';
        objsss = widthLength.substring(0, 18);
      }else{
        var objsss = '';
        objsss = widthLength;
      }
      painting(objsss, ' *'+arrData[i].product_list[j].num);
    }
    paintingNum(arrData[i].order_money);
    paintingNums('收货人  :' + arrData[i].user_name)
    paintingNums('联系方式:' + arrData[i].user_telephone)
    paintingNums('收货地址:' + arrData[i].pick_address)
    for (var h = 0; h < 2; h++) {
      painting(' ', ' ');
    }
  }

  function paintingTitles(data1) {
    // //字号变大
    GS_exclamationmark_n[2] = 18;
    var bigs = GS_exclamationmark_n.slice(0);
    // //字体剧中
    ESC_a_n[2] = 0;
    var center = ESC_a_n.slice(0).slice(0);
    // 行间距
    ESC_3_n[2] = 180;
    var lineHeight = ESC_3_n.slice(0);
    var hexstr = util.encodeToGb2312(data1);
    var _tempbuf = util.Arry2Arry(Hex2Arry(hexstr), LF);
    var strt = AddLongBuffer(_tempbuf);
    $npECOS26 = Arry2Arry($npECOS26, bigs)
    $npECOS26 = Arry2Arry($npECOS26, lineHeight)
    $npECOS26 = Arry2Arry($npECOS26, center)
    $npECOS26 = Arry2Arry($npECOS26, strt)
  }

  function painting(data1, data2) {
    // //字号变大
    GS_exclamationmark_n[2] = 0;
    var big = GS_exclamationmark_n.slice(0);
    // //字体剧中
    ESC_a_n[2] = 0;
    var left = ESC_a_n.slice(0).slice(0);
    // 行间距
    ESC_3_n[2] = 80;
    var lineHeight = ESC_3_n.slice(0);
    var hexstr = util.encodeToGb2312(data1 + data2);
    var _tempbuf = util.Arry2Arry(Hex2Arry(hexstr), LF);
    var strt = AddLongBuffer(_tempbuf);
    $npECOS26 = Arry2Arry($npECOS26, big)
    $npECOS26 = Arry2Arry($npECOS26, lineHeight)
    $npECOS26 = Arry2Arry($npECOS26, left)
    $npECOS26 = Arry2Arry($npECOS26, strt)
  };
  function paintingNum(data1) {
    // //字号变大
    GS_exclamationmark_n[2] = 0;
    var big = GS_exclamationmark_n.slice(0);
    // //字体剧中
    ESC_a_n[2] = 0;
    var left = ESC_a_n.slice(0).slice(0);
    // 行间距
    ESC_3_n[2] = 80;
    var lineHeight = ESC_3_n.slice(0);
    var hexstr = util.encodeToGb2312('商品总价:' + data1);
    var _tempbuf = util.Arry2Arry(Hex2Arry(hexstr), LF);
    var strt = AddLongBuffer(_tempbuf);
    $npECOS26 = Arry2Arry($npECOS26, big)
    $npECOS26 = Arry2Arry($npECOS26, lineHeight)
    $npECOS26 = Arry2Arry($npECOS26, left)
    $npECOS26 = Arry2Arry($npECOS26, strt)
  };
  function paintingNums(data1) {
    // //字号变大
    GS_exclamationmark_n[2] = 0;
    var big = GS_exclamationmark_n.slice(0);
    // //字体剧中
    ESC_a_n[2] = 0;
    var left = ESC_a_n.slice(0).slice(0);
    // 行间距
    ESC_3_n[2] = 80;
    var lineHeight = ESC_3_n.slice(0);
    var hexstr = util.encodeToGb2312(data1);
    var _tempbuf = util.Arry2Arry(Hex2Arry(hexstr), LF);
    var strt = AddLongBuffer(_tempbuf);
    $npECOS26 = Arry2Arry($npECOS26, big)
    $npECOS26 = Arry2Arry($npECOS26, lineHeight)
    $npECOS26 = Arry2Arry($npECOS26, left)
    $npECOS26 = Arry2Arry($npECOS26, strt)
  };

  console.log($npECOS26);
  var s = $npECOS26["\x62\x75\x66\x66\x65\x72"];
  console.log(s);

  // 这里的回调可以获取到 write 导致的特征值改变
  wx.onBLECharacteristicValueChange(function(characteristic) {
    console.log('characteristic value changed:1', characteristic)
  })


  for (var i = 0; i < $npECOS26.length; i += 20) {
    var endLength = 0
    if (i + 20 < $npECOS26.length) {
      var senddata = $npECOS26
      let buffer = new ArrayBuffer(20)
      let dataView = new DataView(buffer)
      let dataSend = []
      for (var j = i; j < i + 20; j++) {
        dataView.setUint8(j - i, senddata[j])
        dataSend.push(dataView.getUint8(j - i))
      }
      console.log('多包发送的包数据:' + dataSend)
      wx.writeBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        value: buffer,
        success: function(res) {
          console.log('多包writeBLECharacteristicValue success', res.errMsg)
        },
        fail: function(res) {
          console.log('发送失败')
        }
      })
      // sleep(0.02)
    } else { //console.log(app.globalData.writeServicweId+'-----------')
      var senddata = $npECOS26
      if (20 < $npECOS26.length) {
        endLength = senddata.length - i
      } else {
        endLength = senddata.length
      }
      let buffer = new ArrayBuffer(endLength)
      let dataView = new DataView(buffer)
      let dataSend = []
      for (var j = i; j < senddata.length; j++) {
        dataView.setUint8(j - i, senddata[j])
        dataSend.push(dataView.getUint8(j - i))
      }
      console.log('最后一包或第一数据:' + dataSend)
      wx.writeBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        value: buffer,
        success: function(res) {
          console.log('一包writeBLECharacteristicValue success', res.errMsg)
        },
        fail: function(res) {
          console.log('发送失败')
        }
      })
      // sleep(0.02)
    }
  }
  // wx.writeBLECharacteristicValue({
  //   deviceId: deviceId,
  //   serviceId: serviceId,
  //   characteristicId: characteristicId,
  //   value: s,
  //   success: function(res) {
  //     console.log(res)
  //     console.log('writeBLECharacteristicValue success', res.errMsg);
  //   },
  //   fail: function(e) {
  //     wx.showToast({
  //       title: '打印失败，请重新连接蓝牙',
  //       icon: 'none'
  //     })
  //   }
  // })

}

function string2buffer(str) {
  // 首先将字符串转为16进制
  let val = ""
  for (let i = 0; i < str.length; i++) {
    if (val === '') {
      val = str.charCodeAt(i).toString(16)
    } else {
      val += ',' + str.charCodeAt(i).toString(16)
    }
  }
  // 将16进制转化为ArrayBuffer
  return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function(h) {
    return parseInt(h, 16)
  })).buffer
}



module.exports = {
  connectBluetooth: connectBluetooth,
  getAllservice: getAllservice,
  printTemplate: printTemplate
}