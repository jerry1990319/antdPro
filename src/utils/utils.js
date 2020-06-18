
import { notification, Modal } from 'antd';

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}


// 新增的get请求参数拼接，少传参用这个
export function transformParams(params = {}) {
  const parts = [];
  Object.keys(params).forEach((key) => {
    const val = params[key];
    if (val !== null && typeof val !== 'undefined') {
      const temp = `${key}=${val}`;
      parts.push(temp);
    }
  });
  return parts.join('&');
}

export function returnNo(text, defaultText) {
  if (text === null || text === undefined || text === '' || text === 'null') {
    if (defaultText) {
      return defaultText;
    } else {
      return '暂无数据';
    }
  } else {
    return text;
  }
}

/**
 * @Description: 时间戳转换格式
 * @param
 */
export function timestampToTime(timestamp) {
  if (timestamp !== undefined || timestamp !== null) {
    const date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = `${date.getFullYear()}-`;
    const M = date.getMonth() + 1 < 10 ? `0${(date.getMonth() + 1)}-` : `${(date.getMonth() + 1)}-`;
    const D = `${date.getDate()}`;
    return Y + M + D;
  } else {
    return '暂无时间';
  }
}
/**
 * @Description: 消息提示框
 * @param
 */
export function NewsTips(description, params) {
  if (params) {
    const { type = 'info' } = params;
    notification[type]({
      message: '消息提示',
      description,
      duration: 1,
      placement: 'bottomRight'
    });
  } else {
    notification.open({
      message: '消息提示',
      description,
      duration: 1,
      placement: 'bottomRight'
    });
  }
}
/**
 * @Description: 错误消息反馈
 * @param
 */
export function error(title, content) {
  Modal.error({
    title: title,
    content: content,
  });
}
/**
 * @Description: 表单默认值
 * @param
 */
export function defaultvalue(text, defaultText) {
  if (!text || text.length < 1) {
    if (defaultText) {
      return defaultText;
    } else {
      return '暂无数据';
    }
  } else {
    return text;
  }
}