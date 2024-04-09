import React from "react";
import {sidebarLinks} from "../../Constants/sidebarData";
import {AiFillCloseSquare} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col   py-6 z-10 rounded-xl bg-white'>
      <div>
        {sidebarLinks?.map((item, index) => {
          return (
            <span
              key={index}
              className='capitalize hover:bg-col_1 flex items-center gap-x-3 py-6 cursor-pointer font-semibold text-lg pl-5 pt-2 p-1  transition-all duration-400'
              onClick={() => {
                item.handler();
                navigate(item.destination);
              }}>
              <img
                src={item.logo}
                alt='Img  '
              />
              {item.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
