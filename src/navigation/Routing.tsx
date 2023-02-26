import { useAuthContext } from "context/AuthContext/AuthContext";
import { useUserContext } from "context/UserContext/UserContext";
import { getItem } from "helper/Storage";
import React, { Fragment, useEffect } from "react";
import AuthRouting from "./AuthRouting/AuthRouting";
import PrivateRouting from "./PrivateRouting/PrivateRouting";
import { auth } from "FirebaseConfig/FireBaseConfig";
export const Routing = () => {
  const { userId, setUserId } = useAuthContext();
  const { setIsLoading } = useUserContext();
  const uId = getItem('user')
  useEffect(() => {
    const user = getItem("user");
    let clearTimer: string | number | NodeJS.Timeout | undefined;
    setIsLoading(true);
    if (user) {
      setUserId(user.uid);
      clearTimer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    return () => {
      clearTimeout(clearTimer);
    };
  }, [setIsLoading, setUserId]);

  return (
    <Fragment>
      {userId && uId ? <PrivateRouting /> : <AuthRouting />}
    </Fragment>
  );
};
