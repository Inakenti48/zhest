'use client';

import Image from 'next/image';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ShoppingBag, X, Plus, Minus, ArrowRight, CheckCircle2, Package, MapPin, Phone, User, Globe, Pencil, Trash2, Upload, Loader2 } from 'lucide-react';

import { createOrder, deleteProduct, updateProduct, addProduct } from '@/lib/product-actions';

interface Product {
  id: number;
  name: string;
  sell_price: number;
  image_url: string;
  category: string;
  stock: number;
  image_padding?: number;
  image_scale?: number;
  variants?: string;
  sizes?: string;
}

function ProductCard({ product, addToCart, onEdit, onDelete, onEditVariant }: { product: Product, addToCart: (product: Product) => void, onEdit: (product: Product) => void, onDelete: (id: number) => void, onEditVariant: (productId: number, variantIndex: number, variantName: string) => void }) {
  const variants = useMemo(() => {
    if (!product.variants) return [];
    try {
      const parsed = JSON.parse(product.variants);
      if (!Array.isArray(parsed) || parsed.length === 0) return [];
      
      const sortedVariants = [...parsed].sort((a, b) => {
        const aName = (a.name || a.color || '').toLowerCase();
        const bName = (b.name || b.color || '').toLowerCase();
        const aIsWhite = aName.includes('белый') || aName.includes('white');
        const bIsWhite = bName.includes('белый') || bName.includes('white');
        if (aIsWhite && !bIsWhite) return -1;
        if (!aIsWhite && bIsWhite) return 1;
        return 0;
      });
      return sortedVariants;
    } catch (e) {
      return [];
    }
  }, [product.variants]);

  const sizes = useMemo(() => {
    if (!product.sizes) return [];
    try {
      const parsed = JSON.parse(product.sizes);
      if (!Array.isArray(parsed) || parsed.length === 0) return [];
      return parsed;
    } catch (e) {
      return [];
    }
  }, [product.sizes]);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1);
  
  // Custom states for 'Пирамида'
  const [pyramidSides, setPyramidSides] = useState<[number, number, number, number]>([50, 50, 50, 50]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [isCustomPyramid, setIsCustomPyramid] = useState(false);

const selectedVariant = variants.length > 0 ? variants[selectedVariantIndex] : null;
    const selectedSize = sizes.length > 0 ? sizes[selectedSizeIndex] : null;
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
    const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isZoomed) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateX = (mouseY / (rect.height / 2)) * -8;
    const rotateY = (mouseX / (rect.width / 2)) * 8;
    setTransform({ rotateX, rotateY, scale: 1.05 });
  };

