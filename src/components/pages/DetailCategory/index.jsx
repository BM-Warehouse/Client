'use client';

import { useEffect } from 'react';

import ContainerProductCategory from '@/components/parts/ContainerProductCategory';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import useAuthUserStore from '@/store/authUserStore';
import useCategryStore from '@/store/categoryStore';

function DetailCategory({ params }) {
  const { role } = useAuthUserStore();

  const { categoryDetail, productCategories, asyncGetDetail } = useCategryStore((state) => ({
    productCategories: state.productCategories,
    categoryDetail: state.categoryDetail,
    asyncGetDetail: state.asyncGetDetail
  }));
  // console.log(productCategories.productCategories);

  const id = +params.categoryId;
  // console.log(id);
  useEffect(() => {
    asyncGetDetail(id);
  }, [asyncGetDetail, id]);

  if (!categoryDetail || !productCategories) {
    return <div>Loading...</div>;
  }

  return (
    <section className="datail-category-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="detail-category-page-content flex w-full flex-col items-center px-2 py-10 text-tertiary md:px-10">
        <div className="detail-category-container mt-20 flex flex-col px-0 md:flex-row md:px-8 xl:px-24">
          <figure className="max-h-[20rem] w-full max-w-[20rem] p-2 md:w-2/4">
            <img src={categoryDetail.imageUrl} alt="Susu Bayi" />
          </figure>
          <div className="detail-body w-full px-6 pt-4 md:ml-10 md:w-2/4 md:px-0 grid grid-rows">
            <div className="container-text">
              <div className="title-category">
                <h5 className="mb-3 text-3xl font-bold">{categoryDetail.name}</h5>
              </div>
              <div className="description">
                <p className="text-sm leading-6">{categoryDetail.description}</p>
              </div>
            </div>
            {role === 'admin' ? (
              <div className="container-btn content-end mb-5">
                <div className="btn-edit mt-5">
                  <button
                    className="btn bg-tertiary hover:bg-secondary text-white w-full"
                    onClick={() => document.getElementById('my_modal_1').showModal()}
                  >
                    Edit Category
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box bg-primary">
                      <h3 className="font-bold text-lg text-secondary">Edit Category</h3>
                      <div className="input-container">
                        <label htmlFor="" className="text-secondary">
                          Category name:
                          <input
                            type="text"
                            value={categoryDetail.name}
                            className="input input-bordered w-full max-w-xs ml-3 h-8 mt-5 text-secondary border-secondary"
                          />
                        </label>
                        <label htmlFor="" className="text-secondary">
                          Description:
                          <input
                            type="text"
                            value={categoryDetail.description}
                            className="input input-bordered w-full max-w-xs ml-3 h-8 mt-5 text-secondary border-secondary"
                          />
                        </label>
                        <input
                          type="file"
                          className="file-input file-input-bordered file-input-sm w-full max-w-xs mt-5 text-secondary file:bg-secondary file:border-secondary file:text-white"
                        />
                      </div>
                      <div className="modal-action">
                        <form method="dialog" className="flex flex-row-reverse justify-between">
                          <button className="btn bg-secondary text-white">Close</button>
                          <button className="btn bg-secondary text-white">Submit</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
                <div className="btn-delete mt-5">
                  <button className="w-full bg-slate-500 px-8 py-4 font-bold text-white hover:bg-red-500 rounded-lg h-11 text-sm">
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
