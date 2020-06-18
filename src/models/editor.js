import * as request from '@/services/api';

// 请求成功
// const SUCCESS = 'true';

export default {
    namespace: 'editor',
    state: {
        typeList: [],
        test: {},
        TestDetail:{}
    },
    effects: {
        * getQuestionType({ payload }, { call, put }) {
            const res = yield call(request.getQuestionType, payload);
            yield put({
                type: 'saveQuestionType',
                payload: {
                    data: res
                }
            });
        },
        * getSaveTest({ payload }, { call, put }) {
            const res = yield call(request.getSaveTest, payload);
            yield put({
                type: 'SaveTest',
                payload: {
                    data: res
                }
            });
            return res;
        },
        * getTestDetail({ payload }, { call, put }) {
            const res = yield call(request.getTestDetail, payload);
            yield put({
                type: 'SaveTestDetail',
                payload: {
                    data: res
                }
            });
        }
    },
    reducers: {
        saveQuestionType(state, action) {
            return {
                ...state,
                typeList: action.payload.data.typeList
            };
        },
        getSaveTest(state, action) {
            return {
                ...state,
                test: action.payload
            };
        },
        SaveTestDetail(state, action) {
            console.log('action',action.payload)
            return {
                ...state,
                TestDetail: action.payload.data
            };
        }
        
    }
};
