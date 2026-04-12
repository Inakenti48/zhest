'use client';

import { useState } from 'react';
import ProductForm from '@/components/ProductForm';
import AdminProductList from '@/components/AdminProductList';

export default function ProductsClient({ products }: { products: any[] }) {
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinished = () => {
    setEditingProduct(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Add/Edit Product Form */}
      <div className="lg:col-span-1">
        <ProductForm product={editingProduct} onFinished={handleFinished} />
      </div>

      {/* Product List */}
      <AdminProductList products={products} onEdit={handleEdit} />
    </div>
  );
}
