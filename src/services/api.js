import request from '@/utils/request';
import * as api from './api-utils';
import { transformParams } from '@/utils/utils';

// 问题集列表
export async function getList({ PageIndex, PageSize, KeyWord, OrderBy }) {
  return request(`${api.getList}`, {
    method: 'POST',
    body: {
      PageIndex,
      PageSize,
      KeyWord,
      OrderBy
    }
  });
}
// 登录
export async function getLogin({ UserName, PassWord }) {
  return request(`${api.getLogin}`, {
    method: 'POST',
    body: {
      UserName,
      PassWord
    }
  });
}
// 标签管理
export async function getSavetag({ Names }) {
  return request(`${api.getSavetag}`, {
    method: 'POST',
    body: {
      Names
    }
  });
}
// tag标签列表
export async function getTagList(params = {}) {
  return request(`${api.getTagList}?${transformParams(params)}`);
}
// test删除
export async function getDeleteTests({ Ids }) {
  return request(`${api.getDeleteTests}`, {
    method: 'POST',
    body: {
      Ids
    }
  });
}
// 题型字典表
export async function getQuestionType() {
  return request(`${api.getQuestionType}`, {
    method: 'POST'
  });
}
// 题库列表
export async function getQuestions() {
  return request(`${api.getQuestions}`, {
    method: 'POST'
  });
}
// 结果集
export async function getResults() {
  return request(`${api.getResults}`, {
    method: 'POST'
  });
}
// 测试详情
export async function getTestDetail(Id) {
  return request(`${api.getTestDetail}?${transformParams(Id)}`, {
    method: 'POST',
    body: Id
  });
}
// 测试新增、复制、编辑
export async function getSaveTest(params = {}) {
  return request(`${api.getSaveTest}`, {
    method: 'POST',
    body: params
  });
}
// 新增题库
export async function getSaveStore(params = {}) {
  return request(`${api.getSaveStore}`, {
    method: 'POST',
    body: params
  });
}
// 删除问题
export async function DeleteQuestions(Ids) {
  return request(`${api.DeleteQuestions}?${transformParams(Ids)}`, {
    method: 'POST',
    body: Ids
  });
}
// 问题编辑 新增 复制
export async function SaveQuestion(params = {}) {
  return request(`${api.SaveQuestion}`, {
    method: 'POST',
    body: params
  });
}
// 图库、结果列表
export async function GetStoreList(Type) {
  return request(`${api.GetStoreList}?${transformParams(Type)}`, {
    method: 'POST',
    body: Type
  });
}
// 题库删除
export async function DeleteStores(Type) {
  return request(`${api.DeleteStores}?${transformParams(Type)}`, {
    method: 'POST',
    body: Type
  });
}
// 问题、结果列表
export async function GetQuestionChildrens(StoreKey) {
  return request(`${api.GetQuestionChildrens}?${transformParams(StoreKey)}`, {
    method: 'POST',
    body: StoreKey
  });
}

// 问题详情
export async function GetQuestionDetail(Id) {
  return request(`${api.GetQuestionDetail}?${transformParams(Id)}`, {
    method: 'POST',
    body: Id
  });
}
// 结果详情
export async function GetResultDetail(StoreKey) {
  return request(`${api.GetResultDetail}?${transformParams(StoreKey)}`, {
    method: 'POST',
    body: StoreKey
  });
}
// 新增结果
export async function SaveResult(params = {}) {
  return request(`${api.SaveResult}`, {
    method: 'POST',
    body: params
  });
}
// 复制到
export async function QuestionCopyTo(params = {}) {
  return request(`${api.QuestionCopyTo}`, {
    method: 'POST',
    body: params
  });
}
// 问题集排序
export async function SaveQuestionOrder(params = {}) {
  return request(`${api.SaveQuestionOrder}`, {
    method: 'POST',
    body: params
  });
}
