import React, { Suspense } from 'react';

import ListProducts from '@/components/pages/ListProducts';
import Loading from '@/components/parts/Loading';

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ListProducts />
    </Suspense>
  );
}