const handleMouseLeave = () => {
      if (!isZoomed) {
        setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
      }
    };

    const handleImageClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsZoomed(!isZoomed);
      if (!isZoomed) {
        setTransform({ rotateX: 0, rotateY: 0, scale: 1.8 });
      } else {
        setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
      }
    };

    const displayImage = selectedVariant?.image_url || selectedVariant?.image || product.image_url;
    const variantName = selectedVariant?.name || selectedVariant?.color || '';
    
    // Custom name and price logic for 'Пирамида'
    const isPyramid = product.name === 'Пирамида';
    
    let displayName = selectedVariant 
      ? (variantName.toLowerCase().startsWith('ral') 
          ? `${product.name} ${variantName}` 
          : `${product.name} (${variantName})`)
      : product.name;

    if (isPyramid) {
      const sortedSides = [...pyramidSides].sort((a, b) => b - a);
      const side1 = sortedSides[0];
      const side2 = sortedSides[1];
      displayName = product.name;
    }

    const cartDisplayName = isPyramid 
      ? `${product.name} ${pyramidSides[0]}x${pyramidSides[1]}x${pyramidSides[2]}x${pyramidSides[3]}`
      : (selectedSize ? `${displayName} (${selectedSize.name})` : displayName);

    const variantPrice = selectedVariant?.sell_price || product.sell_price;
    let displayPrice = selectedSize ? selectedSize.sell_price : variantPrice;

    if (isPyramid) {
      const sortedSides = [...pyramidSides].sort((a, b) => b - a);
      const side1 = sortedSides[0];
      const side2 = sortedSides[1];
      let basePrice = (side1 + side2) * 48;
      if (hasDiscount) {
        basePrice = basePrice * 0.97;
      }
      displayPrice = Math.round(basePrice);
    }
  
  const getColorCode = (variant: any) => {
    if (!variant) return '#888888';
    if (variant.colorCode && variant.colorCode.startsWith('#')) return variant.colorCode;
    if (variant.color && variant.color.startsWith('#')) return variant.color;
    
    const ralColors: Record<string, string> = {
      '7024': '#474A51',
      '6005': '#0F4336',
      '3005': '#5E2028',
      '8017': '#45322E',
      '8014': '#4A3526',
      '5005': '#005387',
      '9003': '#F4F8F4',
      '9010': '#F7F9EF',
      '1015': '#E6D2B5',
      '3011': '#7E292C',
      '5021': '#007577',
      '6002': '#325928',
      '6020': '#37422F',
      '7004': '#9A9A9A',
      '7005': '#6C6E6B',
      '7016': '#383E42',
      '7035': '#CBD0CC',
      '7040': '#9DA3A6',
      '8004': '#8D4931',
      '8019': '#3D3D3B',
      '9005': '#0E0E10',
      '1014': '#DDD5B6',
      '1018': '#F3E03B',
      '2004': '#E25303',
      '3000': '#AB2524',
      '3009': '#6D332C',
      '3020': '#C1121C',
      '5002': '#00387B',
      '5015': '#2271B3',
      '6001': '#28713E',
      '6011': '#6C7C59',
      '6019': '#B9CEAC',
      '6029': '#006B3F',
      '7000': '#7A888E',
      '7001': '#8C9C9C',
      '7011': '#555D61',
      '7012': '#575D5E',
      '7022': '#4B4D46',
      '7030': '#939388',
      '7032': '#B5B0A1',
      '7037': '#7A7B7A',
      '7038': '#B4B8B0',
      '7039': '#6B695F',
      '7042': '#8F9695',
      '7043': '#4E5451',
      '7044': '#BDBDB2',
      '7046': '#82898E',
      '8011': '#59412A',
      '8016': '#4C2B20',
      '8022': '#1A1718',
      '8025': '#755847',
      '9002': '#F1EDE0',
      '9006': '#A1A1A0',
      '9007': '#878683',
      '9016': '#F7FBF5',
    };
    
    const name = (variant.name || variant.color || '').toString();
    const ralMatch = name.match(/(\d{4})/);
    if (ralMatch && ralColors[ralMatch[1]]) {
      return ralColors[ralMatch[1]];
    }
    
    return '#888888';
  };

  const isLightColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 180;
  };

  const isWhiteVariant = selectedVariant && isLightColor(getColorCode(selectedVariant));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onDoubleClick={() => onEdit(product)}
          className="glass overflow-hidden border-white/5 group-hover:border-blue-500/30 transition-all duration-300 rounded-[2.5rem] cursor-pointer"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
      >
