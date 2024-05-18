import React from 'react';

import DetailOrder from '@/components/pages/DetailOrder';
import ContentContainer from '@/components/parts/ContentContainer';
import DetailContexProvider from '@/contexts/detailOrderContext';

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
