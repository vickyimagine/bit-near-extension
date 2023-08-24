import React, {useEffect, useState} from "react";
import {useNavigate, Routes, Route} from "react-router-dom";
import {fetchKeys} from "../../utils/fetchKeyStore";

import {Sidebar, HomeScreen, Send, Receive} from "../../components";

import {GiHamburgerMenu} from "react-icons/gi";
import {bitLogo} from "../../Assets";

const Home = () => {
  const [accountId, setAccountId] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar

  const keyStore = fetchKeys();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!keyStore) {
      navigate("/account-options");
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
      <Routes>
        <Route
          path='/homescreen'
          element={<HomeScreen accountId={accountId && accountId} />}
        />
        <Route
          path='/send'
          element={<Send accountId={accountId && accountId} />}
        />
        <Route
          path='/receive'
          element={<Receive accountId={accountId && accountId} />}
        />
      </Routes>
    </div>
  );
};

export default Home;
