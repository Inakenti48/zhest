import React from 'react';

interface InvoiceItem {
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  sum: number;
  calc?: {
    width_input?: number;
    full_width?: number;
    length_input?: number;
    sheets?: number;
    total_linear_meters?: number;
    total_m2?: number;
  };
}

interface InvoiceProps {
  date: string;
  orderNumber: string | number;
  supplier?: string;
  buyer?: string;
  deliveryAddress?: string;
  phone?: string;
  contactPerson?: string;
  items: InvoiceItem[];
  totalAmount: number;
  releasedBy?: string;
  vatAmount?: number;
  comment?: string;
  isPrintable?: boolean;
}
  
  // Helper to convert number to Russian words (simplified for currency)
const numToWordsRu = (n: number): string => {

  const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
  const unitsFem = ['', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
  const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
  const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
  const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
  
  const getDecimalPart = (n: number, forms: string[], fem: boolean = false) => {
    let s = '';
    const u = fem ? unitsFem : units;
    if (n >= 100) { s += hundreds[Math.floor(n / 100)] + ' '; n %= 100; }
    if (n >= 10 && n < 20) { s += teens[n - 10] + ' '; return s; }
    if (n >= 20) { s += tens[Math.floor(n / 10)] + ' '; n %= 10; }
    if (n > 0) { s += u[n] + ' '; }
    return s;
  };

  const getPluralForm = (n: number, forms: string[]) => {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
  };

  if (n === 0) return 'ноль рублей 00 копеек';

  const rubles = Math.floor(n);
  const kopeks = Math.round((n - rubles) * 100);

  let result = '';
  let temp = rubles;

  // Millions
  if (temp >= 1000000) {
    const m = Math.floor(temp / 1000000);
    result += getDecimalPart(m, [], false) + getPluralForm(m, ['миллион', 'миллиона', 'миллионов']) + ' ';
    temp %= 1000000;
  }

  // Thousands
  if (temp >= 1000) {
    const t = Math.floor(temp / 1000);
    result += getDecimalPart(t, [], true) + getPluralForm(t, ['тысяча', 'тысячи', 'тысяч']) + ' ';
    temp %= 1000;
  }

  // Hundreds, tens, units
  if (temp > 0 || rubles === 0) {
    result += getDecimalPart(temp, [], false);
  }

  result += getPluralForm(rubles, ['рубль', 'рубля', 'рублей']);
  
  const kopeksStr = kopeks < 10 ? '0' + kopeks : kopeks.toString();
  result += ` ${kopeksStr} ` + getPluralForm(kopeks, ['копейка', 'копейки', 'копеек']);

  return result.charAt(0).toUpperCase() + result.slice(1).trim();
};

export const Invoice = ({ 
  date, 
  orderNumber, 
  buyer = '',
  items, 
  totalAmount,
  releasedBy = 'Кострова В.Б.',
  isPrintable = true
}: InvoiceProps) => {

    return (
      <div className={`bg-white text-black p-4 w-[210mm] min-h-[148mm] mx-auto font-sans ${isPrintable ? 'printable-invoice' : ''}`}>
        {isPrintable && (
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              body * { visibility: hidden; }
              .printable-invoice, .printable-invoice * { visibility: visible; }
              .printable-invoice { 
                position: absolute; 
                left: 0; 
                top: 0; 
                width: 210mm;
                padding: 10mm;
                margin: 0;
                border: none;
              }
              @page { size: portrait; margin: 0; }
            }
          `}} />
        )}
        <style dangerouslySetInnerHTML={{ __html: `
          .invoice-box { border: 1px solid black; width: 100%; }
          .invoice-table { border-collapse: collapse; width: 100%; }
          .invoice-table th, .invoice-table td {
            border: 1px solid black;
            padding: 4px 6px;
            font-size: 11px;
            height: 24px;
          }
          .invoice-table th { font-weight: normal; text-align: center; }
          .header-table { border-collapse: collapse; width: 100%; border-bottom: 1px solid black; }
          .header-table td { border: 1px solid black; padding: 4px 10px; font-size: 16px; font-weight: bold; }
          .warning-box { border-bottom: 1px solid black; padding: 5px; text-align: center; font-size: 11px; font-weight: bold; line-height: 1.2; }
          .info-line { border-bottom: 1px solid black; padding: 2px 5px; font-size: 10px; font-weight: bold; }
          .signature-line { border-bottom: 1px solid black; padding: 5px; font-size: 11px; font-weight: bold; }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .font-italic { font-style: italic; }
        `}} />
      
      <div className="invoice-box">
        {/* Top Header */}
        <table className="header-table">
          <tbody>
            <tr>
              <td style={{ width: '40%', fontStyle: 'italic', fontSize: '20px' }}>{date}</td>
              <td style={{ width: '10%', textAlign: 'center' }}>№</td>
              <td style={{ width: '10%', textAlign: 'center' }}>{orderNumber}</td>
              <td style={{ width: '40%', textAlign: 'center', fontStyle: 'italic', fontSize: '20px' }}>{buyer || 'Темирхан'}</td>
            </tr>
          </tbody>
        </table>

        {/* Warnings */}
        <div className="warning-box">
          Очень внимательно проверьте правильность оформления Вашего заказа, особенно правильно ли указан цвет материала. После приемки заказа претензии не принимаются
        </div>

        {/* Info Lines */}
        <div className="info-line">
          Узнать готовность заказа - 8928-870-63-22 &nbsp; Режим работы 8:00-17:00 &nbsp; Доставки нет.
        </div>
        <div className="info-line">
          Обмена и возврата нет. Без накладной товар не отгружается. Погрузка крытых машин не производится.
        </div>
        <div className="info-line">
          Проверяйте наличие товара на месте, после отгрузки товара претензии по количеству не принимаются.
        </div>
        <div className="info-line">
          Фирма не несет ответственности за товар, оставленный на складе более двух дней
        </div>

        {/* Signatures */}
        <div className="signature-line">
          Заказ принял :/ ____________ / &nbsp; Заказ отпустил :/ ____________ / &nbsp; С заказом согласен :/ ________________________ /
        </div>

        {/* Main Table */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th rowSpan={2} style={{ fontSize: '18px', fontStyle: 'italic', fontWeight: 'bold' }}>Наименование</th>
              <th style={{ width: '45px' }}>шири</th>
              <th style={{ width: '45px' }}>цена</th>
              <th style={{ width: '45px' }}>длина</th>
              <th style={{ width: '45px' }}>КОЛ-</th>
              <th rowSpan={2} style={{ width: '50px' }}>всего пог.м.</th>
              <th rowSpan={2} style={{ width: '50px' }}>всего м2</th>
              <th rowSpan={2} style={{ width: '80px' }}>сумма</th>
              <th rowSpan={2} style={{ width: '90px', fontSize: '20px', fontWeight: 'bold' }}>Марат</th>
            </tr>
            <tr>
              <th>на</th>
              <th>1м2</th>
              <th>1 шт.</th>
              <th>ВО ШТУК</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 'normal', fontSize: '12px' }}>{item.name}</td>
                <td className="text-center">{(item.calc?.full_width || item.calc?.width_input || '').toString().replace('.', ',')}</td>
                <td className="text-center">{(item.pricePerUnit || '').toString().replace('.', ',')}</td>
                <td className="text-center">{(item.calc?.length_input || '').toString().replace('.', ',')}</td>
                <td className="text-center">{item.calc?.sheets || item.quantity}</td>
                <td className="text-center">{(item.calc?.total_linear_meters || '').toString().replace('.', ',')}</td>
                <td className="text-center">{(item.calc?.total_m2 || '').toString().replace('.', ',')}</td>
                <td className="text-center" style={{ fontWeight: 'bold' }}>{item.sum.toFixed(0)}</td>
                {idx === 0 && (
                  <td rowSpan={Math.max(items.length + 1, 5)} className="text-center" style={{ fontSize: '20px', fontWeight: 'bold', verticalAlign: 'middle' }}>
                    {totalAmount.toFixed(0)}
                  </td>
                )}
              </tr>
            ))}
            {/* Totals Row as in Photo */}
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td className="text-center" style={{ fontWeight: 'normal' }}>
                {items.reduce((acc, curr) => acc + (curr.calc?.total_linear_meters || 0), 0).toFixed(2).replace('.', ',')}
              </td>
              <td className="text-center" style={{ fontWeight: 'normal' }}>
                {items.reduce((acc, curr) => acc + (curr.calc?.total_m2 || 0), 0).toFixed(2).replace('.', ',')}
              </td>
              <td className="text-center" style={{ fontWeight: 'normal' }}>0</td>
            </tr>
            {/* Padding empty rows to match height if few items */}
            {items.length < 3 && [...Array(3 - items.length)].map((_, i) => (
              <tr key={`empty-${i}`}>
                <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

