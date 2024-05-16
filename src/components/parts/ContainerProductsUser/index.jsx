'use client';

import React, { useEffect } from 'react';

import CardProduct from '@/components/parts/CardProduct';
import useProductStore from '@/store/productStore';

function ContainerProductsUser() {
  const { productsData, asyncGetAll } = useProductStore();

  useEffect(() => {
    asyncGetAll();
  }, [asyncGetAll]);

  if (!productsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-products mt-4 grid grid-cols-2 gap-4 p-4 md:ml-20 md:grid-cols-3 xl:grid-cols-5">
      <CardProduct />
      {productsData.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ContainerProductsUser;
