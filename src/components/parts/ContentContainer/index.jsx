'use client';

import React from 'react';

import useSidebarStore from '@/store/sidebarStore';

const ContentContainer = ({ children }) => {
  const { expanded } = useSidebarStore();

  return <div className={`${expanded ? 'ml-52' : ''}`}>{children}</div>;
};

export default ContentContainer;
