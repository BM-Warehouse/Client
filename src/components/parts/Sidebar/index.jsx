import { HiOutlineUsers } from 'react-icons/hi2';
import { LuBox, LuWarehouse, LuBoxes } from 'react-icons/lu';
import { MdOutlineDashboard } from 'react-icons/md';
import { TbReceipt2 } from 'react-icons/tb';

import SidebarElem, { SidebarItem } from '@/components/elements/SidebarElem';

function Sidebar() {
  return (
    <SidebarElem>
      <SidebarItem
        icon={<MdOutlineDashboard className="text-xl text-primary" />}
        text="Dashboard"
        active
      />
      <SidebarItem icon={<LuBox className="text-xl" />} text="Products" />
      <SidebarItem icon={<LuBoxes lassName="text-xl" />} text="Categories" />
      <SidebarItem icon={<LuWarehouse className="text-xl" />} text="Warehouses" />
      <SidebarItem icon={<TbReceipt2 className="text-xl" />} text="Orders" alert />
      <SidebarItem icon={<HiOutlineUsers className="text-xl" />} text="Management Users" />
    </SidebarElem>
  );
}

export default Sidebar;
