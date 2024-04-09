import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux/es/hooks/useSelector";
import CertificateCard from "./CertificateCard/CertificateCard";
import {Oval} from "react-loader-spinner";

const Certificates = () => {
  const {accountId, currentNetwork} = useSelector(state => state.wallet);

  const [certificates, setCertificates] = useState([]);

  const [cardOpen, setCardOpen] = useState(false);
  const [card, setCard] = useState();
  const [isLoader, setIsLoader] = useState(false);

  const getCerts = async () => {
    setIsLoader(true);

    // const apiUrl = `https://bitmemoir.com/api/v2/certificate/getCertificate/?wallet=${accountId}`;
    const apiUrl = `http://15.206.186.148/api/v2/certificate/getCertificate/?wallet=${accountId}`;

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
        console.log(data);
        const certData = data.certificates;
        certData.map(org =>
          org?.certificates?.map(certificate =>
            setCertificates(prev => [
              ...prev,
              {
                name: certificate?.name,
                token_id: certificate?.id,
                image: certificate?.image,
                cid: certificate?.cid,
                address: org?.address,
                description: org?.description,
                isVerified: org?.is_verified,
                orgName: org?.name,
                website: org?.website,
                contractId: process.env.REACT_APP_BIT_CONTRACT
              }
            ])
          )
        );
      }
    } catch (error) {
      console.error("Error in fetching or processing data:", error);
    }
    setIsLoader(false);
  };

  useEffect(() => {
    setCertificates([]);
    if (currentNetwork.type === "mainnet") {
      getCerts();
    }
  }, [currentNetwork]);

  return (
    <div className=' border-t border-gray-500 '>
      {cardOpen ? (
        <CertificateCard
          card={card}
          setCardOpen={setCardOpen}
        />
      ) : (
        <>
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
              <p className='font-bold text-white text-xl'>Fetching Certificates...</p>
            </div>
          ) : certificates?.length === 0 ? (
            <div className='h-72 flex items-center justify-center'>
              <button className='bit-btn font-bold flex top-20 hover:scale-100 cursor-default px-24'>
                No Certificates Issued
              </button>
            </div>
          ) : (
            <div
              className={`flex flex-col  ${
                certificates?.length !== 0 ? "justify-between" : "justify-center"
              } h-72 mt-5`}>
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
                            Certificate of Appreciation
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
