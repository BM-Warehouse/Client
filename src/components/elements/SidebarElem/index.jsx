/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import { createContext, useContext, useState } from 'react';

import { LuChevronFirst, LuChevronLast } from 'react-icons/lu';

const SidebarContext = createContext();
function SidebarElem({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={` fixed top-16   z-20  h-screen ${
        expanded ? 'w-7/12 md:w-5/12 xl:w-3/12' : 'w-1/5 md:w-1/12 xl:w-[5%]'
      }`}
    >
      <nav className="flex h-full flex-col border-r bg-primary shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
            alt=""
          /> */}
          <p> </p>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
          >
            {expanded ? (
              <LuChevronFirst className="text-xl" />
            ) : (
              <LuChevronLast className="text-xl" />
            )}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

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

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`
           relative flex items-center py-2 px-3 my-1
           font-medium rounded-md cursor-pointer
           transition-colors group
           ${
             active
               ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
               : 'text-gray-600 hover:bg-indigo-50'
           }
        `}
    >
      {icon}
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
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
