export default class LastMayday {
  palette(erweima) {
    console.log(erweima);
    return ({
      width: '600rpx',
      height: '600rpx',
      background: '#fff',
      views: [
        {
          type: 'rect',
          css: {
            top: '0rpx',
            left: '0rpx',
            borderWidth:'2rpx',
            borderColor:'#000',
            borderRadius:'20rpx',
            width: '600rpx',
            height: '600rpx',
          },
        },
        {
          type: 'image',
          url: erweima,
          css: {
            top: '210rpx',
            left: '210rpx',
            width:'180rpx',
            height:'180rpx',
            mode:'aspectFill',
          },
        },
      ],
    });
  }
}
