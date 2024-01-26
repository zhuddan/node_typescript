import type { PhotoModel } from '../model/photo';

import { request } from '@cloud/shared';
/**
 * 相册列表
 */
export function listPhoto(params?: ListQuery<PhotoModel>) {
  return request.get<ResponseData<PhotoModel>>({
    url: '/basic/photo/list',
    params,
  });
}
/**
 * 新增相册
 */
export function addPhoto(data: PhotoModel) {
  return request.post({
    url: '/basic/photo',
    data,
  });
}
/**
 * 更新相册
 */
export function updatePhoto(data: PhotoModel) {
  return request.put({
    url: '/basic/photo',
    data,
  });
}
/**
 * 相册详情
 */
export function getPhoto(id: number) {
  return request.get<ResponseData<PhotoModel>>({
    url: `/basic/photo/${id}`,
  });
}
/**
 * 删除相册
 */
export function delPhoto(id: number) {
  return request.delete<ResponseData<PhotoModel>>({
    url: `/basic/photo/${id}`,
  });
}
