import { SerialPort } from 'serialport';

SerialPort.list()
  .then((ports) => {
    console.log(ports.map(e => e.path));
    if (ports.length === 0) {
    }
    else {
      const port = new SerialPort({
        path: 'COM5',
        baudRate: 2400,
      });

      port.on('open', () => {
        console.log('[open]');
        const hexData = 'FE FE FE FE 68 48 86 00 00 16 09 68 11 04 33 36 34 35 A4 16'.split(' ').join('');
        const bufferData = Buffer.from(hexData, 'hex');
        port.write(bufferData, (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('send msg', bufferData);
        });
      });

      port.on('data', (data) => {
        console.log(data);
      });
    }

  // tableHTML = tableify(ports)
  // document.getElementById('ports').innerHTML = tableHTML
  })
  .catch(() => {

  });