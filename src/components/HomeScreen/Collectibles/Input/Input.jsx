import React from "react";

const Input = ({type, name, onChange, placeholder, value}) => {
  return (
    <input
      type='text'
      name={name}
      className={`p-2 border outline-none  rounded-xl w-full text-white bg-[#FFFFFF4D] placeholder:font-syne placeholder:text-[#FFFFFFB2] ${
        type === "text" ? "font-syne" : "font-inter"
      }`}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Input;
