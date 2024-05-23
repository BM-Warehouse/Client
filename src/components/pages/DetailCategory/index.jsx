'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import ContainerProductCategory from '@/components/parts/ContainerProductCategory';
import useAuthUserStore from '@/store/authUserStore';
import useCategoryStore from '@/store/categoryStore';

function DetailCategory({ params }) {
  const { role } = useAuthUserStore();

  const {
    categoryDetail,
    productCategories,
    asyncGetDetailCategory,
    asyncEditCategory,
    asyncRemoveCategory
  } = useCategoryStore((state) => ({
    productCategories: state.productCategories,
    categoryDetail: state.categoryDetail,
    asyncGetDetailCategory: state.asyncGetDetailCategory,
    asyncEditCategory: state.asyncEditCategory,
    asyncRemoveCategory: state.asyncRemoveCategory
  }));

  const router = useRouter();
  // console.log(productCategories.productCategories);

  const id = +params.categoryId;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rwheysjo');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/denyah3ls/image/upload', {
        method: 'POST',
        body: formData
      });

      // secureUrl ganti dulu jadi secure_url
      // eslint-disable-next-line camelcase
      const { secure_url } = await response.json();

      // eslint-disable-next-line camelcase
      const imageUrl = secure_url || categoryDetail.imageUrl;

      if (name === '' || description === '') {
        setName(categoryDetail.name);
        setDescription(categoryDetail.description);
      }

      await asyncEditCategory(id, { name, description, imageUrl });
      document.getElementById('my_modal_1').close();
      toast.success('Category updated successfully!');
      await asyncGetDetailCategory(id);
    } catch (error) {
      console.log(`category edited failed: ${error}`);
    }
  };

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
                    onClick={() => document.getElementById('my_modal_1').showModal()}
                  >
                    Edit Category
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box bg-primary">
                      <h3 className="text-lg font-bold text-secondary">Edit Category</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-control">
                          <label htmlFor="" className="text-secondary">
                            Category name:
                          </label>
                          <input
                            type="text"
                            defaultValue={categoryDetail.name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered"
                          />
                        </div>
                        <div className="form-control">
                          <label htmlFor="" className="text-secondary">
                            Description:
                          </label>
                          <input
                            type="text"
                            defaultValue={categoryDetail.description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input input-bordered"
                          />
                        </div>
                        <div className="form-control">
                          <input
                            type="file"
                            onChange={handleChange}
                            className="file-input file-input-bordered file-input-sm w-full max-w-xs mt-5 text-secondary file:bg-secondary file:border-secondary file:text-white"
                          />
                        </div>
                        <div className="container-btn-action flex items-center justify-between">
                          <div className="container-btn-submit mt-7">
                            <button type="submit" className="btn bg-secondary text-white">
                              Submit
                            </button>
                          </div>
                          <div className="modal-action">
                            <form method="dialog" className="flex flex-row-reverse justify-between">
                              <button className="btn bg-secondary text-white">Close</button>
                            </form>
                          </div>
                        </div>
                      </form>
                    </div>
                  </dialog>
                </div>
                <div className="btn-delete mt-5">
                  <button
                    onClick={handleRemove}
                    className="w-full bg-slate-500 px-8 py-4 font-bold text-white hover:bg-red-500 rounded-lg h-11 text-sm"
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
    </section>
  );
}

export default DetailCategory;
