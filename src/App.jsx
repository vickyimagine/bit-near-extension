import React from "react";
import {Routes, Route} from "react-router-dom";
import {PrivacyPolicy, Terms, AboutUs, Logout, RevealKey} from "./components";
import {Home, CreateAccount} from "./container/index";
import {Toaster} from "react-hot-toast";
import stars from "./Assets/stars.svg";

import "./App.css";

const App = () => {
  return (
    <div className='bg-stars rounded-md h-[500px] w-[500px] bg-contain flex justify-center mx-auto p-5 font-syne'>
      <div>
        <Toaster
          toastOptions={{
            style: {
              marginTop: "20px",
              paddingLeft: "45px",
              paddingRight: "35px"
            }
          }}
        />
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
