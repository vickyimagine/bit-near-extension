import React from "react";
import QRCode from "react-qr-code";
import { useContext } from "react";
import AccountContext from "../../context/accountContext";

const Qrcode = () => {
  const account = useContext(AccountContext);
  return (
    <div style={{ margin: "10px 0px" }}>
      <QRCode value={account.account} level="H" size={128} title="account" />
    </div>
  );
};

export default Qrcode;
