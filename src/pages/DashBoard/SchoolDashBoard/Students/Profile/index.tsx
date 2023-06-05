import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const index = (props: Props) => {
  const params = useParams();
  return <div>student profile ${params?.studentId}</div>;
};

export default index;
