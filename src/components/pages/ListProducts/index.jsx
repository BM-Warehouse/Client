'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiPlus } from 'react-icons/hi';
import { IoFilterSharp } from 'react-icons/io5';

import ToggleTheme from '@/components/elements/ToggleTheme';
import ContainerProductsAdmin from '@/components/parts/ContainerProductsAdmin';
import ContainerProductsUser from '@/components/parts/ContainerProductsUser';
import Navbar from '@/components/parts/Navbar';
import Pagination from '@/components/parts/Pagination';
import Sidebar from '@/components/parts/Sidebar';
import useAuthUserStore from '@/store/authUserStore';
import useProductStore from '@/store/productStore';

function ListProducts() {
  const { role } = useAuthUserStore();
  const {
    productsData,
    asyncGetAll,
    pagination,
    filteredPagination,
    allProductsData,
    asyncGetAllFullProducts
  } = useProductStore();

  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get('keyword');
  const [searchKeyword, setSearchKeyword] = useState(keyword || '');

  const filteredProducts = allProductsData.filter((product) =>
    product.name.toLowerCase().includes((keyword || '').toLowerCase())
  );

  useEffect(() => {
    asyncGetAll();
    asyncGetAllFullProducts();
  }, [asyncGetAll, asyncGetAllFullProducts]);

  const onPaginationClick = async (page) => {
    await asyncGetAll(page);
  };

  const onSearchKeywordChange = ({ target }) => {
    setSearchKeyword(target.value);
    const params = new URLSearchParams(searchParams);
    params.set('keyword', target.value);
    router.push(`?${params.toString()}`);
  };

  if (!role) {
    return null;
  }

  return (
    <main className="product-page relative h-screen bg-bgColor font-poppins">
      <Navbar />
      <Sidebar />
      <ToggleTheme />
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Products</h1>
      </div>
      <div className="container-btn-products mt-20 flex flex-col-reverse justify-between px-5 md:ml-20 md:flex-row">
        <div className="btn-add-product">
          {role === 'admin' ? (
            <Link href="/add-product">
              <button className="mt-5 min-w-28 rounded-md bg-tertiary px-3 py-2 text-primary hover:bg-secondary md:mt-0">
                <span className="flex items-center justify-center">
                  <HiPlus className="mr-1" />
                  Add Product
                </span>
              </button>
            </Link>
          ) : (
            <div> </div>
          )}
        </div>
        <div className="search-filter flex items-center justify-between">
          <label className="input flex h-8 items-center bg-bgColor gap-2 border-tertiary">
            <input
              type="text"
              className="grow text-sm text-tertiary transition-none placeholder:text-tertiary"
              placeholder="Search product..."
              value={searchKeyword}
              onChange={onSearchKeywordChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 text-tertiary"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="btn-filter ml-5 cursor-pointer rounded-lg p-1 hover:bg-secondary">
            <IoFilterSharp className="text-3xl text-secondary hover:text-white" />
          </div>
        </div>
      </div>

      {role === 'admin' ? (
        <ContainerProductsAdmin productsData={keyword ? filteredProducts : productsData} />
      ) : (
        <ContainerProductsUser productsData={keyword ? filteredProducts : productsData} />
      )}

      <Pagination
        currentPage={keyword ? filteredPagination.currentPage : pagination.currentPage}
        totalPage={keyword ? filteredPagination.totalPage : pagination.totalPage}
        onClick={onPaginationClick}
      />
    </main>
  );
}

export default ListProducts;
