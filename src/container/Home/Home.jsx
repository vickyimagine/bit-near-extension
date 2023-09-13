import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAccountId, setSecretKey} from "../../Store/wallet/wallet-slice";
import {fetchKeys} from "../../utils";
import {Sidebar, HomeScreen, Send, Receive, Dropdown} from "../../components";
import {GiHamburgerMenu} from "react-icons/gi";
import {bitLogo} from "../../Assets";
import {decrypt} from "n-krypta";

const Home = () => {
  //hooks
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar

  const dispatch = useDispatch();
  const keyStore = fetchKeys();
  //functions
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //useEffect
  useEffect(() => {
    if (keyStore) {
      let decryptedKey = decrypt(keyStore?.secretKey, keyStore?.publicKey);
      dispatch(setAccountId(keyStore?.accountId));
      dispatch(setSecretKey(decryptedKey));
    }
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
          className={`absolute sidebar z-10 top-0 left-0 h-full w-60 bg-white shadow-lg transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <Sidebar setSidebarOpen={setIsSidebarOpen} />
        </div>
        <Dropdown />
        <img
          className='w-16 h-16 object-contain cursor-pointer hover:scale-110 transition-all duration-300'
          src={bitLogo}
          alt=''
        />
      </div>
      <Routes>
        <Route
          path='/*'
          element={<HomeScreen />}
        />
        <Route
          path='/send'
          element={<Send />}
        />
        <Route
          path='/receive'
          element={<Receive />}
        />
      </Routes>
    </div>
  );
};

export default Home;
