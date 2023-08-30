import React, {useState} from "react";
import {networks} from "../../Constants/networks";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentNetwork} from "../../Store/wallet/wallet-slice";

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
    <div className='relative inline-block text-left '>
      <button
        className='select-button select-button-ghost w-40 max-w-xs border text-white border-gray-600 focus:outline-none rounded-md p-2'
        onClick={toggleDropdown}>
        {currentNetwork.networkName}
      </button>
      {isOpen && (
        <div className='origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          {networks.map(item => (
            <button
              key={item.networkName}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
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
