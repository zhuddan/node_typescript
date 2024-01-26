import type { FaceLogModel } from '../model/face-log';

import { request } from '@cloud/shared';
/**
 * 人脸识别记录列表
 */
export function listFaceLog(params?: ListQuery<FaceLogModel>) {
  return request.get<ResponseData<FaceLogModel>>({
    url: '/basic/faceLog/list',
    params,
  });
}
/**
 * 新增人脸识别记录
 */
export function addFaceLog(data: FaceLogModel) {
  return request.post({
    url: '/basic/faceLog',
    data: JSON.stringify(data),
  });
}
/**
 * 更新人脸识别记录
 */
export function updateFaceLog(data: FaceLogModel) {
  return request.put({
    url: '/basic/faceLog',
    data,
  });
}
/**
 * 人脸识别记录详情
 */
export function getFaceLog(id: number) {
  return request.get<ResponseData<FaceLogModel>>({
    url: `/basic/faceLog/${id}`,
  });
}
/**
 * 删除人脸识别记录
 */
export function delFaceLog(id: number) {
  return request.delete<ResponseData<FaceLogModel>>({
    url: `/basic/faceLog/${id}`,
  });
}
