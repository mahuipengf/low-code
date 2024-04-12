/**
 * 样式转换函数
 * display 显示模式：VETICAL/HORIZALTAL
 * style 样式对象
 */
const transferStyle = (display, style) => {
  if (display === 'VERTICAL' && style) {
    let {
      paddingTop, paddingBottom, paddingRight, paddingLeft,
    } = style;

    paddingTop = paddingTop && parseFloat(paddingTop);
    paddingRight = paddingRight && parseFloat(paddingRight);

    if (paddingLeft && !paddingTop) {
      paddingTop = paddingLeft;
      paddingLeft = '';
    }
    if (paddingRight && !paddingBottom) {
      paddingBottom = paddingRight;
      paddingRight = '';
    }
    style.paddingTop = paddingTop;
    style.paddingRight = paddingRight;
    style.paddingBottom = paddingBottom;
    style.paddingLeft = paddingLeft;

    return style;
  }
  return style;
};

/**
 * 分栏间隔设置函数
 * isMobile 是否是移动端
 * display 显示模式：VETICAL/HORIZALTAL
 * layoutGap 分栏间隔值
 * style 样式对象
 * childrenLen 分栏个数
 * childrenIndex 当前分栏索引
 */
const applyLayoutGapToStyle = (isMobile, display, layoutGap, style, childrenLen, childrenIndex) => {
  // 初始判断返回
  if (!style || !layoutGap) {
    return style;
  }
  // 计算出半边的间隔大小
  const gapSize = Math.ceil(+layoutGap / 2);
  // PC 端和 Mobile 端 HORIZONTAL 模式
  if (!isMobile || (isMobile && display === 'HORIZONTAL')) {
    if (childrenIndex === 0) {
      style.paddingRight = gapSize;
    } else if (childrenIndex + 1 === childrenLen) {
      style.paddingLeft = gapSize;
    } else {
      style.paddingRight = gapSize;
      style.paddingLeft = gapSize;
    }
    return style;
  }
  // Mobile 端 VERTICAL 模式
  if (display === 'VERTICAL') {
    if (childrenIndex === 0) {
      style.paddingBottom = gapSize;
    } else if (childrenIndex + 1 === childrenLen) {
      style.paddingTop = gapSize;
    } else {
      style.paddingBottom = gapSize;
      style.paddingTop = gapSize;
    }
  }
  return style;
};

export default {
  transferStyle,
  applyLayoutGapToStyle,
};
