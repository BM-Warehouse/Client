import Link from 'next/link';

function CardCategory({ category }) {
  if (!category) {
    return null;
  }
  return (
    <Link href={`/categories/${category.id}`}>
      <div className="w-30 card mb-10 cursor-pointer bg-base-100 shadow-xl hover:drop-shadow-2xl xl:w-60">
        <figure>
          <img src={category.imageUrl} alt="Shoes" />
        </figure>
        <div className="card-body gap-0 px-6 py-2">
          <h2 className="card-title text-sm md:text-base justify-center">{category.name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default CardCategory;
