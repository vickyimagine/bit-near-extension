import React, {useState} from "react";
import {networks} from "../../Constants/networks";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentNetwork} from "../../Store/wallet/wallet-slice";
import {IoIosArrowDown} from "react-icons/io";

/**
 * Dropdown component for selecting a network.
 * Displays a list of networks and allows the user to select one.
 */
const Dropdown = () => {
  const {currentNetwork} = useSelector(state => state.wallet);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Toggle the dropdown open/close state
  const toggleDropdown = () => setIsOpen(prev => !prev);

  /**
   * Dispatches selected network and closes the dropdown.
   * @param {Object} network - The selected network object.
   */
  const selectNetwork = network => {
    dispatch(setCurrentNetwork(network));
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left ml-8'>
      <button
        className='select-button flex justify-center items-center gap-x-2 w-36 max-w-xs border text-black bg-white border-gray-600 focus:outline-none rounded-full p-1 py-2 font-bold'
        onClick={toggleDropdown}>
        {currentNetwork.networkName}
        <IoIosArrowDown
          fontSize={24}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className='absolute rounded-md mt-2 w-36 bg-white px-2 shadow-md'>
          {networks.map((network, index) => (
            <button
              key={network.networkName}
              className={`flex items-center justify-center w-full py-2 font-bold text-black rounded-md hover:bg-gray-100 ${
                index === 0 ? "border-b border-gray-300" : ""
              }`}
              onClick={() => selectNetwork(network)}>
              {network.networkName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
