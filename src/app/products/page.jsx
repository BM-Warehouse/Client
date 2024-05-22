import React, { Suspense } from 'react';

import ListProducts from '@/components/pages/ListProducts';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListProducts />
    </Suspense>
  );
}
