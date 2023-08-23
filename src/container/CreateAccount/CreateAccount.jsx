import React from "react";
import {Routes, Route} from "react-router-dom";
import {
  NewAccount,
  ImportAccount,
  AccountOptions,
  Welcome,
  CreatePassword
} from "../../components";

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
      <Route
        path='/password'
        element={<CreatePassword />}
      />
    </Routes>
  );
};

export default CreateAccount;
