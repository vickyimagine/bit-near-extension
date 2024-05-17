import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {
  NewAccount,
  ImportAccount,
  AccountOptions,
  Welcome,
  CreatePassword
} from "../../components";

const CreateAccount = () => {
  const {lang} = useSelector(state => state.wallet);

  useEffect(() => {
    localStorage.clear();
    // isBitV4 = true;
    localStorage.setItem("lang", lang);
    localStorage.setItem("isBitV4", true);
  }, []);
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
