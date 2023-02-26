import { useUserContext } from "context/UserContext/UserContext";
import { getItem } from "helper/Storage";
import React, { Fragment } from "react";
import AuthRouting from "./AuthRouting/AuthRouting";
import PrivateRouting from "./PrivateRouting/PrivateRouting";

export const Routing = () => {
  const { user } = useUserContext()
  const userDetails = getItem('user');
  console.log(user);
  return (
    <Fragment>
      {(user || userDetails) ? <PrivateRouting /> : <AuthRouting />}
    </Fragment>
  );
};
