import React from 'react';

import DetailOrder from '@/components/pages/DetailOrder';
import DetailContexProvider from '@/contexts/detailOrderContext';

const OrderDetailPage = ({ params }) => (
  <div>
    <DetailContexProvider>
      <DetailOrder id={params.id} />
    </DetailContexProvider>
  </div>
);

export default OrderDetailPage;
