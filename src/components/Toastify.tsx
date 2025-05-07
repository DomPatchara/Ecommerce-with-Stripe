import React from "react";

interface Props {
  message: string;
}

const Toastify = ({ message }: Props) => {
  return (
    <div className="absolute top-15 right-5 ">
      <div className="px-4 py-2 bg-green-300 rounded-xl font-semibold border-2 border-green-400">
        {message}
      </div>
    </div>
  );
};

export default Toastify;
