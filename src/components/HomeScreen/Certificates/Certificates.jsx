import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux/es/hooks/useSelector";
import CertificateCard from "./CertificateCard/CertificateCard";
import {Oval} from "react-loader-spinner";

const Certificates = () => {
  const {accountId} = useSelector(state => state.wallet);

  const [certificates, setCertificates] = useState([]);
  const [cardOpen, setCardOpen] = useState(false);
  const [card, setCard] = useState();
  const [isLoader, setIsLoader] = useState(false);

  const getCerts = async () => {
    setIsLoader(true);
    const apiUrl = `https://bitmemoir.com/api/v2/certificate/getCertificate/?wallet=${accountId}`;

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

      if (data && data.certificates && data.certificates[0]) {
        const certificatesData = data.certificates[0].certificates;
        setCertificates(certificatesData);
      }
    } catch (error) {
      console.error("Error in fetching or processing data:", error);
    }
    setIsLoader(false);
  };

  useEffect(() => {
    getCerts();
  }, []);

  return (
    <>
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
          ) : certificates.length === 0 ? (
            <div className='h-72 flex items-center justify-center'>
              <button className='bit-btn flex top-20 hover:scale-100 cursor-default'>
                No Certificates Issued
              </button>
            </div>
          ) : (
            <div
              className={`flex flex-col ${
                certificates.length !== 0 ? "justify-between" : "justify-center"
              } h-80 mt-4`}>
              <div
                className={`${
                  certificates.length !== 0 ? "grid" : "hidden"
                } grid-cols-3 gap-x-4 h-5/6 overflow-auto p-2`}>
                {certificates.length !== 0 &&
                  certificates?.map((certificate, index) => {
                    return (
                      <>
                        <img
                          key={index}
                          src={certificate?.image}
                          alt=''
                          className='h-40 w-40 object-contain cursor-pointer'
                          onClick={() => {
                            setCardOpen(true);
                            setCard(certificate);
                          }}
                        />
                      </>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Certificates;
