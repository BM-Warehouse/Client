import React from 'react'

const Pagination = () => {
  return (
    <div className="container-pagination flex items-center justify-center pb-10 ">
      <div className="button-pagination">
        <MdKeyboardArrowLeft className="text-2xl" />
      </div>
      <div className="join">
        <button className="btn join-item">1</button>
        <button className="btn join-item btn-active">2</button>
        <button className="btn join-item">3</button>
        <button className="btn join-item">4</button>
      </div>
      <div className="button-pagination">
        <MdKeyboardArrowRight className="text-2xl" />
      </div>
    </div>
  )
}

export default Pagination
