'use client';

import { useState, useRef } from 'react';
import { Plus, X, Upload, Loader2, Palette, Check } from 'lucide-react';

interface Variant {
  color: string;
  colorCode: string;
  image_url?: string;
  image?: string;
}

interface PendingVariant {
  image_url: string;
  colorCode: string;
  colorName: string;
}

interface VariantEditorProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
}

function extractDominantColor(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) {
        resolve('#808080');
        return;
      }

      const data = imageData.data;
      const colorCounts: { [key: string]: number } = {};
      
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        if (a < 128) continue;
        
        const brightness = (r + g + b) / 3;
        if (brightness > 240 || brightness < 15) continue;
        
        const qR = Math.round(r / 32) * 32;
        const qG = Math.round(g / 32) * 32;
        const qB = Math.round(b / 32) * 32;
        
        const key = `${qR},${qG},${qB}`;
        colorCounts[key] = (colorCounts[key] || 0) + 1;
      }
      
      let maxCount = 0;
      let dominantColor = '128,128,128';
      
      for (const [color, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
          maxCount = count;
          dominantColor = color;
        }
      }
      
      const [r, g, b] = dominantColor.split(',').map(Number);
      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      resolve(hex);
      
      URL.revokeObjectURL(img.src);
    };
    
    img.onerror = () => resolve('#808080');
    img.src = URL.createObjectURL(file);
  });
}

export default function VariantEditor({ variants, onChange }: VariantEditorProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [pendingVariant, setPendingVariant] = useState<PendingVariant | null>(null);
  const newFileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const detectedColor = await extractDominantColor(file);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json() as { url?: string; error?: string };
        if (data.url) {
          setPendingVariant({
            image_url: data.url,
            colorCode: detectedColor,
            colorName: '',
          });
        } else {
          alert('Ошибка загрузки: ' + (data.error || 'Неизвестная ошибка'));
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Ошибка соединения. Попробуйте загрузить фото меньшего размера.');
    } finally {
      setUploading(false);
      if (newFileInputRef.current) newFileInputRef.current.value = '';
    }
  };

  const handleSavePendingVariant = () => {
    if (!pendingVariant || !pendingVariant.colorName.trim()) {
      alert('Введите название цвета');
      return;
    }

    const newVariant: Variant = {
      color: pendingVariant.colorName.trim(),
      colorCode: pendingVariant.colorCode,
      image_url: pendingVariant.image_url,
    };
    onChange([...variants, newVariant]);
    setPendingVariant(null);
  };

  const handleCancelPending = () => {
    setPendingVariant(null);
  };

  const handleUpdateVariantImage = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex(index);
    try {
      const detectedColor = await extractDominantColor(file);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

        const data = await response.json() as { url?: string };
        if (data.url) {
          const updated = variants.map((v, i) => 
            i === index ? { ...v, image_url: data.url, colorCode: detectedColor } : v
          );
          onChange(updated);
        }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleRemoveVariant = (index: number) => {
    if (confirm('Удалить этот цвет?')) {
      const updated = variants.filter((_, i) => i !== index);
      onChange(updated);
    }
  };

  const handleUpdateVariant = (index: number, field: 'color' | 'colorCode', value: string) => {
    const updated = variants.map((v, i) => 
      i === index ? { ...v, [field]: value } : v
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2 flex items-center gap-2">
        <Palette size={12} /> Варианты цветов ({variants.length})
      </label>

      {variants.length > 0 && (
        <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-2">
          {variants.map((variant, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-3 relative group">
              <button
                type="button"
                onClick={() => handleRemoveVariant(index)}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-red-600"
              >
                <X size={12} />
              </button>
              
              <div className="relative h-20 mb-2 rounded-xl overflow-hidden bg-black/20">
                {uploadingIndex === index ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="animate-spin text-blue-400" size={24} />
                  </div>
                ) : (
                    <>
                      <img 
                        src={variant.image_url || variant.image} 
                        alt={variant.color}
                        className="w-full h-full object-contain"
                      />
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
                      <span className="text-[10px] font-bold text-white uppercase">Изменить</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpdateVariantImage(index, e)}
                      />
                    </label>
                  </>
                )}
              </div>
              
              <input
                type="text"
                value={variant.color}
                onChange={(e) => handleUpdateVariant(index, 'color', e.currentTarget.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-[11px] font-bold mb-2"
                placeholder="Название цвета"
              />
              
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={variant.colorCode}
                  onChange={(e) => handleUpdateVariant(index, 'colorCode', e.currentTarget.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={variant.colorCode}
                  onChange={(e) => handleUpdateVariant(index, 'colorCode', e.currentTarget.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-[10px] font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3">Добавить новый цвет</p>
        
        {pendingVariant ? (
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/20 flex-shrink-0">
                <img 
                  src={pendingVariant.image_url} 
                  alt="Новое фото"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={pendingVariant.colorName}
                  onChange={(e) => setPendingVariant({ ...pendingVariant, colorName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold"
                  placeholder="Введите название цвета..."
                  autoFocus
                />
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={pendingVariant.colorCode}
                    onChange={(e) => setPendingVariant({ ...pendingVariant, colorCode: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0"
                  />
                  <input
                    type="text"
                    value={pendingVariant.colorCode}
                    onChange={(e) => setPendingVariant({ ...pendingVariant, colorCode: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-mono"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSavePendingVariant}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl transition-all"
              >
                <Check size={16} />
                <span className="text-xs font-bold">Сохранить</span>
              </button>
              <button
                type="button"
                onClick={handleCancelPending}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl transition-all"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <label className={`
            flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer transition-all
            ${uploading ? 'bg-white/5 cursor-wait' : 'bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30'}
          `}>
            {uploading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span className="text-xs font-bold">Загрузка...</span>
              </>
            ) : (
              <>
                <Upload size={16} />
                <span className="text-xs font-bold">Загрузить фото</span>
              </>
            )}
            <input
              ref={newFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadPhoto}
              disabled={uploading}
            />
          </label>
        )}
      </div>
    </div>
  );
}
