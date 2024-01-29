import fs from 'fs';
import path from 'path';

import { SerialPort } from 'serialport';
// import { ReadlineParser } from '@serialport/parser-readline';
import { ByteLengthParser } from '@serialport/parser-byte-length';
// import { CCTalkParser } from '@serialport/parser-cctalk';
// import { DelimiterParser } from '@serialport/parser-delimiter';
// import { InterByteTimeoutParser } from '@serialport/parser-inter-byte-timeout';
SerialPort.list()
  .then((ports) => {
    console.log(ports.map(e => e.path));
    if (ports.length === 0) {

    }
    else {
      const port = new SerialPort({
        path: 'COM6',
        baudRate: 9600,
        // parity: 'even',
        dataBits: 8,
        stopBits: 1,
      });

      const parser = port.pipe(new ByteLengthParser({ length: 12 }));

      function addSpaceEveryTwoChars(str: string) {
        let result = '';
        for (let i = 0; i < str.length; i += 2) {
          result += `${str.slice(i, i + 2)} `;
        }
        return result.trim(); // 去除最后多余的空格
      }

      // 监听 parser 上的数据事件
      let lastWeight = '';
      parser.on('data', (data) => {
        // 将 Buffer 转换为16进制字符串
        const hexData = data.toString('hex') as string;
        // console.log('Received data in hexadecimal:', data);
        // console.log('hexData:', data);

        const data2 = addSpaceEveryTwoChars(hexData.slice(3 * 2, 8 * 2)).split(' ');
        const currentWeightValue = Number(data2.map((e) => {
          return parseInt(e, 16) - parseInt('30', 16);
        }).join('')) / 10;
        const currentWeight = `${currentWeightValue.toFixed(2)}kg`;

        if (lastWeight !== currentWeight) {
          console.log('weight:', currentWeight);
          lastWeight = currentWeight;
          fs.appendFileSync(path.resolve(__dirname, './output.txt'), `${Date.now()}: ${currentWeight}\n`);
        }
        // 在这里处理16进制形式的数据
        // fs.appendFileSync('./output.txt', `${Date.now()} ${addSpaceEveryTwoChars(hexData)}\n`);
      });

      // 监听串口的错误事件
      port.on('error', (err) => {
        console.error('Error:', err.message);
      });

      // 监听串口的打开事件
      port.on('open', () => {
        console.log('Serial port is open');
        const hexData = 'FE FE FE FE 68 48 86 00 00 16 09 68 11 04 33 36 34 35 A4 16'.split(' ').join('');
        const bufferData = Buffer.from(hexData, 'hex');
        bufferData;
        // port.write(bufferData);
      });

      // 监听串口的关闭事件
      port.on('close', () => {
        console.log('Serial port is closed');
      });

      // port.on('open', () => {
      //   console.log('[open]');
      //   const hexData = 'FE FE FE FE 68 48 86 00 00 16 09 68 11 04 33 36 34 35 A4 16'.split(' ').join('');
      //   const bufferData = Buffer.from(hexData, 'hex');
      //   port.write(bufferData, (err) => {
      //     if (err) {
      //       console.log(err);
      //       return;
      //     }
      //     console.log('send msg', bufferData);
      //   });
      // });

      // port.pipe(parser);

      // parser.on('data', (data) => {
      //   console.log('data 1111', data);
      //   const hexData = data.toString('hex');
      //   console.log('data 1111', hexData);
      // });
      // // port.on('data', (data) => {
      // //   console.log('data 2222', data);
      // //   const hexData = data.toString('hex');
      // //   console.log('data 2222', hexData);
      // // });
    }

  // tableHTML = tableify(ports)
  // document.getElementById('ports').innerHTML = tableHTML
  })
  .catch(() => {

  });