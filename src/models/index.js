import * as request from '@/services/api';

// 请求成功
const SUCCESS = 'true';

export default {
  namespace: 'index',
  state: {
    list: [],
    tag: [],
    taglist: [],
    deletemsg: {},
    questionList: [],
    resultList:[]
  },
  effects: {
    * getList({ payload }, { call, put }) {
      const res = yield call(request.getList, payload);
      yield put({
        type: 'saveList',
        payload: {
          data: res
        }
      });
    },
    * getSavetag({ payload }, { call, put }) {
      const res = yield call(request.getSavetag, payload);
      yield put({
        type: 'saveTags',
        payload: {
          data: res.data
        }
      });
      if (res.isSuccess.toString() === SUCCESS) {
        return res;
      } else {
        return false;
      }
    },
    * getTagList({ payload }, { call, put }) {
      const res = yield call(request.getTagList, payload);
      yield put({
        type: 'saveTagList',
        payload: {
          data: res
        }
      });
    },
    * getDeleteTests({ payload }, { call, put }) {
      const res = yield call(request.getDeleteTests, payload);
      yield put({
        type: 'saveDeleteTests',
        payload: {
          data: res
        }
      });
      return res;
    },
    * getQuestions({ payload }, { call, put }) {
      const res = yield call(request.getQuestions, payload);
      yield put({
        type: 'saveQuestions',
        payload: {
          data: res
        }
      });
    },
    * getResults({ payload }, { call, put }) {
      const res = yield call(request.getResults, payload);
      yield put({
        type: 'saveResults',
        payload: {
          data: res
        }
      });
    }
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload.data
      };
    },
    saveTags(state, action) {
      return {
        ...state,
        tag: action.payload.data
      };
    },
    saveTagList(state, action) {
      return {
        ...state,
        taglist: action.payload.data.tags
      };
    },
    saveDeleteTests(state, action) {
      return {
        ...state,
        deletemsg: action.payload.data
      };
    },
    saveQuestions(state, action) {
      return {
        ...state,
        questionList: action.payload.data.questions
      };
    },
    saveResults(state, action) {
      return {
        ...state,
        resultList: action.payload.data.results
      };
    }
  }
};
