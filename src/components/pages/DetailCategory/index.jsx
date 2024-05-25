'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import ContainerProductCategory from '@/components/parts/ContainerProductCategory';
import useAuthUserStore from '@/store/authUserStore';
import useCategoryStore from '@/store/categoryStore';

import { ModalEditCategory2, openModalEditCategory } from './ModalEditCategory';

function DetailCategory({ params }) {
  const { role } = useAuthUserStore();

  const { categoryDetail, productCategories, asyncGetDetailCategory, asyncRemoveCategory } =
    useCategoryStore((state) => ({
      productCategories: state.productCategories,
      categoryDetail: state.categoryDetail,
      asyncGetDetailCategory: state.asyncGetDetailCategory,
      asyncEditCategory: state.asyncEditCategory,
      asyncRemoveCategory: state.asyncRemoveCategory
    }));

  const router = useRouter();
  // console.log(productCategories.productCategories);

  const id = +params.categoryId;

  const handleRemove = async () => {
    const removedCategory = await asyncRemoveCategory(id);
    if (removedCategory.ok) {
      toast.success('Category removed successfully');
      router.replace('/categories');
    }
  };

  useEffect(() => {
    asyncGetDetailCategory(id);
  }, [asyncGetDetailCategory, id]);

  if (!categoryDetail || !productCategories) {
    return <div>Loading...</div>;
  }

  if (!role) {
    return null;
  }

  return (
    <section className="datail-category-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <div className="detail-category-page-content flex w-full flex-col items-center px-2 py-10 text-tertiary md:px-10">
        <div className="detail-category-container mt-20 flex justify-center flex-col px-0 md:flex-row md:px-8 xl:px-24 xl:h-96 xl:w-full">
          <figure className="p-2">
            <Image
              src={categoryDetail.imageUrl}
              alt="Susu Bayi"
              width={1000}
              height={1000}
              className="w-96 h-full object-cover"
              priority
            />
          </figure>
          <div className="detail-body grid-rows grid w-full px-6 pt-4 md:ml-10 md:w-2/4 md:px-0">
            <div className="container-text">
              <div className="title-category">
                <h5 className="mb-3 text-3xl font-bold">{categoryDetail.name}</h5>
              </div>
              <div className="description">
                <p className="text-sm leading-6">{categoryDetail.description}</p>
              </div>
            </div>
            {role === 'admin' ? (
              <div className="container-btn mb-5 content-end">
                <div className="btn-edit mt-5">
                  <button
                    className="btn w-full bg-tertiary text-white hover:bg-secondary"
                    onClick={openModalEditCategory}
                  >
                    Edit Category
                  </button>
                </div>
                <div className="btn-delete mt-5">
                  <button
                    onClick={handleRemove}
                    className="btn w-full bg-rose-400 font-bold text-white hover:bg-rose-500"
                  >
                    Remove Category
                  </button>
                </div>
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        </div>
        <div className="container-products">
          <ContainerProductCategory productCategories={productCategories} />
        </div>
      </div>
      <ModalEditCategory2 id={id} />
    </section>
  );
}

export default DetailCategory;
