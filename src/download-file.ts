import { saveAs } from 'file-saver';

const downloadFile = (file: string, json: object) => {
  const blob = new Blob([JSON.stringify(json)], {
    type: 'text/plain;charset=utf-8'
  });

  saveAs(blob, file);
};

export default downloadFile;