<div className="relative">
                {/* Zoom buttons - outside the scaling container */}
                <div className="absolute top-3 right-3 flex flex-col gap-1 z-30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(true);
                    }}
                    className="w-10 h-10 rounded-xl bg-black/70 text-white flex items-center justify-center hover:bg-blue-600 transition-all backdrop-blur-sm border border-white/20 shadow-lg"
                  >
                    <Plus size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(false);
                    }}
                    className="w-10 h-10 rounded-xl bg-black/70 text-white flex items-center justify-center hover:bg-blue-600 transition-all backdrop-blur-sm border border-white/20 shadow-lg"
                  >
                    <Minus size={20} />
                  </button>
                </div>
                <div 
                  className={`aspect-[4/5] overflow-hidden relative flex items-center justify-center transition-all duration-300 bg-white`}
                  style={{
                    transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                    transformOrigin: 'center center',
                    transition: 'transform 0.3s ease-out',
                  }}
                >
                {displayImage ? (
                <div 
                  className="relative w-full h-full"
                  style={{ 
                    padding: `${product.image_padding || (product.name.includes('Заглушка') ? 40 : 24)}px`,
                    transform: `scale(${product.image_scale || 1.0})`
                  }}
                >
                  <Image 
                    src={displayImage} 
                    alt={displayName} 
                    fill
                    className="transition-transform duration-700 group-hover:scale-110 object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={product.id < 70}
                  />
                </div>
              ) : (


            <div className="w-full h-full flex items-center justify-center text-metal-700">
              <ShoppingBag size={48} strokeWidth={1} />
            </div>
          )}
              <div className="absolute top-6 left-6">
                <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                  {product.category || 'Общее'}
                </div>
              </div>
            </div>
            </div>
            
            <div className="p-8">
  <h3 className={`font-black text-white mb-2 uppercase tracking-tight group-hover:text-blue-400 transition-colors h-14 ${displayName.length > 30 ? 'text-xs' : displayName.length > 20 ? 'text-sm' : 'text-base'}`}>
                {displayName}
              </h3>

  {/* Color Palette - clickable squares */}
                {variants.length > 1 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {variants.map((variant: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVariantIndex(idx);
                        }}
                        title={variant.name || variant.color}
                        className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                          selectedVariantIndex === idx
                            ? 'border-blue-500 ring-2 ring-blue-500/50 scale-110'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        style={{ backgroundColor: getColorCode(variant) }}
                      />
                    ))}
                  </div>
                )}

  {/* Selected Color Info */}
                {variants.length > 0 && selectedVariant && (
                  <div className="mt-3 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: getColorCode(selectedVariant) }}
                      />
                      <span className="text-xs font-bold text-white">
                        {selectedVariant.ral || selectedVariant.name || selectedVariant.color}
                      </span>
                    </div>
                  </div>
                )}


                {/* Size Selector */}
                {sizes.length > 0 && !isPyramid && (
                  <div className="flex gap-2 mt-4">
                    {sizes.map((size: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSizeIndex(idx);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                          selectedSizeIndex === idx
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/10 text-metal-400 hover:bg-white/20'
                        }`}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Pyramid Custom Logic UI */}
                {isPyramid && (
                  <div className="mt-6 space-y-4">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPyramidSides([50, 50, 50, 50]);
                          setIsCustomPyramid(false);
                        }}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                          !isCustomPyramid && pyramidSides[0] === 50
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/5 text-metal-400 hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        50x50
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPyramidSides([60, 60, 60, 60]);
                          setIsCustomPyramid(false);
                        }}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                          !isCustomPyramid && pyramidSides[0] === 60
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/5 text-metal-400 hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        60x60
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsCustomPyramid(true);
                        }}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                          isCustomPyramid
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/5 text-metal-400 hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        Свой размер
                      </button>
                    </div>

                    {isCustomPyramid && (
                      <div className="grid grid-cols-2 gap-2">
                        {pyramidSides.map((side, idx) => (
                          <div key={idx} className="space-y-1">
                            <label className="text-[8px] text-metal-500 font-black uppercase">Сторона {idx + 1}</label>
                            <input
                              type="number"
                              value={side}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                const newSides = [...pyramidSides] as [number, number, number, number];
                                newSides[idx] = parseInt(e.target.value) || 0;
                                setPyramidSides(newSides);
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs focus:border-blue-500 outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHasDiscount(!hasDiscount);
                      }}
                      className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                        hasDiscount
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/10'
                          : 'bg-white/5 text-metal-500 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      <CheckCircle2 size={14} className={hasDiscount ? 'opacity-100' : 'opacity-30'} />
                      Скидка 3%
                    </button>
                  </div>
                )}


          <div className="flex items-center justify-between mt-8">
<div className="flex flex-col">
                <span className="text-[10px] text-metal-500 font-bold uppercase tracking-widest">Цена</span>
                <span className="text-2xl font-black text-white">{displayPrice} ₽</span>
              </div>
            <button 
              onClick={() => addToCart({ ...product, name: cartDisplayName, image_url: displayImage, sell_price: displayPrice })}
              className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-xl group-active:scale-95"
            >
              <Plus size={28} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductCatalog({ products }: { products: Product[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({ name: '', sell_price: 0, category: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const [localProducts, setLocalProducts] = useState(products);
  const [editingVariant, setEditingVariant] = useState<{ productId: number, variantIndex: number, name: string } | null>(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', category: '' });
  const [uploadedFiles, setUploadedFiles] = useState<{ file: File, preview: string, ralNumber: string, ralName: string, colorCode: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ralColors: Record<string, { name: string, hex: string }> = {
    '1014': { name: 'Слоновая кость', hex: '#DDD5B6' },
    '1015': { name: 'Светлая слоновая кость', hex: '#E6D2B5' },
    '1018': { name: 'Цинково-жёлтый', hex: '#F3E03B' },
    '2004': { name: 'Оранжевый', hex: '#E25303' },
    '3000': { name: 'Огненно-красный', hex: '#AB2524' },
    '3005': { name: 'Вишнёвый', hex: '#5E2028' },
    '3009': { name: 'Оксидно-красный', hex: '#6D332C' },
    '3011': { name: 'Красно-коричневый', hex: '#7E292C' },
    '3020': { name: 'Красный', hex: '#C1121C' },
    '5002': { name: 'Ультрамарин', hex: '#00387B' },
    '5005': { name: 'Синий', hex: '#005387' },
    '5015': { name: 'Небесно-синий', hex: '#2271B3' },
    '5021': { name: 'Водянисто-синий', hex: '#007577' },
    '6001': { name: 'Изумрудный', hex: '#28713E' },
    '6002': { name: 'Лиственный', hex: '#325928' },
    '6005': { name: 'Зелёный мох', hex: '#0F4336' },
    '6011': { name: 'Резеда зелёный', hex: '#6C7C59' },
    '6019': { name: 'Бело-зелёный', hex: '#B9CEAC' },
    '6020': { name: 'Хромовый зелёный', hex: '#37422F' },
    '6029': { name: 'Мятно-зелёный', hex: '#006B3F' },
    '7000': { name: 'Серая белка', hex: '#7A888E' },
    '7001': { name: 'Серебристо-серый', hex: '#8C9C9C' },
    '7004': { name: 'Сигнально-серый', hex: '#9A9A9A' },
    '7005': { name: 'Мышино-серый', hex: '#6C6E6B' },
    '7011': { name: 'Железно-серый', hex: '#555D61' },
    '7012': { name: 'Базальтовый серый', hex: '#575D5E' },
    '7016': { name: 'Антрацит', hex: '#383E42' },
    '7022': { name: 'Серая умбра', hex: '#4B4D46' },
    '7024': { name: 'Графит', hex: '#474A51' },
    '7030': { name: 'Каменно-серый', hex: '#939388' },
    '7032': { name: 'Галечный серый', hex: '#B5B0A1' },
    '7035': { name: 'Светло-серый', hex: '#CBD0CC' },
    '7037': { name: 'Пыльно-серый', hex: '#7A7B7A' },
    '7038': { name: 'Агатовый серый', hex: '#B4B8B0' },
    '7039': { name: 'Кварцевый серый', hex: '#6B695F' },
    '7040': { name: 'Серое окно', hex: '#9DA3A6' },
    '7042': { name: 'Транспортный серый', hex: '#8F9695' },
    '7043': { name: 'Транспортный серый B', hex: '#4E5451' },
    '7044': { name: 'Шёлково-серый', hex: '#BDBDB2' },
    '7046': { name: 'Телеграфно-серый', hex: '#82898E' },
    '8004': { name: 'Терракотовый', hex: '#8D4931' },
    '8011': { name: 'Орехово-коричневый', hex: '#59412A' },
    '8014': { name: 'Сепия коричневый', hex: '#4A3526' },
    '8016': { name: 'Махагон', hex: '#4C2B20' },
    '8017': { name: 'Шоколадно-коричневый', hex: '#45322E' },
    '8019': { name: 'Серо-коричневый', hex: '#3D3D3B' },
    '8022': { name: 'Чёрно-коричневый', hex: '#1A1718' },
    '8025': { name: 'Бледно-коричневый', hex: '#755847' },
    '9002': { name: 'Серовато-белый', hex: '#F1EDE0' },
    '9003': { name: 'Сигнально-белый', hex: '#F4F8F4' },
    '9005': { name: 'Глубокий чёрный', hex: '#0E0E10' },
    '9006': { name: 'Бело-алюминиевый', hex: '#A1A1A0' },
    '9007': { name: 'Тёмно-алюминиевый', hex: '#878683' },
    '9010': { name: 'Чисто-белый', hex: '#F7F9EF' },
    '9016': { name: 'Транспортный белый', hex: '#F7FBF5' },
  };

  const parseRalFromFilename = (filename: string): { ralNumber: string, ralName: string, colorCode: string } => {
    const ralMatch = filename.match(/(\d{4})/);
    if (ralMatch) {
      const num = ralMatch[1];
      const ralData = ralColors[num];
      if (ralData) {
        return { ralNumber: num, ralName: ralData.name, colorCode: ralData.hex };
      }
      return { ralNumber: num, ralName: '', colorCode: '#888888' };
    }
    return { ralNumber: '', ralName: '', colorCode: '#888888' };
  };

  const [isDetectingColors, setIsDetectingColors] = useState(false);

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setIsDetectingColors(true);
    
    const newFiles: typeof uploadedFiles = [];
    
    for (const file of files.slice(0, 15 - uploadedFiles.length)) {
      const preview = URL.createObjectURL(file);
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/detect-ral', { method: 'POST', body: formData });
        const data = await res.json();
        
        if (data.ralNumber) {
          newFiles.push({
            file,
            preview,
            ralNumber: data.ralNumber,
            ralName: data.ralName,
            colorCode: data.colorCode
          });
        } else {
          const { ralNumber, ralName, colorCode } = parseRalFromFilename(file.name);
          newFiles.push({ file, preview, ralNumber, ralName, colorCode });
        }
      } catch {
        const { ralNumber, ralName, colorCode } = parseRalFromFilename(file.name);
        newFiles.push({ file, preview, ralNumber, ralName, colorCode });
      }
    }
    
    setUploadedFiles(prev => [...prev, ...newFiles].slice(0, 15));
    setIsDetectingColors(false);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleAddProduct = async () => {
    if (!addForm.name || uploadedFiles.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const variants: any[] = [];
      let firstImageUrl = '';
      
      for (let i = 0; i < uploadedFiles.length; i++) {
        const fileData = uploadedFiles[i];
        const formData = new FormData();
        formData.append('file', fileData.file);
        
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        
        if (data.url) {
          if (i === 0) firstImageUrl = data.url;
          
          const variantName = fileData.ralNumber 
            ? `RAL ${fileData.ralNumber} ${fileData.ralName}`.trim()
            : `Вариант ${i + 1}`;
          
          variants.push({
            name: variantName,
            color: variantName,
            colorCode: fileData.colorCode,
            image_url: data.url
          });
        }
        
        setUploadProgress(Math.round(((i + 1) / uploadedFiles.length) * 100));
      }
      
      const productFormData = new FormData();
      productFormData.append('name', addForm.name);
      productFormData.append('category', addForm.category);
      productFormData.append('buy_price', '0');
      productFormData.append('sell_price', '0');
      productFormData.append('stock', '999');
      productFormData.append('image_url', firstImageUrl);
      productFormData.append('variants', JSON.stringify(variants));
      
      await addProduct(productFormData);
      
      setIsAddModalOpen(false);
      setAddForm({ name: '', category: '' });
      uploadedFiles.forEach(f => URL.revokeObjectURL(f.preview));
      setUploadedFiles([]);
      
      window.location.reload();
      
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Ошибка при добавлении товара');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(localProducts.map(p => p.category || 'Общее')));
    return ['Все', ...cats];
  }, [localProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Все') return localProducts;
    return localProducts.filter(p => (p.category || 'Общее') === selectedCategory);
  }, [localProducts, selectedCategory]);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      sell_price: product.sell_price,
      category: product.category || ''
    });
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;
    const formData = new FormData();
    formData.append('id', String(editingProduct.id));
    formData.append('name', editForm.name);
    formData.append('sell_price', String(editForm.sell_price));
    formData.append('buy_price', '0');
    formData.append('stock', String(editingProduct.stock));
    formData.append('category', editForm.category);
    formData.append('image_url', editingProduct.image_url || '');
    
    await updateProduct(formData);
    setLocalProducts(prev => prev.map(p => 
      p.id === editingProduct.id 
        ? { ...p, name: editForm.name, sell_price: editForm.sell_price, category: editForm.category }
        : p
    ));
    setEditingProduct(null);
  };

  const handleDeleteProduct = async () => {
    if (!editingProduct) return;
    setIsDeleting(true);
    await deleteProduct(editingProduct.id);
    setLocalProducts(prev => prev.filter(p => p.id !== editingProduct.id));
    setEditingProduct(null);
    setIsDeleting(false);
  };

  const handleEditVariant = (productId: number, variantIndex: number, variantName: string) => {
    setEditingVariant({ productId, variantIndex, name: variantName });
  };

  const handleSaveVariant = async () => {
    if (!editingVariant) return;
    const product = localProducts.find(p => p.id === editingVariant.productId);
    if (!product || !product.variants) return;
    
    try {
      const variants = JSON.parse(product.variants);
      variants[editingVariant.variantIndex].name = editingVariant.name;
      variants[editingVariant.variantIndex].color = editingVariant.name;
      
      const formData = new FormData();
      formData.append('id', String(product.id));
      formData.append('name', product.name);
      formData.append('sell_price', String(product.sell_price));
      formData.append('buy_price', '0');
      formData.append('stock', String(product.stock));
      formData.append('category', product.category || '');
      formData.append('image_url', product.image_url || '');
      formData.append('variants', JSON.stringify(variants));
      
      await updateProduct(formData);
      setLocalProducts(prev => prev.map(p => 
        p.id === editingVariant.productId 
          ? { ...p, variants: JSON.stringify(variants) }
          : p
      ));
      setEditingVariant(null);
    } catch (e) {
      console.error('Error saving variant:', e);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.product.name === product.name);
      if (existing) {
        return prev.map(item => (item.product.id === product.id && item.product.name === product.name) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: number, delta: number, productName?: string) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && (!productName || item.product.name === productName)) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.sell_price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('loading');
    try {
      const orderData = cart.map(item => ({
        id: item.product.id,
        sell_price: item.product.sell_price,
        quantity: item.quantity
      }));
      await createOrder(customerInfo, orderData);
      setOrderStatus('success');
      setTimeout(() => {
        setCart([]);
        setIsCartOpen(false);
        setOrderStatus('idle');
        setIsCheckingOut(false);
        setCustomerInfo({ name: '', phone: '', address: '' });
      }, 3000);
    } catch (error) {
      console.error('Order error:', error);
      setOrderStatus('idle');
    }
  };

  return (
    <div id="catalog" className="py-24 px-6 relative bg-[#0a0a0c]">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-4">
              <div className="w-8 h-px bg-blue-500" /> ОНЛАЙН МАГАЗИН
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
              КАТАЛОГ <span className="text-metal-500">ИЗДЕЛИЙ</span>
            </h2>
            <p className="text-metal-400 text-lg max-w-xl font-medium">
              Качественные жестяные изделия от производителя. Заказывайте напрямую с доставкой.
            </p>
          </div>
          
{/* Categories */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-500 transition-all shadow-lg shadow-green-500/30 mr-2"
                title="Добавить товар"
              >
                <Plus size={24} />
              </button>
              {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white/5 text-metal-400 hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

          {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
<ProductCard 
                      key={product.id} 
                      product={product} 
                      addToCart={addToCart}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
                      onEditVariant={handleEditVariant}
                    />
                ))}
              </AnimatePresence>
            </div>
        </div>

        {/* Edit Product Modal */}
        <AnimatePresence>
          {editingProduct && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditingProduct(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0d0d0f] border border-white/10 z-[60] shadow-2xl rounded-[2rem] p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Pencil className="text-blue-500" size={20} /> Редактировать
                  </h3>
                  <button 
                    onClick={() => setEditingProduct(null)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-metal-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Название</label>
                    <input 
                      value={editForm.name}
                      onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Цена (₽)</label>
                    <input 
                      type="number"
                      value={editForm.sell_price}
                      onChange={e => setEditForm(prev => ({ ...prev, sell_price: parseFloat(e.target.value) || 0 }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Категория</label>
                    <input 
                      value={editForm.category}
                      onChange={e => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button 
                    onClick={handleDeleteProduct}
                    disabled={isDeleting}
                    className="flex-1 py-4 bg-red-500/20 text-red-400 font-black text-sm rounded-xl hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} /> {isDeleting ? 'Удаление...' : 'Удалить'}
                  </button>
                  <button 
                    onClick={handleSaveEdit}
                    className="flex-1 py-4 bg-blue-600 text-white font-black text-sm rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} /> Сохранить
                  </button>
                </div>
</motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Edit Variant Modal */}
          <AnimatePresence>
            {editingVariant && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setEditingVariant(null)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-[#0d0d0f] border border-white/10 z-[60] shadow-2xl rounded-[2rem] p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                      <Pencil className="text-blue-500" size={20} /> Редактировать цвет
                    </h3>
                    <button 
                      onClick={() => setEditingVariant(null)}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-metal-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Название цвета (RAL номер и название)</label>
                      <input 
                        value={editingVariant.name}
                        onChange={e => setEditingVariant(prev => prev ? { ...prev, name: e.target.value } : null)}
                        placeholder="8017 Шоколадно-коричневый"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button 
                      onClick={() => setEditingVariant(null)}
                      className="flex-1 py-4 bg-white/5 text-metal-400 font-black text-sm rounded-xl hover:bg-white/10 transition-all"
                    >
                      Отмена
                    </button>
                    <button 
                      onClick={handleSaveVariant}
                      className="flex-1 py-4 bg-blue-600 text-white font-black text-sm rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={18} /> Сохранить
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

        {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0d0d0f] border-l border-white/10 z-[60] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter uppercase">
                  <ShoppingCart className="text-blue-500" /> КОРЗИНА
                </h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-metal-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <ShoppingBag size={64} strokeWidth={1} className="mb-4" />
                    <p className="font-bold text-lg">Корзина пуста</p>
                    <p className="text-sm">Выберите товары в каталоге</p>
                  </div>
                ) : (
                  <>
                    {!isCheckingOut ? (
                        cart.map(item => (
                          <div key={`${item.product.id}-${item.product.name}`} className="flex gap-4 group">
                            <div className="w-20 h-20 rounded-[1.5rem] bg-white overflow-hidden border border-white/5 group-hover:border-blue-500/30 transition-all relative">
                                {item.product.image_url ? (
                                  <Image 
                                    src={item.product.image_url} 
                                    alt={item.product.name} 
                                    fill
                                    className="object-contain bg-white"
                                    sizes="80px"
                                  style={{ 
                                    padding: `${(item.product.image_padding || 0) / 3}px`,
                                    transform: `scale(${item.product.image_scale || 1.0})`
                                  }}
                                />
                              ) : (

                              <div className="w-full h-full flex items-center justify-center text-metal-700">
                                <Package size={24} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-white uppercase text-sm truncate mb-1">{item.product.name}</h4>
                            <p className="text-blue-400 font-black mb-3">{item.product.sell_price} ₽</p>
                            <div className="flex items-center gap-4">
                              <button onClick={() => updateQuantity(item.product.id, -1, item.product.name)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white"><Minus size={14} /></button>
                              <span className="font-black text-white text-sm">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.product.id, 1, item.product.name)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white"><Plus size={14} /></button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-6">
                        <button 
                          onClick={() => setIsCheckingOut(false)}
                          className="text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4"
                        >
                          ← Назад к покупкам
                        </button>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight">Оформление заказа</h4>
                        
                        {orderStatus === 'success' ? (
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="p-8 text-center glass border-green-500/30 py-20 rounded-[2rem]"
                          >
                            <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                            <h5 className="text-xl font-black text-white mb-2">ЗАКАЗ ПРИНЯТ!</h5>
                            <p className="text-metal-400 text-sm">Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
                          </motion.div>
                        ) : (
                          <form onSubmit={handleCheckout} className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Ваше Имя</label>
                              <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-metal-600" size={16} />
                                <input 
                                  required
                                  value={customerInfo.name}
                                  onChange={e => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] pl-12 pr-4 py-4 text-white focus:border-blue-500 outline-none transition-all" 
                                  placeholder="Иван Иванов"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Телефон</label>
                              <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-metal-600" size={16} />
                                <input 
                                  required
                                  type="tel"
                                  value={customerInfo.phone}
                                  onChange={e => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] pl-12 pr-4 py-4 text-white focus:border-blue-500 outline-none transition-all" 
                                  placeholder="+7 (900) 000-00-00"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Адрес Доставки</label>
                              <div className="relative">
                                <MapPin className="absolute left-4 top-4 text-metal-600" size={16} />
                                <textarea 
                                  required
                                  value={customerInfo.address}
                                  onChange={e => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] pl-12 pr-4 py-4 text-white focus:border-blue-500 outline-none transition-all min-h-[100px]" 
                                  placeholder="Город, улица, дом..."
                                />
                              </div>
                            </div>
                            
                            <button 
                              disabled={orderStatus === 'loading'}
                              className="w-full py-5 bg-white text-black font-black text-lg rounded-[1.5rem] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3"
                            >
                              {orderStatus === 'loading' ? 'ОФОРМЛЯЕМ...' : (
                                <>СДЕЛАТЬ ЗАКАЗ <ArrowRight size={20} /></>
                              )}
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {cart.length > 0 && orderStatus !== 'success' && (
                <div className="p-8 bg-white/5 border-t border-white/10 space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-metal-500 font-black uppercase tracking-widest mb-1">Итого к оплате</p>
                      <p className="text-3xl font-black text-white">{cartTotal} ₽</p>
                    </div>
                    <p className="text-xs text-metal-500 font-bold">{cartCount} поз.</p>
                  </div>
                  
                  {!isCheckingOut && (
                    <button 
                      onClick={() => setIsCheckingOut(true)}
                      className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-[1.5rem] hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3"
                    >
                      ОФОРМИТЬ <ArrowRight size={20} />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

{/* Floating Cart Trigger */}
        {cartCount > 0 && !isCartOpen && (
          <motion.button
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-10 right-10 w-20 h-20 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-500/40 z-40 flex items-center justify-center"
          >
            <div className="relative">
              <ShoppingCart size={32} />
              <div className="absolute -top-4 -right-4 bg-white text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-lg">
                {cartCount}
              </div>
            </div>
          </motion.button>
        )}

        {/* Add Product Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isUploading && setIsAddModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0d0f] border border-white/10 z-[60] shadow-2xl rounded-[2rem] p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                    <Plus className="text-green-500" size={20} /> Добавить товар
                  </h3>
                  <button 
                    onClick={() => !isUploading && setIsAddModalOpen(false)}
                    disabled={isUploading}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-metal-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Название товара *</label>
                      <input 
                        value={addForm.name}
                        onChange={e => setAddForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Угол желоба внутренний"
                        disabled={isUploading}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-500 outline-none transition-all disabled:opacity-50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">Категория *</label>
                      <input 
                        value={addForm.category}
                        onChange={e => setAddForm(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="Квад водосточка"
                        disabled={isUploading}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-500 outline-none transition-all disabled:opacity-50" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
<label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">
                        Фотографии (до 15 шт) — RAL определяется автоматически по цвету
                      </label>
                      <div 
                        onClick={() => !isUploading && !isDetectingColors && fileInputRef.current?.click()}
                        className={`border-2 border-dashed border-white/20 rounded-2xl p-8 text-center cursor-pointer hover:border-green-500/50 transition-all ${isUploading || isDetectingColors ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isDetectingColors ? (
                          <>
                            <Loader2 className="mx-auto mb-3 text-green-500 animate-spin" size={32} />
                            <p className="text-green-400 text-sm">Определяю цвета...</p>
                          </>
                        ) : (
                          <>
                            <Upload className="mx-auto mb-3 text-metal-500" size={32} />
                            <p className="text-metal-400 text-sm">Нажмите для выбора файлов</p>
                            <p className="text-metal-600 text-xs mt-1">RAL определяется автоматически по цвету товара на фото</p>
                          </>
                        )}
                      </div>
                    <input 
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFilesSelect}
                      className="hidden"
                    />
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] text-metal-500 font-black uppercase tracking-widest">
                          Загружено: {uploadedFiles.length}/15
                        </label>
                        {!isUploading && (
                          <button 
                            onClick={() => {
                              uploadedFiles.forEach(f => URL.revokeObjectURL(f.preview));
                              setUploadedFiles([]);
                            }}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            Очистить все
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-5 gap-3">
                        {uploadedFiles.map((fileData, idx) => (
                          <div key={idx} className="relative group">
                            <div className="aspect-square rounded-xl overflow-hidden bg-white border-2 border-white/10">
                              <img src={fileData.preview} alt="" className="w-full h-full object-contain" />
                            </div>
                            <div 
                              className="absolute bottom-0 left-0 right-0 px-1 py-0.5 text-center text-[8px] font-bold text-white rounded-b-xl"
                              style={{ backgroundColor: fileData.colorCode }}
                            >
                              {fileData.ralNumber ? `RAL ${fileData.ralNumber}` : 'Без RAL'}
                            </div>
                            {!isUploading && (
                              <button
                                onClick={() => removeFile(idx)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={12} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-metal-400">Загрузка...</span>
                        <span className="text-green-400 font-bold">{uploadProgress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-8">
                  <button 
                    onClick={() => {
                      uploadedFiles.forEach(f => URL.revokeObjectURL(f.preview));
                      setUploadedFiles([]);
                      setAddForm({ name: '', category: '' });
                      setIsAddModalOpen(false);
                    }}
                    disabled={isUploading}
                    className="flex-1 py-4 bg-white/5 text-metal-400 font-black text-sm rounded-xl hover:bg-white/10 transition-all disabled:opacity-50"
                  >
                    Отмена
                  </button>
<button 
                      onClick={handleAddProduct}
                      disabled={isUploading || isDetectingColors || !addForm.name || !addForm.category || uploadedFiles.length === 0}
                      className="flex-1 py-4 bg-green-600 text-white font-black text-sm rounded-xl hover:bg-green-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {isUploading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Сохраняю...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} /> Добавить товар
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }
