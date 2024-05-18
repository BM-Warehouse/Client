'use client';

import { useContext, useEffect, useState } from 'react';

import ContainerOrders from '@/components/parts/ContainerOrders';
import Navbar from '@/components/parts/Navbar';
import Pagination from '@/components/parts/Pagination';
import Sidebar from '@/components/parts/Sidebar';
import { getAllOrders } from '@/fetching/orders';
import { ButtonPrimary } from '@/components/parts/Button';
import ModalAddOrder, { openModalAddOrder } from './ModalAddOrder';
import ListOrderContextProvider, { ListOrderContext } from './context';
import { getAllUsers } from '@/fetching/user';
import toast from 'react-hot-toast';

function Main() {
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({
    totalPage: null,
    totalData: null,
    nextPage: null,
    prevPage: null,
    currentPage: 1,
    limit: null
  });
  const [isLoading, setLoading] = useState(true);
  const {setUsers, users} = useContext(ListOrderContext);

  useEffect(() => {
    getAllOrders()
      .then((res) => res.json())
      .then((res) => {
        setData(res.data.checkouts);
        setLoading(false);
        setPagination(res.data.pagination);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onPaginationClick = (setPage) => {
    getAllOrders(setPage)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data.checkouts);
        setLoading(false);
        setPagination(res.data.pagination);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddOrderClick = () => {
    getAllUsers(1, 10000)
    .then((r)=>{
      setUsers(r)
    }).catch((e)=>{
      toast.error(`fail to fet user: ${e}`);
    })
    openModalAddOrder();
  }

  // useEffect((e)=>{
  //   console.log(users)
  // }, [users])

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-bars loading-lg text-tertiary"> </span>;
      </div>
    );
  if (!data) return <p className="ml-36">No Detail Order</p>;

  return (
      <main className="product-page bg-bgg relative h-screen font-poppins">
        <div className="title-page flex justify-center pt-24">
          <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Orders</h1>
        </div>
        <div className="container-btn-products mt-20 flex flex-col-reverse items-center justify-between px-5 md:ml-20 md:flex-row">
          <ButtonPrimary icon="add" onClick={handleAddOrderClick}>Add Order</ButtonPrimary>
          <div className="search-filter flex items-center justify-center">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>

        <ContainerOrders data={data} />
        <ModalAddOrder />

        <Pagination
          currentPage={pagination.currentPage}
          totalPage={pagination.totalPage}
          onClick={onPaginationClick}
        />
      </main>
  );
}

function ListOrders() {
  return (
    <ListOrderContextProvider>
      <Main/>
    </ListOrderContextProvider>
  );
}

export default ListOrders;
