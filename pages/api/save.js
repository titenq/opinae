import { GoogleSpreadsheet } from 'google-spreadsheet';
import moment from 'moment';

import decodeBase64 from '../../utils/decodeBase64';

const doc = new GoogleSpreadsheet(process.env.SHEET);

const couponGenerator = () => {
  const coupon = parseInt(moment().format('YYMMDDHHmmssSSS'))
    .toString(16)
    .toUpperCase()
    .replace(/(\w{4})(\w)/, '$1-$2')
    .replace(/(\w{4})(\w)/, '$1-$2');

  //coupon = coupon.substr(0, 4) + '-' + coupon.substr(4, 4) + '-' + coupon.substr(8, 4);

  return coupon;
};

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: decodeBase64(process.env.SHEET_PRIVATE_KEY)
    });
    await doc.loadInfo();

    const data = JSON.parse(req.body);

    const sheet = doc.sheetsByIndex[2];
    await sheet.loadCells('A3:B3');
    const ativarPromocao = sheet.getCell(2, 0);
    const mensagemPromocao = sheet.getCell(2, 1);

    let Cupom = '';
    let Promo = '';

    if (ativarPromocao.value === 'VERDADEIRO') {
      Cupom = couponGenerator();
      Promo = mensagemPromocao.value;
    }
    
    const pesquisa = doc.sheetsByIndex[1];
    await pesquisa.addRow({
      Nome: data.Nome,
      Email: data.Email,
      WhatsApp: data.WhatsApp,
      Nota: data.Nota,
      Cupom,
      Promo,
      Mensagem: data.Mensagem,
      Data: moment().format('DD/MM/YYYY HH:mm:ss')
    });

    res.end(JSON.stringify({
      showCoupon: Cupom !== '',
      Cupom,
      Promo
    }));
  } catch (error) {
    res.end('error');
  }
};
