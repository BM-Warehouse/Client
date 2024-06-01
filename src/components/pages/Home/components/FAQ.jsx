'use client';

import React from 'react';

const FAQ = () => (
  <div className="mt-10 flex w-full flex-col items-center">
    <h2 className="text-3xl font-bold text-secondary">FAQ</h2>
    <div className="faq content mt-10 w-full px-5 xl:px-20 ">
      <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
        <input type="checkbox" />
        <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
          Apa saja langkah-langkah dasar dalam pengelolaan pergudangan yang efisien dan efektif?
        </div>
        <div className="collapse-content text-xs md:text-sm xl:text-base">
          <p>
            Langkah-langkah dasar meliputi penerimaan barang, penyimpanan, pengelolaan stok, dan
            pengiriman barang secara teratur.
          </p>
        </div>
      </div>
      <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
        <input type="checkbox" />
        <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
          Apa pentingnya sistem manajemen pergudangan (WMS) dalam operasional gudang?
        </div>
        <div className="collapse-content text-xs md:text-sm xl:text-base">
          <p>
            WMS membantu dalam pengelolaan stok, tracking barang, optimasi ruang, dan meningkatkan
            efisiensi operasional.
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
      <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
        <input type="checkbox" />
        <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
          Apa saja indikator kinerja utama (KPI) yang penting dalam manajemen gudang?
        </div>
        <div className="collapse-content text-xs md:text-sm xl:text-base">
          <p>
            KPI penting meliputi tingkat akurasi stok, waktu pemenuhan pesanan, biaya operasional,
            dan tingkat kerusakan barang.
          </p>
        </div>
      </div>
      <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
        <input type="checkbox" />
        <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh?
        </div>
        <div className="collapse-content text-xs md:text-sm xl:text-base">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh?Lorem
            ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh?Lorem ipsum
            dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh?
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default FAQ;
