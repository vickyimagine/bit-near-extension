import React from "react";
import {sidebarLinks} from "../../Constants/sidebarData";
import {AiFillCloseSquare} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

const Sidebar = ({setSidebarOpen}) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col text-bitBg font-semibold p-4'>
      <span
        className='self-end mb-3 cursor-pointer'
        onClick={() => {
          setSidebarOpen(false);
        }}>
        <AiFillCloseSquare fontSize={28} />
      </span>
      {sidebarLinks?.map((item, index) => {
        return (
          <span
            key={index}
            className='capitalize  flex items-center gap-x-3 mb-5 cursor-pointer font-semibold text-lg hover:border-b hover:border-bitBg p-1 transition-all duration-200'
            onClick={() => {
              navigate(item.destination);
            }}>
            {item.logo}
            {item.title}
          </span>
        );
      })}
    </div>
  );
};

export default Sidebar;
