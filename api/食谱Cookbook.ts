
import type { CookbookModel, SwiperCalendarCookbook } from '../model/食谱Cookbook';

import { request } from '@cloud/shared';
/**
 * 食谱列表
 */
export function listCookbook(params?: {
  startTime: string;
  endTime: string;
  classId: number;
}) {
  return request.get<ResponseData<SwiperCalendarCookbook>>({
    url: '/basic/食谱Cookbook/list',
    params,
  });
}
/**
 * 新增食谱
 */
export function addCookbook(data: CookbookModel) {
  return request.post({
    url: '/basic/食谱Cookbook',
    data: JSON.stringify(data),
  });
}
/**
 * 更新食谱
 */
export function updateCookbook(data: CookbookModel) {
  return request.put({
    url: '/basic/食谱Cookbook',
    data,
  });
}
/**
 * 食谱详情
 */
export function getCookbook(id: number) {
  return request.get<ResponseData<CookbookModel>>({
    url: `/basic/食谱Cookbook/${id}`,
  });
}
/**
 * 删除食谱
 */
export function delCookbook(id: number) {
  return request.delete<ResponseData<CookbookModel>>({
    url: `/basic/食谱Cookbook/${id}`,
  });
}
