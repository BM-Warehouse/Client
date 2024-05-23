'use client';

import CardCategory from '@/components/parts/CardCategory';

function ContainerCategory({ categoriesData }) {
  if (!categoriesData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-products mt-4 grid grid-cols-2 gap-12 md:ml-20 md:grid-cols-3 xl:grid-cols-5">
      {categoriesData.map((category) => (
        <CardCategory key={category.id} category={category} />
      ))}
    </div>
  );
}

export default ContainerCategory;
