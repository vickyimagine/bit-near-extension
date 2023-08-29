import React from "react";

const Input = ({name, onChange, placeholder, value}) => {
  return (
    <input
      type='text'
      name={name}
      className='p-2 border outline-none bg-transparent rounded-md w-full text-white'
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Input;
