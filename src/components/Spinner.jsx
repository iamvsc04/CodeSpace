import React from "react";
import { BallTriangle } from "react-loader-spinner";
const Spinner = () => {
  return (
    <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="cyan"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Spinner;
