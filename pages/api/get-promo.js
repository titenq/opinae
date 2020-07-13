import { GoogleSpreadsheet } from 'google-spreadsheet';

import decodeBase64 from '../../utils/decodeBase64';

const doc = new GoogleSpreadsheet(process.env.SHEET);

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: decodeBase64(process.env.SHEET_PRIVATE_KEY)
    });

    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[2];

    await sheet.loadCells('A3:B3');
  
    const ativarPromocao = sheet.getCell(2, 0);
    
    const mensagemPromocao = sheet.getCell(2, 1);

    res.end(JSON.stringify({
      showCoupon: ativarPromocao.value === 'VERDADEIRO',
      message: mensagemPromocao.value
    }));
  } catch (error) {
    res.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }));
  }
};
