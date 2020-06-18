import * as request from '@/services/api';

// 请求成功
const SUCCESS = 'true';

export default {
  namespace: 'global',
  state: {
    loginInfo:{}
  },
  effects: {
    //   登录
    * getLogin({ payload }, { call, put }) {
      // debugger;
      const res = yield call(request.getLogin, payload);
      console.log(res,'res')
      yield put({
        type: 'saveLogin',
        payload: {
          data: res
        }
      });
      if (res.isSuccess.toString() === SUCCESS) {
        return res;
      } else {
        return false;
      }
    },
  },
  reducers: {
    saveLogin(state, action) {
      console.log('action', action)
      return {
        ...state,
        loginInfo: action.payload.data
      };
    },

  }
};
