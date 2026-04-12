'use client';

import { useState, useRef, useEffect } from 'react';
import { addProduct, updateProduct } from '@/lib/product-actions';
import { Plus, Image as ImageIcon, X, Loader2, Upload, Save, Minus, Plus as PlusIcon, Ruler } from 'lucide-react';
import VariantEditor from './VariantEditor';

interface Variant {
  color: string;
  colorCode: string;
  image_url?: string;
  image?: string;
}

interface Size {
  name: string;
  buy_price: number;
  sell_price: number;
}

export default function ProductForm({ product, onFinished }: { product?: any, onFinished?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [padding, setPadding] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (product) {
      setPreview(product.image_url);
      setPadding(product.image_padding || 0);
      setScale(product.image_scale || 1.0);
      try {
        const parsed = product.variants ? JSON.parse(product.variants) : [];
        setVariants(Array.isArray(parsed) ? parsed : []);
      } catch {
        setVariants([]);
      }
      try {
        const parsedSizes = product.sizes ? JSON.parse(product.sizes) : [];
        setSizes(Array.isArray(parsedSizes) ? parsedSizes : []);
      } catch {
        setSizes([]);
      }
    } else {
      setPreview(null);
      setPadding(0);
      setScale(1.0);
      setVariants([]);
      setSizes([]);
      formRef.current?.reset();
    }
  }, [product]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

async function handleSubmit(formData: FormData) {
      setLoading(true);
      try {
        formData.append('variants', JSON.stringify(variants));
        formData.append('sizes', JSON.stringify(sizes));
        if (product) {
          formData.append('id', product.id.toString());
          await updateProduct(formData);
        } else {
          await addProduct(formData);
        }
        formRef.current?.reset();
        setPreview(null);
        setPadding(0);
        setScale(1.0);
        setVariants([]);
        setSizes([]);
        if (onFinished) onFinished();
      } catch (error) {
        console.error('Error saving product:', error);
        alert('Ошибка при сохранении товара');
      } finally {
        setLoading(false);
      }
    }

  const adjustPadding = (val: number) => setPadding(Math.max(0, padding + val));
  const adjustScale = (val: number) => setScale(Math.max(0.1, parseFloat((scale + val).toFixed(1))));

  return (
    <div className="glass p-8 sticky top-24 rounded-[2.5rem] border-white/10">
      <h2 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
        {product ? <Save className="text-blue-400" /> : <Plus className="text-blue-400" />} 
        {product ? 'Изменить товар' : 'Добавить товар'}
      </h2>
        <form ref={formRef} action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Наименование</label>
            <input 
              name="name" 
              required 
              defaultValue={product?.name || ''}
              className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-3 focus:ring-2 focus:ring-blue-500/50 outline-none font-black text-sm uppercase transition-all" 
              placeholder="Напр: Водосток 100мм"
            />
          </div>
          
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Категория</label>
                <input 
                  name="category" 
                  defaultValue={product?.category || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-3 focus:ring-2 focus:ring-blue-500/50 outline-none font-black text-sm uppercase transition-all" 
                  placeholder="Напр: Ника продукция"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Цвет (RAL)</label>
                <input 
                  name="color" 
                  defaultValue={product?.color || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-3 focus:ring-2 focus:ring-blue-500/50 outline-none font-black text-sm uppercase transition-all" 
                  placeholder="Напр: 8017, 7024"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Ширина (м)</label>
                <input 
                  name="full_width" 
                  type="number"
                  step="0.01"
                  defaultValue={product?.full_width || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-4 py-3 focus:ring-2 focus:ring-blue-500/50 outline-none font-black text-sm transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Полезная (м)</label>
                <input 
                  name="useful_width" 
                  type="number"
                  step="0.01"
                  defaultValue={product?.useful_width || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-4 py-3 focus:ring-2 focus:ring-blue-500/50 outline-none font-black text-sm transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Толщина (мм)</label>
                <input 
                  name="thickness" 
                  type="number"
                  step="0.01"
                  defaultValue={product?.thickness || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-4 py-3 focus:ring-2 focus:ring-blue-500/50 outline-none font-black text-sm transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Закуп (цена)</label>
                <input 
                  name="buy_price" 
                  type="number" 
                  step="0.01" 
                  required 
                  defaultValue={product?.buy_price || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-3 focus:ring-2 focus:ring-blue-500/50 outline-none font-black text-sm transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Розница (цена)</label>
                <input 
                  name="sell_price" 
                  type="number" 
                  step="0.01" 
                  required 
                  defaultValue={product?.sell_price || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-3 focus:ring-2 focus:ring-blue-500/50 outline-none font-black text-sm transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Остаток</label>
                <input 
                  name="stock" 
                  type="number" 
                  step="0.1"
                  required 
                  defaultValue={product?.stock || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-3 focus:ring-2 focus:ring-blue-500/50 outline-none font-black text-sm transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Ед. изм.</label>
                <select 
                  name="unit"
                  defaultValue={product?.unit || 'шт'}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-3 focus:ring-2 focus:ring-blue-500/50 outline-none font-black text-sm uppercase transition-all"
                >
                  <option value="шт">шт</option>
                  <option value="м.п.">м.п.</option>
                  <option value="кв.м.">кв.м.</option>
                  <option value="кг">кг</option>
                </select>
              </div>
            </div>

          <div className="space-y-4">
            <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Размер фото (Настройка)</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-4 space-y-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase text-metal-400">Отступы: {padding}px</span>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => adjustPadding(-5)} className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-xl border border-white/5 transition-all flex items-center justify-center">
                    <Minus size={14} />
                  </button>
                  <button type="button" onClick={() => adjustPadding(5)} className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-xl border border-white/5 transition-all flex items-center justify-center">
                    <PlusIcon size={14} />
                  </button>
                </div>
                <input type="hidden" name="image_padding" value={padding} />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-4 space-y-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase text-metal-400">Масштаб: {scale}x</span>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => adjustScale(-0.1)} className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-xl border border-white/5 transition-all flex items-center justify-center">
                    <Minus size={14} />
                  </button>
                  <button type="button" onClick={() => adjustScale(0.1)} className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-xl border border-white/5 transition-all flex items-center justify-center">
                    <PlusIcon size={14} />
                  </button>
                </div>
                <input type="hidden" name="image_scale" value={scale} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2">Фото товара</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative h-48 w-full border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
                ${preview ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 hover:border-blue-500/30 hover:bg-white/5'}
              `}
            >
              {preview ? (
                <>
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="h-full w-full object-contain transition-all" 
                    style={{ padding: `${padding}px`, transform: `scale(${scale})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-[10px] font-black uppercase">Изменить</span>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImage(); }}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10 shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <div className="p-4 bg-blue-500/10 rounded-3xl mb-3">
                    <Upload className="text-blue-400" size={32} />
                  </div>
                  <span className="text-xs font-black text-white uppercase mb-1">Выбрать фото</span>
                  <span className="text-[10px] text-metal-500 text-center px-4 uppercase font-bold">
                    Нажмите для загрузки
                  </span>
                </>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                name="image_file" 
                accept="image/*"
                className="hidden" 
                onChange={handleFileChange}
              />
<input type="hidden" name="image_url" value={product?.image_url || ''} />
              </div>
            </div>

            <VariantEditor variants={variants} onChange={setVariants} />

            {/* Sizes Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest ml-2 flex items-center gap-2">
                  <Ruler size={14} /> Размеры (с разными ценами)
                </label>
                <button
                  type="button"
                  onClick={() => setSizes([...sizes, { name: '', buy_price: 0, sell_price: 0 }])}
                  className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-500/30 transition-all font-bold"
                >
                  + Добавить
                </button>
              </div>
              {sizes.length > 0 && (
                <div className="space-y-3">
                  {sizes.map((size, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-white/5 p-3 rounded-xl border border-white/10">
                      <input
                        value={size.name}
                        onChange={(e) => {
                          const newSizes = [...sizes];
                          newSizes[idx].name = e.target.value;
                          setSizes(newSizes);
                        }}
                        placeholder="Напр: 1 метр"
                        className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                      />
                      <input
                        type="number"
                        value={size.buy_price || ''}
                        onChange={(e) => {
                          const newSizes = [...sizes];
                          newSizes[idx].buy_price = parseFloat(e.target.value) || 0;
                          setSizes(newSizes);
                        }}
                        placeholder="Закуп"
                        className="w-20 bg-white/10 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                      />
                      <input
                        type="number"
                        value={size.sell_price || ''}
                        onChange={(e) => {
                          const newSizes = [...sizes];
                          newSizes[idx].sell_price = parseFloat(e.target.value) || 0;
                          setSizes(newSizes);
                        }}
                        placeholder="Розница"
                        className="w-20 bg-white/10 rounded-lg px-3 py-2 text-xs font-bold outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setSizes(sizes.filter((_, i) => i !== idx))}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
            {product && (
              <button 
                type="button"
                onClick={onFinished}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest py-4 rounded-[1.5rem] border border-white/10 transition-all text-xs"
              >
                Отмена
              </button>
            )}
            <button 
              type="submit" 
              disabled={loading}
              className={`
                flex-[2] font-black uppercase tracking-widest py-4 rounded-[1.5rem] transition-all shadow-lg flex items-center justify-center gap-2 text-xs
                ${product ? 'bg-green-600 hover:bg-green-500 shadow-green-500/20' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'}
                disabled:opacity-50
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Загрузка...</span>
                </>
              ) : (
                <>
                  {product ? <Save size={20} /> : <Plus size={20} />}
                  <span>{product ? 'Сохранить изменения' : 'Добавить товар'}</span>
                </>
              )}
            </button>
          </div>
        </form>

    </div>
  );
}
