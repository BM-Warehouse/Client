'use client';

const { createContext, useState } = require('react');

const ListOrderContext = createContext();
const ListOrderContextProvider = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [users, setUsers] = useState([]);

  return (
    <ListOrderContext.Provider
      value={{
        selectedOrder,
        setSelectedOrder,
        users,
        setUsers
      }}
    >
      {children}
    </ListOrderContext.Provider>
  );
};

export default ListOrderContextProvider;
export { ListOrderContext };
