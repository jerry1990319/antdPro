import * as request from '@/services/api';

// 请求成功
// const SUCCESS = 'true';

export default {
    namespace: 'group',
    state: {
        storelist: [],
        childrenlist: [],
        questionDetailt: {},
        resultDetail: {}
    },
    effects: {
        * getSaveStore({ payload }, { call }) {
            const res = yield call(request.getSaveStore, payload);
            return res;
        },
        * DeleteQuestions({ payload }, { call }) {
            const res = yield call(request.DeleteQuestions, payload);
            return res;
        },
        * SaveQuestion({ payload }, { call }) {
            const res = yield call(request.SaveQuestion, payload);
            return res;
        },
        * DeleteStores({ payload }, { call }) {
            const res = yield call(request.DeleteStores, payload);
            return res;
        },
        * SaveResult({ payload }, { call }) {
            const res = yield call(request.SaveResult, payload);
            return res;
        },
        * QuestionCopyTo({ payload }, { call }) {
            const res = yield call(request.QuestionCopyTo, payload);
            return res;
        },
        * SaveQuestionOrder({ payload }, { call }) {
            const res = yield call(request.SaveQuestionOrder, payload);
            return res;
        },
        * GetStoreList({ payload }, { call, put }) {
            const res = yield call(request.GetStoreList, payload);
            yield put({
                type: 'SaveStoreList',
                payload: {
                    data: res
                }
            });
            // return res;
        },
        * GetQuestionChildrens({ payload }, { call, put }) {
            const res = yield call(request.GetQuestionChildrens, payload);
            yield put({
                type: 'SaveChildrenList',
                payload: {
                    data: res
                }
            });
        },
        * GetQuestionDetail({ payload }, { call, put }) {
            const res = yield call(request.GetQuestionDetail, payload);
            yield put({
                type: 'SaveQuestionDetailt',
                payload: {
                    data: res
                }
            });
        },
        * GetResultDetail({ payload }, { call, put }) {
            const res = yield call(request.GetResultDetail, payload);
            yield put({
                type: 'SaveResultDetail',
                payload: {
                    data: res
                }
            });
        }

    },
    reducers: {
        SaveStoreList(state, action) {
            console.log('action', action)
            return {
                ...state,
                storelist: action.payload.data
            };
        },
        SaveChildrenList(state, action) {
            return {
                ...state,
                childrenlist: action.payload.data
            };
        },
        SaveQuestionDetailt(state, action) {
            return {
                ...state,
                questionDetailt: action.payload.data
            };
        },
        SaveResultDetail(state, action) {
            console.log('action.payload', action.payload)
            return {
                ...state,
                resultDetail: action.payload.data
            };
        }


    }
};
