import { SerialPort } from 'serialport';

async function listSerialPorts() {
  try {
    SerialPort.list()
      .then((ports) => {
        console.log('ports', ports);

        if (ports.length === 0) {
          // document.getElementById('error')!.textContent = 'No ports discovered';
        }

        // tableHTML = tableify(ports)
        // document.getElementById('ports').innerHTML = tableHTML
      })
      .catch((err) => {
        if (err) {
          // document.getElementById('error')!.textContent = err.message;
          return;
        }
        else {
          // document.getElementById('error')!.textContent = '';
        }
      });
  }
  catch (error) {
    console.log('After debugger', error);
    // document.getElementById('error')!.textContent = error.message
  }
}

function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}
// // Set a timeout that will check for new serialPorts every 2 seconds.
// // This timeout reschedules itself.
setTimeout(listPorts, 2000);
