import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux/es/hooks/useSelector";
import CertificateCard from "./CertificateCard/CertificateCard";

const Certificates = () => {
  const {accountId} = useSelector(state => state.wallet);

  const [certificates, setCertificates] = useState([]);
  const [cardOpen, setCardOpen] = useState(false);
  const [card, setCard] = useState();

  const getCerts = async () => {
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

      if (
        data &&
        data.certificates &&
        data.certificates[0] &&
        data.certificates[0].certificates
      ) {
        const certificatesData = data.certificates[0].certificates;
        setCertificates(certificatesData);
      } else {
        console.error("Invalid response data format");
      }
    } catch (error) {
      console.error("Error in fetching or processing data:", error);
    }
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
  );
};

export default Certificates;
