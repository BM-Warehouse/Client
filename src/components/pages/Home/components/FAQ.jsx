'use client';

import React from 'react';

const FAQ = () => (
  <div className="mt-10 flex w-full flex-col items-center">
    <h2 className="text-3xl font-bold text-secondary">FAQ</h2>
    <div className="faq content mt-10 w-full px-5 xl:px-20 ">
      <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
        <input type="checkbox" />
        <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
          What are the basic steps in efficient and effective warehouse management?
        </div>
        <div className="collapse-content text-xs md:text-sm xl:text-base">
          <p>
            The basic steps include receiving goods, storing, managing stock, and shipping goods
            regularly.
          </p>
        </div>
      </div>
      <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
        <input type="checkbox" />
        <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
          What is the importance of a warehouse management system (WMS) in warehouse operations?
        </div>
        <div className="collapse-content text-xs md:text-sm xl:text-base">
          <p>
            WMS helps in stock management, tracking goods, space optimization, and improving
            operational efficiency.
          </p>
        </div>
      </div>
      <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
        <input type="checkbox" />
        <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
          How to handle damaged or expired goods in the warehouse?
        </div>
        <div className="collapse-content text-xs md:text-sm xl:text-base">
          <p>
            Identify and separate damaged or expired items, then follow disposal or return
            procedures.
          </p>
        </div>
      </div>
      <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
        <input type="checkbox" />
        <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
          What are the important key performance indicators (KPIs) in warehouse management?
        </div>
        <div className="collapse-content text-xs md:text-sm xl:text-base">
          <p>
            Important KPIs include stock accuracy rates, order fulfillment times, operational costs,
            and item damage rates.
          </p>
        </div>
      </div>
      <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
        <input type="checkbox" />
        <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
          Bagaimana cara menangani barang yang rusak atau kadaluarsa di gudang?
        </div>
        <div className="collapse-content text-xs md:text-sm xl:text-base">
          <p>
            Identifikasi dan pisahkan barang rusak atau kadaluarsa, lalu ikuti prosedur pembuangan
            atau pengembalian.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default FAQ;
