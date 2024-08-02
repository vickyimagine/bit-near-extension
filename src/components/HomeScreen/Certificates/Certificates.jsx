import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux/es/hooks/useSelector";
import CertificateCard from "./CertificateCard/CertificateCard";
import {Oval} from "react-loader-spinner";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";

const Certificates = () => {
  //hooks
  const {accountId, currentNetwork, lang, pendingCerts} = useSelector(
    state => state.wallet
  );
  const inWalletTxt = lang === "en" ? engJs.inWalletTxt : spainJs.inWalletTxt;
  const [certificates, setCertificates] = useState([]);
  const [cardOpen, setCardOpen] = useState(false);
  const [card, setCard] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const [btnText, setBtnText] = useState(inWalletTxt);
  const isOwnedSection = btnText === inWalletTxt;
  const isPendingCerts = pendingCerts.length !== 0;

  //translations
  const fetchCertsTxt = lang === "en" ? engJs.fetchingCerts : spainJs.fetchingCerts;
  const noCertText = lang === "en" ? engJs.noCertIssue : spainJs.noCertIssue;
  const certAvailMainTxt = lang === "en" ? engJs.certAvailMain : spainJs.certAvailMain;
  const pendingTxt = lang === "en" ? engJs.pendingTxt : spainJs.pendingTxt;
  const certAppreciationTxt =
    lang === "en" ? engJs.certAppreciation : spainJs.certAppreciation;

  //styles
  const activeStyle =
    "flex items-center justify-center w-1/2 px-2 text-center bg-white text-bitBg font-bold text-base  cursor-pointer transition-all duration-300 rounded-xl ";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-center text-white font-bold  text-base  cursor-pointer transition-all duration-300 rounded-xl border";

  //functions
  const getCerts = async () => {
    setIsLoader(true);

    // const apiUrl = `https://bitmemoir.com/api/v2/certificate/getCertificate/?email=vivek@beimagine.tech`;
    const apiUrl = `http://15.206.186.148/api/v2/certificate/getCertificate/?email=vivek@beimagine.tech`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.certificates) {
        // console.log(data);
        const certData = data.certificates;
        // console.log(certData)
        const certs = certData?.reduce((acc, org) => {
          if (!org?.certificates) return acc;

          org.certificates.forEach(certificate => {
            acc.push({
              name: certificate.name,
              token_id: String(certificate.id),
              image: certificate.image,
              cid: certificate.cid,
              address: org.address,
              description: org.description,
              isVerified: org.is_verified,
              orgName: org.name,
              website: org.website,
              contractId: process.env.REACT_APP_BIT_CONTRACT
            });
          });

          return acc;
        }, []);

        // console.log(certs);

        const ownedCerts = certs?.filter(
          cert =>
            !pendingCerts?.some(pendingCert => pendingCert.token_id === cert.token_id)
        );

        // console.log(ownedCerts);
        setCertificates(ownedCerts);
      }
    } catch (error) {
      console.error("Error in fetching or processing data:", error);
    }
    setIsLoader(false);
  };

  const getPendingCerts = () => {
    if (pendingCerts) {
      // console.log(pendingCerts);
      setCertificates(pendingCerts);
    }
  };

  //useEffects
  useEffect(() => {
    setCertificates([]);
    if (currentNetwork.type === "mainnet") {
      if (isOwnedSection) {
        getCerts();
      } else {
        // getPendingCerts();
      }
    }
  }, [currentNetwork, cardOpen, btnText]);

  return (
    <div className=' border-t border-gray-500 '>
      {cardOpen ? (
        <CertificateCard
          card={card}
          setCardOpen={setCardOpen}
          isOwned={isOwnedSection}
        />
      ) : (
        <>
          {isPendingCerts && (
            <div className='flex justify-center h-10 mt-4 space-x-3 '>
              <div
                className={btnText === inWalletTxt ? activeStyle : inActiveStyle}
                onClick={e => setBtnText(e.target.textContent)}>
                {inWalletTxt}
              </div>
              <div
                className={btnText === pendingTxt ? activeStyle : inActiveStyle}
                onClick={e => setBtnText(e.target.textContent)}>
                {pendingTxt}
              </div>
            </div>
          )}
          {isLoader ? (
            <div className='flex flex-col space-y-2 justify-center items-center h-72'>
              <Oval
                height={80}
                width={80}
                color='white'
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor='transparent'
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
              <p className='font-bold text-white text-xl'>{fetchCertsTxt}</p>
            </div>
          ) : certificates?.length === 0 ? (
            <div className='h-72 flex items-center justify-center'>
              <button className='bit-btn font-bold flex top-20 hover:scale-100 cursor-default px-24'>
                {currentNetwork.type === "mainnet"
                  ? `${noCertText}`
                  : `${certAvailMainTxt}`}
              </button>
            </div>
          ) : (
            <div
              className={`flex flex-col  ${
                certificates?.length !== 0 ? "justify-between" : "justify-center"
              } ${isPendingCerts ? "h-[270px]" : "h-72"} mt-2 `}>
              <div
                className={`${
                  certificates?.length !== 0 ? "grid" : "hidden"
                } grid-cols-3 gap-4 overflow-auto p-2`}>
                {certificates?.length !== 0 &&
                  certificates?.map((certificate, index) => {
                    return (
                      <>
                        <div
                          key={index + 1}
                          className='h-[132px] cursor-pointer bg-gradient-to-b from-white to-[#B3E1FF] p-[6px]  rounded-xl py-2 pb-2'
                          onClick={() => {
                            setCardOpen(true);
                            setCard(certificate);
                          }}>
                          <img
                            key={index}
                            src={certificate?.image}
                            alt=''
                            className='h-2/3 w-40 object-cover rounded-xl'
                          />
                          <p className='text-sm h-1/3  text-center font-medium text-black'>
                            {certAppreciationTxt}
                          </p>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Certificates;
