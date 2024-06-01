import React, { cloneElement } from 'react';

import Link from 'next/link';
import { CgChevronRight } from 'react-icons/cg';
import { FaMoneyBillWave, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { IoMdAdd } from 'react-icons/io';
import { TbTruckDelivery } from 'react-icons/tb';
import { TiCancel } from 'react-icons/ti';

const iconCollection = {
  chevronR: <CgChevronRight />,
  add: <IoMdAdd />,
  delete: <FaRegTrashAlt />,
  edit: <FaRegEdit />,
  cancel: <TiCancel />,
  truck: <TbTruckDelivery />,
  money: <FaMoneyBillWave />,
  move: <FaArrowRightArrowLeft />
};

const ButtonPrimary = ({
  className,
  children,
  type = 'button',
  icon,
  title,
  href = '#',
  onClick,
  disable,
  ...rest
}) => {
  let mergedClassName = 'relative min-w-10 min-h-9 rounded-md px-3 py-2 text-primary m-1 '; // harus ada spasi di akhir
  mergedClassName += `${disable ? 'bg-grey ' : 'bg-tertiary hover:bg-secondary '}`;
  mergedClassName += className;
  let selectedIcon = null;
  if (iconCollection[icon])
    selectedIcon = cloneElement(iconCollection[icon], { className: children ? 'mr-1' : '' });
  return href !== '#' ? (
    <Link href={href}>
      <button
        className={mergedClassName}
        onClick={onClick}
        title={title}
        type={type}
        disable={disable}
        {...rest}
      >
        <span className="flex items-center justify-center">
          {selectedIcon}
          {children}
        </span>
      </button>
    </Link>
  ) : (
    <button
      className={mergedClassName}
      onClick={onClick}
      title={title}
      type={type}
      disabled={disable}
      {...rest}
    >
      <span className="flex items-center justify-center">
        {selectedIcon}
        {children}
      </span>
    </button>
  );
};

const ButtonStrong = ({
  className,
  children,
  icon,
  title,
  href = '#',
  onClick,
  disable,
  type = 'button',
  ...rest
}) => {
  let mergedClassName = 'relative min-w-10 min-h-9 rounded-md px-3 py-2 text-primary m-1 '; // harus ada spasi di akhir
  mergedClassName += `${disable ? 'bg-grey ' : 'bg-rose-400 hover:bg-rose-600 '}`;
  mergedClassName += className;
  let selectedIcon = null;
  if (iconCollection[icon])
    selectedIcon = cloneElement(iconCollection[icon], { className: children ? 'mr-1' : '' });
  return href !== '#' ? (
    <Link href={href}>
      <button
        className={mergedClassName}
        onClick={onClick}
        title={title}
        disabled={disable}
        type={type}
        {...rest}
      >
        <span className="flex items-center justify-center">
          {selectedIcon}
          {children}
        </span>
      </button>
    </Link>
  ) : (
    <button
      className={mergedClassName}
      onClick={onClick}
      title={title}
      disabled={disable}
      type={type}
      {...rest}
    >
      <span className="flex items-center justify-center">
        {selectedIcon}
        {children}
      </span>
    </button>
  );
};

export { ButtonPrimary, ButtonStrong };
