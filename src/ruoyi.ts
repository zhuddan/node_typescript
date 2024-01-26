import fs from 'fs';
import path from 'path';

interface GenerateOptions {
  businessName: string;
  className: string;
}
function toUpperCamelCase(input: string): string {
  // 首先将字符串按照空格或下划线拆分为单词数组
  const words = input.split(/[\s_]+/);

  // 将每个单词的首字母转换为大写，其余字母保持不变
  const upperCamelWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // 将转换后的单词数组连接起来
  const upperCamelCaseString = upperCamelWords.join('');

  return upperCamelCaseString;
}

function camelToHyphen(str: string): string {
  // 使用正则表达式将大写字母和小写字母之间插入一个减号，并将字符串全部转换为小写
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const generateCode = (options: GenerateOptions) => {
  const { businessName, className } = options;
  const functionName = toUpperCamelCase(className);
  const modelName = `${toUpperCamelCase(className)}Model`;
  const fileName = `${camelToHyphen(className)}`;

  const code = `import type { ${modelName} } from '../model/${fileName}';

import { request } from '@cloud/shared';
/**
 * ${businessName}列表
 */
export function list${functionName}(params?: ListQuery<${modelName}>) {
  return request.get<ResponseData<${modelName}>>({
    url: '/basic/${className}/list',
    params,
  });
}
/**
 * 新增${businessName}
 */
export function add${functionName}(data: ${modelName}) {
  return request.post({
    url: '/basic/${className}',
    data,
  });
}
/**
 * 更新${businessName}
 */
export function update${functionName}(data: ${modelName}) {
  return request.put({
    url: '/basic/${className}',
    data,
  });
}
/**
 * ${businessName}详情
 */
export function get${functionName}(id: number) {
  return request.get<ResponseData<${modelName}>>({
    url: \`/basic/${className}/\${id}\`,
  });
}
/**
 * 删除${businessName}
 */
export function del${functionName}(id: number) {
  return request.delete<ResponseData<${modelName}>>({
    url: \`/basic/${className}/\${id}\`,
  });
}
`;

  const targetDirApi = path.join(__dirname, 'api');
  const targetFileApi = path.join(targetDirApi, `${fileName}.ts`);

  fs.mkdirSync(targetDirApi, { recursive: true });
  fs.writeFileSync(targetFileApi, code);

  const targetDirModel = path.join(__dirname, 'model');
  const targetFileModel = path.join(targetDirModel, `${fileName}.ts`);

  fs.mkdirSync(targetDirModel, { recursive: true });
  fs.writeFileSync(targetFileModel, `export interface ${functionName}Model {

}`);

  console.log(`Generated and saved code to ${targetFileApi}`);
};

// Example usage
generateCode({ businessName: '相册', className: 'photo' });
