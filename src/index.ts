import fs from 'fs';
import path from 'path';

interface GenerateOptions {
  businessName: string;
  className: string;
}

const generateCode = (options: GenerateOptions) => {
  const { businessName, className } = options;
  const functionName = `${className.charAt(0).toLowerCase()}${className.slice(1)}`;

  const code = `
import type { ${className}Model } from '../model/${functionName}';

import { request } from '@cloud/shared';
/**
 * ${businessName}列表
 */
export function list${className}(params?: ListQuery<${className}Model>) {
  return request.get<ResponseData<${className}Model>>({
    url: '/basic/${functionName}/list',
    params,
  });
}
/**
 * 新增${businessName}
 */
export function add${className}(data: ${className}Model) {
  return request.post({
    url: '/basic/${functionName}',
    data: JSON.stringify(data),
  });
}
/**
 * 更新${businessName}
 */
export function update${className}(data: ${className}Model) {
  return request.put({
    url: '/basic/${functionName}',
    data,
  });
}
/**
 * ${businessName}详情
 */
export function get${className}(id: number) {
  return request.get<ResponseData<${className}Model>>({
    url: \`/basic/${functionName}/\${id}\`,
  });
}
/**
 * 删除${businessName}
 */
export function del${className}(id: number) {
  return request.delete<ResponseData<${className}Model>>({
    url: \`/basic/${functionName}/\${id}\`,
  });
}
`;

  const targetDirApi = path.join(__dirname, 'api');
  const targetFileApi = path.join(targetDirApi, `${functionName}.ts`);

  fs.mkdirSync(targetDirApi, { recursive: true });
  fs.writeFileSync(targetFileApi, code);

  const targetDirModel = path.join(__dirname, 'model');
  const targetFileModel = path.join(targetDirModel, `${functionName}.ts`);

  fs.mkdirSync(targetDirModel, { recursive: true });
  fs.writeFileSync(targetFileModel, `export interface ${className}Model {

}`);

  console.log(`Generated and saved code to ${targetFileApi}`);
};

// Example usage
generateCode({ businessName: '学员信息', className: 'ChildInfo' });
