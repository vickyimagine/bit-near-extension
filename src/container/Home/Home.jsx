import React, {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAccountId, setSecretKey} from "../../Store/wallet/wallet-slice";
import {fetchKeys} from "../../utils";
import {Sidebar, HomeScreen, Send, Receive, Dropdown, LangDrop} from "../../components";
import {GiHamburgerMenu} from "react-icons/gi";
import {bitLogo} from "../../Assets";
import {decrypt} from "n-krypta";
import {RxHamburgerMenu} from "react-icons/rx";
import {MdOutlineLanguage} from "react-icons/md";

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
      // console.log(keyStore);
      dispatch(setAccountId(keyStore?.accountId));
      dispatch(setSecretKey(decrypt(keyStore?.secretKey, keyStore?.publicKey)));
    }
  }, []);

  return (
    <div
      className={`w-full `}
      onClick={() => {
        isSidebarOpen && setIsSidebarOpen(false);
      }}>
      <div className='flex items-center justify-between py-2 px-4'>
        <RxHamburgerMenu
          fontSize={27}
          className='cursor-pointer text-white  '
          onClick={toggleSidebar}
        />
        <div
          className={`absolute sidebar z-10 top-12 left-3 h-fit w-72  rounded-xl transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-[330px]"
          }`}>
          <Sidebar setSidebarOpen={setIsSidebarOpen} />
        </div>

        <Dropdown />

        <div className=' flex'>
          <LangDrop
            isMainScreen={true}
            classNames='self-center'
            buttonClass='w-8'
          />
          <a
            href='https://www.bitmemoir.com/'
            target='_blank'>
            <img
              className='w-12 h-12 object-contain cursor-pointer hover:scale-110 transition-all duration-300'
              src={bitLogo}
              alt=''
            />
          </a>
        </div>
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
