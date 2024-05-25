'use client';

import CardProduct from '@/components/parts/CardProduct';

function ContainerProductCategory({ productCategories }) {
  if (!productCategories) {
    return null;
  }

  return (
    <div className="container-products mt-4 grid grid-cols-2 gap-4 p-4 md:ml-20 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {productCategories.map((productCategory) => (
        <CardProduct key={productCategory.product.id} product={productCategory.product} />
      ))}
    </div>
  );
}

export default ContainerProductCategory;
