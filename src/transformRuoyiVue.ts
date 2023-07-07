import fs from 'fs';
import path from 'path';

const inputFilePath = path.resolve(__dirname, 'input', 'index.vue');
const outFilePath = path.resolve(__dirname, 'output', 'index.vue');

const result = fs.readFileSync(inputFilePath).toString();

const prefix = 'dataSource';

function toUpperCamelCase(str: string): string {
  const words = str.split(/[\s_-]+/);
  const upperCamelCaseWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return upperCamelCaseWords.join('');
}

function insertCharacter(str: string, char: string, index: number): string {
  if (index > str.length) {
    // 如果指定的索引超出字符串长度，则将字符添加到字符串末尾
    return str + char;
  }
  else if (index < 0) {
    // 如果指定的索引小于0，则将字符添加到字符串开头
    return char + str;
  }
  else {
    // 在指定索引位置将字符插入字符串
    const part1 = str.substring(0, index);
    const part2 = str.substring(index);
    return part1 + char + part2;
  }
}

let outputResult = result
  .replaceAll('queryParams', `${prefix}QueryParams`)
  .replaceAll('queryForm', `${prefix}QueryFormRef`)
  .replaceAll('handleQuery', `handleQuery${toUpperCamelCase(prefix)}`)
  .replaceAll('resetQuery', `resetQuery${toUpperCamelCase(prefix)}`)
  .replaceAll('handleAdd', `handleAdd${toUpperCamelCase(prefix)}`)
  .replaceAll('handleUpdate', `handleUpdate${toUpperCamelCase(prefix)}`)
  .replaceAll('handleDelete', `handleDelete${toUpperCamelCase(prefix)}`)
  .replaceAll('handleExport', `handleExport${toUpperCamelCase(prefix)}`)
  .replaceAll('submitForm', `submitForm${toUpperCamelCase(prefix)}`)

  .replaceAll('cancel', `handle${toUpperCamelCase(prefix)}Cancel`)
  .replaceAll('reset()', `handle${toUpperCamelCase(prefix)}Reset()`)

  .replaceAll('getList', `get${toUpperCamelCase(prefix)}List`)
  .replaceAll('handleSelectionChange,', `handleSelectionChange${toUpperCamelCase(prefix)}`)

  .replaceAll('btnLoading', `${prefix}BtnLoading`)
  .replaceAll('v-loading="loading"', `v-loading="${prefix}Loading"`)
  .replaceAll('loading: true,', `${prefix}Loading: true,`)
  .replaceAll('this.loading', `this.${prefix}Loading`)
  //
  .replaceAll(':total', ':TOTAL')
  .replaceAll('total', `${prefix}Total`)
  .replaceAll(':TOTAL', ':total')
  //
  .replaceAll(':title', ':TITLE')
  .replaceAll('title', `${prefix}Title`)
  .replaceAll(':TITLE', ':title')

  .replaceAll('open', `${prefix}Open`)
  .replaceAll('ids', `${prefix}Ids`)
  .replaceAll('showSearch', `${prefix}ShowSearch`)

  .replaceAll('// 非单个禁用', '')
  .replaceAll('single: true,', '')

  .replaceAll('// 非多个禁用', '')
  .replaceAll('multiple: true,', '')
  .replaceAll('this.single = selection.length !== 1;', '')
  .replaceAll('this.multiple = !selection.length;', '')

  .replaceAll('ref="form"', `ref="${prefix}FormRef"`)
  .replaceAll('this.resetForm("form")', `this.resetForm("${prefix}FormRef")`)

  .replaceAll(':model="form"', `:model="${prefix}Form"`)
  .replaceAll('this.form', `this.${prefix}Form`)
  .replaceAll('form:', `${prefix}Form:`)
  .replaceAll('rules:', `${prefix}Rules:`)
  .replaceAll('response', 'res')

// style

  .replaceAll(':inline="true"', 'inline')

  .replace(/^\s*[\r\n]/gm, '')

  .replaceAll('import {', '\n\nimport {')
  .replaceAll('export default', '\n\nexport default')

  ;

const created_index = outputResult.indexOf('created()');

outputResult = insertCharacter(outputResult, `
  computed: {
    // 非单个禁用
    single() {
      return this.ids.length !== 1;
    },
    // 非多个禁用
    multiple() {
      return !this.ids.length;
    },
  },
  
`, created_index);

fs.writeFileSync(outFilePath, outputResult);

export {};