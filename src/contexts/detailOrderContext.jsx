'use client';

const { createContext, useState, useCallback } = require('react');

const DetailOrderContex = createContext();
const DetailContexProvider = ({ children }) => {
  const [selectedWarehouses, setSelectedWarehouses] = useState({});
  const [currentCheckoutId, setCurrentCheckoutId] = useState(0);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState([]);
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
        setProductList
      }}
    >
      {children}
    </DetailOrderContex.Provider>
  );
};

export default DetailContexProvider;
export { DetailOrderContex };
