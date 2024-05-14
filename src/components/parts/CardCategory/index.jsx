import Image from 'next/image';

function CardCategory({ category }) {
  if (!category) {
    return null;
  }
  return (
    <div className="w-30 card mb-10 cursor-pointer bg-base-100 shadow-xl hover:drop-shadow-2xl xl:w-60">
      <figure>
        <Image
          src={category.imageUrl}
          className="max-h-40 min-w-80 object-cover"
          alt="Shoes"
          width={300}
          height={300}
        />
      </figure>
      <div className="card-body gap-0 px-6 py-2">
        <h2 className="card-title text-sm md:text-base justify-center">{category.name}</h2>
      </div>
    </div>
  );
}

export default CardCategory;
