export default class LastMayday {
  palette(names, data1, data2, data3, data4, data5) {
    return ({
      width: '1080px',
      height: '1728px',
      background: '#fff',
      views: [
        {
          type: 'image',
          url: data1,
          css: {
            top: '0rpx',
            left: '0rpx',
            width: '1080px',
            height: '1080px', 
            mode: 'scaleToFill',
          },
        },
        {
          type: 'rect',
          css: {
            top: '80px',
            left: '170px',
            color: 'rgb(0,147,185)',
            borderRadius: '20px',
            width: '400px',
            height: '80px',
          },
        },
        {
          type: 'image',
          url: data3,
          css: {
            top: '40px',
            left: '40px',
            borderRadius: '90px',
            borderWidth: '10px',
            borderColor: 'rgb(0,147,185)',
            mode: 'scaleToFill',
            width: '160px',
            height: '160px',
          },
        },
        {
          type: 'text',
          text: names,
          css: {
            top: '100px',
            left: '220px',
            heigth:'60px',
            color:'#fff',
            lineHeight:'60px',
            fontSize: '32px',
            maxLines: 1,
          },
        },
        {
          type: 'rect',
          css: {
            top: '1100px',
            left: '40px',
            color:'rgb(0,147,185)',
            borderRadius:'20px',
            width: '380px',
            height: '160px',
          },
        },
        {
          type: 'text',
          text: data4.group_price,
          css: {
            top: '1130px',
            left: '60px',
            color: '#fff',
            fontSize: '80px',
          },
        },
        {
          type: 'rect',
          css: {
            top: '770px',
            left: '480px',
            color: 'rgba(255,255,255,0.5)',
            borderRadius: '20px',
            width: '700px',
            height: '100px',
          },
        },
        {
          type: 'text',
          text: data5,
          css: {
            top: '795px',
            left: '500px',
            width: '580px',
            color: '#333',
            maxLines: 1,
            fontSize: '40px',
          },
        },
        {
          type: 'rect',
          css: {
            top: '920px',
            left: '380px',
            color: 'rgba(255,255,255,0.5)',
            borderRadius: '20px',
            width: '800px',
            height: '100px',
          },
        },
        {
          type: 'text',
          text: data4.product_name,
          css: {
            top: '945px',
            left: '400px',
            width: '680px',
            color: '#333',
            maxLines: 1,
            fontSize: '40px',
          },
        },
        {
          type: 'text',
          text: data4.product_desc,
          css: {
            top: '1300px',
            left: '40px',
            width: '1000px',
            color: '#333',
            maxLines: 2,
            lineHeight: '60px',
            fontSize: '40px',
          },
        },
        {
          type: 'text',
          text: '长按识别或扫描二维码',
          css: {
            top: '1480px',
            left: '40px',
            color: '#666',
            maxLines: 2,
            lineHeight: '60px',
            fontSize: '48px',
          },
        },
        {
          type: 'text',
          text: '更多优质商品等您挑选',
          css: {
            top: '1580px',
            left: '40px',
            color: '#666',
            lineHeight: '60px',
            fontSize: '48px',
          },
        },
        {
          type: 'image',
          url: data2,
          css: {
            top: '1428px',
            left: '780px',
            width: '300px',
            height: '300px',
            mode: 'scaleToFill',
          },
        },
      ],
    });
  }
}
