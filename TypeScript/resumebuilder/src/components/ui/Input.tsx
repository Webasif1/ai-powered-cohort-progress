import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input = ({ label, ...props }: Props) => {
  return (
    <div className="w-full">
      <label className="block mb-2 font-medium text-sm">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
