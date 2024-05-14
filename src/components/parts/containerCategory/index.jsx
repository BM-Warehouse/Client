'use client';

import { useEffect } from 'react';

import CardCategory from '@/parts/CardCategory';
import useCategryStore from '@/store/categoryStore';

function ContainerCategory() {
  const { categoriesData, asyncGetAll } = useCategryStore((state) => ({
    categoriesData: state.categoriesData,
    asyncGetAll: state.asyncGetAll
  }));

  // console.log(categoriesData);

  useEffect(() => {
    asyncGetAll();
  }, [asyncGetAll]);

  if (!categoriesData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-products mt-24 grid grid-cols-2 gap-4 p-4 md:ml-20 md:grid-cols-3 xl:grid-cols-5">
      <CardCategory />
      {categoriesData.map((category) => (
        <CardCategory key={category.id} category={category} />
      ))}
    </div>
  );
}

export default ContainerCategory;
