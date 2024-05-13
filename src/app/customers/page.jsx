import Link from 'next/link';

const CustomersPage = () => (
  <div>
    <h1 className="mb-10 text-center text-2xl">Customers</h1>
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>
              <Link href="/customers/details">Customer 1</Link>
            </td>
            <td>Customer_1</td>
            <td>customer1@mail.com</td>
            <td>+62871828283</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Customer 2</td>
            <td>Customer_2</td>
            <td>customer2@mail.com</td>
            <td>+62871828283</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Customer 3</td>
            <td>Customer_3</td>
            <td>customer3@mail.com</td>
            <td>+62871828283</td>
          </tr>
          <tr>
            <th>4</th>
            <td>Customer 4</td>
            <td>Customer_4</td>
            <td>customer4@mail.com</td>
            <td>+62871828283</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default CustomersPage;
