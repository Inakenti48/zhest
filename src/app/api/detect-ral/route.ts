import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ralColors: Record<string, { name: string, hex: string, rgb: [number, number, number] }> = {
  '1014': { name: 'Слоновая кость', hex: '#DDD5B6', rgb: [221, 213, 182] },
  '1015': { name: 'Светлая слоновая кость', hex: '#E6D2B5', rgb: [230, 210, 181] },
  '1018': { name: 'Цинково-жёлтый', hex: '#F3E03B', rgb: [243, 224, 59] },
  '2004': { name: 'Оранжевый', hex: '#E25303', rgb: [226, 83, 3] },
  '3000': { name: 'Огненно-красный', hex: '#AB2524', rgb: [171, 37, 36] },
  '3005': { name: 'Вишнёвый', hex: '#5E2028', rgb: [94, 32, 40] },
  '3009': { name: 'Оксидно-красный', hex: '#6D332C', rgb: [109, 51, 44] },
  '3011': { name: 'Красно-коричневый', hex: '#7E292C', rgb: [126, 41, 44] },
  '3020': { name: 'Красный', hex: '#C1121C', rgb: [193, 18, 28] },
  '5002': { name: 'Ультрамарин', hex: '#00387B', rgb: [0, 56, 123] },
  '5005': { name: 'Синий', hex: '#005387', rgb: [0, 83, 135] },
  '5015': { name: 'Небесно-синий', hex: '#2271B3', rgb: [34, 113, 179] },
  '5021': { name: 'Водянисто-синий', hex: '#007577', rgb: [0, 117, 119] },
  '6001': { name: 'Изумрудный', hex: '#28713E', rgb: [40, 113, 62] },
  '6002': { name: 'Лиственный', hex: '#325928', rgb: [50, 89, 40] },
  '6005': { name: 'Зелёный мох', hex: '#0F4336', rgb: [15, 67, 54] },
  '6011': { name: 'Резеда зелёный', hex: '#6C7C59', rgb: [108, 124, 89] },
  '6019': { name: 'Бело-зелёный', hex: '#B9CEAC', rgb: [185, 206, 172] },
  '6020': { name: 'Хромовый зелёный', hex: '#37422F', rgb: [55, 66, 47] },
  '6029': { name: 'Мятно-зелёный', hex: '#006B3F', rgb: [0, 107, 63] },
  '7000': { name: 'Серая белка', hex: '#7A888E', rgb: [122, 136, 142] },
  '7001': { name: 'Серебристо-серый', hex: '#8C9C9C', rgb: [140, 156, 156] },
  '7004': { name: 'Сигнально-серый', hex: '#9A9A9A', rgb: [154, 154, 154] },
  '7005': { name: 'Мышино-серый', hex: '#6C6E6B', rgb: [108, 110, 107] },
  '7011': { name: 'Железно-серый', hex: '#555D61', rgb: [85, 93, 97] },
  '7012': { name: 'Базальтовый серый', hex: '#575D5E', rgb: [87, 93, 94] },
  '7016': { name: 'Антрацит', hex: '#383E42', rgb: [56, 62, 66] },
  '7022': { name: 'Серая умбра', hex: '#4B4D46', rgb: [75, 77, 70] },
  '7024': { name: 'Графит', hex: '#474A51', rgb: [71, 74, 81] },
  '7030': { name: 'Каменно-серый', hex: '#939388', rgb: [147, 147, 136] },
  '7032': { name: 'Галечный серый', hex: '#B5B0A1', rgb: [181, 176, 161] },
  '7035': { name: 'Светло-серый', hex: '#CBD0CC', rgb: [203, 208, 204] },
  '7037': { name: 'Пыльно-серый', hex: '#7A7B7A', rgb: [122, 123, 122] },
  '7038': { name: 'Агатовый серый', hex: '#B4B8B0', rgb: [180, 184, 176] },
  '7039': { name: 'Кварцевый серый', hex: '#6B695F', rgb: [107, 105, 95] },
  '7040': { name: 'Серое окно', hex: '#9DA3A6', rgb: [157, 163, 166] },
  '7042': { name: 'Транспортный серый', hex: '#8F9695', rgb: [143, 150, 149] },
  '7043': { name: 'Транспортный серый B', hex: '#4E5451', rgb: [78, 84, 81] },
  '7044': { name: 'Шёлково-серый', hex: '#BDBDB2', rgb: [189, 189, 178] },
  '7046': { name: 'Телеграфно-серый', hex: '#82898E', rgb: [130, 137, 142] },
  '8004': { name: 'Терракотовый', hex: '#8D4931', rgb: [141, 73, 49] },
  '8011': { name: 'Орехово-коричневый', hex: '#59412A', rgb: [89, 65, 42] },
  '8014': { name: 'Сепия коричневый', hex: '#4A3526', rgb: [74, 53, 38] },
  '8016': { name: 'Махагон', hex: '#4C2B20', rgb: [76, 43, 32] },
  '8017': { name: 'Шоколадно-коричневый', hex: '#45322E', rgb: [69, 50, 46] },
  '8019': { name: 'Серо-коричневый', hex: '#3D3D3B', rgb: [61, 61, 59] },
  '8022': { name: 'Чёрно-коричневый', hex: '#1A1718', rgb: [26, 23, 24] },
  '8025': { name: 'Бледно-коричневый', hex: '#755847', rgb: [117, 88, 71] },
  '9002': { name: 'Серовато-белый', hex: '#F1EDE0', rgb: [241, 237, 224] },
  '9003': { name: 'Сигнально-белый', hex: '#F4F8F4', rgb: [244, 248, 244] },
  '9005': { name: 'Глубокий чёрный', hex: '#0E0E10', rgb: [14, 14, 16] },
  '9006': { name: 'Бело-алюминиевый', hex: '#A1A1A0', rgb: [161, 161, 160] },
  '9007': { name: 'Тёмно-алюминиевый', hex: '#878683', rgb: [135, 134, 131] },
  '9010': { name: 'Чисто-белый', hex: '#F7F9EF', rgb: [247, 249, 239] },
  '9016': { name: 'Транспортный белый', hex: '#F7FBF5', rgb: [247, 251, 245] },
};

