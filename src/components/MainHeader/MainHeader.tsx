import React, { useState } from "react";
import "./MainHeader.scss";
import { logo, useAuthContext } from "context/AuthContext/AuthContext";
import { HeaderProps } from "Modal/Modal";
import Card from "components/UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";

const MenuBar = () => {
  const { logOut } = useAuthContext()
  return (
    <Card className="menuBar">
      <ul>
        <li>
          <FontAwesomeIcon icon={faUser} className="menu-icon" />
          <span>Profile</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faLock} className="menu-icon" />
          <span>Change password</span>
        </li>
        <li onClick={() => logOut()}>
          <FontAwesomeIcon icon={faSignOut} className="menu-icon" />
          <span>Log out</span>
        </li>
      </ul>
    </Card>
  )
}
const MainHeader: React.FC<HeaderProps> = ({
  name = "testDemo",
  url = logo
}) => {
  const [isShowMenuBar, setIsShowMenuBar] = useState<boolean>(false);
  return (

    <div className="container-fluid header">
      <div className="row">
        <div className="col-6 col-md-6 col-sm-6 col-lg-6">
          
        </div>
        <div className="col-6 col-md-6 col-sm-6 col-lg-6 profile-container">
          <div className="float-end profile-block" onClick={() => setIsShowMenuBar((preViewState) => !preViewState)}>
            <img src='https://images.hivisasa.com/1200/It9Rrm02rE20.jpg' alt="profilePicture" />
            <span>
              Hi ! {name}
            </span>
          </div>
        </div>
      </div>
      {isShowMenuBar && <MenuBar />}
    </div>
  );
};
export default MainHeader;
