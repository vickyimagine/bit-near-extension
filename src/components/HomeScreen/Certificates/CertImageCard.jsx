import React from "react";

const CertImageCard = ({cert, setCardOpen, setCard}) => {
  // Destructure properties from cert object
  const {image, width, height, name} = cert || {};

  // Calculate aspect ratio for the image, defaulting to 1 if not available
  const aspectRatio = width && height ? width / height : 1;

  return (
    <div
      onClick={() => {
        // Open the card and set the selected certificate
        setCardOpen(true);
        setCard(cert);
      }}
      className='relative overflow-auto cursor-pointer group'>
      <img
        src={image} // Source of the certificate image
        style={{aspectRatio}} // Set the aspect ratio for the image
        className='w-full h-auto max-w-full max-h-60 object-cover rounded-xl'
        alt={name?.slice(0, 15)} // Use the first 15 characters of the certificate name for the alt text
      />
      {/* Hover effect to display certificate name */}
      <div className='absolute bottom-0 w-full bg-black text-white text-center p-2 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity'>
        {name?.slice(0, 15)}{" "}
        {/* Display the first 15 characters of the certificate name */}
      </div>
    </div>
  );
};

export default CertImageCard;
