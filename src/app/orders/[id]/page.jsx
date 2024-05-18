import React from 'react';

import DetailOrder from '@/components/pages/DetailOrder';
import DetailContexProvider from '@/contexts/detailOrderContext';
import ContentContainer from '@/components/parts/ContentContainer';

const OrderDetailPage = ({ params }) => (
  <div>
    <ContentContainer>
      <DetailContexProvider>
        <DetailOrder id={params.id} />
      </DetailContexProvider>
    </ContentContainer>
  </div>
);

export default OrderDetailPage;
