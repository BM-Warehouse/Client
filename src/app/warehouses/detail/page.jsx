const WarehouseDetailPage = () => (
  <div>
    <h1 className="mb-10 text-center text-2xl">Warehouse A</h1>
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Product 1</td>
            <td>1000</td>
            <td>Jakarta</td>
            <td>Jl Pattimura 20, Jakarta</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Product 2</td>
            <td>2000</td>
            <td>Jakarta</td>
            <td>Jl Gedong Panjang 19</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Product 3</td>
            <td>500</td>
            <td>Jakarta</td>
            <td>Jl Kendangsari II/5</td>
          </tr>
          <tr>
            <th>4</th>
            <td>Product 4</td>
            <td>100</td>
            <td>Surabaya</td>
            <td>Jl Jaksa Agung Suprapto, Jl Muncul</td>
          </tr>
          <tr>
            <th>5</th>
            <td>Product 5</td>
            <td>1500</td>
            <td>DKI Jakarta</td>
            <td>Jl Cipete Raya</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default WarehouseDetailPage;
