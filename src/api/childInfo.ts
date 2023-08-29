
import type { ChildInfoModel } from '../model/childInfo';

import { request } from '@cloud/shared';
/**
 * 学员信息列表
 */
export function listChildInfo(params?: ListQuery<ChildInfoModel>) {
  return request.get<ResponseData<ChildInfoModel>>({
    url: '/basic/childInfo/list',
    params,
  });
}
/**
 * 新增学员信息
 */
export function addChildInfo(data: ChildInfoModel) {
  return request.post({
    url: '/basic/childInfo',
    data: JSON.stringify(data),
  });
}
/**
 * 更新学员信息
 */
export function updateChildInfo(data: ChildInfoModel) {
  return request.put({
    url: '/basic/childInfo',
    data,
  });
}
/**
 * 学员信息详情
 */
export function getChildInfo(id: number) {
  return request.get<ResponseData<ChildInfoModel>>({
    url: `/basic/childInfo/${id}`,
  });
}
/**
 * 删除学员信息
 */
export function delChildInfo(id: number) {
  return request.delete<ResponseData<ChildInfoModel>>({
    url: `/basic/childInfo/${id}`,
  });
}
