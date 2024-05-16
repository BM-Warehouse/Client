'use client';

import { usePathname } from 'next/navigation';
import { HiOutlineUsers } from 'react-icons/hi2';
import { LuBox, LuWarehouse, LuBoxes } from 'react-icons/lu';
import { MdOutlineDashboard } from 'react-icons/md';
import { TbReceipt2 } from 'react-icons/tb';

import SidebarElem, { SidebarItem } from '@/components/elements/SidebarElem';
import useAuthUserStore from '@/store/authUserStore';

function Sidebar() {
  const { role } = useAuthUserStore();
  const routePath = usePathname();
  return (
    <SidebarElem>
      {role === 'admin' && (
        <SidebarItem
          icon={<MdOutlineDashboard />}
          text="Dashboard"
          href="/dashboard"
          {...(routePath === '/dashboard' && { active: true })}
        />
      )}
      <SidebarItem
        icon={<LuBox />}
        text="Products"
        href="/products"
        {...(routePath === '/products' && { active: true })}
      />
      <SidebarItem
        icon={<LuBoxes />}
        text="Categories"
        href="/categories"
        {...(routePath === '/categories' && { active: true })}
      />
      {role === 'admin' && (
        <>
          <SidebarItem
            icon={<LuWarehouse />}
            text="Warehouses"
            href="/warehouses"
            {...(routePath === '/warehouses' && { active: true })}
          />
          <SidebarItem
            icon={<TbReceipt2 />}
            text="Orders"
            href="/orders"
            {...(routePath === '/orders' && { active: true })}
          />
          <SidebarItem icon={<HiOutlineUsers />} text="Management Users" />
        </>
      )}
      {role === 'user' && (
        <SidebarItem
          icon={<TbReceipt2 />}
          text="Checkout History"
          href="/checkout-history"
          {...(routePath === '/checkout-history' && { active: true })}
        />
      )}
    </SidebarElem>
  );
}

export default Sidebar;
