import React from 'react';

import DetailOrder from '@/components/pages/DetailOrder';

const OrderDetailPage = ({ params }) => (
  <div>
    <DetailOrder id={params.id} />
  </div>
);

export default OrderDetailPage;
