'use client';

import { useState, useEffect } from 'react';
import ProductForm from '@/components/ProductForm';
import AdminProductList from '@/components/AdminProductList';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinished = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Управление Товарами</h1>
          <p className="text-metal-400 text-sm md:text-base">Добавляйте и редактируйте ассортимент цеха</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProductForm product={editingProduct} onFinished={handleFinished} />
        </div>

        <AdminProductList products={products} onEdit={handleEdit} onDelete={fetchProducts} />
      </div>
    </div>
  );
}
