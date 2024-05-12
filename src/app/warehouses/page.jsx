import Link from 'next/link';

const WarehousesPage = () => (
  <div>
    <h1 className="mb-10 text-center text-2xl">Warehouse A</h1>
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Warehouse Name</th>
            <th>Location</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>
              <Link href="/warehouses/detail" className="cursor-pointer">
                Warehouse A
              </Link>
            </td>
            <td>Jakarta</td>
            <td>Jl Pattimura 20, Jakarta</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Warehouse B</td>
            <td>Jakarta</td>
            <td>Jl Gedong Panjang 19</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Warehouse C</td>
            <td>Jakarta</td>
            <td>Jl Kendangsari II/5</td>
          </tr>
          <tr>
            <th>4</th>
            <td>Warehouse D</td>
            <td>Surabaya</td>
            <td>Jl Jaksa Agung Suprapto, Jl Muncul</td>
          </tr>
          <tr>
            <th>5</th>
            <td>Warehouse E</td>
            <td>DKI Jakarta</td>
            <td>Jl Cipete Raya</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default WarehousesPage;
