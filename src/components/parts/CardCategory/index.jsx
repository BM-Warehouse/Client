import Image from 'next/image';
import Link from 'next/link';

function CardCategory({ category }) {
  if (!category) {
    return null;
  }
  return (
    <div>
      <Link href={`/categories/${category.id}`}>
        <div className="w-60 card mb-10 cursor-pointer bg-base-100 shadow-xl h-52 hover:drop-shadow-2xl md:w-60">
          <figure>
            <Image
              src={category.imageUrl}
              alt="Shoes"
              width={1000}
              height={1000}
              className="w-60 h-40 object-cover"
            />
          </figure>
          <div className="card-body gap-0 px-6 py-2">
            <h2 className="card-title justify-center text-sm md:text-base">{category.name}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardCategory;
