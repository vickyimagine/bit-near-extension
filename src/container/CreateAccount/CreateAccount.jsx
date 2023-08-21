import React from "react";
import {Routes, Route} from "react-router-dom";
import {NewAccount, ImportAccount, AccountOptions, Welcome} from "../../components";

const CreateAccount = () => {
  return (
    <Routes>
      <Route
        path='/welcome'
        element={<Welcome />}
      />
      <Route
        path='/account-options'
        element={<AccountOptions />}
      />
      <Route
        path='/new-account'
        element={<NewAccount />}
      />
      <Route
        path='/import-account'
        element={<ImportAccount />}
      />
    </Routes>
  );
};

export default CreateAccount;
