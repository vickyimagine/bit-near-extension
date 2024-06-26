import React, {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
  NewAccount,
  ImportAccount,
  AccountOptions,
  Welcome,
  CreatePassword
} from "../../components";

const CreateAccount = () => {
  const {lang} = useSelector(state => state.wallet);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.clear();
    // isBitV4 = true;
    localStorage.setItem("lang", lang);
    localStorage.setItem("isBitV4", true);
    const isTempStore = localStorage.getItem("tempKeystore");
    const isOnPassword = localStorage.getItem("onPassword");
    if (isTempStore && !isOnPassword) {
      navigate("/login/new-account");
    }
    if (isOnPassword) {
      navigate("/login/create-password");
    }
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
      <Route
        path='/create-password'
        element={<CreatePassword />}
      />
    </Routes>
  );
};

export default CreateAccount;
