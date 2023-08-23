import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchKeys} from "../../utils/fetchKeyStore";

import {Balances, Collectibles, Sidebar} from "../../components";

import {GiHamburgerMenu} from "react-icons/gi";
import {bitLogo} from "../../Assets";

const Home = () => {
  const [accountId, setAccountId] = useState(null);
  const [btnText, setBtnText] = useState("Balances");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar

  const keyStore = fetchKeys();
  const navigate = useNavigate();

  const activeStyle =
    "flex items-center justify-center w-1/2 text-center bg-white text-bitBg font-bold text-xl  cursor-pointer transition-all duration-300 rounded-md";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-center text-white font-bold text-xl  cursor-pointer transition-all duration-300 rounded-md";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!keyStore) {
      navigate("/login/account-options");
    }
    setAccountId(keyStore?.accountId);
  }, []);

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between border-b border-gray-700 py-2'>
        <GiHamburgerMenu
          fontSize={27}
          className='cursor-pointer text-white '
          onClick={toggleSidebar}
        />
        <div
          className={`sidebar fixed top-0 left-0 h-full w-60 bg-white shadow-lg transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <Sidebar setSidebarOpen={setIsSidebarOpen} />
        </div>
        <select className='select select-ghost w-40 max-w-xs border border-gray-600 focus:outline-none'>
          <option
            disabled
            defaultChecked>
            Select Network
          </option>
          <option>Near Mainnet</option>
          <option>Near Testnet</option>
        </select>
        <img
          className='w-16 h-16 object-contain cursor-pointer hover:scale-110 transition-all duration-300'
          src={bitLogo}
          alt=''
        />
      </div>
      <div className='flex justify-center h-10  my-3'>
        <div
          className={btnText === "Balances" ? activeStyle : inActiveStyle}
          onClick={e => {
            setBtnText(e.target.textContent);
          }}>
          Balances
        </div>
        <div
          className={btnText === "Collectibles" ? activeStyle : inActiveStyle}
          onClick={e => setBtnText(e.target.textContent)}>
          Collectibles
        </div>
      </div>
      {btnText === "Balances" ? (
        <Balances accountId={accountId && accountId} />
      ) : (
        <Collectibles />
      )}
    </div>
  );
};

export default Home;