function colorDistance(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const rMean = (rgb1[0] + rgb2[0]) / 2;
  const dR = rgb1[0] - rgb2[0];
  const dG = rgb1[1] - rgb2[1];
  const dB = rgb1[2] - rgb2[2];
  return Math.sqrt(
    (2 + rMean / 256) * dR * dR + 
    4 * dG * dG + 
    (2 + (255 - rMean) / 256) * dB * dB
  );
}

function findClosestRAL(rgb: [number, number, number]): { ralNumber: string, ralName: string, colorCode: string } {
  let closestRAL = '9003';
  let minDistance = Infinity;

  for (const [ralNum, data] of Object.entries(ralColors)) {
    const dist = colorDistance(rgb, data.rgb);
    if (dist < minDistance) {
      minDistance = dist;
      closestRAL = ralNum;
    }
  }

  const ralData = ralColors[closestRAL];
  return {
    ralNumber: closestRAL,
    ralName: ralData.name,
    colorCode: ralData.hex
  };
}

async function getDominantColor(imageBuffer: Buffer): Promise<[number, number, number]> {
  const sharp = (await import('sharp')).default;
  
  const { data, info } = await sharp(imageBuffer)
    .resize(100, 100, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const colorCounts: Map<string, { count: number, r: number, g: number, b: number }> = new Map();
  
  const centerX = info.width / 2;
  const centerY = info.height / 2;
  const radius = Math.min(info.width, info.height) * 0.35;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const dx = x - centerX;
      const dy = y - centerY;
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);
      
      if (distFromCenter > radius) continue;
      
      const idx = (y * info.width + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      if (r > 240 && g > 240 && b > 240) continue;
      if (r < 15 && g < 15 && b < 15) continue;

      const qR = Math.round(r / 16) * 16;
      const qG = Math.round(g / 16) * 16;
      const qB = Math.round(b / 16) * 16;
      const key = `${qR},${qG},${qB}`;

      const existing = colorCounts.get(key);
      if (existing) {
        existing.count++;
        existing.r += r;
        existing.g += g;
        existing.b += b;
      } else {
        colorCounts.set(key, { count: 1, r, g, b });
      }
    }
  }

  let maxCount = 0;
  let dominantR = 128, dominantG = 128, dominantB = 128;

  for (const value of colorCounts.values()) {
    if (value.count > maxCount) {
      maxCount = value.count;
      dominantR = Math.round(value.r / value.count);
      dominantG = Math.round(value.g / value.count);
      dominantB = Math.round(value.b / value.count);
    }
  }

  return [dominantR, dominantG, dominantB];
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Файл не выбран' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const dominantRGB = await getDominantColor(buffer);
    const result = findClosestRAL(dominantRGB);

    return NextResponse.json({
      ...result,
      detectedRGB: dominantRGB
    });
  } catch (error) {
    console.error('RAL detection error:', error);
    return NextResponse.json({ error: 'Ошибка определения цвета' }, { status: 500 });
  }
}
