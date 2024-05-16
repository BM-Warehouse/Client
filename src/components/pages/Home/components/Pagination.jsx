import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

function Pagination({ totalPage, currentPage, onClick }) {
  const MAX_BUTTON = 5;
  const HALF = Math.ceil(MAX_BUTTON / 2);
  let pages = [];

  let startPage = Math.max(1, currentPage - HALF + 1);
  const endPage = Math.min(totalPage, startPage + MAX_BUTTON - 1);

  if (endPage - startPage + 1 < MAX_BUTTON) startPage = endPage - MAX_BUTTON + 1;

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="container-pagination flex items-center justify-center pb-10 ">
      {startPage !== 1 ? <div className="button-pagination">
        <MdKeyboardArrowLeft className="text-2xl" />
      </div> : ""}
      <div className="join">
        {pages.map((i) => <button className={`btn join-item ${i === currentPage ? "btn-active" : ""}`}
          onClick={() => { onClick(i) }}>{i}</button>)}
      </div>
      {endPage !== totalPage ? <div className="button-pagination">
        <MdKeyboardArrowRight className="text-2xl" />
      </div> : ""}
    </div>
  );
}

export default Pagination;
