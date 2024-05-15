import { HiOutlineUsers } from 'react-icons/hi2';
import { LuBox, LuWarehouse, LuBoxes } from 'react-icons/lu';
import { MdOutlineDashboard } from 'react-icons/md';
import { TbReceipt2 } from 'react-icons/tb';

import SidebarElem, { SidebarItem } from '@/components/elements/SidebarElem';

function Sidebar() {
  return (
    <SidebarElem>
      <SidebarItem icon={<MdOutlineDashboard />} text="Dashboard" active />
      <SidebarItem icon={<LuBox />} text="Products" />
      <SidebarItem icon={<LuBoxes />} text="Categories" />
      <SidebarItem icon={<LuWarehouse />} text="Warehouses" />
      <SidebarItem icon={<TbReceipt2 />} text="Orders" alert />
      <SidebarItem icon={<HiOutlineUsers />} text="Management Users" />
    </SidebarElem>
  );
}

export default Sidebar;
