/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import { cloneElement } from 'react';

import Link from 'next/link';
import { LuChevronFirst, LuChevronLast } from 'react-icons/lu';

import useSidebarStore from '@/store/sidebarStore';

function SidebarElem({ children }) {
  const { expanded, setExpanded } = useSidebarStore();

  return (
    <aside
      className={` fixed bottom-0 z-10 w-full  md:top-16   md:h-screen  
        md:w-auto ${expanded ? 'w-7/12 md:w-72' : 'w-1/5 md:w-1/12'}`}
    >
      <nav className="z-21 flex h-full flex-col bg-primary ">
        <div className="hidden items-center justify-between p-4 pb-2 md:flex">
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
            alt=""
          /> */}
          <p> </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-lg bg-none p-1.5 text-secondary "
          >
            {expanded ? (
              <LuChevronFirst className="text-xl" />
            ) : (
              <LuChevronLast className="text-xl" />
            )}
          </button>
        </div>

        {/* <ul className=" grid grid-cols-6 px-3 md:flex-1 md:grid-cols-1 md:pb-[1000px]">
          {children}
        </ul> */}

        <ul className=" flex flex-row items-center justify-evenly px-3 md:grid md:grid-cols-1 md:flex-col md:pb-[1000px]">
          {children}
        </ul>

        {/* <div className="flex border-t p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="h-10 w-10 rounded-md"
          />
          <div
            className={`flex items-center justify-between overflow-hidden transition-all ${
              expanded ? 'ml-3 w-52' : 'w-0'
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div> */}
      </nav>
    </aside>
  );
}

export default SidebarElem;

export function SidebarItem({ icon, text, active, alert, href = '#' }) {
  const { expanded } = useSidebarStore();
  const dynamicIcon = cloneElement(icon, { className: `text-xl ${active ? 'text-primary' : ''}` });
  return (
    <Link href={href}>
      <li
        className={`
           group relative my-1 flex w-12 cursor-pointer items-center rounded-md
           px-3 py-2 font-medium
           transition-colors md:w-auto
           ${active ? 'bg-secondary text-primary' : 'text-secondary hover:bg-indigo-50'}
        `}
      >
        {dynamicIcon}
        <span className={` overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}`}>
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 h-2 w-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`}
          />
        )}
        {!expanded && (
          <div
            className={`
          invisible absolute left-full ml-6 -translate-x-3 rounded-md
          bg-indigo-100 px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          md:group-hover:visible md:group-hover:translate-x-0 md:group-hover:opacity-100
      `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
