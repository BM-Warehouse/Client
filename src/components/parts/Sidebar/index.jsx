'use client';

import { usePathname } from 'next/navigation';
import { HiOutlineUsers } from 'react-icons/hi2';
import { LuBox, LuWarehouse, LuBoxes } from 'react-icons/lu';
import { MdOutlineDashboard } from 'react-icons/md';
import { TbReceipt2 } from 'react-icons/tb';

import SidebarElem, { SidebarItem } from '@/components/elements/SidebarElem';


function Sidebar() {
  const routePath = usePathname();
  return (
    <SidebarElem>
      <SidebarItem
        icon={<MdOutlineDashboard />}
        text="Dashboard"
        href="/test"
        {...(routePath === '/test' && { active: true })}
      />
      <SidebarItem
        icon={<LuBox />}
        text="Products"
        href="/products"
        {...(routePath === '/products' && { active: true })}
      />
      <SidebarItem icon={<LuBoxes />} text="Categories" />
      <SidebarItem icon={<LuWarehouse />} text="Warehouses" />
      <SidebarItem icon={<TbReceipt2 />} text="Orders" alert />
      <SidebarItem icon={<HiOutlineUsers />} text="Management Users" />
    </SidebarElem>
  );
}

export default Sidebar;
