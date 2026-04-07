import React from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

function Input(props) {
  const { type, label, id, src, placeholder, alt, ...rest } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const isPassword = type === "password";
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='text-base font-semibold text-[#0B132A]'>
        {label}
      </label>
      <div className='border flex  py-4 px-3 gap-2 bg-[#FCFDFE] border-[#DEDEDE] rounded-lg focus-within:border-black'>
        <img src={src} alt={alt} />
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          {...rest}
          className='outline-none w-full text-xs text-[#4F5665]'
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-gray-500"
          >
            {showPassword ? <IoMdEyeOff /> : <FaEye />}
          </button>
        )}
      </div>
      
    </div>
  );
}

export default Input;
