import React, {useState} from "react";
import {networks} from "../../Constants/networks";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentNetwork} from "../../Store/wallet/wallet-slice";
import {IoIosArrowDown} from "react-icons/io";

const Dropdown = () => {
  const {currentNetwork} = useSelector(state => state.wallet);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(prev => {
      return !prev;
    });
  };

  const selectNetwork = network => {
    dispatch(setCurrentNetwork(network));
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left ml-8'>
      <button
        className='select-button flex justify-center items-center gap-x-2 select-button-ghost w-36 max-w-xs border text-black bg-white border-gray-600 focus:outline-none rounded-full p-1 py-2 font-bold '
        onClick={toggleDropdown}>
        {currentNetwork.networkName}{" "}
        <IoIosArrowDown
          fontSize={24}
          className={`hover:scale-105 ${
            isOpen && "rotate-180"
          } transition-all duration-300`}
        />
      </button>
      {isOpen && (
        <div className=' absolute rounded-md mt-2 w-36 bg-white px-2'>
          {networks.map((item, idx) => (
            <button
              key={item.networkName}
              className={`flex items-center rounded-md justify-center py-2 font-bold bg-white ${
                idx === 0 && " border-b-[#7e787880] rounded-b-none border-[white] border"
              }  text-black hover:bg-gray-100 w-full `}
              onClick={() => {
                selectNetwork(item);
              }}>
              {item.networkName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
