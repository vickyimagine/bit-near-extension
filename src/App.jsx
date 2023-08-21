import React from "react";
import {Routes, Route} from "react-router-dom";

import {Home, CreateAccount} from "./container/index";

const App = () => {
  return (
    <div className='bg-cyan-950 rounded-md h-[500px] w-[500px] flex justify-center mx-auto'>
      <Routes>
        <Route
          path='/login'
          element={<CreateAccount />}
        />
        <Route
          path='/*'
          element={<Home />}
        />
      </Routes>
    </div>
  );
};

export default App;
