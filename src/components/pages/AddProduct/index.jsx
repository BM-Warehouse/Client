import Image from 'next/image';

import AdminWarehouse from '@/assets/images/adminwarehouse.jpeg';
import ControlProductForm from '@/components/parts/ControlProductForm';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

function AddProduct() {
  return (
    <section className="add-product-page relative min-h-screen bg-bgColor pb-20 font-poppins md:pb-12">
      <Navbar />
      <Sidebar />
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Add Product</h1>
      </div>
      <div className="body-page mt-10 flex px-2 md:ml-40">
        <ControlProductForm />
        <div className="img-additional flex w-2/4 items-center justify-center bg-white  max-[900px]:hidden">
          <Image
            src={AdminWarehouse}
            alt="Admin Warehouse Image"
            className="max-h-screen w-auto rounded-[100px] saturate-200"
          />
        </div>
      </div>
    </section>
  );
}

export default AddProduct;
