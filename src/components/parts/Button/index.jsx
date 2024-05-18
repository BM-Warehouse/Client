import Link from 'next/link';
import React, { cloneElement } from 'react'
import { CgChevronRight } from 'react-icons/cg';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { TiCancel } from "react-icons/ti";

const iconCollection = {
  chevronR: <CgChevronRight />,
  add: <IoMdAdd />,
  delete: <FaRegTrashAlt />,
  edit: <FaRegEdit />,
  cancel: <TiCancel />
}

const ButtonPrimary = ({ className, children, icon, title, href = '#', onClick, ...rest }) => {
  let mergedClassName = "relative mr-2 min-w-10 min-h-9 rounded-md px-3 py-2 text-primary bg-tertiary hover:bg-secondary " // harus ada spasi di akhir
  mergedClassName += className;

  const selectedIcon = cloneElement(iconCollection[icon], {className: children? 'mr-1' : ''})
  return (
    <Link href={href}>
      <button
        className={mergedClassName}
        onClick={onClick}
        title={title}
        {...rest}
      >
        <span className="flex items-center justify-center">
          {selectedIcon}
          {children}
        </span>
      </button>
    </Link>
  )
}

const ButtonStrong = ({ className, children, icon, title, href = '#', onClick, ...rest }) => {
  let mergedClassName = "relative mr-2 min-w-10 min-h-9 rounded-md px-3 py-2 text-primary bg-rose-400 hover:bg-rose-600 " // harus ada spasi di akhir
  mergedClassName += className;
  let selectedIcon = null;
  if(iconCollection[icon]) selectedIcon = cloneElement(iconCollection[icon], {className: children? 'mr-1' : ''})
  return (
    <Link href={href}>
      <button
        className={mergedClassName}
        // className='bg-'
        onClick={onClick}
        title={title}
        {...rest}
      >
        <span className="flex items-center justify-center">
          {selectedIcon}
          {children}
        </span>
      </button>
    </Link>
  )
}

export {ButtonPrimary, ButtonStrong}
