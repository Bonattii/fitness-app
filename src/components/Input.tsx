import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = props => {
  return (
    <input
      {...props}
      className="text-primary-white border border-secondary-blue sm:text-sm rounded-lg block w-full p-2.5 bg-black placeholder-primary-white focus:ring-secondary-blue focus:ring-2 focus:outline-none"
    />
  );
};

export default Input;
