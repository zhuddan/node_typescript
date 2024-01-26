import * as fs from 'fs';
import * as path from 'path';

// 读取输入文件
const inputFilePath = path.resolve(__dirname, './input.txt');
const inputData = fs.readFileSync(inputFilePath, 'utf-8');
const name = 'FaceLog';
// 解析 JSON 数据并获取字段的类型
const jsonData = JSON.parse(inputData);
const typeDefinition = generateTypeDefinition(jsonData);

// 生成 TypeScript 类型定义函数
function generateTypeDefinition(data: any): string {
  const definitions: string[] = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const valueType = typeof value;
      const typeAnnotation = getTypeAnnotation(valueType);
      definitions.push(`${key}?: ${typeAnnotation}`);
    }
  }
  return `export interface ${name}Model {
    ${definitions.join(';\n    ')}
  }`;
}

// 获取 TypeScript 类型注释
function getTypeAnnotation(valueType: string): string {
  switch (valueType) {
    case 'string':
    case 'number':
    case 'boolean':
      return valueType;
    default:
      return 'any';
  }
}

// 写入输出文件
const outputFilePath = './types/output.ts';
fs.writeFileSync(path.resolve(__dirname, outputFilePath), typeDefinition);

console.log(`TypeScript 类型定义已生成并保存到 ${path.resolve(__dirname, outputFilePath)}`);
