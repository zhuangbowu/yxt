export default class LastMayday {
  palette(data) {
    var objN=new Object();
    if (data.product_list.length==1){
      objN = ({
        width: '600rpx',
        height: '300rpx',
        background: '#fff',
        views: [
          {
            type: 'text',
            text: data.product_list[0].product_name,
            css: [{
              top: `100rpx`,
              left: '300rpx',
              width: '300rpx',
              maxLines: 1,
              fontSize: '36rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '￥' + data.product_list[0].group_price,
            css: [{
              top: `180rpx`,
              left: '300rpx',
              width: '300rpx',
              fontSize: '36rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '×' + data.product_list[0].num,
            css: [{
              top: `140rpx`,
              right: '20rpx',
              width: '80rpx',
              fontSize: '36rpx',
              color: '#666'
            }],
          },
          {
            type: 'image',
            url: data.product_list[0].product_swiper[0].urlImg,
            css: {
              top: '50rpx',
              left: '50rpx',
              borderRadius: '20rpx',
              width: '220rpx',
              height: '220rpx',
            },
          }
        ],
      });
    } else if (data.product_list.length == 2){
      objN = ({
        width: '600rpx',
        height: '300rpx',
        background: '#eee',
        views: [
          {
            type: 'text',
            text: data.product_list[0].product_name,
            css: [{
              top: `30rpx`,
              left: '160rpx',
              width: '440rpx',
              maxLines: 1,
              fontSize: '36rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '￥' + data.product_list[0].group_price,
            css: [{
              top: `80rpx`,
              left: '160rpx',
              width: '440rpx',
              fontSize: '36rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '×' + data.product_list[0].num,
            css: [{
              top: `70rpx`,
              right: '20rpx',
              width: '80rpx',
              fontSize: '36rpx',
              color: '#666'
            }],
          },
          {
            type: 'image',
            url: data.product_list[0].product_swiper[0].urlImg,
            css: {
              top: '20rpx',
              left: '20rpx',
              borderRadius: '20rpx',
              width: '110rpx',
              height: '110rpx',
            },
          },
          {
            type: 'text',
            text: data.product_list[1].product_name,
            css: [{
              top: `180rpx`,
              left: '160rpx',
              width: '440rpx',
              maxLines: 1,
              fontSize: '36rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '￥' + data.product_list[1].group_price,
            css: [{
              top: `220rpx`,
              left: '160rpx',
              width: '440rpx',
              fontSize: '36rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '×' + data.product_list[1].num,
            css: [{
              top: `210rpx`,
              right: '20rpx',
              width: '80rpx',
              fontSize: '36rpx',
              color: '#666'
            }],
          },
          {
            type: 'image',
            url: data.product_list[1].product_swiper[0].urlImg,
            css: {
              top: '170rpx',
              left: '20rpx',
              borderRadius: '20rpx',
              width: '110rpx',
              height: '110rpx',
            },
          }
        ],
      });
    } else if (data.product_list.length == 3 || data.product_list.length > 3) {
      objN = ({
        width: '600rpx',
        height: '300rpx',
        background: '#eee',
        views: [
          {
            type: 'text',
            text: data.product_list[0].product_name,
            css: [{
              top: `20rpx`,
              left: '120rpx',
              width: '420rpx',
              maxLines: 1,
              fontSize: '28rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '￥' + data.product_list[0].group_price,
            css: [{
              top: `60rpx`,
              left: '120rpx',
              width: '420rpx',
              fontSize: '28rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '×' + data.product_list[0].num,
            css: [{
              top: `30rpx`,
              right: '20rpx',
              width: '80rpx',
              fontSize: '28rpx',
              color: '#666'
            }],
          },
          {
            type: 'image',
            url: data.product_list[0].product_swiper[0].urlImg,
            css: {
              top: '20rpx',
              left: '20rpx',
              borderRadius: '20rpx',
              width: '80rpx',
              height: '80rpx',
            },
          },
          {
            type: 'text',
            text: data.product_list[1].product_name,
            css: [{
              top: `120rpx`,
              left: '120rpx',
              width: '420rpx',
              maxLines: 1,
              fontSize: '28rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '￥' + data.product_list[1].group_price,
            css: [{
              top: `160rpx`,
              left: '120rpx',
              width: '420rpx',
              fontSize: '28rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '×' + data.product_list[1].num,
            css: [{
              top: `130rpx`,
              right: '20rpx',
              width: '80rpx',
              fontSize: '28rpx',
              color: '#666'
            }],
          },
          {
            type: 'image',
            url: data.product_list[1].product_swiper[0].urlImg,
            css: {
              top: '120rpx',
              left: '20rpx',
              borderRadius: '20rpx',
              width: '80rpx',
              height: '80rpx',
            },
          },
          {
            type: 'text',
            text: data.product_list[2].product_name,
            css: [{
              top: `220rpx`,
              left: '120rpx',
              width: '420rpx',
              maxLines: 1,
              fontSize: '28rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '￥' + data.product_list[2].group_price,
            css: [{
              top: `260rpx`,
              left: '120rpx',
              width: '420rpx',
              fontSize: '28rpx',
              color: '#666'
            }],
          },
          {
            type: 'text',
            text: '×' + data.product_list[2].num,
            css: [{
              top: `230rpx`,
              right: '20rpx',
              width: '80rpx',
              fontSize: '28rpx',
              color: '#666'
            }],
          },
          {
            type: 'image',
            url: data.product_list[2].product_swiper[0].urlImg,
            css: {
              top: '220rpx',
              left: '20rpx',
              borderRadius: '20rpx',
              width: '80rpx',
              height: '80rpx',
            },
          },

        ],
      });
    }

    return objN;
  }
}


function _textDecoration(decoration, index, color) {
  return ({
    type: 'text',
    text: decoration,
    css: [{
      top: `${startTop + index * gapSize}rpx`,
      color: color,
      textDecoration: decoration,
    }, common],
  });
}

function _image(index, rotate, borderRadius) {
  return (
    {
      type: 'image',
      url: '/palette/avatar.jpg',
      css: {
        top: `${startTop + 8.5 * gapSize}rpx`,
        left: `${startLeft + 160 * index}rpx`,
        width: '120rpx',
        height: '120rpx',
        rotate: rotate,
        borderRadius: borderRadius,
      },
    }
  );
}

function _des(index, content) {
  const des = {
    type: 'text',
    text: content,
    css: {
      fontSize: '22rpx',
      top: `${startTop + 8.5 * gapSize + 140}rpx`,
    },
  };
  if (index === 3) {
    des.css.right = '60rpx';
  } else {
    des.css.left = `${startLeft + 120 * index + 30}rpx`;
  }
  return des;
}
