import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {fetchKeys} from "../../utils/fetchKeyStore";

const Home = () => {
  const keyStore = fetchKeys();

  const navigate = useNavigate();
  useEffect(() => {
    if (!keyStore) {
      navigate("/login/account-options");
    }
  }, []);

  return <div className='text-white'>Home</div>;
};

export default Home;
