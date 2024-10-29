import React, {useState, useEffect, useCallback, useMemo} from "react";
import {useSelector} from "react-redux";
import CertContainer from "./CertContainer";
import CertificateCard from "./CertificateCard/CertificateCard";
import {Oval} from "react-loader-spinner";
import engJs from "../../../Constants/en";
import spainJs from "../../../Constants/es";

const Certificates = () => {
  const {accountId, currentNetwork, lang, pendingCerts} = useSelector(
    state => state.wallet
  );

  // translations with useMemo for better performance
  const {fetchCertsTxt, noCertText, certAvailMainTxt, inWalletTxt, pendingTxt} =
    useMemo(() => {
      const translations = lang === "en" ? engJs : spainJs;
      return {
        fetchCertsTxt: translations.fetchingCerts,
        noCertText: translations.noCertIssue,
        certAvailMainTxt: translations.certAvailMain,
        inWalletTxt: translations.inWalletTxt,
        pendingTxt: translations.pendingTxt,
        certAppreciationTxt: translations.certAppreciation
      };
    }, [lang]);

  // State hooks
  const [certificates, setCertificates] = useState([]);
  const [cardOpen, setCardOpen] = useState(false);
  const [card, setCard] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const [btnText, setBtnText] = useState(inWalletTxt);

  const isOwnedSection = useMemo(() => btnText === inWalletTxt, [btnText]);
  const isPendingCerts = useMemo(() => pendingCerts.length !== 0, [pendingCerts]);

  // Button styles
  const activeStyle =
    "flex items-center justify-center w-1/2 px-2 text-center bg-white text-bitBg font-bold text-base cursor-pointer transition-all duration-300 rounded-xl ";
  const inActiveStyle =
    "flex items-center justify-center w-1/2 text-center text-white font-bold text-base cursor-pointer transition-all duration-300 rounded-xl border";

  // Fetch certificates from API
  const getCerts = useCallback(async () => {
    setIsLoader(true);
    const apiUrl = `https:bitmemoir.com/api/v2/certificate/getCertificate/?wallet=${accountId}`;
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) throw new Error(`Request failed with status: ${response.status}`);
      const data = await response.json();

      if (data?.certificates) {
        const certs = data.certificates.reduce((acc, org) => {
          org?.certificates?.forEach(certificate =>
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
              contractId: process.env.REACT_APP_BIT_CONTRACT,
              height: certificate.height,
              width: certificate.width
            })
          );
          return acc;
        }, []);
        setCertificates(
          certs.filter(cert => !pendingCerts.some(p => p.token_id === cert.token_id))
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoader(false);
    }
  }, [accountId, pendingCerts]);

  const getPendingCerts = useCallback(() => {
    if (pendingCerts) setCertificates(pendingCerts);
  }, [pendingCerts]);

  // useEffect hook with dependencies
  useEffect(() => {
    setCertificates([]);
    if (currentNetwork.type === "mainnet") {
      isOwnedSection ? getCerts() : getPendingCerts();
    }
  }, [currentNetwork, cardOpen, btnText, isOwnedSection, getCerts, getPendingCerts]);

  return (
    <div className='border-t border-gray-500 p-4'>
      {cardOpen ? (
        <CertificateCard
          card={card}
          setCardOpen={setCardOpen}
          isOwned={isOwnedSection}
        />
      ) : (
        <>
          {isPendingCerts && (
            <div className='flex justify-center mt-4 space-x-3'>
              {[inWalletTxt, pendingTxt].map(text => (
                <div
                  key={text}
                  className={btnText === text ? activeStyle : inActiveStyle}
                  onClick={() => setBtnText(text)}>
                  {text}
                </div>
              ))}
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
          ) : certificates.length === 0 ? (
            <div className='h-72 flex items-center justify-center'>
              <button className='bit-btn font-bold flex hover:scale-100 cursor-default px-24'>
                {currentNetwork.type === "mainnet" ? noCertText : certAvailMainTxt}
              </button>
            </div>
          ) : (
            <div
              className={`flex flex-col ${
                isPendingCerts ? "h-72" : "h-auto"
              } mt-2 relative`}>
              <CertContainer
                certificates={certificates}
                setCardOpen={setCardOpen}
                setCard={setCard}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Certificates;
