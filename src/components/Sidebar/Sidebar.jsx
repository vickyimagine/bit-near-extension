import React from "react";
import {sidebarLinks} from "../../Data/sidebarData";
import {AiFillCloseSquare} from "react-icons/ai";

const Sidebar = ({setSidebarOpen}) => {
  return (
    <div className='flex flex-col text-bitBg font-semibold p-4'>
      <span
        className='self-end mb-3 '
        onClick={() => {
          setSidebarOpen(false);
        }}>
        <AiFillCloseSquare fontSize={28} />
      </span>
      {sidebarLinks?.map(item => {
        return (
          <span className='capitalize  flex items-center gap-x-3 mb-5 cursor-pointer font-semibold text-lg hover:border-b hover:border-bitBg p-1 transition-all duration-200'>
            {item.logo}
            {item.title}
          </span>
        );
      })}
    </div>
  );
};

export default Sidebar;
