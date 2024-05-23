'use client';

const { createContext, useState } = require('react');

const ListOrderContext = createContext();
const ListOrderContextProvider = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({
    totalPage: null,
    totalData: null,
    nextPage: null,
    prevPage: null,
    currentPage: 1,
    limit: null
  });

  return (
    <ListOrderContext.Provider
      value={{
        selectedOrder,
        setSelectedOrder,
        users,
        setUsers,
        data,
        setData,
        pagination,
        setPagination
      }}
    >
      {children}
    </ListOrderContext.Provider>
  );
};

export default ListOrderContextProvider;
export { ListOrderContext };
