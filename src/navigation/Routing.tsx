import { useAuthContext } from "context/AuthContext/AuthContext";
import { auth } from "FirebaseConfig/FireBaseConfig";
import { getItem } from "helper/Storage";
import React, { Fragment, useEffect, useState } from "react";
import AuthRouting from "./AuthRouting/AuthRouting";
import PrivateRouting from "./PrivateRouting/PrivateRouting";

export const Routing = () => {
  const { setUserId } = useAuthContext();
  const uId = getItem('user')
  const [user, setUser] = useState(() => {
    const user = auth.currentUser;
    return user;
  });

  useEffect(() => {
    if (uId) {
      auth.onAuthStateChanged(function (user) {
        setUser(user);
        setUserId(user!.uid);
      });
    }
  }, [uId, setUserId]);

  return (
    <Fragment>
      {(user || uId) ? <PrivateRouting /> : <AuthRouting />}
    </Fragment>
  );
};
