'use client';

import Link from 'next/link';

import Modal from '@/components/modal';
import useModalStore from '@/hooks/useModalStore';

const WarehousesPage = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const openModal = useModalStore((state) => state.openModal);
  const bodyContent = (
    <div>
      <h1 className="text-2xl">Test Content</h1>
      <h2>Second body content</h2>
    </div>
  );

  return (
    <div>
      <h1 className="mb-10 text-center text-2xl">Warehouse A</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Warehouse Name</th>
              <th>Location</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>
                <Link href="/warehouses/detail" className="cursor-pointer">
                  Warehouse A
                </Link>
              </td>
              <td>Jakarta</td>
              <td>Jl Pattimura 20, Jakarta</td>
              <td>
                <button className="bg-secondary px-4 py-2 text-white" onClick={openModal}>
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>Warehouse B</td>
              <td>Jakarta</td>
              <td>Jl Gedong Panjang 19</td>
              <td>
                <button className="bg-secondary px-4 py-2 text-white" onClick={openModal}>
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>Warehouse C</td>
              <td>Jakarta</td>
              <td>Jl Kendangsari II/5</td>
              <td>
                <button className="bg-secondary px-4 py-2 text-white" onClick={openModal}>
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <th>4</th>
              <td>Warehouse D</td>
              <td>Surabaya</td>
              <td>Jl Jaksa Agung Suprapto, Jl Muncul</td>
              <td>
                <button className="bg-secondary px-4 py-2 text-white" onClick={openModal}>
                  Edit
                </button>
              </td>
            </tr>
            <tr>
              <th>5</th>
              <td>Warehouse E</td>
              <td>DKI Jakarta</td>
              <td>Jl Cipete Raya</td>
              <td>
                <button className="bg-secondary px-4 py-2 text-white" onClick={openModal}>
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isOpen && <Modal title="Test Modal" body={bodyContent} />}
    </div>
  );
};

export default WarehousesPage;
