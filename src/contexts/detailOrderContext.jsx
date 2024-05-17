'use client';

const { createContext, useState, useCallback } = require('react');

const DetailOrderContex = createContext();
const DetailContexProvider = ({ children }) => {
  const [selectedWarehouses, setSelectedWarehouses] = useState({});
  const [currentCheckoutId, setCurrentCheckoutId] = useState(0);
  const [data, setData] = useState(null);

  const updateSelectedWarehouse = useCallback((productId, warehouseId) => {
    setSelectedWarehouses((prevState) => ({
      ...prevState,
      [productId]: warehouseId
    }));
  }, []);


  return (
    <DetailOrderContex.Provider value={{
      selectedWarehouses,
      updateSelectedWarehouse,
      currentCheckoutId,
      setCurrentCheckoutId,
      data,
      setData
    }}>
      {children}
    </DetailOrderContex.Provider>
  );
};

export default DetailContexProvider;
export { DetailOrderContex };
