'use client';

const { createContext, useState, useCallback } = require('react');

const DetailOrderContex = createContext();
const DetailContexProvider = ({ children }) => {
  const [selectedWarehouses, setSelectedWarehouses] = useState({});
  const [currentCheckoutId, setCurrentCheckoutId] = useState(0);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [productList, setProductList] = useState([]);
  const [status, setStatus] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [courierPrice, setCourierPrice] = useState(0);

  const [pagination, setPagination] = useState({
    totalPage: null,
    totalData: null,
    nextPage: null,
    prevPage: null,
    currentPage: 1,
    limit: null
  });
  // const [isModalDeleteVerificationOpen, setIsModalDeleteVerificationOpen] = useState(false);
  // const [isModalEditQuantityOpen, setIsModalEditQuantityOpen] = useState(false);

  const updateSelectedWarehouse = useCallback((productId, warehouseId) => {
    setSelectedWarehouses((prevState) => ({
      ...prevState,
      [productId]: warehouseId
    }));
  }, []);

  return (
    <DetailOrderContex.Provider
      value={{
        selectedWarehouses,
        updateSelectedWarehouse,
        currentCheckoutId,
        setCurrentCheckoutId,
        data,
        setData,
        page,
        setPage,
        selectedProduct,
        setSelectedProduct,
        productList,
        setProductList,
        status,
        setStatus,
        totalPrice,
        setTotalPrice,
        pagination,
        setPagination,
        totalProductPrice,
        setTotalProductPrice,
        courierPrice,
        setCourierPrice,
        allData,
        setAllData
      }}
    >
      {children}
    </DetailOrderContex.Provider>
  );
};

export default DetailContexProvider;
export { DetailOrderContex };
