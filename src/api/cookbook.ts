
import type { CookbookModel } from '../model/cookbook';

import { request } from '@cloud/shared';
/**
 * 食谱列表
 */
export function listCookbook(params?: ListQuery<CookbookModel>) {
  return request.get<ResponseData<CookbookModel>>({
    url: '/basic/cookbook/list',
    params,
  });
}
/**
 * 新增食谱
 */
export function addCookbook(data: CookbookModel) {
  return request.post({
    url: '/basic/cookbook',
    data: JSON.stringify(data),
  });
}
/**
 * 更新食谱
 */
export function updateCookbook(data: CookbookModel) {
  return request.put({
    url: '/basic/cookbook',
    data,
  });
}
/**
 * 食谱详情
 */
export function getCookbook(id: number) {
  return request.get<ResponseData<CookbookModel>>({
    url: `/basic/cookbook/${id}`,
  });
}
/**
 * 删除食谱
 */
export function delCookbook(id: number) {
  return request.delete<ResponseData<CookbookModel>>({
    url: `/basic/cookbook/${id}`,
  });
}
