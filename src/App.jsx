import React from "react";
import {Routes, Route} from "react-router-dom";
import {PrivacyPolicy, Terms, AboutUs, Logout, RevealKey} from "./components";
import {Home, CreateAccount} from "./container/index";
import {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <div className='bg-bitBg rounded-md h-[500px] w-[500px] flex justify-center mx-auto p-5'>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route
          path='/login/*'
          element={<CreateAccount />}
        />
        <Route
          path='/*'
          element={<Home />}
        />
        <Route
          path='/about'
          element={<AboutUs />}
        />
        <Route
          path='/privacy'
          element={<PrivacyPolicy />}
        />
        <Route
          path='/terms'
          element={<Terms />}
        />
        <Route
          path='/reveal'
          element={<RevealKey />}
        />
        <Route
          path='/logout'
          element={<Logout />}
        />
      </Routes>
    </div>
  );
};

export default App;
