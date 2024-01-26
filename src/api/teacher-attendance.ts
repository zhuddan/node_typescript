import type { TeacherAttendanceModel } from '../model/teacher-attendance';

import { request } from '@cloud/shared';
/**
 * 教师考勤列表
 */
export function listTeacherAttendance(params?: ListQuery<TeacherAttendanceModel>) {
  return request.get<ResponseData<TeacherAttendanceModel>>({
    url: '/basic/teacherAttendance/list',
    params,
  });
}
/**
 * 新增教师考勤
 */
export function addTeacherAttendance(data: TeacherAttendanceModel) {
  return request.post({
    url: '/basic/teacherAttendance',
    data,
  });
}
/**
 * 更新教师考勤
 */
export function updateTeacherAttendance(data: TeacherAttendanceModel) {
  return request.put({
    url: '/basic/teacherAttendance',
    data,
  });
}
/**
 * 教师考勤详情
 */
export function getTeacherAttendance(id: number) {
  return request.get<ResponseData<TeacherAttendanceModel>>({
    url: `/basic/teacherAttendance/${id}`,
  });
}
/**
 * 删除教师考勤
 */
export function delTeacherAttendance(id: number) {
  return request.delete<ResponseData<TeacherAttendanceModel>>({
    url: `/basic/teacherAttendance/${id}`,
  });
}
