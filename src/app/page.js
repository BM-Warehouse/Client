export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <h2 className="font-poppins text-lg font-bold">TES POPPIN</h2>
      <h5 className="font-poppins">
        Whereas disregard and contempt for human rights have resulted
      </h5>
    </main>
  );
}
